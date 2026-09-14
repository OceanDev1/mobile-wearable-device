import { ApiConfigs } from "../configs/api_configs";
import { SupportServices } from "./support_services";

export class DeviceServices {
  static async getDeviceByAccount() {
    const api = ApiConfigs.DEVICE.GET_BY_ACCOUNT;
    const token = await SupportServices.getLocalStorage("tokenHealth");
    
    let response = await fetch(api, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    return response.json();
  }
}
