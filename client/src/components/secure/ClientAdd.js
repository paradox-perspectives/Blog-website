import React, { useEffect } from 'react';
import { Button, DatePicker, Form, Input, message } from 'antd';
import moment from 'moment';
import axios from "axios";

const { RangePicker } = DatePicker;

function ClientForm({ client }) {
    const [form] = Form.useForm();
    const apiUrl = process.env.REACT_APP_BACKEND_URL;

    // Populate form with client data when editing
    useEffect(() => {
        if (client) {
            // Set form fields if the client data is available
            form.setFieldsValue({
                first: client.first,
                last: client.last,
                email: client.email,
                number: client.number,
                date: client.date ? moment(client.date) : null, // Moment is used to handle DatePicker format
            });
        } else {
            form.setFieldsValue({
                date: moment(),
            });
        }
    }, [client, form]);

    // Handle form submission
    const handleSubmit = async (values) => {
        // Prepare client data as a JSON object
        const clientData = {
            first: values.first,
            last: values.last,
            email: values.email,
            number: values.number,
            date: values.date ? values.date.format('YYYY-MM-DD') : null,
        };
        console.log(clientData);

        try {
            let response;
            if (client) {
                // If client exists, perform an update using PUT
                response = await axios.put(`${apiUrl}/client/${client._id}`, clientData);
                console.log('Client updated:', response.data);
                message.success("Successfully updated client");
            } else {
                // If no client, perform a create using POST
                response = await axios.post(`${apiUrl}/client`, clientData);
                console.log('Client added:', response.data);
                message.success("Successfully added client");
            }

            // Redirect after successful operation
            window.location.hash = "#client";
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            message.error(error.response?.data || error.message)
        }
    };


    const addMonths = (months) => {
        let current = form.getFieldValue('date')
        if (current == null){
            current = moment()
        } else {
            current = moment(current)
        }
        const newDate = current.add(months, 'months');
        form.setFieldsValue({ date: newDate });
    };

    return (
        <Form
            form={form}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            onFinish={handleSubmit} // Form submission handler
        >
            <Form.Item
                label="First Name"
                name="first"
                rules={[
                    {
                        required: true,
                        message: 'Please input the first name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Last Name"
                name="last"
                rules={[
                    {
                        required: true,
                        message: 'Please input the last name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="E-mail"
                name="email"
                rules={[
                    {
                        required: true,
                        type: 'email',
                        message: 'Please input a valid email!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Telephone number"
                name="number"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Subscription enddate"
                name="date"
                rules={[
                    {
                        required: true,
                        message: 'Please select the end date!',
                    },
                ]}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 6,
                    span: 16,
                }}
            >
                <Button onClick={() => addMonths(1)} style={{ marginRight: 8 }}>
                    Add 1 Month
                </Button>
                <Button onClick={() => addMonths(3)} style={{ marginRight: 8 }}>
                    Add 3 Months
                </Button>
                <Button onClick={() => addMonths(12)}>
                    Add 1 Year
                </Button>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 6,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" ghost>
                    {client ? 'Update Client' : 'Add Client'}
                </Button>
            </Form.Item>
        </Form>
    );
}

export default ClientForm;
