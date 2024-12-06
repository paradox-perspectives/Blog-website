import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Form, Input, Button, message, Space } from 'antd';
import { InstagramOutlined } from '@ant-design/icons';
import bmc from "../bmc-button.png";
import insta from "../Insta.png";


const ContactPage = () => {
    const formRef = useRef();
    const [form] = Form.useForm();

    const serviceId = process.env.REACT_APP_SERVICE_ID;
    const templateId = process.env.REACT_APP_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_PK_EMAIL;

    const onFinish = async (values) => {
        console.log("form", values);
        emailjs.send(serviceId, templateId, values, publicKey)
            .then((result) => {
                console.log(result.text);
                message.success('Message sent successfully!');
                form.resetFields();
            }, (error) => {
                console.log(error.text);
                message.error('Failed to send.');
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('Please fill all the required fields correctly!');
    };

    return (
        <div className="flex-row md:flex justify-center items-start py-6 px-4 gap-8 relative z-1">
            <div className="flex flex-col  w-full md:w-3/5">
                <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
                <p>Want To Enquire More Information About How We Work?</p>
                <p className="text-sm text-gray-600">Send us a message using any of the provided platforms underneath and start the conversation!</p>
                <p className="text-sm text-gray-600">We Will Get Back To You In 24 Hours.</p>
                <Form
                    ref={formRef}
                    form={form}
                    name="contact"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        name="user_name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="user_email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!'
                            },
                            {
                                type: 'email',
                                message: 'Please enter a valid email!',
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="message"
                        label="Message"
                        rules={[{ required: true, message: 'Please input your message!' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" ghost>
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={() => form.resetFields()}>
                                Reset
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
            <br/>
            <div className="w-72 md:border-l-2 border-gray-300 pl-4 sticky top-0 text-right">
                <a href="https://www.instagram.com/paradox_perspectives_/" target="_blank" rel="noopener noreferrer">
                    <img src={insta}/>
                </a>
                <a href="https://buymeacoffee.com/romeovhl">
                    <img src={bmc} alt="Buy Me a Coffee" style={{marginTop: '20px'}}/>
                </a>
            </div>
        </div>
    );
};

export default ContactPage;
