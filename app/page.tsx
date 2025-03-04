export default function Page() {
    return (
        <>
            <h1>Hello, Next.js!</h1>
            <Calendar numDays={31} firstDay={2} />
        </>
    );
}

function Calendar({ numDays, firstDay }) {
    // firstDay is an index into daysOfWeek
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let days = [[]];
    let totalDays = 0;
    for (let date = 1; date <= numDays; date++) {
        days[days.length - 1].push({ date, display: true });
        if ((date + firstDay) % 7 === 0) {
            days.push([]);
        }
    }
    while (days[days.length - 1].length < 7) {
        days[days.length - 1].push({ date: 0, display: false });
    }
    while (days[0].length < 7) {
        days[0].unshift({ date: 0, display: false });
    }
    const calendar = {
        head: daysOfWeek.map((val) => (
            <th scope="col" key={val}>
                {val}
            </th>
        )),
        body: days.map((row, rowNum) => (
            <tr>
                {row.map((day, colNum) => (
                    <td key={[rowNum, colNum].toString()}>
                        {day.display && day.date}
                    </td>
                ))}
            </tr>
        )),
    };
    return (
        <table>
            <thead>{calendar.head}</thead>
            <tbody>{calendar.body}</tbody>
        </table>
    );
}
