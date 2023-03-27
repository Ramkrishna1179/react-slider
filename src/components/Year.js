import React, { useEffect, useState, useRef } from "react";
import { CircleSlider } from "react-circle-slider";
import "../index.css";

function CurrentYear() {
  // Get the current year and the last year in the current month
  const currentYear = new Date().getFullYear();
  const lastYearInMonth = new Date(
    currentYear,
    new Date().getMonth(),
    0
  ).getFullYear();

  const [sliderValue, setSliderValue] = useState(5);
  const [year, setYear] = useState(currentYear);
  const [sliderColor, setSliderColor] = useState("#ec008c");
  const isDraggingRef = useRef(false);
  const lastSliderValueRef = useRef(
    Math.floor(((year - 1) / lastYearInMonth) * 10)
  );
  // console.log(currentYear,lastYearInMonth,lastSliderValueRef)
  // Update the slider color based on the current year
  useEffect(() => {
    if (year % 2 === 0) {
      setSliderColor("#ec008c");
    } else {
      setSliderColor("#fc6767");
    }
  }, [year]);

  // Handle changes to the slider value
  const handleSliderChange = (newValue) => {
    setSliderValue(newValue);

    if (newValue < lastSliderValueRef.current) {
      isDraggingRef.current = true;
    }

    if (isDraggingRef.current && newValue >= 10) {
      incrementYear();
      isDraggingRef.current = false;
    } else if (isDraggingRef.current && newValue <= 0) {
      decrementYear();
      isDraggingRef.current = false;
    }

    lastSliderValueRef.current = newValue;
  };

  // Increment the current year
  const incrementYear = () => {
    setYear((prevYear) => prevYear + 1);
  };

  // Decrement the current year
  const decrementYear = () => {
    setYear((prevYear) => (prevYear - 1 < 1 ? lastYearInMonth : prevYear - 1));
  };

  return (
    <div className="col-4 col-lg-4 col-md-4 col-sm-8 mx-auto App">
      <div className="shadow shadow-lg rounded my-3 py-4" data-aos="fade-up-left" data-aos-delay="50"
    data-aos-duration="2000">
        <div className="textContainer">
          {year}
          <div className="minute">Year</div>
        </div>
        <CircleSlider
          value={sliderValue}
          stepSize={1}
          onChange={handleSliderChange}
          size={250}
          max={10}
          progressColor={sliderColor}
          knobRadius={20}
          circleWidth={20}
        />
      </div>
    </div>
  );
}

export default CurrentYear;
