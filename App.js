import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ContainerStyles } from "./styles/container_styles";
import React from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import ContainerAppNavigation from "./navigation/container_app_navigation";
import VariableConfigs from "./configs/variable_configs";
import 'react-native-gesture-handler';

export default class App extends React.Component {
  state = {
    is_load_fonts: false,
  };

  componentDidMount() {
    this.loadFontsApp();
  }

  async loadFontsApp() {
    await Font.loadAsync({
      bold: require("./assets/fonts/Montserrat-Bold.ttf"),
      regular: require("./assets/fonts/Montserrat-Regular.ttf"),
      light: require("./assets/fonts/Montserrat-Light.ttf"),
      medium: require("./assets/fonts/Montserrat-Medium.ttf"),
    });
    await this.setState({ is_load_fonts: true });
  }

  render() {
    return (
      <View style={[ContainerStyles.container_app, ,]}>
        <StatusBar style="dark" />

        <NavigationContainer>
          {this.state.is_load_fonts && <ContainerAppNavigation />}
        </NavigationContainer>
      </View>
    );
  }
}
