import React, {useEffect} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "pages/Home";
import {Toast} from "primereact/toast";
import {useRecoilState} from "recoil";
import {messageState} from "recoil/atoms";
import TopBar from "components/topbar/Topbar";
import {IPrimeMessage} from "interfaces";
import Custom from "pages/Custom";

function App() {

  const [messages] = useRecoilState(messageState);
  const toastRef = React.useRef<any>(null);

  useEffect(() => {
    messages.forEach((message: IPrimeMessage) => {
      toastRef.current!.show({
        severity: message.severity,
        summary: message.summary,
        detail: message.detail
      });
    });
  }, [messages]);

  return (
    <React.Fragment>
      <TopBar />
      <div className="h-4rem" />
      <Toast ref={toastRef} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/custom" element={ <Custom /> } />
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
