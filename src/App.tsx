import React, { FunctionComponent, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import Peer from "skyway-js";
import { getLocalVideo } from "webrtc4me/lib/utill";
import useObject from "useobject";
import { getLocalDesktop } from "./webrtc/utill";
import TabMol from "./components/tab";
import Teacher from "./pages/teacher";
let peer: Peer;
let stream: MediaStream;

interface State {
  room?: string;
}

const App: FunctionComponent = () => {
  return (
    <div>
      <TabMol
        tabs={{
          teacher: () => <Teacher />
        }}
      />
    </div>
  );
};
export default App;
