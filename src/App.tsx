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
  const [videoStream, setVideo] = useState<any>(undefined);
  const [desktopStream, setDesktop] = useState<any>(undefined);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const videoStream = await getLocalVideo();
    setVideo(videoStream);
    const desktopStream = await getLocalDesktop();
    setDesktop(desktopStream);
  }

  return (
    <div>
      <TabMol
        tabs={{
          teacher: () => <Teacher videoStream={videoStream} />,
          student: () => (
            <Student videoStream={videoStream} desktopStream={desktopStream} />
          )
        }}
      />
    </div>
  );
};
export default App;
