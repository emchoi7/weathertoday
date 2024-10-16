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


    return <div className="weather-card" style={{backgroundColor:"rgb(120, 239, 255)"}}>
        <h3>Wednesday, Oct 16</h3>
        
        <h2><span><FontAwesomeIcon icon={faLocationDot} /></span> Location?</h2>
        <h1>55 deg</h1>
        <h3>Raining</h3>

        <div className="hourly-card">
            <div className="flex-row label">
                <div className="flex-item"><p>Hour</p></div>
                <div className="flex-item"><p>Temp</p></div>
                <div className="flex-item"><p>Rain/Snow %</p></div>
            </div>
            <div className="scroll-container">
                <div className="flex-row past">
                    <div className="flex-item"><p>1:00AM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row past">
                    <div className="flex-item"><p>2:00AM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row past">
                    <div className="flex-item"><p>3:00AM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row past">
                    <div className="flex-item"><p>4:00AM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row past">
                    <div className="flex-item"><p>5:00AM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row past">
                    <div className="flex-item"><p>6:00AM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row past">
                    <div className="flex-item"><p>7:00AM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row past">
                    <div className="flex-item"><p>8:00AM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row past">
                    <div className="flex-item"><p>9:00AM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row past">
                    <div className="flex-item"><p>10:00AM</p></div>
                    <div className="flex-item"><p>52 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row current">
                    <div className="flex-item"><p>11:00AM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row">
                    <div className="flex-item"><p>12:00PM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row">
                    <div className="flex-item"><p>1:00PM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row">
                    <div className="flex-item"><p>2:00PM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row">
                    <div className="flex-item"><p>3:00PM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row">
                    <div className="flex-item"><p>4:00PM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row">
                    <div className="flex-item"><p>5:00PM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row">
                    <div className="flex-item"><p>6:00PM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row">
                    <div className="flex-item"><p>7:00PM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row">
                    <div className="flex-item"><p>8:00PM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row">
                    <div className="flex-item"><p>9:00PM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row">
                    <div className="flex-item"><p>10:00PM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
                <div className="flex-row">
                    <div className="flex-item"><p>11:00PM</p></div>
                    <div className="flex-item"><p>55 deg</p></div>
                    <div className="flex-item"><p>0%</p></div>
                </div>
            </div>
        </div>
    </div>
}