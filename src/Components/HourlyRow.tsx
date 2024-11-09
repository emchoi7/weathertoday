import { forwardRef, LegacyRef } from 'react';

const HourlyRow = forwardRef(function HourlyRow(props: {
    time: Date;
    temp: number;
    preProb: number;
}, ref: LegacyRef<HTMLDivElement>  ) {

    let containerClassName = "flex-row";
    const currentHour = new Date(Date.now()).getHours();

    if(props.time.getHours() < currentHour) {
        containerClassName += " past";
        ref = null;
    } else if (props.time.getHours() === currentHour) {
        containerClassName += " current";
    } else {
        ref = null;
    }

    let hourFormat:string = "0:00 AM";
    if(props.time.getHours() < 12) {
        hourFormat = props.time.getHours().toString() + ":00 AM";
    } else if(props.time.getHours() > 12) {
        hourFormat = (props.time.getHours() - 12).toString() + ":00 PM";
    } else if (props.time.getHours() === 12) {
        hourFormat = props.time.getHours().toString() + ":00 PM";
    }

 return <div ref={ref} className={containerClassName}>
        <div className="flex-item"><p>{hourFormat}</p></div>
        <div className="flex-item"><p>{Math.round(props.temp)} &deg;</p></div>
        <div className="flex-item"><p>{props.preProb}%</p></div>
    </div>
});

export default HourlyRow;