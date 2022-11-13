import React from 'react';
import { MdDeleteForever, MdEdit, MdCheckCircleOutline, MdVisibility } from 'react-icons/md';
import { useState, useEffect } from 'react';

function Budget({ budget, onDelete, onEdit, handleDelete, onView }) {
    const [transactions, setTransactions] = useState([])

    const loadTransactions = async () => {
        const response = await fetch(`/transaction`)      //is a promise     
        const transactionData = await response.json();     // also a promise
        console.log(transactionData)
        const newData = transactionData.filter(e => e.budgetId === budget.name);

        setTransactions(newData);
    }
    console.log('transact', transactions)
    let budgetSum = transactions.reduce(function (prev, transactions) {
        return prev + +transactions.amount
    }, 0);

    useEffect(() => {
        loadTransactions();
    }, []);
    return (

        <tr>
            <td>{budget.name}</td>
            <td>${budget.amount}</td>
            <td>${budgetSum}</td>
            <td> <input type='checkbox' checked={budget.active} /></td>

            <td><MdVisibility onClick={() => onView(budget)} /></td>
            <td><MdEdit onClick={() => onEdit(budget)} /></td>
            <td><MdDeleteForever onClick={() =>
                //  onDelete(exercise._id)
                handleDelete(budget._id)

            } /></td>
        </tr>
    );
}

export default Budget;