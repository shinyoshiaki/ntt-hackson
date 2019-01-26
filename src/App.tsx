import React, { FunctionComponent, useEffect } from "react";
import {Input} from '@material-ui/core'
import Peer from "skyway-js";
import { getLocalVideo } from "webrtc4me/lib/utill";
import useObject from "useobject";
let peer: Peer;
let stream: MediaStream;

interface State {
  room?: string;
}

const App: FunctionComponent = () => {
  const { state, setState } = useObject<State>({});
  let videoRef = React.createRef();
  const handleRef = (video: any) => {
    videoRef = video;
  };

  useEffect(() => {
    peer = new Peer({ key: "725b7ef3-cd3d-4032-b019-00fc43b6639f", debug: 3 });
    init();
  }, []);

  async function init() {
    stream = await getLocalVideo();
  }

  return (
    <div>
      <input
        onChange={e => {
          setState({ room: e.target.value });
        }}
      />
      <button
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
      </button>
      <video
        ref={handleRef}
        autoPlay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};
export default App;
