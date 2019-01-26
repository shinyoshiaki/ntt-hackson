import React, { FunctionComponent, useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Peer from "skyway-js";
import { getLocalVideo } from "webrtc4me/lib/utill";
import useObject from "useobject";
import { getLocalDesktop } from "./webrtc/utill";
import ShareBoard from "./containers/ShareBoard";
let peer: Peer;

let targetDesktopRef: any = React.createRef();
let myDesktopRef: any = React.createRef();
let targetVideoRef: any = React.createRef();
let myVideoRef: any = React.createRef();

const handleConnect = (room: string, connect: () => void) => {
  const call = peer.joinRoom(room, {
    mode: "sfu",
    stream: myDesktopRef.srcObject
  });
  if (!call) return;
  call.on("stream", stream => {
    (targetDesktopRef as any).srcObject = stream;
  });
  const video = peer.joinRoom(room + "video", {
    mode: "sfu",
    stream: myVideoRef.srcObject
  });
  if (!video) return;
  video.on("stream", stream => {
    (targetVideoRef as any).srcObject = stream;
    connect();
  });
};

const App: FunctionComponent = () => {
  const [room, setRoom] = useState("");
  const [user, setUser] = useState("def");
  const [connect, setConnect] = useState("def");

  useEffect(() => {
    peer = new Peer({ key: "725b7ef3-cd3d-4032-b019-00fc43b6639f", debug: 3 });
    init();
  }, []);

  async function init() {
    myDesktopRef.srcObject = await getLocalDesktop();
    myVideoRef.srcObject = await getLocalVideo();
  }

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
            setConnect("connecting");
            handleConnect(room, () => {
              setUser("teacher");
              setConnect("connected");
            });
          }}
        >
          teacher
        </Button>
        <Button
          onClick={() => {
            setConnect("connecting");
            handleConnect(room, () => {
              setUser("student");
              setConnect("connected");
            });
          }}
        >
          student
        </Button>
        <p style={{ paddingRight: 30 }} />
        <p style={{ paddingRight: 30 }}>{room}</p>
        <p style={{ paddingRight: 30 }}>{user !== "def" && user}</p>
        <p style={{ paddingRight: 30 }}>{connect !== "def" && connect}</p>
      </div>

      <div>
        <div style={{ display: "flex" }}>
          <video
            ref={video => ((myVideoRef as any) = video)}
            autoPlay={true}
            style={{ height: "40vh" }}
          />
          <video
            ref={video => ((targetVideoRef as any) = video)}
            autoPlay={true}
            style={{ height: "40vh" }}
          />
        </div>
        <div style={{ display: "flex" }}>
          {user !== "teacher" && (
            <video
              ref={video => ((myDesktopRef as any) = video)}
              autoPlay={true}
              style={{
                height: user === "teacher" ? "0vh" : "40vh",
                width: user === "teacher" ? "0vw" : "auto"
              }}
            />
          )}
          {user !== "student" && (
            <video
              ref={video => ((targetDesktopRef as any) = video)}
              autoPlay={true}
              style={{ height: "40vh" }}
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
