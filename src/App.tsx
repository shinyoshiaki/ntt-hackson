import React, { FunctionComponent, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import Peer from "skyway-js";
import { getLocalVideo } from "webrtc4me/lib/utill";
import useObject from "useobject";
import { getLocalDesktop } from "./webrtc/utill";
let peer: Peer;
let stream: MediaStream;

interface State {
  room?: string;
}

const App: FunctionComponent = () => {
  const { state, setState } = useObject<State>({});
  let videoRef = React.createRef();
  let myVideoRef: any = React.createRef();

  useEffect(() => {
    peer = new Peer({ key: "725b7ef3-cd3d-4032-b019-00fc43b6639f", debug: 3 });
    init();
  }, []);

  async function init() {
    stream = await getLocalDesktop();
    myVideoRef.srcObject = stream;
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
          const call = peer.joinRoom(state.room, { mode: "sfu", stream });
          if (!call) return;
          call.on("stream", stream => {
            (videoRef as any).srcObject = stream;
          });
        }}
      >
        open
      </Button>
      <div>
        <video
          ref={video => ((myVideoRef as any) = video)}
          autoPlay={true}
          style={{ width: "50%", height: "100%" }}
        />
        <video
          ref={video => ((videoRef as any) = video)}
          autoPlay={true}
          style={{ width: "50%", height: "100%" }}
        />
      </div>
    </div>
  );
};
export default App;
