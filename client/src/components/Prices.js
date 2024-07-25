import React, { useState, useEffect } from 'react';
import { ScheduleView } from 'react-schedule-view';
import {Helmet} from "react-helmet";


const data = [
    {
        name: 'Lundi',
        events: [
            { startTime: 9, endTime: 12, title: 'Session du matin', color: 'lightblue' },
            { startTime: 16, endTime: 20, title: 'Session du soir', color: 'lightgreen' },
        ],
    },
    {
        name: 'Mardi',
        events: [
            { startTime: 9, endTime: 12, title: 'Session du matin', color: 'lightblue' },
            { startTime: 16, endTime: 20, title: 'Session du soir', color: 'lightgreen' },
        ],
    },
    {
        name: 'Mercredi',
        events: [{ startTime: 15, endTime: 21, title: 'Session du soir', color: 'lightgreen' }],
    },
    {
        name: 'Jeudi',
        events: [
            { startTime: 9, endTime: 12, title: 'Session du matin', color: 'lightblue' },
            { startTime: 16, endTime: 20, title: 'Session du soir', color: 'lightgreen' },
        ],
    },
    {
        name: 'Vendredi',
        events: [{ startTime: 15, endTime: 20, title: 'Session du soir', color: 'lightgreen' }],
    },
    {
        name: 'Samedi',
        events: [{ startTime: 9, endTime: 12, title: 'Session du matin', color: 'lightblue' }],
    },
    {
        name: 'Dimanche',
        events: [],
    },
];

const TimeTable = () => {
    const [currentDayIndex, setCurrentDayIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const updateView = () => {
        setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        window.addEventListener('resize', updateView);
        return () => window.removeEventListener('resize', updateView);
    }, []);

    const prevDay = () => {
        setCurrentDayIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
    };

    const nextDay = () => {
        setCurrentDayIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
    };

    const currentDay = data[currentDayIndex];

    const customTheme = {
        timeFormatter: (time) => `${time}:00`,
        timeRangeFormatter: (startTime, endTime) => `${startTime}:00 - ${endTime}:00`,

        style: {
            root: {
                backgroundColor: '#fff',
            },
            dayLabels: {
                color: '#000',
                fontWeight: 'bold',
            },
            timeScaleLabels: {
                color: '#666',
            },
            majorGridlinesBorder: 'solid 1px #e0e0e0',
            minorGridlinesBorder: 'solid 1px #f0f0f0',
            verticalGridlinesBorder: 'solid 1px #e0e0e0',
        },
        hourHeight: '60px',
    };

    return (
        <div className="container mx-auto px-4 py-4 max-w-4xl mb-8">
            <Helmet>
                <title>
                    Oxy-vitale - Heures d'ouverture
                </title>
            </Helmet>
            <h2 className="text-center text-2xl font-bold mb-4">Heures d'ouverture </h2>
            {isMobile ? (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={prevDay} className="p-2 bg-gray-300 rounded">←</button>
                        <button onClick={nextDay} className="p-2 bg-gray-300 rounded">→</button>
                    </div>
                    <ScheduleView daySchedules={[currentDay]} viewStartTime={9} viewEndTime={21}/>
                </div>
            ) : (
                <ScheduleView daySchedules={data} viewStartTime={9} viewEndTime={21} theme={customTheme}/>
            )}
        </div>
    );
};

export default TimeTable;
