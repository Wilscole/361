import React from 'react';
import Category from './Category';
import { useState, useEffect } from 'react';


function CategoryList({ categories, handleDelete, onDelete, onEdit, onView }) {

    return (
        <div>
            <table id="exercises">
                <caption>Existing Categories</caption>
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Amount</th>
                        <th>Spent</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, i) =>
                        <Category
                            category={category}
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
export default CategoryList