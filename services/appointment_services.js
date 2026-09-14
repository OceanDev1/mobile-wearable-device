import { ApiConfigs } from "../configs/api_configs";
import { SupportServices } from "./support_services";

export class AppointmentServices {
  static async setAppointment(form_data) {
    const api = ApiConfigs.APPOINTMENT.SET_AP;
    const token = await SupportServices.getLocalStorage("tokenHealth");

    let response = await fetch(api, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(form_data),
    });

    return response.json();
  }

  static async getAllAppointmentByPatient() {
    const api = ApiConfigs.APPOINTMENT.GET_ALL_BY_PATIENT;
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

  static async cancelAppointment(apId) {
    const api = ApiConfigs.APPOINTMENT.CANCEL_AP + apId;
    const token = await SupportServices.getLocalStorage("tokenHealth");

    let response = await fetch(api, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    return response.json();
  }

  static async checkSlotAp(form_data) {
    const api = ApiConfigs.APPOINTMENT.CHECK_SLOT;
    const token = await SupportServices.getLocalStorage("tokenHealth");

    let response = await fetch(api, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(form_data),
    });

    return response.json();
  }
}
