import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Form, Input, Button, message, Space } from 'antd';
import whatsapp from "../whatsapp.png";
import facebook from "../facebook.png";
import insta from "../Insta.png";
import {Helmet} from "react-helmet";


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


    const iconStyle = {
        height: '72px',
        width: 'auto',
    };

    const iconStyleMedium = {
        width: '52px',
        height: 'auto',
    };

    const SocialIcons = () => {
        return (
            <div className="flex flex-row md:flex-col h-20 md:h-auto w-auto md:w-28 md:border-l-2 border-gray-300 pl-4 sticky top-0 gap-4 md:gap-0">
                <a href="https://www.facebook.com/p/Oxy-Vitale-61553602740795/">
                    <img src={facebook} alt="Facebook" style={iconStyle} className="md:hidden" />
                    <img src={facebook} alt="Facebook" style={iconStyleMedium} className="hidden md:inline-block" />
                </a>
                <a href="https://wa.me/32470841339">
                    <img src={whatsapp} alt="Whatsapp" style={iconStyle} className="md:hidden" />
                    <img src={whatsapp} alt="Whatsapp" style={iconStyleMedium} className="hidden md:inline-block" />
                </a>
                <a href="https://www.instagram.com/paradox_perspectives_/" target="_blank" rel="noopener noreferrer">
                    <img src={insta} alt="Instagram" style={iconStyle} className="md:hidden" />
                    <img src={insta} alt="Instagram" style={iconStyleMedium} className="hidden md:inline-block" />
                </a>
            </div>
        );
    };


    const googleMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2545.593501913679!2d5.493521555017086!3d50.35548680718067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c04f3dcfd7c73b%3A0xc2a744eb720127d2!2sOxyvitale%20Fitness!5e0!3m2!1snl!2sbe!4v1721588366495!5m2!1snl!2sbe";
    const googleMapsRedirectUrl = "https://www.google.com/maps/place/Oxyvitale+Fitness/@50.3554252,5.4947661,17z/data=!3m1!4b1!4m6!3m5!1s0x47c04f3dcfd7c73b:0xc2a744eb720127d2!8m2!3d50.3554252!4d5.4947661!16s%2Fg%2F11f76_04p4?entry=ttu";

    return (
        <div>
            <Helmet>
                <title>Oxy-vitale - Contacte</title>
            </Helmet>
            <div className="flex-row md:flex justify-center items-start py-6 px-4 gap-8 relative z-1 ">
                <div className="flex flex-col  w-full md:w-4/5 lg:w-2/3 xl:w-1/2">
                    <h1 className="text-2xl font-bold mb-4">Contactez-nous</h1>
                    <p>Vous souhaitez en savoir plus sur notre fonctionnement ?</p>
                    <p className="text-sm text-gray-600">Envoyez-nous un message en utilisant l'une des plateformes
                        fournies
                        ci-dessous et commencez la conversation !</p>
                    <p className="text-sm text-gray-600">Nous vous répondrons dans les 24 heures.</p>
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
                            label="Nom"
                            rules={[{required: true, message: 'Please input your name!'}]}
                        >
                            <Input/>
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
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name="message"
                            label="Message"
                            rules={[{required: true, message: 'Please input your message!'}]}
                        >
                            <Input.TextArea rows={4}/>
                        </Form.Item>

                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit" ghost>
                                    Envoie
                                </Button>
                                <Button htmlType="button" onClick={() => form.resetFields()}>
                                    Reset
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
                <br/>
                <SocialIcons/>
            </div>

            <div className="relative mx-auto pl-1 pr-1 md:pr-32 py-2 max-w-4xl pb-6" style={{height: '450px'}}>
                <h1 className="text-2xl font-bold mb-4">Trouvez-nous</h1>
                <iframe
                    src={googleMapUrl}
                    style={{border: 0, width: '100%', height: '100%'}}
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Map"
                ></iframe>
                <a
                    href={googleMapsRedirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-0 left-0 w-full h-full"
                    style={{textDecoration: 'none'}}
                >
                    <span className="sr-only">Open in Google Maps</span>
                </a>
                <br/>
                <br/>
            </div>
        </div>
    );
};

export default ContactPage;
