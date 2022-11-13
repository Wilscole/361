import React from 'react';
import { MdDeleteForever, MdEdit, MdCheckCircleOutline, MdVisibility } from 'react-icons/md';

function CategorySelect({ categories }) {
    console.log('cole', categories)
    return (
        categories.map((category, i) =>
            <option
                value={category.name}
                key={i}>
                {category.name}</option>)

    );
}

export default CategorySelect;