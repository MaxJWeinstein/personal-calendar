import { useState } from "react";
import Day from "./day";
import { daysInMonth } from "./day";

export default function MonthCalendar({
    month,
    year,
}: {
    month: number;
    year: number;
}) {
    const todayDate = new Date();
    const today = new Day(
        todayDate.getDate(),
        todayDate.getMonth(),
        todayDate.getFullYear()
    );
    const [selected, setSelected] = useState(today);
    let days: Day[][] = [[]];
    let totalDays = daysInMonth(month, year);
    for (let date = 1; date <= totalDays; date++) {
        let day = new Day(date, month, year);
        if (date !== 1 && day.getDayOfWeek() === 0) {
            days.push([]);
        }
        days[days.length - 1].push(day);
    }
    while (days[days.length - 1].length < 7) {
        let next = days[days.length - 1].at(-1).nextDay();
        days[days.length - 1].push(next);
    }
    while (days[0].length < 7) {
        let prev = days[0][0].prevDay();
        days[0].unshift(prev);
    }
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const calendar = {
        head: daysOfWeek.map((val) => (
            <th
                scope="col"
                key={val}
                className="flex justify-center bg-white py-2"
            >
                {val}
            </th>
        )),
        body: days.flat().map(
            (day, idx) => {
                let buttonStyle =
                    "flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10";
                let dateStyle = "ml-auto";
                if (day.getMonth() === month) {
                    buttonStyle += "bg-white";
                } else {
                    buttonStyle += "bg-gray-50";
                }
                if (day.equals(selected) || day.equals(today)) {
                    buttonStyle += "font-semibold";
                }
                if (day.equals(selected)) {
                    buttonStyle += "text-white";
                    dateStyle +=
                        "flex h-6 w-6 items-center justify-center rounded-full";
                } else if (day.equals(today)) {
                    buttonStyle += "text-indigo-600";
                    dateStyle += "bg-indigo-600";
                } else {
                    if (day.getMonth() === month) {
                        buttonStyle += "text-gray-900";
                    } else {
                        buttonStyle += "text-gray-500";
                    }
                    dateStyle += "bg-gray-900";
                }
                return (
                    <button key={idx} type="button" className={buttonStyle}>
                        <time dateTime={day.toString()} className={dateStyle}>
                            {day.getDate()}
                        </time>
                    </button>
                );
            } /**
            <span className="sr-only">2 events</span>
                <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                    <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                </span> */
        ),
    };
    return (
        <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
            <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
                {calendar.head}
            </div>
            <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
                <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
                    {calendar.body}
                </div>
            </div>
        </div>
    );
}
