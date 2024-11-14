import { useEffect, useRef } from 'react';
import { HourlyTempObject } from './WeatherCard';
import HourlyRow from './HourlyRow';

export default function HourlyCard(props: { hourlyTemps: Array<HourlyTempObject>, error: Boolean }) {

    const currentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(currentRef.current) {
            currentRef.current.scrollIntoView();
        }
    }, []);

    let hourlyRows;
    if(!props.error) {
        hourlyRows = props.hourlyTemps.map((hourlyTemp, i) => <HourlyRow key={i} time={hourlyTemp.time} temp={hourlyTemp.temp} preProb={hourlyTemp.preProb} ref={currentRef} />);
    } else {
        <h3 className="error">There was an error fetching weather data.</h3>
    }
    return <div className={"hourly-card" + props.error ? " error" : ""}>
            <div className="flex-row label">
                <div className="flex-item"><p>Hour</p></div>
                <div className="flex-item"><p>Temp</p></div>
                <div className="flex-item"><p>Rain/Snow %</p></div>
            </div>
            <div className="scroll-container">
                {hourlyRows}
            </div>
        </div>
}