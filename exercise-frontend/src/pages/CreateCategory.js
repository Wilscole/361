import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';


export const CreateCategory = ({ budgetId }) => {
    console.log(budgetId)
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [btn, setBtn] = useState(true)


    const history = useHistory();


    const hanldleChange = (name, amount) => {
        if (name && amount) {
            setBtn(false)
        } else {
            setBtn(true)
        }
    }

    const addCategory = async () => {
        const newCategory = { budgetId, name, amount }
        const response = await fetch('/categories',
            {
                method: 'POST',
                body: JSON.stringify(newCategory),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        if (response.status === 201) {
            alert("Category added successfully!")
        } else {
            alert(`Failed to add category, status code = ${response.status}`)
        }
        history.push('/view-budget');
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
                            onClick={addCategory}
                            id="submit"
                        >Create</button></label>
                </fieldset>
            </form>
            <Link to="../view-budget">Back to Budget</Link>

        </>

    );
}


export default CreateCategory;