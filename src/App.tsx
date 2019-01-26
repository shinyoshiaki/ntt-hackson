import React, { FunctionComponent, useEffect, useState } from "react";
import { TextField, Button, Divider } from "@material-ui/core";
import Peer from "skyway-js";
import { getLocalVideo } from "webrtc4me/lib/utill";
import { getLocalDesktop } from "./webrtc/utill";
import ShareBoard from "./containers/ShareBoard";
let peer: Peer;

let targetDesktopRef: any = React.createRef();
let myDesktopRef: any = React.createRef();
let targetVideoRef: any = React.createRef();
let myVideoRef: any = React.createRef();

const connectServer = (room: string, connect: () => void) => {
  const call = peer.joinRoom(room, {
    mode: "sfu",
    stream: myDesktopRef.srcObject
  });
  if (!call) return;
  call.on("stream", stream => {
    if (targetDesktopRef) targetDesktopRef.srcObject = stream;
  });
  const video = peer.joinRoom(room + "video", {
    mode: "sfu",
    stream: myVideoRef.srcObject
  });
  if (!video) return;
  video.on("stream", stream => {
    if (targetVideoRef) targetVideoRef.srcObject = stream;
    connect();
  });
};

const App: FunctionComponent = () => {
  const [room, setRoom] = useState("");
  const [user, setUser] = useState("def");
  const [status, setStatus] = useState("def");

  useEffect(() => {
    peer = new Peer({ key: "725b7ef3-cd3d-4032-b019-00fc43b6639f", debug: 3 });
    init();
  }, []);

  async function init() {
    myDesktopRef.srcObject = await getLocalDesktop();
    myVideoRef.srcObject = await getLocalVideo();
  }

  const handleConnect = (userType: string) => {
    setStatus("connecting");
    if (status === "def")
      connectServer(room, () => {
        setUser(userType);
        setStatus("connected");
      });
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <TextField
          value={room}
          onChange={e => {
            setRoom(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            handleConnect("teacher");
          }}
        >
          teacher
        </Button>
        <Button
          onClick={() => {
            handleConnect("student");
          }}
        >
          student
        </Button>
        <p style={{ paddingRight: 30 }}>{""}</p>
        <p style={{ paddingRight: 30 }}>room　:　{room}</p>
        <p style={{ paddingRight: 30 }}>
          status　:　{status !== "def" && status}
        </p>
        <p style={{ paddingRight: 30 }}>user　:　{user !== "def" && user}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex" }}>
          <video
            ref={video => ((myVideoRef as any) = video)}
            autoPlay={true}
            style={{ width: "30vw", maxHeight: "30vh", paddingRight: 30 }}
          />
          <video
            ref={video => ((targetVideoRef as any) = video)}
            autoPlay={true}
            style={{ width: "30vw", maxHeight: "30vh" }}
          />
        </div>
        <br />
        <Divider />
        <br />
        <div style={{ display: "flex" }}>
          {user !== "teacher" && (
            <video
              ref={video => ((myDesktopRef as any) = video)}
              autoPlay={true}
              style={{ width: "50vw", maxHeight: "55vh" }}
            />
          )}
          {user !== "student" && (
            <video
              ref={video => ((targetDesktopRef as any) = video)}
              autoPlay={true}
              style={{ width: "50vw", maxHeight: "55vh" }}
            />
          )}

          {user !== "def" && (
            <ShareBoard isTeacher={user === "teacher"} room={room} />
          )}
        </div>
      </div>
    </div>
  );
};
export default App;
