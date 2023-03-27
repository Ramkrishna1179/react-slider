import React, { useEffect, useState, useRef } from "react";
import { CircleSlider } from "react-circle-slider";
import "../index.css";
function CurrentMonth() {
  const year = new Date().getFullYear();
  const presentmonth = new Date().getMonth() + 1;
  const currentMonth = new Date(year, presentmonth, 0).getMonth();
  const [value, changeValue] = useState(5);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [sliderColor, setSliderColor] = useState("#ec008c");
   const isDraggingRef = useRef(false);
  const lastValueRef = useRef(Math.floor(((month - 1) / currentMonth) * 10));
  useEffect(() => {
    if (month % 2 === 0) {
      setSliderColor("#ec008c");
    } else {
      setSliderColor("#fc6767");
    }
  }, [month]);
  const handleSliderChange = (value) => {
    changeValue(value);
    if (value < lastValueRef.current) {
      isDraggingRef.current = true;
    }
    if (isDraggingRef.current && value >= 10 && month < 12) {
      setMonth((prevDate) => prevDate + 1);
      isDraggingRef.current = false;
    } else if (isDraggingRef.current && value <= 0) {
      // debugger
      setMonth((prevDate) => (prevDate - 1 < 1 ? '1' : prevDate - 1));
      isDraggingRef.current = false;
    }
    lastValueRef.current = value;
  };
  return (
    <div className="col-4 col-lg-4 col-md-4 col-sm-8 mx-auto App">
     <div className="shadow shadow-lg rounded my-3 py-4" data-aos="fade-down" data-aos-delay="50"
    data-aos-duration="2000">
     <div className="textContainer">
        {month}
        <div className="minute">Month</div>
      </div>
      <CircleSlider
        value={value}
        stepSize={1}
        onChange={handleSliderChange}
        size={250}
        max={10}
        gradientColorFrom={sliderColor}
        gradientColorTo={sliderColor}
        knobRadius={20}
        circleWidth={20}
      />
     </div>
    </div>
  );
}
export default CurrentMonth;
