import React from "react";
import { Image, Text, View, Animated, Easing } from "react-native";
import { ContainerStyles } from "../../styles/container_styles";
import VariableConfigs from "../../configs/variable_configs";
import { SupportServices } from "../../services/support_services";
import { AccountServices } from "../../services/account_servies";

class SplashScreen extends React.Component {
  navigation = this.props.navigation;

  state = {};

  componentDidMount() {
    setTimeout(() => {
      this.checkDataAccount();
    }, 500);
  }

  async checkDataAccount() {
    const token = await SupportServices.getLocalStorage("tokenHealth");

    if (!token) return this.navigation.navigate("LoginScreen");
    else {
      const response = await AccountServices.getAccountByToken();

      if (response.message == "SUCCESS")
        return this.navigation.navigate("MainNavigation");
      else return this.navigation.navigate("LoginScreen");
    }
  }

  render() {
    return (
      <View
        style={[
          ContainerStyles.container_app,
          ContainerStyles.c_c,
          { backgroundColor: VariableConfigs.COLORS.primary_color },
        ]}
      >
        <Image
          style={ContainerStyles.logo_splash_app}
          source={require("./../../assets/pictures/logo.png")}
        />
      </View>
    );
  }
}

export default SplashScreen;
