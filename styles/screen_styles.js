import { Dimensions, StyleSheet } from "react-native";
import VariableConfigs from "../configs/variable_configs";
import { ContainerStyles } from "./container_styles";

const window_height = Dimensions.get("window").height;
const window_width = Dimensions.get("window").width;

export const ScreenStyles = StyleSheet.create({
  text_warning: {
    fontSize: 14,
    fontWeight: "600",
    color: VariableConfigs.COLORS.primary_text_color,
  },

  warning_item: {
    paddingVertical: 5,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
  },

  container_warning: {
    height: "auto",
    width: "100%",
    marginTop: 5,
  },

  btn_ap: {
    height: 25,
    width: 100,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: VariableConfigs.COLORS.danger_color,
    marginTop: 8,
    ...ContainerStyles.c_c,
  },

  text_btn_ap: {
    fontSize: 11,
    color: VariableConfigs.COLORS.danger_color,
  },

  information_ap: {
    height: 20,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  cover_information_ap: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  cover_date_ap: {
    height: "100%",
    width: 100,
    borderRightWidth: 1,
    borderRightColor: VariableConfigs.COLORS.border_color,
  },

  ap_item: {
    height: 140,
    width: "100%",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
  },

  cover_list_ap: {
    height: "auto",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  header_dashboard: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title_dashboard: {
    fontSize: 18,
    fontFamily: "bold",
    marginLeft: 5,
  },

  content_dashboard_avatar: {
    height: 50,
    width: 50,
    padding: 2,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: VariableConfigs.COLORS.primary_color,
  },

  content_button_header: {
    height: 35,
    width: 35,
  },

  avatar: {
    height: "100%",
    width: "100%",
  },

  container_dashboard_calendar: {
    height: "auto",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: VariableConfigs.COLORS.border_color,
    padding: 8,
  },

  container_main_body: {
    padding: 8,
  },

  text_title_body: {
    fontSize: 20,
    fontFamily: "bold",
    marginTop: 15,
    color: VariableConfigs.COLORS.placeholder_text_color,
  },

  container_box_data: {
    height: "auto",
    width: "100%",
    marginTop: 20,
    backgroundColor: VariableConfigs.COLORS.light_color,
    borderWidth: 0.5,
    borderColor: VariableConfigs.COLORS.border_color,
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "column",
    display: "flex",
  },

  content_data_box: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  cover_box_data: {
    height: 100,
    width: "50%",
    marginVertical: 3,
    padding: 5,
  },

  box_data: {
    height: "100%",
    width: "100%",
    borderWidth: 1,
    borderColor: VariableConfigs.COLORS.primary_color,
    borderRadius: 4,
    display: "flex",
    flexDirection: "row",
  },

  box_data_logo: {
    height: "100%",
    width: 70,
    padding: 12,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  box_data_information: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 12,
  },

  data_logo: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },

  logo: {
    height: 30,
    width: 30,
  },

  text_title_data: {
    fontFamily: "bold",
    color: VariableConfigs.COLORS.placeholder_text_color,
  },

  text_value_data: {
    fontFamily: "bold",
    fontSize: 18,
    marginTop: 5,
  },

  text_name_device: {
    fontSize: 15,
    marginVertical: 5,
    color: VariableConfigs.COLORS.primary_color,
  },

  container_account_header: {
    height: 300,
    width: "100%",
    backgroundColor: VariableConfigs.COLORS.primary_second_color,
  },

  cover_avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 1,
    padding: 2,
    borderColor: VariableConfigs.COLORS.primary_color,
    marginBottom: 10,
    marginTop: 30,
  },

  avatar: {
    height: "100%",
    width: "100%",
    borderRadius: 65,
  },

  text_name: {
    fontSize: 20,
    fontFamily: "bold",
    marginBottom: 5,
  },

  text_function: {
    fontSize: 14,
    color: VariableConfigs.COLORS.placeholder_text_color,
  },

  container_menu_account: {
    flex: 1,
    padding: 10,
  },

  text_title_menu: {
    fontSize: 15,
    fontFamily: "bold",
    color: VariableConfigs.COLORS.placeholder_text_color,
    marginBottom: 20,
  },

  container_menu_item: {
    height: 55,
    width: "100%",
    backgroundColor: VariableConfigs.COLORS.light_color,
    borderWidth: 1,
    borderColor: VariableConfigs.COLORS.primary_color,
    borderRadius: 3,
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
  },

  container_menu_logo: {
    height: "100%",
    width: 55,
  },

  container_menu_title: {
    flex: 1,
  },

  text_menu: {
    fontSize: 14,
    fontFamily: "bold",
  },

  text_data_patient: {
    fontSize: 16,
    fontFamily: "bold",
    marginVertical: 8,
  },
});
