import AsyncStorage from "@react-native-async-storage/async-storage";
import VariableConfigs from "../configs/variable_configs";

let map_heart_rate = [
  {
    value: 0,
    title: "Bình thường",
    class_txt: VariableConfigs.COLORS.success_color,
    risk: [],
    suggestions: [],
  },

  {
    value: 1,
    title: "Nhịp tim nhanh",
    class_txt: VariableConfigs.COLORS.danger_color,
    risk: [
      "Làm tăng áp lực lên tim",
      "Nguy cơ suy tim",
      "Nhồi máu cơ tim",
      "Đột tử do tim ngừng đập",
    ],
    suggestions: [
      "Kiểm tra sức khỏe thường xuyên",
      "Quan tâm chế độ ăn uống",
      "Gặp bắc sĩ ngay khi có thể",
    ],
  },

  {
    value: 2,
    title: "Nhịp tim chậm",
    class_txt: VariableConfigs.COLORS.danger_color,
    risk: ["Gây suy giảm tuần hoàn", "Nguy cơ ngừng tim", "Đột quỵ"],
    suggestions: [
      "Kiểm tra sức khỏe thường xuyên",
      "Quan tâm chế độ ăn uống",
      "Gặp bắc sĩ ngay khi có thể",
    ],
  },
];

let map_heart_spo02 = [
  {
    value: 0,
    title: "Bình thường",
    class_txt: VariableConfigs.COLORS.success_color,
    risk: [],
    suggestions: [],
  },

  {
    value: 1,
    title: "Thiếu Oxy mức độ nhẹ",
    class_txt: VariableConfigs.COLORS.danger_color,
    risk: [
      "Khó thở nhẹ",
      "Mệt mỏi, đặc biệt khi gắng sức",
      "Cơ thể không nhận đủ oxy để duy trì hoạt động tối ưu, có thể làm tăng áp lực lên tim",
    ],
    suggestions: [
      "Kiểm tra sức khỏe thường xuyên để theo dõi mức SpO2.",
      "Tập luyện thở sâu và các bài tập hỗ trợ phổi.",
      "Tăng cường môi trường sống thông thoáng, tránh khói thuốc và ô nhiễm không khí.",
    ],
  },

  {
    value: 2,
    title: "Thiếu Oxy nghiêm trọng",
    class_txt: VariableConfigs.COLORS.danger_color,
    risk: [
      "Suy giảm chức năng phổi",
      "Nguy cơ suy tim do thiếu oxy.",
      "Nguy cơ đột quỵ, nhồi máu cơ tim, và tử vong cao",
    ],
    suggestions: ["Cần cấp cứu y tế"],
  },
];

let map_heart_human_temp = [
  {
    value: 0,
    title: "Hạ thân nhiệt nghiêm trọng",
    class_txt: VariableConfigs.COLORS.danger_color,
    risk: ["Suy tim", "Suy hô hấp", "Nguy cơ tử vong cao"],
    suggestions: ["Cần cấp cứu", "Ủ ấm cơ thể"],
  },

  {
    value: 1,
    title: "Hạ thân nhiệt nhẹ",
    class_txt: VariableConfigs.COLORS.danger_color,
    risk: ["Giảm chức năng tuần hoàn", "Suy yếu hệ miễn dịch"],
    suggestions: ["Giữ ấm cơ thể"],
  },

  {
    value: 2,
    title: "Bình thường",
    class_txt: VariableConfigs.COLORS.success_color,
    risk: [],
    suggestions: ["Duy trì nhiệt độ cơ thể"],
  },

  {
    value: 3,
    title: "Sốt nhẹ",
    class_txt: VariableConfigs.COLORS.danger_color,
    risk: ["Cần theo dõi tình trạng nhiễm trùng hoặc bệnh lý tiềm ẩn"],
    suggestions: ["Uống nước", "Nghỉ ngơi", "Theo dõi nhiệt độ"],
  },

  {
    value: 4,
    title: "Sốt trung bình",
    class_txt: VariableConfigs.COLORS.danger_color,
    risk: ["Nguy cơ mất nước", "Suy yếu hệ miễn dịch"],
    suggestions: [
      "Uống nhiều nước, thuốc hạ sốt",
      "Thăm khám y tế nếu kéo dài",
    ],
  },

  {
    value: 5,
    title: "Sốt cao",
    class_txt: VariableConfigs.COLORS.danger_color,
    risk: ["Đột quỵ", "Tổn thương các hệ cơ quan"],
    suggestions: ["Cần cấp cứu"],
  },
];

