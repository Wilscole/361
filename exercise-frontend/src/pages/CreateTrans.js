import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import CategorySelect from '../components/CategorySelect';

export const CreateTransaction = ({ budgetId }) => {
    console.log(budgetId)
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [btn, setBtn] = useState(true)


    const history = useHistory();


    const hanldleChange = (name, category, amount, date) => {
        if (name && amount && date) {
            console.log('handling change', category)
            setBtn(false)
        } else {
            setBtn(true)
        }
    }
    const bugetName = budgetId
    const loadCategories = async () => {
        const response = await fetch(`/categories`)      //is a promise     
        const categoryData = await response.json();     // also a promise  
        const newCategories = categoryData.filter(e => e.budgetId === bugetName)
        console.log(newCategories)
        setCategories(newCategories);
    }


    useEffect(() => {
        loadCategories();
    }, []);

    const addTrans = async () => {
        const newTrans = { name, category, amount, date, budgetId }
        console.log('trans', newTrans)
        const response = await fetch('/transaction',
            {
                method: 'POST',
                body: JSON.stringify(newTrans),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        if (response.status === 201) {
            alert("Category added successfully!")
        } else {
            alert(`Failed to add category, status code = ${response.status}`)
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
                    <legend>Which budget are you adding?</legend>
                    <label for="name">Transaction Name</label> <br />
                    <input
                        type="text"
                        placeholder="Name for Transaction"
                        value={name}
                        onChange={e => { setName(e.target.value); hanldleChange(e.target.value, category, amount, date) }}
                        id="name"
                        required /><br />


                    <label >Category</label> <br />
                    <select value={category}
                        onChange={e => { setCategory(e.target.value); hanldleChange(name, e.target.value, amount, date) }}
                        id="cat"
                        required>
                        <option>--Select--</option>
                        <CategorySelect categories={categories} />
                    </select><br />

                    <label for="reps">Amount</label> <br />
                    <input
                        type="number"
                        value={amount}
                        placeholder="Transaction Amount"
                        onChange={e => { setAmount(e.target.value); hanldleChange(name, category, e.target.value, date) }}
                        id="reps"
                        min="1"
                        required /><br />

                    <label for="date">Date</label><br />
                    <input
                        type="date"
                        placeholder={Date()}
                        value={date}
                        onChange={e => { setDate(e.target.value); hanldleChange(name, category, amount, e.target.value) }}
                        id="date"
                        required /> <br />

                    <label for="submit">
                        <button
                            disabled={btn}
                            type="submit"
                            onClick={addTrans}
                            id="submit"
                        >Create</button></label>
                </fieldset>
            </form>
            <Link to="../view-budget">Back to Budget</Link>

        </>
    );
}

export default CreateTransaction;