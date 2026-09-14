import { Dimensions, StyleSheet } from "react-native";
import VariableConfigs from "../configs/variable_configs";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

export const TabStyles = StyleSheet.create({
  text_menu: {
    fontSize: windowHeight < 800 ? 10 : windowHeight < 1000 ? 12 : 16,
    // fontFamily: "regular",
    marginTop: 3,
  },

  main_menu: {
    width: windowHeight < 800 ? 44 : windowHeight < 1000 ? 54 : 66,
    height: windowHeight < 800 ? 44 : windowHeight < 1000 ? 54 : 66,
    borderRadius: windowHeight < 800 ? 22 : windowHeight < 1000 ? 27 : 33,
    backgroundColor: VariableConfigs.COLORS.white_color,
  },

  content_main_menu: {
    width: windowHeight < 800 ? 54 : windowHeight < 1000 ? 60 : 76,
    height: windowHeight < 800 ? 54 : windowHeight < 1000 ? 60 : 76,
    borderRadius: windowHeight < 800 ? 27 : windowHeight < 1000 ? 30 : 38,
  },

  view_item: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: windowHeight < 1000 ? "100%" : 400,
    top: windowHeight < 800 ? 4 : windowHeight < 1000 ? 10 : 8,
  },

  shadow: {
    shadowColor: VariableConfigs.COLORS.secondary_color,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },

  tab_bar: {
    height: windowHeight < 800 ? 65 : windowHeight < 1000 ? 75 : 90,
    elevation: 0,
    borderRadius: 5,
  },

  shadow_button_tab: {
    shadowColor: VariableConfigs.COLORS.secondary_color,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
});
