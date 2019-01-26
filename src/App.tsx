import React, { FunctionComponent, useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import Peer from "skyway-js";
import { getLocalVideo } from "webrtc4me/lib/utill";
import { getLocalDesktop } from "./webrtc/utill";

let peer: Peer;

const App: FunctionComponent = () => {
  const [room, setRoom] = useState("");
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
            peer = new Peer({
              key: "725b7ef3-cd3d-4032-b019-00fc43b6639f",
              debug: 3
            });
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
