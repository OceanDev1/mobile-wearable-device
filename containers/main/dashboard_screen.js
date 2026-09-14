import React from "react";
import {
  Image,
  Text,
  View,
  Modal,
  Easing,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ContainerStyles } from "../../styles/container_styles";
import VariableConfigs from "../../configs/variable_configs";
import { ScreenStyles } from "../../styles/screen_styles";
import { MaterialIcons } from "@expo/vector-icons";
import { AccountServices } from "../../services/account_servies";
import { MqttServices } from "../../services/mqtt_services";
import { DeviceServices } from "../../services/device_services";
import { SupportServices } from "../../services/support_services";

class DashboardMainScreen extends React.Component {
  navigation = this.props.navigation;
  timeout_detect_cough = null;

  state = {
    account_detail: null,

    data_predict: [],

    data_predict_health: null,
    data_show_evaluation: null,

    list_devices: [],
    list_devices_show: [],

    modal_risk: false,
  };

  componentDidMount() {
    this.getDataAccount();

    this.setState({
      data_predict: [
        {
          title: "Bệnh: ",
          value: "",
        },
        {
          title: "Nồng độ Oxy trong máu: ",
          value: "",
        },
        {
          title: "Vận động: ",
          value: "",
        },
        {
          title: "Nhịp tim: ",
          value: "",
        },
        {
          title: "Nhiệt độ cơ thể: ",
          value: "",
        },
        {
          title: "Nhiệt độ môi trường: ",
          value: "",
        },
      ],
    });
  }

  async getDataAccount() {
    const response = await AccountServices.getAccountByToken();
    if (response.message == "SUCCESS") {
      this.setState({ account_detail: response.metadata });
      this.getDeviceOwner();
      setTimeout(() => {
        // this.configMqtt();
      }, 1000);
    } else return this.navigation.navigate("LoginScreen");
  }

  componentWillUnmount() {
    MqttServices.cancelReceiveMessage(
      "response_data_health/" + this.state.account_detail["_id"]
    );

    for (let i = 0; i < this.state.list_devices_show.length; i++) {
      const mac_address = this.state.list_devices_show[i].detail.dv_mac_address;

      let topic_heart = "response_predict_health/" + mac_address;
      let topic_motion = "response_predict_motion/" + mac_address;
      let topic_sound = "response_predict_sound/" + mac_address;

      console.log("topic_heart", topic_heart);
      console.log("topic_motion", topic_motion);
      console.log("topic_sound", topic_sound);

      MqttServices.cancelReceiveMessage(topic_heart);
      MqttServices.cancelReceiveMessage(topic_motion);
      MqttServices.cancelReceiveMessage(topic_sound);
    }

    MqttServices.disconnectMqtt();
  }

  async configMqtt() {
    try {
      MqttServices.connectMqtt((isSuccess) => {
        console.log("isSuccess", isSuccess);
        if (isSuccess) {
          this.state.list_devices.forEach((e) => {
            MqttServices.receiveMessage(
              "response_data_health/" + e["_id"],
              (msg) => {
                const payload = msg["payloadString"];
              }
            );
          });

          this.state.list_devices_show.forEach((e) => {
            const mac_address = e.detail.dv_mac_address;
            const topic_heart = "response_predict_health/" + mac_address;
            const topic_motion = "response_predict_motion/" + mac_address;
            const topic_sound = "response_predict_sound/" + mac_address;

            MqttServices.receiveMessage(topic_motion, (msg) => {});

            MqttServices.receiveMessage(topic_sound, (msg) => {});

            MqttServices.receiveMessage(topic_heart, (msg) => {
              const payload = msg["payloadString"];

              const json_payload = JSON.parse(payload);

              if (json_payload.topic == "data_from_esp") {
                this.handleDeviceMqtt(JSON.parse(payload));
              }

              if (json_payload.topic == "response_predict_health") {
                let data_predict = this.state.data_predict;
                this.setState({ data_predict_health: json_payload });

                data_predict[0].value =
                  json_payload.value.prediction == "Absence"
                    ? "Chưa phát hiện bất thường"
                    : "Có dấu hiệus bệnh tim";
                data_predict[1].value = SupportServices.sortDataSp02(
                  json_payload.value.prediction_spo2
                );
                data_predict[3].value = SupportServices.sortDataEvaluationHeart(
                  json_payload.value.predict_heart_rate
                ).title;
                data_predict[4].value =
                  SupportServices.sortDataEvaluationHumanTemperature(
                    json_payload.value.predictions_temp[0]
                  ).title;
                data_predict[5].value =
                  SupportServices.sortDataEvaluationEnvironmentTemperature(
                    json_payload.value.predictions_temp[1]
                  ).title;

                this.setState({ data_predict: data_predict });
              }

              if (json_payload.topic == "response_predict_motion") {
                let data_predict = this.state.data_predict;
                data_predict[2].value =
                  json_payload.value.prediction == "normal"
                    ? "Vận động bình thường"
                    : "Khả năng té ngã";
                this.setState({ data_predict: data_predict });
              }

              if (json_payload.topic == "response_predict_sound") {
                clearTimeout(this.timeout_detect_cough);
                let data_predict = this.state.data_predict;
                data_predict[3].value =
                  json_payload.value.prediction == "normal"
                    ? "Chưa phát hiện tiếng ho"
                    : "Khả năng ho";
                this.setState({ data_predict: data_predict });

                setTimeout(() => {
                  let data_predict = this.state.data_predict;
                  data_predict[3].value = "Chưa phát hiện tiếng ho";
                  this.setState({ data_predict: data_predict });
                }, 4000);
              }
            });
          });
        }
      });
    } catch (error) {
      console.log("Mqtt error", error);
    }
  }

