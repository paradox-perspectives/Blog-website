import React, { useState } from 'react';
import { TimePicker, Button, Checkbox, message, Card } from 'antd';
import moment from 'moment';
import { ScheduleView } from 'react-schedule-view';
import { Helmet } from 'react-helmet';
import 'antd/dist/reset.css'; // Ant Design CSS reset

const defaultData = [
    { name: 'Monday', events: [] },
    { name: 'Tuesday', events: [] },
    { name: 'Wednesday', events: [] },
    { name: 'Thursday', events: [] },
    { name: 'Friday', events: [] },
    { name: 'Saturday', events: [] },
    { name: 'Sunday', events: [] },
];

const Availability = () => {
    const [availability, setAvailability] = useState(defaultData);

    // State to manage the time intervals for each day
    const [timeIntervals, setTimeIntervals] = useState(
        defaultData.map(() => ({
            morning: { startTime: moment('09:00', 'HH:mm'), endTime: moment('12:00', 'HH:mm'), available: true },
            evening: { startTime: moment('16:00', 'HH:mm'), endTime: moment('20:00', 'HH:mm'), available: true },
        }))
    );

    // Handle TimePicker changes
    const handleTimeChange = (time, dayIndex, interval) => {
        const newIntervals = [...timeIntervals];
        newIntervals[dayIndex][interval].startTime = time[0];
        newIntervals[dayIndex][interval].endTime = time[1];
        setTimeIntervals(newIntervals);
    };

    // Handle availability toggle
    const toggleAvailability = (dayIndex, interval) => {
        const newIntervals = [...timeIntervals];
        newIntervals[dayIndex][interval].available = !newIntervals[dayIndex][interval].available;
        setTimeIntervals(newIntervals);
    };

    // Confirm and display the schedule
    const confirmSchedule = () => {
        const newAvailability = availability.map((day, index) => {
            const dayEvents = [];

            // Morning Session
            if (timeIntervals[index].morning.available) {
                dayEvents.push({
                    startTime: timeIntervals[index].morning.startTime.hour(),
                    endTime: timeIntervals[index].morning.endTime.hour(),
                    title: 'Session du matin',
                    color: 'lightblue',
                });
            }

            // Evening Session
            if (timeIntervals[index].evening.available) {
                dayEvents.push({
                    startTime: timeIntervals[index].evening.startTime.hour(),
                    endTime: timeIntervals[index].evening.endTime.hour(),
                    title: 'Session du soir',
                    color: 'lightgreen',
                });
            }

            return { ...day, events: dayEvents };
        });

        setAvailability(newAvailability);
        console.log("availability", newAvailability);
        message.success('Schedule confirmed and updated!');
    };

    const customTheme = {
        timeFormatter: (time) => `${time}:00`,
        timeRangeFormatter: (startTime, endTime) => `${startTime}:00 - ${endTime}:00`,
        style: {
            root: { backgroundColor: '#fff' },
            dayLabels: { color: '#000', fontWeight: 'bold' },
            timeScaleLabels: { color: '#666' },
            majorGridlinesBorder: 'solid 1px #e0e0e0',
            minorGridlinesBorder: 'solid 1px #f0f0f0',
            verticalGridlinesBorder: 'solid 1px #e0e0e0',
        },
        hourHeight: '60px',
    };

    return (
        <div className="container mx-auto px-4 py-4 max-w-4xl mb-8">
            <Helmet>
                <title>Oxy-vitale - Set Availability</title>
            </Helmet>

            <h2 className="text-center text-2xl font-bold mb-4">Set Daily Availability</h2>
            <h4 className="text-center text-lg mb-4">Hit enter button after date</h4>

            {/* Availability Form */}
            {availability.map((day, index) => (
                <Card key={day.name} title={day.name} className="mb-4">
                    {/* Morning Time Picker */}
                    <div className="mb-2">
                        <Checkbox
                            checked={timeIntervals[index].morning.available}
                            onChange={() => toggleAvailability(index, 'morning')}
                            style={{marginRight: 8}}
                        >
                            Morning Session
                        </Checkbox>
                        <TimePicker.RangePicker
                            value={[timeIntervals[index].morning.startTime, timeIntervals[index].morning.endTime]}
                            onChange={(time) => handleTimeChange(time, index, 'morning')}
                            format="HH:mm"
                            disabled={!timeIntervals[index].morning.available}
                            allowClear={false}
                            minuteStep={30}
                            open={false}
                        />
                    </div>

                    {/* Evening Time Picker */}
                    <div>
                        <Checkbox
                            checked={timeIntervals[index].evening.available}
                            onChange={() => toggleAvailability(index, 'evening')}
                            style={{marginRight: 8}}
                        >
                            Evening Session
                        </Checkbox>
                        <TimePicker.RangePicker
                            value={[timeIntervals[index].evening.startTime, timeIntervals[index].evening.endTime]}
                            onChange={(time) => handleTimeChange(time, index, 'evening')}
                            format="HH:mm"
                            disabled={!timeIntervals[index].evening.available}
                            allowClear={false}
                            minuteStep={30}
                            open={false}
                        />
                    </div>
                </Card>
            ))}

            <div className="flex justify-center my-4">
                <Button type="primary" onClick={confirmSchedule} ghost>
                    Confirm Schedule
                </Button>
            </div>

            {/* Schedule View */}
            <div className="mt-8">
                <h2 className="text-center text-2xl font-bold mb-4">Weekly Schedule</h2>
                    <ScheduleView daySchedules={availability} viewStartTime={9} viewEndTime={21} theme={customTheme}/>
            </div>
        </div>
    );
};

export default Availability;
