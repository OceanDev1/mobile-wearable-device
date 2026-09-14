// const SERVER_MAIN = "http://192.168.38.60:9991/api/";
const SERVER_MAIN = 'http://118.69.168.44:9991/api/';

const VERSION = "v1/";

const ACCOUNT = "account/";
const PATIENT = "patients/";
const DEVICE = "devices/";
const APPOINTMENT = "appointment/";

export const ApiConfigs = {
  AUTHENTICATION: {
    GET_BY_TOKEN: SERVER_MAIN + VERSION + ACCOUNT + "by-token",
    LOGIN: SERVER_MAIN + VERSION + PATIENT + "login-pt",
  },

  PATIENT: {
    GET_ALL_DOCTOR: SERVER_MAIN + VERSION + PATIENT + "get-all-doctors",
    CREATE: SERVER_MAIN + VERSION + ACCOUNT + "new-patient",
    DETAIL: SERVER_MAIN + VERSION + ACCOUNT + "detail?accountId=",
    UPDATE_DATA_HEALTH: SERVER_MAIN + VERSION + ACCOUNT + "update-data-health",
    GET_ALL_MANAGEMENT:
      SERVER_MAIN + VERSION + ACCOUNT + "get-patient-management",
  },

  DEVICE: {
    SET_FOR_ACCOUNT: SERVER_MAIN + VERSION + DEVICE + "set_account",
    GET_MANAGEMENT: SERVER_MAIN + VERSION + DEVICE + "by-doctor",
    FULL_DETAIL: SERVER_MAIN + VERSION + DEVICE + "full-detail?deviceId=",
    GET_BY_ACCOUNT: SERVER_MAIN + VERSION + DEVICE + "by-account",
  },

  APPOINTMENT: {
    SET_AP: SERVER_MAIN + VERSION + APPOINTMENT + "insert",
    GET_ALL_BY_PATIENT:
      SERVER_MAIN + VERSION + APPOINTMENT + "get-all-by-patient",
    CANCEL_AP: SERVER_MAIN + VERSION + APPOINTMENT + "cancel?appointmentId=",
    CHECK_SLOT: SERVER_MAIN + VERSION + APPOINTMENT + "check-slot",
  },
};
