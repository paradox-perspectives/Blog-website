import React, {useEffect, useState} from 'react';
import {Table, Button, Tag, Popconfirm, message} from 'antd';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

// Table component
const Clients = () => {
    const [data, setData] = useState([]);  // Move useState inside the component

    useEffect(() => {
        axios.get(`${apiUrl}/client/`)
            .then((response) => setData(response.data))
            .catch((error) => console.error(error));
    }, []);  // Move useEffect inside the component

    // Function to calculate validity and return color status
    const getValidityStatus = (date) => {
        const expirationDate = moment(date);
        const today = moment();
        const daysDiff = expirationDate.diff(today, 'days');

        if (daysDiff > 30) {
            return { color: 'green', label: 'Valid  > 1M' };
        } else if (daysDiff > 0 && daysDiff <= 30) {
            return { color: 'orange', label: 'Valid  < 1M' };
        } else {
            return { color: 'red', label: 'Expired' };
        }
    };

    // Columns definition
    const columns = [
        {
            title: 'Validity',
            dataIndex: 'date',
            sorter: (a, b) => {
                const aStatus = getValidityStatus(a.date);
                const bStatus = getValidityStatus(b.date);
                return aStatus.color.localeCompare(bStatus.color); // Sort by color (red first)
            },
            render: (date) => {
                const { color, label } = getValidityStatus(date);
                return <Tag color={color}>{label}</Tag>;
            },
        },
        {
            title: 'First Name',
            dataIndex: 'first',
            sorter: (a, b) => a.first.localeCompare(b.first),
        },
        {
            title: 'Last Name',
            dataIndex: 'last',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Telephone',
            dataIndex: 'number',
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record._id)}
                        ghost
                        style={{ marginRight: 8 }}
                    >
                        Edit
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                    >
                        <Popconfirm
                            title="Are you sure you want to delete this client?"
                            onConfirm={() => handleDelete(record._id)}
                            okText="Yes"
                            cancelText="No"
                            okButtonProps={{
                                ghost: true, // Make the "Yes" button a ghost button
                            }}
                        >
                            Delete
                        </Popconfirm>
                    </Button>
                </>
            ),
        }

    ];

    // Function to handle edit button click
    const handleEdit = (id) => {
        window.location.hash = `/client/edit/${id}`;
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/client/${id}`);
            // Optionally, update the table data after deleting
            setData((prevData) => prevData.filter((client) => client._id !== id));
            console.log(`Client with id ${id} deleted successfully`);
            message.success("Successfully deleted client");
        } catch (error) {
            console.error(`Error deleting client with id ${id}:`, error);
        }
    };


    return (
        <Table
            columns={columns}
            dataSource={data.map((client) => ({ ...client, key: client._id }))} // Use _id as key
            onChange={(pagination, filters, sorter, extra) => {
                console.log('params', pagination, filters, sorter, extra);
            }}
        />
    );
};

export default Clients;
