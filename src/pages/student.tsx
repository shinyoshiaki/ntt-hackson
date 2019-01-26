import React, { FunctionComponent, useEffect } from "react";
import Peer from "skyway-js";
import { TextField, Button } from "@material-ui/core";
import useObject from "useobject";

interface State {
  room?: string;
}

let peerVideo: Peer;
let peerDesktop: Peer;

interface State {
  start: boolean;
  room?: string;
}

let targetVideoRef: any;
let myVideoRef: any;
let desktopRef: any;

const Student: FunctionComponent<{
  desktopStream?: MediaStream;
  videoStream?: MediaStream;
}> = ({ desktopStream, videoStream }) => {
  const { state, setState } = useObject<State>({ start: false });

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
    desktopRef = React.createRef();
    setState({ start: true });
    setTimeout(() => {
      init();
    }, 1000);
  }, []);

  async function init() {
    desktopRef.srcObject = desktopStream;
    myVideoRef.srcObject = videoStream;
    console.log({ targetVideoRef });
  }

  return (
    <div>
      <TextField
        onChange={e => {
          setState({ room: e.target.value });
        }}
      />
      <Button
        onClick={() => {
          if (!state.room) return;
          // const video = peerVideo.joinRoom(state.room + "video", {
          //   mode: "sfu",
          //   stream: videoStream
          // });
          // if (!video) return;
          // video.on("stream", stream => {
          //   console.log({ targetVideoRef });
          //   targetVideoRef.srcObject = stream;
          // });
          const desktop = peerDesktop.joinRoom(state.room + "desktop", {
            mode: "sfu",
            stream: desktopStream
          });
          if (!desktop) return;
          desktop.on("stream", stream => {
            desktopRef.srcObject = stream;
          });
          setState({ room: "" });
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
        ref={video => (desktopRef = video)}
        autoPlay={true}
        style={{ height: "40vh" }}
        key={"desktop"}
      />
    </div>
  );
};

export default Student;
