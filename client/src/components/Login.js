import React, {useState} from 'react';
import {Button, Checkbox, Form, Input, message} from 'antd';
import axios from 'axios';
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [loading, setLoading] = useState(false);
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const signIn = useSignIn();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        axios.post(`${apiUrl}/users/login`, {
            identifier: values.username,
            password: values.password
        },{ withCredentials: true })
            .then(response => {
                console.log("response: ", response.data);
                message.success(response.data.message);

                if(signIn({
                    auth: {
                        token: response.data.token,
                        type: 'Bearer'
                    },
                    userState: {
                        name: values.username
                    }
                })){
                    console.log("sign in succes");
                    navigate('/secure');
                }else {
                    console.log("sign in errorrrrrrr")
                }



            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data.message);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Errorrr: " + error.message);
                }
            })
            .finally(() => {
                setLoading(false);
                setTimeout(() => {
                    setLoading(true);
                }, 2000);
            });
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 600}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit" ghost>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
export default Login;