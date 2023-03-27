import React, { useEffect, useState, useRef } from "react";
import { CircleSlider } from "react-circle-slider";
import "../index.css";

function CurrentDate() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const currentDate = new Date(year, month, 0).getDate();
  const [value, changeValue] = useState(5);
  const [date, setDate] = useState(new Date().getDate());
  const [sliderColor, setSliderColor] = useState("#ec008c");
  const isDraggingRef = useRef(false);
  const lastValueRef = useRef(Math.floor(((date - 1) / currentDate) * 10));

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
      setDate((prevDate) => (prevDate % currentDate) + 1);
      isDraggingRef.current = false;
    } else if (isDraggingRef.current && value <= 0) {
      setDate((prevDate) => (prevDate - 1 < 1 ? currentDate : prevDate - 1));
      isDraggingRef.current = false;
    }
    lastValueRef.current = value;
  };

  return (
    <div className="col-4 col-lg-4 col-md-4 col-sm-8 mx-auto App">
      <div
        className="shadow shadow-lg rounded my-3 py-4"
        data-aos="fade-up-right"
        data-aos-delay="50"
        data-aos-duration="2000"
      >
        <div className="textContainer">
          {date}
          <div className="minute">Date</div>
        </div>
        <CircleSlider
          value={value}
          stepSize={1}
          onChange={handleSliderChange}
          size={window.innerWidth < 576 ? 200 : 250}
          max={10}
          progressColor={sliderColor}
          knobRadius={window.innerWidth < 576 ? 15 : 20}
          circleWidth={window.innerWidth < 576 ? 10 : 20}
        />
      </div>
    </div>
  );
}

export default CurrentDate;
