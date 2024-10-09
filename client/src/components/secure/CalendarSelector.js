import React, { useState, useEffect } from 'react';
import { Calendar, Button, Card, Row, Col, message, Badge } from 'antd';
import moment from 'moment';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const CalendarSelector = () => {
    const today = moment().startOf('day').format('YYYY-MM-DD'); // Store date as a string in 'YYYY-MM-DD'
    const [weeklyAvailability, setWeeklyAvailability] = useState([]);
    const [blockedDates, setBlockedDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(today); // Use string format for selected date
    const [availableSlots, setAvailableSlots] = useState([]);

    // Fetch weekly availability and blocked dates
    useEffect(() => {
        fetchAvailabilityData();
    }, []);

    const fetchAvailabilityData = () => {
        axios
            .get(`${apiUrl}/availability/week`)
            .then((response) => {
                setWeeklyAvailability(response.data);
            })
            .catch((error) => {
                console.error('Error fetching weekly availability:', error);
                message.error('Failed to load weekly availability data.');
            });

        axios
            .get(`${apiUrl}/availability/dates`)
            .then((response) => {
                setBlockedDates(response.data);
            })
            .catch((error) => {
                console.error('Error fetching blocked dates:', error);
                message.error('Failed to load blocked dates.');
            });
    };

    const handleDateSelect = (date) => {
        if (!date || !moment.isMoment(date)) return;

        const newDate = date.clone().startOf('day').format('YYYY-MM-DD'); // Convert to string
        setSelectedDate(newDate);

        if (blockedDates.includes(newDate)) {
            message.warning(`The selected date ${newDate} is blocked!`);
            setAvailableSlots([]); // Clear slots for blocked dates
        } else {
            determineAvailableSlots(newDate);
        }
    };

    const determineAvailableSlots = (dateStr) => {
        if (!dateStr) return;

        const date = moment(dateStr, 'YYYY-MM-DD'); // Convert string back to moment
        const dayOfWeek = date.format('dddd').toLowerCase();
        const dayAvailability = weeklyAvailability.find((day) => day.day === dayOfWeek);

        if (!dayAvailability || (!dayAvailability.morning && !dayAvailability.evening)) {
            setAvailableSlots([]);
            return;
        }

        const slots = [];

        const generateSlots = (startTime, endTime) => {
            const start = moment(startTime, 'HH:mm');
            const end = moment(endTime, 'HH:mm');
            while (start.isBefore(end)) {
                const slotEnd = start.clone().add(1, 'hours');
                slots.push(`${start.format('HH:mm')} - ${slotEnd.format('HH:mm')}`);
                start.add(1, 'hours');
            }
        };

        if (dayAvailability.morning) {
            generateSlots(dayAvailability.morning.start, dayAvailability.morning.end);
        }

        if (dayAvailability.evening) {
            generateSlots(dayAvailability.evening.start, dayAvailability.evening.end);
        }

        setAvailableSlots(slots);
    };

    // Custom cell rendering to display blocked dates and special indications
    const cellRender = (value) => {
        const formattedDate = value.format('YYYY-MM-DD');
        const isBlocked = blockedDates.includes(formattedDate);
        return isBlocked ? <Badge status="error" text="Blocked" /> : null;
    };

    return (
        <div className="container mx-auto px-4 py-4 max-w-4xl mb-8">
            <h2 className="text-center text-2xl font-bold mb-4">Select a Date to View Available Slots</h2>

            {/* Calendar Component */}
            <Card className="mb-4">
                <h3 className="text-xl font-semibold mb-4">Pick a Date</h3>
                <Calendar
                    value={moment(selectedDate, 'YYYY-MM-DD')} // Convert string date back to moment
                    onSelect={handleDateSelect} // Handle date selection from the calendar
                    cellRender={cellRender} // Use the new `cellRender` for custom cell rendering
                    fullscreen={true} // Show the full calendar view
                />
            </Card>

            {/* Display Available Slots or a Message */}
            <Card>
                <h3 className="text-xl font-semibold mb-4">Available Slots for {selectedDate ? selectedDate : 'Selected Day'}</h3>

                {availableSlots.length > 0 ? (
                    <Row gutter={[16, 16]}>
                        {availableSlots.map((slot, index) => (
                            <Col key={index} span={6}>
                                <Button type="primary" style={{ width: '100%' }}>
                                    {slot}
                                </Button>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div className="text-center text-lg font-semibold text-red-500">Fully Booked</div>
                )}
            </Card>
        </div>
    );
};

export default CalendarSelector;
