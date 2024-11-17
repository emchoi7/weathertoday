import { useContext } from 'react';
import { locationErrorContext } from './WeatherCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function Location(props: { children: string }) {
    const error = useContext(locationErrorContext);
    const locationContent = <div><span><FontAwesomeIcon icon={faLocationDot} /></span>{" " +props.children}</div>;
    return <div className={error ? "error" : ""}>
        {error 
            ?<div>
                <h3>{locationContent}</h3>
                <p>{error}</p>
            </div>
            : <h2>{locationContent}</h2>
        }
    </div>;
}