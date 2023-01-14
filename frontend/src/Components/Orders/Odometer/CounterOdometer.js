import React from 'react'
import './CounterOdometer.css'
import Odometer from 'react-odometerjs'


export const CounterOdometer = (props) => {

    return (
            <Odometer
              value={props.value}
              theme="custom"
              duration={500}
            />
    );
  }


