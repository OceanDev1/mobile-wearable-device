import Paho from "paho-mqtt";

let client = new Paho.Client("139.59.115.246", 9001, "");

export class MqttServices {
  static checkConnect() {
    try {
    } catch (error) {}
  }

  static connectMqtt(cb) {
    try {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < 20) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
      }
      console.log("Render client Id", result);
      client.connect({
        userName: "mesh",
        password: "mesh@12345",
        // clientId: result,
        onSuccess: () => {
          console.log("Connect success");
          return cb(true);
        },
        onFailure: function (err) {
          console.log("Besti Besti", err);
        },
      });
    } catch (error) {
      console.log("error mqtttt", error);
      cb(false);
    }
  }

  static receiveMessage(userId, cb) {
    console.log("receive", userId);
    client.subscribe(userId);
    client.onMessageArrived = (msg) => {
      return cb(msg);
    };
  }

  static cancelReceiveMessage(houseId, cb) {
    try {
      console.log("cancel", houseId);
      client.unsubscribe(houseId);
    } catch (error) {
      console.log("error cancel", error);
    }
  }

  static sendMessage(message) {}

  static disconnectMqtt() {
    try {
      console.log("Mqtt disconnect");
      client.disconnect();
    } catch (error) {
      console.log("error disconnect", error);
    }
  }
}