  async getDeviceOwner() {
    const response = await DeviceServices.getDeviceByAccount();

    if (response.message == "SUCCESS") {
      this.setState({ list_devices: response.metadata });
      this.sortDeviceOwner(response.metadata);
    } else this.setState({ list_devices: [] });
  }

  sortDeviceOwner(array_device) {
    let data = {
      heart: 0,
      spo2: 0,
      temperature: 0,
      pm: 0,
    };

    let temp_array = [];
    array_device.forEach((e) => {
      let data_device = {
        detail: e,
        data: data,
      };

      temp_array.push(data_device);
    });

    this.setState({ list_devices_show: temp_array });
    this.configMqtt();
  }

  async handleDeviceMqtt(payload) {
    let temp_array = this.state.list_devices_show;

    let index_device = temp_array.findIndex(
      (x) => x.detail._id == payload.device_id
    );

    if (index_device != -1) {
      let value = payload.value;

      temp_array[index_device].data.temperature = value.acr_temperature_human;
      temp_array[index_device].data.spo2 = value.acr_spo2;
      temp_array[index_device].data.heart = value.acr_heart;
      temp_array[index_device].data.pm = value.acr_air;

      this.setState({ list_devices_show: temp_array });
    }
  }

  sortDataPm(pm) {
    if (pm < 1) return "Tốt";
    else if (pm >= 1 && pm < 3) return "Trung bình";
    else return "Không tốt";
  }

  sortColorText(index) {
    let data_predict = "";
    console.log(this.state.data_predict_health);

    if (index == 0) {
      // data_predict = this.state.data_predict_health.value.prediction_spo2;
      // console.log(data_predict);
    }
  }

  async sortDataShowWarning(index) {
    let data_predict = null;

    if (index == 1) {
      data_predict = this.state.data_predict_health.value.prediction_spo2;
      let data = SupportServices.sortDataEvaluationSpo2(data_predict);

      await this.setState({ data_show_evaluation: data });
    }

    if (index == 3) {
      data_predict = this.state.data_predict_health.value.predict_heart_rate;
      let data = SupportServices.sortDataEvaluationHeart(data_predict);

      await this.setState({ data_show_evaluation: data });
    }

    if (index == 4) {
      data_predict = this.state.data_predict_health.value.predictions_temp[0];
      let data =
        SupportServices.sortDataEvaluationHumanTemperature(data_predict);

      await this.setState({ data_show_evaluation: data });
    }

    if (index == 5) {
      data_predict = this.state.data_predict_health.value.predictions_temp[1];
      let data =
        SupportServices.sortDataEvaluationEnvironmentTemperature(data_predict);

      await this.setState({ data_show_evaluation: data });
    }

    setTimeout(() => {
      if (index != 0 && index != 2) {
        console.log(this.state.data_show_evaluation);
        this.setState({ modal_risk: true });
      }
    }, 500);
  }

