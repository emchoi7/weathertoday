import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function Location(props: { children: any, err: string | null }) {
    return <div className={props.err ? "error" : ""}>
        {props.err 
            ?<div>
                <h3><span><FontAwesomeIcon icon={faLocationDot} /></span>{props.children}</h3>
                <p>{props.err}</p>
            </div>
            : <h2><span><FontAwesomeIcon icon={faLocationDot} /></span>{props.children}</h2>
        }
    </div>;
}