import React, { useEffect, useState, useRef } from "react";
import { CircleSlider } from "react-circle-slider";
import "./index.css";

function App() {
  const month = new Date().getMonth()+1;
  const year = new Date().getFullYear();
  let time = new Date(year, month, 0).getDate();
  const [value, changeValue] = useState(0);
  const [date, setDate] = useState(new Date().getDate());
  const [sliderColor, setSliderColor] = useState("#ec008c");

  const valueRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastValueRef = useRef(0);

  useEffect(() => {
    if (date % 2 === 0) {
      setSliderColor("#ec008c");
    } else {
      setSliderColor("#fc6767");
    }
  }, [date]);


  const handleSliderChange = (value) => {
  changeValue(value);
  if (value < lastValueRef.current) {
    isDraggingRef.current = true;
  }
  if (isDraggingRef.current && value >= 10) {
    setDate((prevDate) => (prevDate % time) + 1);
    isDraggingRef.current = false;
  }
  lastValueRef.current = value;
};
  return (
    <div className="container-fluid App">
      <div className="row">
        <div className="col-4">
          <div className="textContainer">
            {date}
            <div className="minute">Date</div>
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
      <div className="row">{date}--{time}---{month}</div>
    </div>
  );
}

export default App;
