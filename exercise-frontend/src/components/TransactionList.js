import React from 'react';
import Category from './Category';
import { useState, useEffect } from 'react';
import Transaction from './Transaction';


function TransactionList({ transactions, handleDelete }) {

    return (
        <div>
            <table id="exercises">
                <caption>Existing Categories</caption>
                <thead>
                    <tr>
                        <th>Transaction Name</th>
                        <th>Category</th>
                        <th>amount</th>
                        <th>Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, i) =>
                        <Transaction
                            transaction={transaction}
                            // key={i}
                            // onDelete={onDelete}
                            // onEdit={onEdit}
                            handleDelete={handleDelete}
                        // onView={onView}
                        />)}
                </tbody>
            </table>
        </div>
    );
}
export default TransactionList