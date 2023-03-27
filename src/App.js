import React from "react";
import CurrentDate from "./components/Date";
import CurrentMonth from "./components/Month";
import CurrentYear from "./components/Year";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
AOS.init();
export default function App() {
  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <CurrentDate />
        <CurrentMonth />
        <CurrentYear />
      </div>
    </div>
  );
}
