import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';


export const EditBudgetPage = ({ budgetToEdit }) => {
    const [name, setName] = useState(budgetToEdit.name);
    const [amount, setAmount] = useState(budgetToEdit.amount);
    const [active, setActive] = useState(budgetToEdit.active);
    const [btn, setBtn] = useState(false)


    const history = useHistory();
    const hanldleChange = (name, amount) => {
        if (name && amount) {
            setBtn(false)
        } else {
            setBtn(true)
        }
    }
    const handleClick = (weight) => {
        setActive(!weight)
    }
    const editBudget = async () => {
        const editedBudget = { name, amount, active }
        const response = await fetch(`/exercises/${budgetToEdit._id}`,
            {
                method: 'PUT',
                body: JSON.stringify(editedBudget),
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
            <article>
                <h2>Edit your Budget</h2>
                <p>On this page, you can make modifications to an existing entry. Similar to creating a budget,
                    you can update your budget name and budget amount. The 'Submit' field will be enabled
                    when all budget data has been added!
                </p>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <fieldset>
                        <legend>Which budget are you adding?</legend>
                        <label for="name">Budget Name</label> <br />
                        <input
                            type="text"
                            placeholder="Name for Budget"
                            value={name}
                            onChange={e => { setName(e.target.value); hanldleChange(e.target.value, amount, active) }}
                            id="name"
                            required /><br />
                        <label for="reps">Budget Amount</label> <br />
                        <input
                            type="number"
                            value={amount}
                            placeholder="Total Budget Amount"
                            onChange={e => { setAmount(e.target.value); hanldleChange(name, e.target.value, active) }}
                            id="reps"
                            min="1"
                            required /><br />

                        <label for="weight">Active:</label> <br />
                        <input
                            type="checkbox"
                            value={active}
                            checked={active}
                            onClick={e => { handleClick(active); hanldleChange(name, amount, e.target.value) }}
                            id="weight"
                            required /> <br />

                        <label for="submit">
                            <button
                                disabled={btn}
                                onClick={editBudget}
                            >Save</button></label>
                    </fieldset>
                </form>
            </article>
            <button><Link to="/">Return to All Budgets </Link></button>

        </>
    );
}

export default EditBudgetPage;