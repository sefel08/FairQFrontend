import React, { useState } from "react";
import styles from "./Slider.module.css";

const Slider = ({ 
    title, 
    min = 0, 
    max = 100, 
    step = 1, 
    unit = "%", 
    initialValue,
    onConfirm
}) => {
    
    const [value, setValue] = useState(initialValue ?? Math.floor(max / 2));

    return (
        <div className={styles.sliderComponent}>
            {title && <h3 className={styles.label}>{title}</h3>}
            
            <div className={styles.displayArea}>
                <span className={styles.value}>{value}</span>
                <span className={styles.unit}>{unit}</span>
            </div>

            <input 
                type="range" 
                className={styles.rangeInput}
                min={min} 
                max={max} 
                step={step}
                value={value} 
                onChange={(e) => setValue(e.target.value)}
            />

            <div className={styles.rangeInfo}>
                <span>{min}{unit}</span>
                <span>{max}{unit}</span>
            </div>

            <button 
                className={styles.actionButton} 
                onClick={() => onConfirm(Number(value))}
            >
                Ustaw wartość
            </button>
        </div>
    );
};

export default Slider;