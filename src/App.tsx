import React, { FunctionComponent, useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Peer from "skyway-js";
import { getLocalVideo } from "webrtc4me/lib/utill";
import useObject from "useobject";
import { getLocalDesktop } from "./webrtc/utill";
import TabMol from "./components/tab";
import Teacher from "./pages/teacher";
import Student from "./pages/student";

const App: FunctionComponent = () => {
  const [room, setRoom] = useState("");
  const [user, setUser] = useState("def");
  let targetDesktopRef: any = React.createRef();
  let myDesktopRef: any = React.createRef();
  let targetVideoRef: any = React.createRef();
  let myVideoRef: any = React.createRef();

  useEffect(() => {
    init();
  }, []);

  async function init() {
    myDesktopRef.srcObject = await getLocalDesktop();
    myVideoRef.srcObject = await getLocalVideo();
  }

  return (
    <div>
      <div>
        <TextField
          value={room}
          onChange={e => {
            setRoom(e.target.value);
          }}
        />
        <Button
          onClick={() => {
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
            });
          }}
        >
          open
        </Button>
      </div>

      <div>
        <video
          ref={video => ((myVideoRef as any) = video)}
          autoPlay={true}
          style={{ width: "50%", height: "100%" }}
        />
        <video
          ref={video => ((targetVideoRef as any) = video)}
          autoPlay={true}
          style={{ width: "50%", height: "100%" }}
        />
        <video
          ref={video => ((myDesktopRef as any) = video)}
          autoPlay={true}
          style={{ width: "50%", height: "100%" }}
        />
        <video
          ref={video => ((targetDesktopRef as any) = video)}
          autoPlay={true}
          style={{ width: "50%", height: "100%" }}
        />
      </div>
    </div>
  );
};
export default App;
