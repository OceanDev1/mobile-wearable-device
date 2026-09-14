import { Alert, ToastAndroid, Platform } from "react-native";
import Toast from "react-native-toast-message";

export default class ToastServices {
  static showToastSuccess(message) {
    this.showToast("success", "Thành công", message);
    // if (Platform.OS === "ios") return Alert.alert("Thành công", message);
    // if (Platform.OS === "android")
    //   return ToastAndroid.showWithGravityAndOffset(
    //     message,
    //     3000,
    //     ToastAndroid.TOP,
    //     25,
    //     30
    //   );
  }

  static showToastMessage(message) {
    console.log(`showToastMessage`, message);
    let msg = "";
    switch (message) {
      case "ACCOUNT_NOT_FOUND":
        msg = "Tài khoản không tồn tại!";
        break;

      case "WRONG_PASSWORD":
        msg = "Sai mật khẩu!";
        break;

      case "ACCOUNT_NOT_PATIENT":
        msg = "Không phải tài khoản bệnh nhân";
        break;

      default:
        msg = "Vui lòng thử lại sau!";
        break;
    }

    this.showToast("error", "Thất bại", msg);
    // if (Platform.OS === "ios") return Alert.alert("Thất bại", msg);
    // if (Platform.OS === "android")
    //   return ToastAndroid.showWithGravityAndOffset(
    //     msg,
    //     3000,
    //     ToastAndroid.TOP,
    //     25,
    //     30
    //   );
  }

  static showToast(type, title, msg) {
    Toast.show({
      type: type,
      text1: title,
      text2: msg,
      visibilityTime: 2000,
      autoHide: true,
    });
  }
}
