import React, { FunctionComponent, useEffect, useState } from "react";
import Peer from "skyway-js";
import { TextField, Button } from "@material-ui/core";

let peerVideo: Peer;
let peerDesktop: Peer;

let targetVideoRef: any;
let myVideoRef: any;
let myDesktopRef: any;
let targetDesktopRef: any;
const Teacher: FunctionComponent<{
  videoStream?: MediaStream;
  desktopStream?: MediaStream;
}> = ({ videoStream, desktopStream }) => {
  const [start, setStart] = useState(false);
  const [room, setRoom] = useState("");
  useEffect(() => {
    peerVideo = new Peer({
      key: "725b7ef3-cd3d-4032-b019-00fc43b6639f",
      debug: 3
    });
    peerDesktop = new Peer({
      key: "725b7ef3-cd3d-4032-b019-00fc43b6639f",
      debug: 3
    });
    targetVideoRef = React.createRef();
    myVideoRef = React.createRef();
    myDesktopRef = React.createRef();
    targetDesktopRef = React.createRef();
    setStart(true);
    setTimeout(() => {
      init();
    }, 1000);
  }, []);

  async function init() {
    myVideoRef.srcObject = videoStream;
  }

  return (
    <div>
      <TextField
        onChange={e => {
          setRoom(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          if (!room) return;
          const video = peerVideo.joinRoom(room + "video", {
            mode: "sfu",
            stream: myVideoRef.srcObject
          });
          if (!video) return;
          video.on("stream", stream => {
            console.log({ targetVideoRef });
            targetVideoRef.srcObject = stream;
          });
          const desktop = peerDesktop.joinRoom(room + "desktop", {
            mode: "sfu",
            stream: myDesktopRef.srcObject
          });
          if (!desktop) return;
          desktop.on("stream", stream => {
            targetDesktopRef.srcObject = stream;
          });
          setRoom("");
        }}
      >
        open
      </Button>
      <div style={{ display: "flex" }}>
        <video
          ref={video => ((myVideoRef as any) = video)}
          autoPlay={true}
          style={{ height: "40vh" }}
          key="myvideo"
        />
        <video
          ref={video => ((targetVideoRef as any) = video)}
          autoPlay={true}
          style={{ height: "40vh" }}
          key="targetvideo"
        />
      </div>
      <video
        ref={video => ((targetDesktopRef as any) = video)}
        autoPlay={true}
        style={{ height: "40vh" }}
        key={"desktop"}
      />
    </div>
  );
};

export default Teacher;
