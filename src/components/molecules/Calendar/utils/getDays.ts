const createClamp = (min: number, max: number): ((num: number) => number) => {
	return (num) => {
		if (num < min) return max;
		if (num > max) return min;
		return num;
	};
};

type fillMonthT = (
	days: Date[],
	prevMonth: Date[],
	nextMonth: Date[]
) => Date[];
const fillMonth: fillMonthT = (days, prevMonth, nextMonth) => {
	/**
	 * @params array of days
	 * @returns array of days with blank spaces filled with null
	 */
	const firstDay = days[0].getDay();
	const finalDay = days[days.length - 1].getDay();

	prevMonth = prevMonth.reverse();

	const startDates: Date[] = [];
	const clamp = createClamp(0, 6);
	for (let i = clamp(firstDay - 1) - 1; i >= 0; i--) {
		startDates.push(prevMonth[i]);
	}
	days = [...startDates, ...days];

	const endDates: Date[] = [];
	for (let i = 0; i < clamp(7 - finalDay); i++) {
		endDates.push(nextMonth[i]);
	}
	days = [...days, ...endDates];
	return days;
};

const getDatesOfMonth = (date: Date): Date[] => {
	const daysOfMonth: Date[] = [];
	const month = date.getMonth();
	while (date.getMonth() === month) {
		let current = new Date(date);
		daysOfMonth.push(current);
		date.setDate(date.getDate() + 1);
	}
	return daysOfMonth;
};

type addMonthsT = (date: Date, numOfMonths: number) => Date;
const addMonths: addMonthsT = (date, numOfMonths) => {
	const dateCopy = new Date(date.getTime());

	dateCopy.setMonth(dateCopy.getMonth() + numOfMonths);

	return dateCopy;
};

type getDaysT = (year: number, month: number) => Date[];
export const getDays: getDaysT = (year, month) => {
	/**
	 * @params
	 *    [year:int] with current year
	 *    [month:int] with current month
	 * @returns an array with all days in current month
	 */
	const date = new Date(year, month, 1);
	const prevMonth = new Date(addMonths(date, -1));
	const nextMonth = new Date(addMonths(date, 1));
	let days: Date[] = [];
	while (date.getMonth() === month) {
		let current = new Date(date);
		days.push(current);
		date.setDate(date.getDate() + 1);
	}
	const prevDates = getDatesOfMonth(prevMonth);
	const nextDates = getDatesOfMonth(nextMonth);

	days = fillMonth(days, prevDates, nextDates);

	return days;
};
