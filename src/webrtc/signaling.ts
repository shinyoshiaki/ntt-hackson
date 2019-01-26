import client from "socket.io-client";
import WebRTC from "webrtc4me";

const url = "https://aqueous-earth-75182.herokuapp.com/";

const socket = client.connect(url);

export function create(room: string) {
  return new Promise<WebRTC>(resolve => {
    socket.emit("create", { room });
    const rtc = new WebRTC({ nodeId: "answer" });
    socket.on("offer", (data: { sdp: string }) => {
      rtc.makeAnswer(data.sdp);
    });
    rtc.signal = sdp => {
      socket.emit("answer", { sdp, room });
    };
    rtc.connect = () => {
      socket.emit("connect", { room });
      console.log("connect create");
      resolve(rtc);
    };
    rtc.addOnData(message => {
      console.log({ message });
    }, "answer");
  });
}

export function join(room: string) {
  return new Promise<WebRTC>(resolve => {
    socket.emit("join", { room });
    const rtc = new WebRTC({ nodeId: "offer" });
    socket.on("join", () => {
      rtc.makeOffer();
      rtc.signal = sdp => {
        socket.emit("offer", { sdp, room });
      };
      socket.on("answer", (data: { sdp: string }) => {
        rtc.setAnswer(data.sdp);
      });
      rtc.connect = () => {
        console.log("connect join");
        resolve(rtc);
      };
      rtc.addOnData(message => {
        console.log({ message });
      }, "offer");
    });
  });
}
