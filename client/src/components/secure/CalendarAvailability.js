import React, { useState } from 'react';
import { Calendar, Checkbox, List, Button, Card } from 'antd';
import moment from 'moment';

const CalendarAvailability = () => {
    const [checkedOutDates, setCheckedOutDates] = useState([]);

    // Handle checkbox change to update the checked-out dates list
    const handleCheckboxChange = (value, checked) => {
        const formattedDate = value.format('YYYY-MM-DD');
        const newCheckedOutDates = checked
            ? [...checkedOutDates, formattedDate] // Add to list if checked
            : checkedOutDates.filter((date) => date !== formattedDate); // Remove from list if unchecked

        setCheckedOutDates(newCheckedOutDates);
    };

    // Custom rendering of dates in the calendar with checkboxes
    const dateCellRender = (value) => {
        const formattedDate = value.format('YYYY-MM-DD');
        const isCheckedOut = checkedOutDates.includes(formattedDate);

        return (
            <div className="custom-date-cell  center-text">
                {/* Date with Checkbox */}
                <Checkbox
                    checked={isCheckedOut}
                    onChange={(e) => handleCheckboxChange(value, e.target.checked)}
                >
                </Checkbox>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-4 max-w-4xl mb-8">
            <h2 className="text-center text-2xl font-bold mb-4">Monthly Calendar Availability</h2>

            {/* Calendar Component with custom date rendering */}
            <Card className="mb-4">
                <h3 className="text-xl font-semibold mb-4">Select Dates to Check Out</h3>
                <Calendar
                    dateCellRender={dateCellRender} // Render dates with custom visual feedback
                    fullscreen={true} // Display the full month view
                />
            </Card>

            {/* List of Checked-Out Dates */}
            <Card>
                <h3 className="text-xl font-semibold mb-4">Checked-Out Dates</h3>
                <List
                    bordered
                    dataSource={checkedOutDates}
                    renderItem={(date) => (
                        <List.Item>
                            {date}
                        </List.Item>
                    )}
                    locale={{ emptyText: 'No checked-out dates' }}
                />
                <Button
                    type="primary"
                    onClick={() => setCheckedOutDates([])}
                    disabled={checkedOutDates.length === 0}
                    className="mt-4"
                >
                    Clear All Checked-Out Dates
                </Button>
            </Card>
        </div>
    );
};

export default CalendarAvailability;
