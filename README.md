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

---

# Mobile Wearable Device (English)

A mobile app (Expo / React Native) for patients, connected to a wearable device to monitor health in real time: heart rate, blood oxygen saturation (SpO2), body temperature, ambient temperature, and air quality. The app also supports booking appointments with doctors and managing a personal account.

## Key Features

- **Login** with phone number/password, session token stored locally.
- **Dashboard**: displays real-time health data streamed from the wearable device over MQTT, with alerts and suggestions when abnormal readings are detected (heart rate, SpO2, temperature, motion, cough detection...).
- **Appointments**: view, book, and cancel doctor appointments, check available time slots.
- **Account**: view/update personal information and health data.

## Tech Stack

- [Expo](https://expo.dev) (SDK 51) + React Native 0.74
- React Navigation (bottom tabs + stack)
- MQTT (`paho-mqtt`) for real-time data from the wearable device
- REST API (via `fetch`) for backend communication
- AsyncStorage for local token storage

## Project Structure

```
├── App.js                     # App entry point
├── app.json / eas.json        # Expo and EAS Build configuration
├── assets/                    # Images, fonts
├── configs/                   # API config, shared variables
├── containers/
│   ├── authentication/        # Login screen
│   ├── main/                  # Dashboard, appointments, account
│   └── splash/                # Splash screen
├── navigation/                 # Navigation setup (tab/stack)
├── services/                   # API calls, MQTT, local storage...
└── styles/                     # Shared styles
```

## Requirements

- Node.js (>= 18 recommended)
- npm
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (run via `npx`)
- A simulator/emulator or physical device to run iOS/Android (Expo Go or dev client)

## Installation

```bash
npm install
```

## Running the App

```bash
# Start the Metro bundler / Expo Dev Tools
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

## Configuration

The backend API base URL and MQTT settings are declared in [configs/api_configs.js](configs/api_configs.js) and [services/mqtt_services.js](services/mqtt_services.js). Update these values for your deployment environment (credentials/connection info should be moved to environment variables instead of being hard-coded before shipping to production).

## Build

The project uses [EAS Build](https://docs.expo.dev/build/introduction/) with profiles declared in `eas.json` (`development`, `preview`, `production`).

```bash
eas build --profile preview --platform android
```
