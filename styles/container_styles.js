import { Dimensions, StyleSheet } from "react-native";
import VariableConfigs from "../configs/variable_configs";

const window_height = Dimensions.get("window").height;
const window_width = Dimensions.get("window").width;

export const ContainerStyles = StyleSheet.create({
  container_app: {
    height: "100%",
    width: "100%",
    backgroundColor: VariableConfigs.COLORS.light_color,
    flexDirection: "column",
    display: "flex",
  },

  container_screen: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    display: "flex",
    padding: 15,
  },

  container_header_screen: {
    height: 125,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: VariableConfigs.COLORS.border_color,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },

  safe_header_screen: {
    height: 60,
    width: "100%",
    paddingHorizontal: 8,
  },

  container_body_screen: {
    flex: 1,
    backgroundColor: VariableConfigs.COLORS.secondary_color,
  },

  logo_splash_app: {
    height: 300,
    width: 300,
  },

  text_app: {
    fontSize: 11,
    color: VariableConfigs.COLORS.primary_text_color,
    fontFamily: "regular",
  },

  text_title: {
    fontSize: 16,
    color: VariableConfigs.COLORS.primary_text_color,
    fontFamily: "bold",
  },

  // !CENTER
  c_c: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  r_c: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  c_c_l: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  c_r_l: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  s_b: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // !CENTER

  // !BUTTON
  primary_button: {
    height: "100%",
    width: "100%",
    backgroundColor: VariableConfigs.COLORS.primary_color,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  text_primary_button: {
    fontSize: 14,
    color: VariableConfigs.COLORS.light_color,
    fontFamily: "medium",
  },

  text_outline_button: {
    fontSize: 14,
    color: VariableConfigs.COLORS.primary_color,
    fontFamily: "medium",
  },
  // !BUTTON

  // !MODAL
  container_modal: {
    height: "100%",
    width: "100%",
    position: "relative",
    backgroundColor: VariableConfigs.COLORS.opacity_color,
    paddingHorizontal: 20,
  },

  modal_center_views: {
    height: "auto",
    width: "100%",
    backgroundColor: VariableConfigs.COLORS.light_color,
    borderRadius: 3,
  },

  header_modal_center: {
    height: 45,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: VariableConfigs.COLORS.border_color,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  body_modal_center: {
    height: "auto",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  footer_modal_center: {
    height: 55,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: VariableConfigs.COLORS.border_color,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },

  text_header_modal: {
    fontSize: 14,
    fontFamily: "bold",
    color: VariableConfigs.COLORS.primary_text_color,
  },

  primary_button_modal: {
    height: 38,
    width: "auto",
    paddingHorizontal: 20,
    backgroundColor: VariableConfigs.COLORS.primary_color,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },

  outline_button_modal: {
    height: 38,
    width: "auto",
    paddingHorizontal: 20,
    borderColor: VariableConfigs.COLORS.primary_color,
    borderWidth: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  // !MODAL
});
