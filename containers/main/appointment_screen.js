import React from "react";
import {
  Image,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { ContainerStyles } from "../../styles/container_styles";
import VariableConfigs from "../../configs/variable_configs";
import { ScreenStyles } from "../../styles/screen_styles";
import { MaterialIcons } from "@expo/vector-icons";
import { LoginStyles } from "../../styles/login_styles";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SupportServices } from "../../services/support_services";
import { AccountServices } from "../../services/account_servies";
import { AppointmentServices } from "../../services/appointment_services";
import ToastServices from "../../services/toast_services";
import Toast from "react-native-toast-message";

class AppointmentMainScreen extends React.Component {
  navigation = this.props.navigation;

  state = {
    is_modal_set_ap: false,
    list_doctors: [],

    list_appointments: [],
    list_exist_slots: [],
    list_available_slots: [],

    doctor_appointment: "",
    date_appointment: SupportServices.convertDateToDate(new Date()),
    date_appointment_show: new Date(),
    time_appointment: "",

    show_picker_date: false,
  };

  componentDidMount() {
    this.getAllDoctors();
  }

  async getAllAppointment() {
    const response = await AppointmentServices.getAllAppointmentByPatient();

    if (response.message == "SUCCESS") {
      this.setState({ list_appointments: response.metadata });
    } else this.setState({ list_appointments: [] });
  }

  async checkSlotAppointment() {
    let date = "";
    if (this.state.date_appointment == "")
      date = SupportServices.convertDateToDate(new Date());
    else date = this.state.date_appointment;

    const form_data = {
      date_ap: date,
      doctorId: this.state.doctor_appointment,
    };

    const response = await AppointmentServices.checkSlotAp(form_data);

    if (response.message == "SUCCESS") {
      await this.setState({ list_exist_slots: response.metadata });
      this.sortAvailableSlotAp();
    } else this.setState({ list_exist_slots: [] });
  }

  async setAppointment() {
    const form_data = {
      doctor: this.state.doctor_appointment,
      time: this.state.time_appointment,
      date: this.state.date_appointment,
    };

    const response = await AppointmentServices.setAppointment(form_data);

    if (response.message == "SUCCESS") {
      ToastServices.showToastSuccess("Thêm lịch hẹn thành công");
      this.setState({ doctor_appointment: "" });
      this.setState({ time_appointment: "" });
      this.setState({
        date_appointment: SupportServices.convertDateToDate(new Date()),
      });
      this.setState({ date_appointment_show: new Date() });
      this.setState({ is_modal_set_ap: false });
      this.getAllAppointment();
    } else return ToastServices.showToastMessage(response.message);
  }

  async getAllDoctors() {
    const response = await AccountServices.getAllDoctors();

    if (response.message == "SUCCESS") {
      let list = response.metadata;
      let temp_array = [];

      for (let i = 0; i < list.length; i++) {
        let obj = {
          id: list[i]._id,
          label: list[i].pt_number + " - " + list[i].pt_name,
          value: list[i]._id,
        };

        temp_array.push(obj);
      }

      this.setState({ list_doctors: temp_array });
      this.getAllAppointment();
    }
  }

  openModalSetAp() {
    this.setState({ is_modal_set_ap: true });
  }

  async sortAvailableSlotAp() {
    let array_time = [];
    let hourNow = new Date().getHours();
    let dateNow = new Date().getDate();
    let date_choose = Number.parseInt(
      this.state.date_appointment.split("-")[0]
    );

    let time_ap = [
      { label: "07:00", value: "7" },
      { label: "08:00", value: "8" },
      { label: "09:00", value: "9" },
      { label: "10:00", value: "10" },
      { label: "13:00", value: "13" },
      { label: "14:00", value: "14" },
      { label: "15:00", value: "15" },
      { label: "16:00", value: "16" },
    ];

    for (let i = 0; i < time_ap.length; i++) {
      const count = this.state.list_exist_slots.filter(
        (x) => x == Number.parseInt(time_ap[i].value)
      ).length;

      if (count < 2) {
        if (
          dateNow == date_choose &&
          Number.parseInt(time_ap[i].value) > hourNow
        ) {
          array_time.push(time_ap[i]);
        } else if (dateNow != date_choose) {
          array_time.push(time_ap[i]);
        }
      }
    }

    await this.setState({ list_available_slots: array_time });
  }