let map_heart_environment_temp = [
  {
    value: 0,
    title: "Lạnh",
    class_txt: VariableConfigs.COLORS.danger_color,
    risk: [
      "Nguy cơ hạ thân nhiệt",
      "Giảm tuần hoàn máu",
      "Suy yếu hệ miễn dịch",
    ],
    suggestions: ["Giữ ấm", "Mặc nhiều lớp quần áo, tránh gió lạnh"],
  },

  {
    value: 1,
    title: "Lạnh vừa",
    class_txt: VariableConfigs.COLORS.warning_color,
    risk: ["Có thể gây khó chịu nếu tiếp xúc lâu", "Suy yếu hệ miễn dịch"],
    suggestions: ["Giữ ấm cơ thể"],
  },

  {
    value: 2,
    title: "Thoải mái",
    class_txt: VariableConfigs.COLORS.success_color,
    risk: [],
    suggestions: ["Duy trì nhiệt độ cơ thể"],
  },

  {
    value: 3,
    title: "Nóng vừa",
    class_txt: VariableConfigs.COLORS.warning_color,
    risk: ["Có thể gây mất nước", "Mệt mỏi nếu hoạt động thể chất"],
    suggestions: ["Uống nước", "Nghỉ ngơi"],
  },

  {
    value: 4,
    title: "Nóng",
    class_txt: VariableConfigs.COLORS.danger_color,
    risk: ["Nguy cơ kiệt sức vì nóng", "Mất nước"],
    suggestions: ["Uống nhiều nước, ở nơi thoáng mát"],
  },

  {
    value: 5,
    title: "Nóng nghiêm trọng",
    class_txt: VariableConfigs.COLORS.danger_color,
    risk: ["Có thể gây đột quỵ nhiệt", "Nguy cơ tử vong cao"],
    suggestions: ["Làm mát cơ thể"],
  },
];

export class SupportServices {
  static async setLocalStorage(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  }

  static async getLocalStorage(value) {
    try {
      return await AsyncStorage.getItem(value);
    } catch (e) {
      console.log(e);
    }
  }

  static async clearStorageLogOut() {
    try {
      await AsyncStorage.multiRemove(["tokenHealth"]);
    } catch (e) {
      console.log(e);
    }
  }

  static convertDateToDate(params) {
    const date_parse = new Date(params);

    const date = this.insert0IntoText(date_parse.getDate());
    const month = this.insert0IntoText(date_parse.getMonth() + 1);
    const year = date_parse.getFullYear();

    return date + "-" + month + "-" + year;
  }

  static convertDateToDateReverse(params) {
    const date_parse = new Date(params);

    const date = this.insert0IntoText(date_parse.getDate());
    const month = this.insert0IntoText(date_parse.getMonth() + 1);
    const year = date_parse.getFullYear();

    return year + "-" + month + "-" + date;
  }

  static sortDataSp02(spo2) {
    if (spo2 == 4) return "Cấp cứu trên lâm sàng";
    if (spo2 == 3) return "Cấp cứu trên lâm sàng";
    if (spo2 == 2) return "Oxy trong máu thấp";
    if (spo2 == 1) return "Oxy trong máu trung bình";
    if (spo2 == 0) return "Oxy trong máu tốt";

    return "";
  }

  static formatDateToDayAndDate(ms) {
    let date = new Date(ms);

    let weekdayOptions = { weekday: "long" };
    let weekday = date.toLocaleDateString("vi-VN", weekdayOptions);

    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng trong JavaScript bắt đầu từ 0
    let year = date.getFullYear();
    let formattedDate = `${day}-${month}-${year}`;

    let result = {
      weekday: weekday,
      date: formattedDate,
    };

    return result;
  }

  static insert0IntoText(params) {
    if (params < 10) return "0" + params;
    return params;
  }

  static sortDataEvaluationHeart(value) {
    let data = map_heart_rate.find((x) => x.value == value);

    return data;
  }

  static sortDataEvaluationSpo2(value) {
    let data = map_heart_spo02.find((x) => x.value == value);

    return data;
  }

  static sortDataEvaluationHumanTemperature(value) {
    let data = map_heart_human_temp.find((x) => x.value == value);

    return data;
  }

  static sortDataEvaluationEnvironmentTemperature(value) {
    let data = map_heart_environment_temp.find((x) => x.value == value);

    return data;
  }
}
