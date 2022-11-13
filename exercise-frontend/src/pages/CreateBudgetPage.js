import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';


export const CreateBudgetPage = () => {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [active, setActive] = useState(false);
    const [btn, setBtn] = useState(true)


    const history = useHistory();


    const handleClick = (active) => {
        setActive(!active)
    }
    const hanldleChange = (name, amount, active) => {
        console.log('weight', active)
        if (name && amount) {
            setBtn(false)
        } else {
            setBtn(true)
        }
    }

    const addBudget = async () => {
        const newBudget = { name, amount, active }
        const response = await fetch('/exercises',
            {
                method: 'POST',
                body: JSON.stringify(newBudget),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        if (response.status === 201) {
            alert("Budget updated successfully!")
        } else {
            alert(`Failed to update budget, status code = ${response.status}`)
        }
        history.push('/');
    }

    return (
        <>
            <article>
                <h2>Add Budget</h2>
                <p>On this page, you can add new budgets by entering a budget name and amount for a new budget.
                    The 'Submit' field will be enabled when all budget data has been added!
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
                            onClick={e => { handleClick(active); hanldleChange(name, amount, e.target.value) }}
                            id="weight"
                            required /> <br />


                        <label for="submit">
                            <button
                                disabled={btn}
                                type="submit"
                                onClick={addBudget}
                                id="submit"
                            >Create</button></label>
                    </fieldset>
                </form>
            </article>
            <button><Link to="/">Return to All Budgets </Link></button>

        </>
    );
}

export default CreateBudgetPage;