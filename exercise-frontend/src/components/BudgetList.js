import React from 'react';
import Budget from './Budget';
import { useState, useEffect } from 'react';


function BudgetList({ budgets, onDelete, onEdit, handleDelete, onView }) {

    return (
        <div>
            <table id="exercises">
                <caption>Existing Budgets</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Spent</th>
                        <th>Active</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {budgets.map((budget, i) =>
                        <Budget
                            budget={budget}
                            key={i}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            handleDelete={handleDelete}
                            onView={onView}
                        />)}
                </tbody>
            </table>
        </div>
    );
}

export default BudgetList;