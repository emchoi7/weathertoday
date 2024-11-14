import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function Location(props: { children: any, err: any }) {

    return <div style={props.err ? {backgroundColor: "red", padding: "5px"} : {}}>
        <h2 style={props.err ? {fontSize: "1.5rem"} : {}}><span><FontAwesomeIcon icon={faLocationDot} /></span> {props.children}</h2>
        {props.err ? <p>There was an error fetching the location name.</p> : null}
    </div>;
}