  render() {
    const LIST_WARNING = this.state.data_predict.map((item, index) => (
      <View key={item.title} style={[ScreenStyles.warning_item]}>
        <Text style={ScreenStyles.text_warning}>{item.title} </Text>
        <TouchableOpacity onPress={() => this.sortDataShowWarning(index)}>
          <Text style={ScreenStyles.text_warning}>{item.value}</Text>
        </TouchableOpacity>
      </View>
    ));
    const LIST_DEVICE = this.state.list_devices_show.map((item) => (
      <View key={item.detail._id} style={[ScreenStyles.container_box_data]}>
        <Text style={[ContainerStyles.text_app, ScreenStyles.text_name_device]}>
          Tên thiết bị: {item.detail.dv_name}
        </Text>

        <View style={[ScreenStyles.content_data_box]}>
          <View style={[ScreenStyles.cover_box_data]}>
            <View style={[ScreenStyles.box_data]}>
              <View style={[ScreenStyles.box_data_logo]}>
                <View
                  style={[
                    ScreenStyles.data_logo,
                    ContainerStyles.c_c,
                    {
                      backgroundColor:
                        VariableConfigs.COLORS.danger_second_color,
                    },
                  ]}
                >
                  <Image
                    style={ScreenStyles.logo}
                    source={require("./../../assets/pictures/heart.png")}
                  />
                </View>
              </View>
              <View style={[ScreenStyles.box_data_information]}>
                <Text
                  style={[
                    ContainerStyles.text_app,
                    ScreenStyles.text_title_data,
                  ]}
                >
                  Nhịp tim
                </Text>
                <Text
                  style={[
                    ContainerStyles.text_app,
                    ScreenStyles.text_value_data,
                  ]}
                >
                  {item.data.heart} bpm
                </Text>
              </View>
            </View>
          </View>

          <View style={[ScreenStyles.cover_box_data]}>
            <View style={[ScreenStyles.box_data]}>
              <View style={[ScreenStyles.box_data_logo]}>
                <View
                  style={[
                    ScreenStyles.data_logo,
                    ContainerStyles.c_c,
                    {
                      backgroundColor:
                        VariableConfigs.COLORS.warning_second_color,
                    },
                  ]}
                >
                  <Image
                    style={ScreenStyles.logo}
                    source={require("./../../assets/pictures/spo2.png")}
                  />
                </View>
              </View>
              <View style={[ScreenStyles.box_data_information]}>
                <Text
                  style={[
                    ContainerStyles.text_app,
                    ScreenStyles.text_title_data,
                  ]}
                >
                  Oxy trong máu
                </Text>
                <Text
                  style={[
                    ContainerStyles.text_app,
                    ScreenStyles.text_value_data,
                  ]}
                >
                  {item.data.spo2}%
                </Text>
              </View>
            </View>
          </View>

          <View style={[ScreenStyles.cover_box_data]}>
            <View style={[ScreenStyles.box_data]}>
              <View style={[ScreenStyles.box_data_logo]}>
                <View
                  style={[
                    ScreenStyles.data_logo,
                    ContainerStyles.c_c,
                    {
                      backgroundColor:
                        VariableConfigs.COLORS.success_second_color,
                    },
                  ]}
                >
                  <Image
                    style={ScreenStyles.logo}
                    source={require("./../../assets/pictures/temp.png")}
                  />
                </View>
              </View>
              <View style={[ScreenStyles.box_data_information]}>
                <Text
                  style={[
                    ContainerStyles.text_app,
                    ScreenStyles.text_title_data,
                  ]}
                >
                  Nhiệt độ cơ thể
                </Text>
                <Text
                  style={[
                    ContainerStyles.text_app,
                    ScreenStyles.text_value_data,
                  ]}
                >
                  {item.data.temperature}°C
                </Text>
              </View>
            </View>
          </View>

          <View style={[ScreenStyles.cover_box_data]}>
            <View style={[ScreenStyles.box_data]}>
              <View style={[ScreenStyles.box_data_logo]}>
                <View
                  style={[
                    ScreenStyles.data_logo,
                    ContainerStyles.c_c,
                    {
                      backgroundColor: VariableConfigs.COLORS.info_third_color,
                    },
                  ]}
                >
                  <Image
                    style={ScreenStyles.logo}
                    source={require("./../../assets/pictures/pm.png")}
                  />
                </View>
              </View>
              <View style={[ScreenStyles.box_data_information]}>
                <Text
                  style={[
                    ContainerStyles.text_app,
                    ScreenStyles.text_title_data,
                  ]}
                >
                  Chất lượng không khí
                </Text>
                <Text
                  numberOfLines={1}
                  style={[
                    ContainerStyles.text_app,
                    ScreenStyles.text_value_data,
                  ]}
                >
                  {this.sortDataPm(item.data.pm)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    ));

    return (
      <View style={[ContainerStyles.container_app]}>
        <View style={[ContainerStyles.container_header_screen]}>
          <View style={[ContainerStyles.safe_header_screen]}>
            <View style={[ScreenStyles.header_dashboard]}>
              <View style={[ContainerStyles.c_r_l]}>
                <MaterialIcons
                  name="local-fire-department"
                  size={20}
                  color={VariableConfigs.COLORS.danger_color}
                />
                <Text
                  style={[
                    ContainerStyles.text_app,
                    ScreenStyles.title_dashboard,
                  ]}
                >
                  Chào mừng trở lại
                </Text>
              </View>

              <View
                style={[
                  ScreenStyles.content_dashboard_avatar,
                  ContainerStyles.c_c,
                ]}
              >
                <Image
                  style={ScreenStyles.avatar}
                  source={require("./../../assets/pictures/man.png")}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={[ContainerStyles.container_body_screen]}>
          <View style={[ScreenStyles.container_dashboard_calendar]}>
            <Text
              style={[ContainerStyles.text_app, ScreenStyles.text_title_body]}
            >
              Thông số cảnh báo
            </Text>

            <View style={[ScreenStyles.container_warning]}>{LIST_WARNING}</View>
          </View>

          <ScrollView style={[ScreenStyles.container_main_body]}>
            <Text
              style={[ContainerStyles.text_app, ScreenStyles.text_title_body]}
            >
              Dữ liệu cá nhân
            </Text>

            {LIST_DEVICE}
          </ScrollView>
        </View>

        {/* MODAL SET AP */}
        <Modal
          transparent={true}
          animationType={"fade"}
          visible={this.state.modal_risk}
        >
          <View style={[ContainerStyles.container_modal, ContainerStyles.c_c]}>
            <View style={[ContainerStyles.modal_center_views]}>
              <View style={[ContainerStyles.header_modal_center]}>
                <Text style={[ContainerStyles.text_header_modal]}>
                  Thông số sức khỏe
                </Text>
              </View>
              {!!this.state.data_show_evaluation && (
                <View style={[ContainerStyles.body_modal_center]}>
                  <Text
                    style={[ScreenStyles.text_value_data, { marginBottom: 10 }]}
                  >
                    Trạng thái:{" "}
                    <Text
                      style={{
                        color: this.state.data_show_evaluation.class_txt,
                      }}
                    >
                      {this.state.data_show_evaluation.title}
                    </Text>{" "}
                  </Text>

                  <Text
                    style={[ScreenStyles.text_value_data, { marginBottom: 10 }]}
                  >
                    Nguy cơ
                  </Text>
                  {this.state.data_show_evaluation.risk.map((item) => (
                    <Text
                      style={[
                        ScreenStyles.text_name_device,
                        { marginBottom: 5 },
                      ]}
                    >
                      - {item}
                    </Text>
                  ))}

                  <Text
                    style={[ScreenStyles.text_value_data, { marginBottom: 10 }]}
                  >
                    Biện pháp
                  </Text>

                  {this.state.data_show_evaluation.suggestions.map((item) => (
                    <Text
                      style={[
                        ScreenStyles.text_name_device,
                        { marginBottom: 5 },
                      ]}
                    >
                      - {item}
                    </Text>
                  ))}
                </View>
              )}

              <View style={[ContainerStyles.footer_modal_center]}>
                <TouchableOpacity
                  onPress={() => this.setState({ modal_risk: false })}
                  style={[ContainerStyles.outline_button_modal]}
                >
                  <Text style={[ContainerStyles.text_outline_button]}>
                    Đóng
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default DashboardMainScreen;
