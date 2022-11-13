import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';


export const EditCategory = ({ categoryToEdit }) => {
    const [name, setName] = useState(categoryToEdit.name);
    const [amount, setAmount] = useState(categoryToEdit.amount);
    const [btn, setBtn] = useState(true)
    const budgetId = categoryToEdit.budgetId
    console.log(budgetId)


    const history = useHistory();


    const hanldleChange = (name, amount) => {
        if (name && amount) {
            setBtn(false)
        } else {
            setBtn(true)
        }
    }

    const EditCategory = async () => {
        const editedCat = { budgetId, name, amount }
        const response = await fetch(`/categories/${categoryToEdit._id}`,
            {
                method: 'PUT',
                body: JSON.stringify(editedCat),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        if (response.status === 200) {
            alert("Budget edited successfully!")
        } else {
            alert(`Failed to edit budget, status code = ${response.status}`)
        }
        history.push('/');
    }


    return (
        <>
            <h2>Add Category</h2>
            <p>Placeholder description of category page
            </p>
            <form onSubmit={(e) => { e.preventDefault(); }}>
                <fieldset>
                    <legend>Which category are you adding?</legend>
                    <label for="name">Category Name</label> <br />
                    <input
                        type="text"
                        placeholder="Name for Category"
                        value={name}
                        onChange={e => { setName(e.target.value); hanldleChange(e.target.value, amount) }}
                        id="name"
                        required /><br />
                    <label for="reps">Category Amount</label> <br />
                    <input
                        type="number"
                        value={amount}
                        placeholder="Amount for Category"
                        onChange={e => { setAmount(e.target.value); hanldleChange(name, e.target.value) }}
                        id="reps"
                        min="1"
                        required /><br />

                    <label for="submit">
                        <button
                            disabled={btn}
                            type="submit"
                            onClick={EditCategory}
                            id="submit"
                        >Create</button></label>
                </fieldset>
            </form>
            <Link to="../view-budget">Back to Budget</Link>

        </>

    );
}


export default EditCategory;