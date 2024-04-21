import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "antd";
import {HomeOutlined} from "@ant-design/icons";


const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Button icon={<HomeOutlined/>} onClick={() => navigate('/')} size={"large"} >
                Go Home
            </Button>
        </div>
    );
};

export default NotFound;
