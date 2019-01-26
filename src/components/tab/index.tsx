import React, { FunctionComponent, useEffect, useState } from "react";
import { AppBar, Tab, Tabs } from "@material-ui/core";

interface Props {
  tabs: { [key: string]: () => any };
}

const TabMol: FunctionComponent<Props> = ({ tabs }) => {
  const [tab, setTab] = useState(0);
  const labels = Object.keys(tabs);
  return (
    <div>
      <AppBar position="static">
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          {labels.map((label, i) => (
            <Tab label={label} key={i} />
          ))}
        </Tabs>
      </AppBar>
      {labels.map((label, i) => {
        const Content = tabs[label];
        return <div key={i}>{tab === i ? <Content /> : <div />}</div>;
      })}
    </div>
  );
};

export default TabMol;
