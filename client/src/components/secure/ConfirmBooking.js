import React from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Input, Button, Card } from 'antd';

const ConfirmBooking = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const date = searchParams.get('date');
    const slot = searchParams.get('slot');

    // Handle form submission
    const onFinish = (values) => {
        console.log('Success:', values);
        // Here, you can add the code to submit the booking details, such as an API call

        // TODO check nog eens of het slot effectief vrij is en block da dan  ff
        // werk met de messages en opt einde me een duidelijke danku voor booking pagina, ga home page bla bla

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="container mx-auto px-4 py-4 max-w-4xl mb-8">
            <h2 className="text-center text-2xl font-bold mb-4">Confirm Your Booking</h2>
            <p className="text-lg text-center mb-6">
                You are booking for {date} during the {slot} slot.
            </p>

            {/* Form to collect user details */}
            <Card>
                <Form
                    name="bookingForm"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    {/* First Name Field */}
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[
                            { required: true, message: 'Please enter your first name!' },
                        ]}
                    >
                        <Input placeholder="Enter your first name" />
                    </Form.Item>

                    {/* Last Name Field */}
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[
                            { required: true, message: 'Please enter your last name!' },
                        ]}
                    >
                        <Input placeholder="Enter your last name" />
                    </Form.Item>

                    {/* Email Address Field */}
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email address!' },
                            { type: 'email', message: 'Please enter a valid email address!' },
                        ]}
                    >
                        <Input placeholder="Enter your email address" />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-1/2" block ghost>
                            Confirm Booking
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ConfirmBooking;
