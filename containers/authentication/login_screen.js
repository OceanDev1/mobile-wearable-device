import React from "react";
import {
  Image,
  Text,
  View,
  Animated,
  Easing,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { ContainerStyles } from "../../styles/container_styles";
import VariableConfigs from "../../configs/variable_configs";
import { LoginStyles } from "../../styles/login_styles";
import { AccountServices } from "../../services/account_servies";
import ToastServices from "../../services/toast_services";
import Toast from "react-native-toast-message";
import { SupportServices } from "../../services/support_services";

class LoginScreen extends React.Component {
  navigation = this.props.navigation;

  state = {
    phone_account: "0901389720",
    password_account: "123456",
  };

  componentDidMount() {}

  async loginAccount() {
    const form_data = {
      phone_number: this.state.phone_account,
      password: this.state.password_account,
    };

    const response = await AccountServices.loginAccount(form_data);
  
    if (response.message == 'SUCCESS') {
      let token = response.metadata;
      await SupportServices.setLocalStorage('tokenHealth' , token);
      this.setState({phone_account : ""});
      this.setState({password_account : ""});
      this.navigation.navigate('MainNavigation');
    } else return ToastServices.showToastMessage(response.message);
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={[ContainerStyles.container_screen, ContainerStyles.c_c]}>
            <Image
              style={[LoginStyles.logo_screen]}
              source={require("./../../assets/pictures/logo.png")}
            />

            <Text style={[ContainerStyles.text_app, LoginStyles.text_title]}>
              Chào mừng trở lại
            </Text>

            <View style={[LoginStyles.container_form]}>
              <View style={LoginStyles.container_input_form}>
                <Text
                  style={[
                    ContainerStyles.text_app,
                    LoginStyles.text_title_input,
                  ]}
                >
                  Số điện thoại
                </Text>

                <View style={LoginStyles.cover_custom_input}>
                  <TextInput
                    style={LoginStyles.custom_input}
                    placeholder="Nhập số điện thoại"
                    onChangeText={(text) => {
                      this.setState({ phone_account: text });
                    }}
                    keyboardType="number-pad"
                    value={this.state.phone_account}
                    placeholderTextColor={
                      VariableConfigs.COLORS.placeholder_text_color
                    }
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
                  Mật khẩu
                </Text>

                <View style={LoginStyles.cover_custom_input}>
                  <TextInput
                    style={LoginStyles.custom_input}
                    placeholder="Nhập mật khẩu"
                    secureTextEntry={true}
                    onChangeText={(text) => {
                      this.setState({ password_account: text });
                    }}
                    value={this.state.password_account}
                    placeholderTextColor={
                      VariableConfigs.COLORS.placeholder_text_color
                    }
                  />
                </View>
              </View>
            </View>

            <View style={[LoginStyles.container_button_form]}>
              <TouchableOpacity
                onPress={() => this.loginAccount()}
                style={[ContainerStyles.primary_button]}
              >
                <Text style={ContainerStyles.text_primary_button}>
                  Đăng nhập
                </Text>
              </TouchableOpacity>
            </View>

            <Toast position="top" topOffset={70} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

export default LoginScreen;
