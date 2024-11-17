import { useEffect, useRef, useContext } from 'react';
import { weatherErrorContext } from './WeatherCard';
import { HourlyTempObject } from './WeatherCard';
import HourlyRow from './HourlyRow';
import { Oval } from 'react-loader-spinner';

export default function HourlyCard(props: { hourlyTemps: Array<HourlyTempObject> }) {

    const error = useContext(weatherErrorContext);
    const currentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(currentRef.current) {
            currentRef.current.scrollIntoView();
        }
    }, []);

    if(error) {
        return <div className="hourly-card error">
            <p>There was an error fetching weather data.</p>
            <p>{error}</p>
        </div>
    }

    let hourlyRows = props.hourlyTemps 
        ? props.hourlyTemps.map((hourlyTemp, i) => <HourlyRow key={i} time={hourlyTemp.time} temp={hourlyTemp.temp} preProb={hourlyTemp.preProb} ref={currentRef} />)
        : <Oval
        visible={true}
        height="30"
        width="30"
        strokeWidth="8"
        color="white"
        secondaryColor="black"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
    />;
    return <div className="hourly-card">
            <div className="flex-row label">
                <div className="flex-item"><p>Hour</p></div>
                <div className="flex-item"><p>Temp</p></div>
                <div className="flex-item"><p>Rain/Snow %</p></div>
            </div>
            <div className="scroll-container">
                <div>{hourlyRows}</div>
            </div>
        </div>
}