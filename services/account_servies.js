import { ApiConfigs } from "../configs/api_configs";
import { SupportServices } from "./support_services";

export class AccountServices {
  static async loginAccount(form_data) {
    const api = ApiConfigs.AUTHENTICATION.LOGIN;
    let response = await fetch(api, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form_data),
    });

    return response.json();
  }

  static async checkToken() {
    const api = ApiConfigs.AUTHENTICATION.GET_BY_TOKEN;

    let response = await fetch(api, {
      method: "GET",
      headers: this.setHeaderForApi(),
    });

    return response.json();
  }

  static async getAllDoctors() {
    const api = ApiConfigs.PATIENT.GET_ALL_DOCTOR;
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

  static async getAccountByToken() {
    const api = ApiConfigs.AUTHENTICATION.GET_BY_TOKEN;
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

  static async getDetailAccount() {
    const api = ApiConfigs.PATIENT.DETAIL;
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
