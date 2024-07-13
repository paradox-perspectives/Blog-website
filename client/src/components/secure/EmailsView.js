import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "antd";
import { CopyOutlined } from '@ant-design/icons';

function EmailsView() {
    const [emails, setEmails] = useState([]);

    const apiUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        fetchEmails();
    }, []);

    const fetchEmails = (themes = [], searchTerm = '') => {
        const url = `${apiUrl}/mail`;

        axios.get(url)
            .then(response => {
                setEmails(response.data);
                console.log("emails", emails)
            })
            .catch(error => {
                setEmails([]);
            });
    };

    const copyToClipboard = () => {
        const emailList = emails.join(', ');
        navigator.clipboard.writeText(emailList)
            .then(() => {
                alert("Emails copied to clipboard!");
            })
            .catch(err => {
                console.error("Could not copy text: ", err);
            });
    };

    return (
        <div>
            <h1 className="text-xl font-bold">Email List</h1>
            <br/>
            <ul>
                {emails.map((email, index) => (
                    <li key={index}>{email}</li>
                ))}
            </ul>
            <br/>
            <Button icon={<CopyOutlined/>} onClick={copyToClipboard}></Button>
        </div>
    );

}

export default EmailsView;