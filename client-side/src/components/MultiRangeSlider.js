import React, { useState, useRef, useEffect, useCallback } from 'react'
import propTypes from "prop-types"
import '../MultiRangeSlider.css'

const MultiRangeSlider = ({ min, max, onChange }) => {

    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const range = useRef(null);
    const minValRef = useRef(null);
    const maxValRef = useRef(null);

    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);
    
        if (range.current) {
          range.current.style.left = `${minPercent}%`;
          range.current.style.width = `${maxPercent - minPercent}%`;
        }
      }, [minVal, getPercent]);
    
      useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);
    
        if (range.current) {
          range.current.style.width = `${maxPercent - minPercent}%`;
        }
      }, [maxVal, getPercent]);

      useEffect(() => {
        console.log("min:", minVal, " max:", maxVal);
      }, [minVal, maxVal, onChange]);
    
  return (
    <div>
    
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(e) => {
            const value = Math.min(Number(e.target.value), maxVal);
            setMinVal(value);
            minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={(e) => {
            const value = Math.max(Number(e.target.value), minVal);
            setMaxVal(value);
            maxValRef.current = value;
        }}
        className="thumb thumb--right"
        />
      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
      </div>
      <div className="values">
        <div className="slider__left-value">{minVal}</div>
        <div className="slider__right-value">{maxVal}</div>
      </div>
    </div>
  )
}
MultiRangeSlider.propTypes = {
    min: propTypes.number.isRequired,
    max: propTypes.number.isRequired,
    onChange: propTypes.func.isRequired
}
export default MultiRangeSlider