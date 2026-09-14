import React from "react";
import { Image, Text, View, Modal, TouchableOpacity } from "react-native";
import { ContainerStyles } from "../../styles/container_styles";
import VariableConfigs from "../../configs/variable_configs";
import { ScreenStyles } from "../../styles/screen_styles";
import { MaterialIcons } from "@expo/vector-icons";
import { AccountServices } from "../../services/account_servies";
import { SupportServices } from "../../services/support_services";

class AccountMainScreen extends React.Component {
  navigation = this.props.navigation;

  state = {
    account_detail: null,
    account_records: [],

    modal_data_patient: false,
  };

  componentDidMount() {
    this.getDataAccount();
  }

  async getDataAccount() {
    const response = await AccountServices.getAccountByToken();

    if (response.message == "SUCCESS") {
      await this.setState({ account_detail: response.metadata });
      let records =
        response.metadata.pt_examinations[
          response.metadata.pt_examinations.length - 1
        ];

      let data = [
        {
          title: "Chiều cao",
          value: records.act_tall + "cm",
        },
        {
          title: "Cân nặng",
          value: records.act_height + "kg",
        },
        {
          title: "Cholesterol máu",
          value: records.act_cholesterol + " mm/dl",
        },
        {
          title: "Đường huyết lúc đói",
          value:
            records.act_fastingBS == 1 ? "Trên 120 mg/dl" : "Dưới 120 mg/dl",
        },
        {
          title: "Điện tâm đồ",
          value:
            records.act_ekg == "0"
              ? "Bình thường"
              : records.act_ekg == "1"
              ? "Có bất thường sóng ST-T"
              : "LVH",
        },
        {
          title: "Đău thắt ngực",
          value: records.act_angina == "N" ? "Không" : "Có",
        },
        {
          title: "Ngày cập nhật",
          value: SupportServices.convertDateToDate(records.timestamps),
        },
      ];

      this.setState({ account_records: data });
    } else return this.navigation.navigate("LoginScreen");
  }

  logOut() {
    SupportServices.clearStorageLogOut();
    this.navigation.navigate("LoginScreen");
  }

  openModal(modal) {
    if (modal == "data_patient") this.setState({ modal_data_patient: true });
  }

  closeModal(modal) {
    if (modal == "data_patient") this.setState({ modal_data_patient: false });
  }

  render() {
    const DATA_PATIENT = this.state.account_records.map((item, index) => (
      <Text
        key={index.toString()}
        style={[ContainerStyles.text_app, ScreenStyles.text_data_patient]}
      >
        {item.title}: {item.value}
      </Text>
    ));

    return (
      <View style={[ContainerStyles.container_app]}>
        <View style={[ContainerStyles.container_body_screen]}>
          <View
            style={[ScreenStyles.container_account_header, ContainerStyles.c_c]}
          >
            <View style={[ScreenStyles.cover_avatar]}>
              <Image
                source={require("./../../assets/pictures/man.png")}
                style={ScreenStyles.avatar}
              />
            </View>
            <Text style={[ContainerStyles.text_app, ScreenStyles.text_name]}>
              {!!this.state.account_detail
                ? this.state.account_detail["pt_name"]
                : ""}
            </Text>
            <Text
              style={[ContainerStyles.text_app, ScreenStyles.text_function]}
            >
              Người dùng
            </Text>
          </View>

          <View style={ScreenStyles.container_menu_account}>
            <Text
              style={[ContainerStyles.text_app, ScreenStyles.text_title_menu]}
            >
              Chức năng
            </Text>

            <TouchableOpacity
              onPress={() => this.openModal("data_patient")}
              style={ScreenStyles.container_menu_item}
            >
              <View
                style={[ScreenStyles.container_menu_logo, ContainerStyles.c_c]}
              >
                <MaterialIcons
                  name="file-present"
                  size={22}
                  color={VariableConfigs.COLORS.primary_text_color}
                />
              </View>
              <View
                style={[
                  ScreenStyles.container_menu_title,
                  ContainerStyles.c_c_l,
                ]}
              >
                <Text
                  style={[ContainerStyles.text_app, ScreenStyles.text_menu]}
                >
                  Thông tin sức khỏe
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.logOut()}
              style={ScreenStyles.container_menu_item}
            >
              <View
                style={[ScreenStyles.container_menu_logo, ContainerStyles.c_c]}
              >
                <MaterialIcons
                  name="logout"
                  size={22}
                  color={VariableConfigs.COLORS.primary_text_color}
                />
              </View>
              <View
                style={[
                  ScreenStyles.container_menu_title,
                  ContainerStyles.c_c_l,
                ]}
              >
                <Text
                  style={[ContainerStyles.text_app, ScreenStyles.text_menu]}
                >
                  Đăng xuất
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          transparent={true}
          animationType={"fade"}
          visible={this.state.modal_data_patient}
        >
          <View style={[ContainerStyles.container_modal, ContainerStyles.c_c]}>
            <View style={[ContainerStyles.modal_center_views]}>
              <View style={[ContainerStyles.header_modal_center]}>
                <Text style={[ContainerStyles.text_header_modal]}>
                  Thông tin sức khỏe
                </Text>
              </View>
              <View style={[ContainerStyles.body_modal_center]}>
                {DATA_PATIENT}
              </View>

              <View style={[ContainerStyles.footer_modal_center]}>
                <TouchableOpacity
                  onPress={() => this.closeModal("data_patient")}
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

export default AccountMainScreen;
