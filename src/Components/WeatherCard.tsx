import React, {useState} from 'react';

import './WeatherCard.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


export default function WeatherCard() {
    const today = new Date();
    const location = {
        latitude: 0,
        longitude: 0
    };


    return <div className="weather-card">
        <h3>Wednesday, Oct 16</h3>
        <h2><span><FontAwesomeIcon icon={faLocationDot} /></span> Location?</h2>
        <h1>55 deg</h1>
        <h2>Raining</h2>

        <div className="container">
            <div className="flex-row">
                <p>Hour</p>
                <p>Temp</p>
                <p>Precipitation %</p>
            </div>
            <div className="flex-row">
                <p>10:00AM</p>
                <p>52 deg</p>
                <p>0%</p>
            </div>
            <div className="flex-row current">
                <p>11:00AM</p>
                <p>55 deg</p>
                <p>0%</p>
            </div>
            <div className="flex-row">
                <p>12:00PM</p>
                <p>55 deg</p>
                <p>0%</p>
            </div>
            <div className="flex-row">
                <p>1:00PM</p>
                <p>55 deg</p>
                <p>0%</p>
            </div>
        </div>
    </div>;
}