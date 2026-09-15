# Mobile Wearable Device

Ứng dụng di động (Expo / React Native) dành cho bệnh nhân, kết nối với thiết bị đeo (wearable) để theo dõi sức khỏe theo thời gian thực: nhịp tim, nồng độ oxy trong máu (SpO2), nhiệt độ cơ thể, nhiệt độ môi trường và chất lượng không khí. Ứng dụng còn hỗ trợ đặt lịch hẹn khám với bác sĩ và quản lý tài khoản cá nhân.

## Tính năng chính

- **Đăng nhập** bằng số điện thoại/mật khẩu, lưu token phiên đăng nhập trên máy.
- **Bảng điều khiển (Dashboard)**: hiển thị dữ liệu sức khỏe theo thời gian thực từ thiết bị đeo qua MQTT, kèm cảnh báo và gợi ý khi phát hiện chỉ số bất thường (nhịp tim, SpO2, nhiệt độ, vận động, âm thanh ho...).
- **Lịch hẹn**: xem, đặt và huỷ lịch hẹn khám với bác sĩ, kiểm tra khung giờ trống.
- **Tài khoản**: xem/cập nhật thông tin cá nhân và dữ liệu sức khỏe.

## Công nghệ sử dụng

- [Expo](https://expo.dev) (SDK 51) + React Native 0.74
- React Navigation (bottom tabs + stack)
- MQTT (`paho-mqtt`) để nhận dữ liệu thời gian thực từ thiết bị đeo
- REST API (qua `fetch`) để giao tiếp với backend
- AsyncStorage để lưu trữ token cục bộ

## Cấu trúc thư mục

```
├── App.js                     # Điểm khởi chạy ứng dụng
├── app.json / eas.json        # Cấu hình Expo và EAS Build
├── assets/                    # Hình ảnh, font
├── configs/                   # Cấu hình API, biến dùng chung
├── containers/
│   ├── authentication/        # Màn hình đăng nhập
│   ├── main/                  # Dashboard, lịch hẹn, tài khoản
│   └── splash/                # Màn hình splash
├── navigation/                 # Cấu hình điều hướng (tab/stack)
├── services/                   # Gọi API, MQTT, lưu trữ cục bộ...
└── styles/                     # Style dùng chung
```

## Yêu cầu

- Node.js (khuyến nghị >= 18)
- npm
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (chạy qua `npx`)
- Máy ảo hoặc thiết bị thật để chạy iOS/Android (Expo Go hoặc dev client)

## Cài đặt

```bash
npm install
```

## Chạy ứng dụng

```bash
# Khởi động Metro bundler / Expo Dev Tools
npm start

# Chạy trên Android
npm run android

# Chạy trên iOS
npm run ios

# Chạy trên web
npm run web
```

## Cấu hình

Địa chỉ API backend và cấu hình MQTT được khai báo trong [configs/api_configs.js](configs/api_configs.js) và [services/mqtt_services.js](services/mqtt_services.js). Cập nhật các giá trị này cho phù hợp với môi trường triển khai (thông tin xác thực/kết nối nên được chuyển ra biến môi trường thay vì hard-code trước khi đưa vào production).

## Build

Dự án sử dụng [EAS Build](https://docs.expo.dev/build/introduction/) với các profile được khai báo trong `eas.json` (`development`, `preview`, `production`).

```bash
eas build --profile preview --platform android
```
