import React from 'react';
import { MdDeleteForever, MdEdit, MdCheckCircleOutline, MdVisibility } from 'react-icons/md';
import { useState, useEffect } from 'react';


function Category({ category, handleDelete, onEdit, onView }) {
    const [transactions, setTransactions] = useState([])

    const loadTrans = async () => {
        const response = await fetch(`/transaction`)      //is a promise     
        const transactionData = await response.json();     // also a promise  
        console.log('tras data', transactionData)
        const newTransactions = transactionData.filter(e => e.category === category.name)
        console.log(newTransactions)
        setTransactions(newTransactions);
    }
    console.log('trancols', transactions)
    let categorySum = transactions.reduce(function (prev, transactions) {
        return prev + +transactions.amount
    }, 0);

    useEffect(() => {
        loadTrans();
    }, []);

    return (

        <tr>
            <td>{category.name}</td>
            <td>${category.amount}</td>
            <td>${categorySum}</td>

            <td><MdVisibility onClick={() => onView(category)} /></td>
            <td><MdEdit onClick={() => onEdit(category)} /></td>
            <td><MdDeleteForever onClick={() =>
                handleDelete(category._id)} /></td>
        </tr>
    );
}

export default Category;