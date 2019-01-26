import React, { FunctionComponent, useEffect, useState } from "react";
import { create, join } from "../webrtc/signaling";
import WebRTC from "webrtc4me";
import { TextField } from "@material-ui/core";

const ShareBoard: FunctionComponent<{ isTeacher: boolean; room: string }> = ({
  isTeacher,
  room
}) => {
  const [text, setText] = useState("");
  const [peer, setPeer] = useState<any>(undefined);

  useEffect(() => {
    connect();
  }, []);

  const connect = async () => {
    let peer: WebRTC;
    if (isTeacher) {
      peer = await create(room);
      peer.addOnData(raw => {
        console.log({ raw });
        if (raw.label === "share") setText(raw.data);
      });
      setPeer(peer);
    } else {
      setTimeout(async () => {
        peer = await join(room);
        peer.addOnData(raw => {
          console.log({ raw });
          if (raw.label === "share") setText(raw.data);
        });
        setPeer(peer);
      }, 1000);
    }
  };
  console.log({ peer });
  return (
    <div>
      <p>shareboard</p>
      {peer && (
        <div>
          <TextField
            multiline
            rows="5"
            value={text}
            onChange={e => {
              setText(e.target.value);
              peer.send(e.target.value, "share");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ShareBoard;