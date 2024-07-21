import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

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
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Prix',
        dataIndex: 'price',
        key: 'price',
    },
];

const Prices = () => {

    return (
        <div className="container mx-auto px-4 py-4 max-w-4xl">
            <h2 className="text-center text-2xl font-bold mb-4">Abonnements</h2>
            <Table dataSource={dataSource} columns={columns} pagination={false} bordered/>
        </div>
    );
};

export default Prices;
