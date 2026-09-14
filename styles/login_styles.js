import { Dimensions, StyleSheet } from "react-native";
import VariableConfigs from "../configs/variable_configs";

const window_height = Dimensions.get("window").height;
const window_width = Dimensions.get("window").width;

export const LoginStyles = StyleSheet.create({
  logo_screen: {
    height: 150,
    width: 150,
  },

  text_title: {
    fontSize: 25,
    fontFamily: "bold",
    marginBottom: 50,
  },

  container_form: {
    height: "auto",
    width: "100%",
  },

  container_input_form: {
    height: "auto",
    width: "100%",
    marginVertical: 12,
  },

  text_title_input: {
    color: VariableConfigs.COLORS.placeholder_text_color,
  },

  cover_custom_input: {
    height: 46,
    width: "100%",
    borderWidth: 1,
    marginTop: 8,
    borderColor: VariableConfigs.COLORS.border_color,
    borderRadius: 3,
  },

  custom_input: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 15,
    fontSize: 14,
  },

  container_button_form: {
    height: 45,
    width: "100%",
    marginTop: 18,
  },
});
