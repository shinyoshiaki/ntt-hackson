import React, { FunctionComponent, useEffect } from "react";
import Peer from "skyway-js";
import { TextField, Button } from "@material-ui/core";
import useObject from "useobject";
import { getLocalDesktop, getLocalVideo } from "../webrtc/utill";

interface State {
  room?: string;
}

let peer: Peer;

interface State {
  room?: string;
}

const Teacher: FunctionComponent<{}> = () => {
  const { state, setState } = useObject<State>({});

  let targetVideoRef: any = React.createRef();
  let myVideoRef: any = React.createRef();
  let desktopRef: any = React.createRef();

  useEffect(() => {
    peer = new Peer({ key: "725b7ef3-cd3d-4032-b019-00fc43b6639f", debug: 3 });
    init();
  }, []);

  async function init() {
    desktopRef.srcObject = await getLocalDesktop();
    myVideoRef.srcObject = await getLocalVideo();
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
          const video = peer.joinRoom(state.room, {
            mode: "sfu",
            stream: myVideoRef.srcObject
          });
          if (!video) return;
          video.on("stream", stream => {
            targetVideoRef.srcObject = stream;
          });
          const desktop = peer.joinRoom(state.room, {
            mode: "sfu"
          });
          if (!desktop) return;
          desktop.on("stream", stream => {
            desktopRef.srcObject = stream;
          });
          setState({ room: undefined });
        }}
      >
        open
      </Button>
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
      <video
        ref={video => (desktopRef = video)}
        autoPlay={true}
        style={{ height: "40vh" }}
      />
    </div>
  );
};

export default Teacher;