  closeModalSetAp() {
    this.setState({ is_modal_set_ap: false });
  }

  sortDataDoctor(doctorId) {
    const data = this.state.list_doctors.find((x) => x.id == doctorId);

    if (!!data) return data.label;
  }

  async cancelAppointment(ap) {
    const response = await AppointmentServices.cancelAppointment(ap._id);

    if (response.message == "SUCCESS") {
      ToastServices.showToastSuccess("Hủy lịch hẹn thành công");
      this.getAllAppointment();
    } else return ToastServices.showToastMessage(response.message);
  }

  sortDataDateAp(ms) {
    return SupportServices.formatDateToDayAndDate(ms);
  }

  async formatDateSetAp(date) {
    const date_convert = SupportServices.convertDateToDate(date);
    const date_convert_reverse = SupportServices.convertDateToDateReverse(date);

    await this.setState({ date_appointment: date_convert });
    await this.setState({
      date_appointment_show: new Date(date_convert_reverse),
    });
    await this.setState({ time_appointment: "" });
    this.checkSlotAppointment();
  }

  render() {
    const LIST_AP = this.state.list_appointments.map((item) => (
      <View
        key={item._id}
        style={[
          ScreenStyles.ap_item,
          {
            backgroundColor:
              item.ap_status == 0
                ? VariableConfigs.COLORS.primary_second_color
                : VariableConfigs.COLORS.success_second_color,
          },
        ]}
      >
        <View style={[ScreenStyles.cover_date_ap, ContainerStyles.c_c]}>
          <Text style={[ContainerStyles.text_title, { marginBottom: 5 }]}>
            {this.sortDataDateAp(item.ap_date).weekday}
          </Text>
          <Text style={[ContainerStyles.text_app]}>
            {" "}
            {this.sortDataDateAp(item.ap_date).date}
          </Text>
        </View>

        <View style={[ScreenStyles.cover_information_ap]}>
          <View style={[ScreenStyles.information_ap]}>
            <MaterialIcons
              name="access-time"
              size={16}
              color={VariableConfigs.COLORS.primary_text_color}
            />

            <Text style={[ContainerStyles.text_app, { marginLeft: 10 }]}>
              {item.ap_time}:00
            </Text>
          </View>

          <View style={[ScreenStyles.information_ap]}>
            <MaterialIcons
              name="person"
              size={16}
              color={VariableConfigs.COLORS.primary_text_color}
            />

            <Text style={[ContainerStyles.text_app, { marginLeft: 10 }]}>
              Bác sĩ: {this.sortDataDoctor(item.ap_doctor)}
            </Text>
          </View>

          <View style={[ScreenStyles.information_ap]}>
            <MaterialIcons
              name="attach-file"
              size={16}
              color={VariableConfigs.COLORS.primary_text_color}
            />

            <Text style={[ContainerStyles.text_app, { marginLeft: 10 }]}>
              Lý do: Tái khám
            </Text>
          </View>

          <View style={[ScreenStyles.information_ap]}>
            <MaterialIcons
              name="keyboard-double-arrow-right"
              size={16}
              color={VariableConfigs.COLORS.primary_text_color}
            />

            <Text style={[ContainerStyles.text_app, { marginLeft: 10 }]}>
              Trạng thái: {item.ap_status == 0 ? "Chưa khám" : "Đã khám"}
            </Text>
          </View>

          {item.ap_status == 0 && (
            <View style={[ScreenStyles.information_ap]}>
              <TouchableOpacity
                onPress={() => this.cancelAppointment(item)}
                style={[ScreenStyles.btn_ap]}
              >
                <Text style={[ScreenStyles.text_btn_ap]}>Hủy lịch hẹn</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    ));

    return (
      <View style={[ContainerStyles.container_app]}>
        <View style={[ContainerStyles.container_header_screen]}>
          <View style={[ContainerStyles.safe_header_screen]}>
            <View style={[ScreenStyles.header_dashboard]}>
              <View style={[ContainerStyles.c_r_l]}>
                <Text
                  style={[
                    ContainerStyles.text_app,
                    ScreenStyles.title_dashboard,
                  ]}
                >
                  Lịch hẹn
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => this.openModalSetAp()}
                style={[
                  ScreenStyles.content_button_header,
                  ContainerStyles.c_c,
                ]}
              >
                <MaterialIcons
                  name="add"
                  size={18}
                  color={VariableConfigs.COLORS.primary_text_color}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView
          style={[
            ContainerStyles.container_body_screen,
            ScreenStyles.cover_list_ap,
          ]}
        >
          {this.state.list_appointments.length == 0 && (
            <Text
              style={[
                ScreenStyles.text_name_device,
                { color: VariableConfigs.COLORS.danger_color },
              ]}
            >
              Chưa có lịch hẹn
            </Text>
          )}
          {LIST_AP}
        </ScrollView>

        {/* MODAL SET AP */}
        <Modal
          transparent={true}
          animationType={"fade"}
          visible={this.state.is_modal_set_ap}
        >
          <View style={[ContainerStyles.container_modal, ContainerStyles.c_c]}>
            <View style={[ContainerStyles.modal_center_views]}>
              <View style={[ContainerStyles.header_modal_center]}>
                <Text style={[ContainerStyles.text_header_modal]}>
                  Đặt lịch hẹn
                </Text>
              </View>
              <View style={[ContainerStyles.body_modal_center]}>
                <View style={LoginStyles.container_input_form}>
                  <Text
                    style={[
                      ContainerStyles.text_app,
                      LoginStyles.text_title_input,
                    ]}
                  >
                    Chọn bác sĩ
                  </Text>

                  <View
                    style={[
                      LoginStyles.cover_custom_input,
                      ContainerStyles.c_c,
                      { paddingHorizontal: 10 },
                    ]}
                  >
                    <RNPickerSelect
                      onValueChange={async (value) => {
                        await this.setState({ doctor_appointment: value });
                        this.checkSlotAppointment();
                      }}
                      items={this.state.list_doctors}
                    />
                  </View>
                </View>

                <View style={LoginStyles.container_input_form}>
                  <Text
                    style={[
                      ContainerStyles.text_app,
                      LoginStyles.text_title_input,
                    ]}
                  >
                    Chọn ngày khám
                  </Text>

                  <View
                    style={[
                      LoginStyles.cover_custom_input,
                      {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                      },
                    ]}
                  >
                    <DateTimePicker
                      mode="date"
                      value={this.state.date_appointment_show}
                      format="DD - MM - YYYY"
                      display="default"
                      onChange={(evt, date) => {
                        this.formatDateSetAp(date);
                      }}
                    />
                  </View>
                </View>

                <View style={LoginStyles.container_input_form}>
                  <Text
                    style={[
                      ContainerStyles.text_app,
                      LoginStyles.text_title_input,
                    ]}
                  >
                    Chọn thời gian
                  </Text>

                  <View
                    style={[
                      LoginStyles.cover_custom_input,
                      ContainerStyles.c_c,
                      { paddingHorizontal: 10 },
                    ]}
                  >
                    <RNPickerSelect
                      onValueChange={(value) =>
                        this.setState({ time_appointment: value })
                      }
                      items={this.state.list_available_slots}
                    />
                  </View>
                </View>
              </View>

              <View style={[ContainerStyles.footer_modal_center]}>
                <TouchableOpacity
                  onPress={() => this.closeModalSetAp()}
                  style={[ContainerStyles.outline_button_modal]}
                >
                  <Text style={[ContainerStyles.text_outline_button]}>
                    Đóng
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.setAppointment()}
                  style={[ContainerStyles.primary_button_modal]}
                >
                  <Text style={[ContainerStyles.text_primary_button]}>
                    Xác nhận
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Toast position="top" topOffset={70} />
      </View>
    );
  }
}

export default AppointmentMainScreen;
