import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import {Helmet} from "react-helmet";

const dataSource = [
    {
        key: '1',
        type: '1 Mois',
        price: '45€',
    },
    {
        key: '2',
        type: '3 Mois',
        price: '120€',
    },
    {
        key: '3',
        type: '1 An',
        price: '500€',
    },
    {
        key: '4',
        type: '',
        price: '',
    },
    {
        key: '5',
        type: 'Pass Journée',
        price: '10€',
    },
    {
        key: '6',
        type: 'Carte 10 Séances',
        price: '120€',
    },
    {
        key: '7',
        type: 'Étudiants',
        price: '10% de réduction',
    },
];

const columns = [
    {
        title: <span className="text-lg">Type</span>,
        dataIndex: 'type',
        key: 'type',
        render: (text) => <span className="text-lg">{text}</span>,
    },
    {
        title: <span className="text-lg">Prix</span>,
        dataIndex: 'price',
        key: 'price',
        render: (text) => <span className="text-lg">{text}</span>,
    },
];

const Prices = () => {

    return (
        <div className="container mx-auto px-4 py-4 max-w-4xl">
            <Helmet>
                <title>
                    Oxy-vitale - Tarifs
                </title>
            </Helmet>
            <h2 className="text-center text-2xl font-bold mb-4">Abonnements</h2>
            <Table size={"large"} dataSource={dataSource} columns={columns} pagination={false} bordered/>
        </div>
    );
};

export default Prices;
