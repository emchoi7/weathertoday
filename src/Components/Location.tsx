import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function Location(props: { children: string, err: string | null }) {
    const locationContent = <div><span><FontAwesomeIcon icon={faLocationDot} /></span>{" " +props.children}</div>;
    return <div className={props.err ? "error" : ""}>
        {props.err 
            ?<div>
                <h3>{locationContent}</h3>
                <p>{props.err}</p>
            </div>
            : <h2>{locationContent}</h2>
        }
    </div>;
}