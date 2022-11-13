import React from 'react';
import { MdDeleteForever, MdEdit, MdCheckCircleOutline, MdVisibility } from 'react-icons/md';

function Transaction({ transaction }) {

    return (

        <tr>
            <td>{transaction.name}</td>
            <td>{transaction.category}</td>

            <td>{transaction.amount}</td>
            <td>{transaction.date}</td>
            <td><MdEdit /></td>
            <td><MdDeleteForever /></td>
        </tr>
    );
}

export default Transaction;