// date obj processed into string
export default function Header(props: {
    date: Date;
}) {
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    props.date.toLocaleDateString("en-US", options);
    return <h2></h2>
}