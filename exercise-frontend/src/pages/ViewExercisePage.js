import CategoryList from '../components/CategoryList';
import Popup from '../components/PopUp';
import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';


export const ViewBudgetPage = ({ viewBudgets, setBudgetId, setCategoryToEdit, setCategory, setCats }) => {
    const [amount, setAmount] = useState(viewBudgets.amount);
    // console.log('id', viewBudgets._id)
    const [categories, setCategories] = useState([])
    const [transactions, setTransactions] = useState([])
    const [number, setNumber] = useState([])

    const [popup, setPopup] = useState({
        show: false, // initial values set to false and null
        id: null,
    });

    const onDelete = async _id => {
        const response = await fetch(`/categories/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const newCategories = categories.filter(e => e._id !== _id);
            setCategories(newCategories);
        } else {
            console.error(`Failed to delete budget with _id = ${_id}, status code = ${response.status}`)
        }
    }

    async function getResponse() {
        console.log('got cats', categories)
        let labels = [];
        let datasets = []
        let dataMap = {}
        let amounts = []
        for (let i = 0; i < categories.length; i++) {
            labels.push(categories[i].name)
            amounts.push(categories[i].amount)
        }
        dataMap.data = amounts
        datasets.push(dataMap)
        console.log('New label array', labels);
        console.log('New amounts array', datasets);

        const response = await fetch(
            'https://pifilling.vercel.app/',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({
                    labels: labels,
                    datasets: datasets
                })

            }
        ).then((res) => console.log('galen data', res.data.url))

    }


    const history = useHistory();

    const onView = async category => {
        // console.log('cats', category)
        setBudgetId(viewBudgets.name)
        setCategory(category)
        history.push("/view-category")
    }


    const onEdit = async category => {
        setCategoryToEdit(category);
        history.push("/edit-category");
    }

    const handleDelete = (id) => {
        setPopup({
            show: true,
            id: id
        });
    }

    const handleDeleteTrue = () => {
        if (popup.show && popup.id) {
            setPopup({
                show: false,
                id: null,
            });
            onDelete(popup.id)
        }
    };


    const handleDeleteFalse = () => {
        setPopup({
            show: false,
            id: null,
        });
    };

    const loadTransactions = async () => {
        const response = await fetch(`/transaction`)      //is a promise     
        const transactionData = await response.json();     // also a promise
        // console.log(transactionData)
        const newData = transactionData.filter(e => e.budgetId === viewBudgets.name);

        setTransactions(newData);
    }
    // console.log('transact', transactions)
    let budgetSum = transactions.reduce(function (prev, transactions) {
        return prev + +transactions.amount
    }, 0);

    const name = viewBudgets.name
    const loadCategories = async () => {
        const response = await fetch(`/categories`)      //is a promise     
        const categoryData = await response.json();     // also a promise  
        const newCategories = categoryData.filter(e => e.budgetId === name)
        console.log('categories for chart', newCategories)
        setCategories(newCategories);
    }

    // console.log('col cats', categories)
    let sum = categories.reduce(function (prev, categories) {
        return prev + +categories.amount
    }, 0);

    // console.log('sum', sum)

    useEffect(() => {
        loadCategories();
        loadTransactions()
    }, []);         //called when the component is first mounted

    useEffect(() => {

    }, [number]);

    return (
        <>
            <article>
                {popup.show && (
                    <Popup
                        handleDeleteTrue={handleDeleteTrue}
                        handleDeleteFalse={handleDeleteFalse}
                        onDelete={onDelete}
                    />
                )}
                <h2>Budget Health</h2>
                <p>The below data provides insights into your overall budget health with facts including your total budget amount, how much you have spent,
                    your remaiing balance, and how much of your budget has been added to different categories!
                </p>
                <table id="exercises">
                    <thead>
                        <tr>
                            <th>Budget Total</th>
                            <th>Spent</th>
                            <th>Remaining Balance</th>
                            <th>Budget Allocated</th>
                            <th>Remaing Allocations</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${viewBudgets.amount}</td>
                            <td>${budgetSum}</td>
                            <td>${viewBudgets.amount - budgetSum}</td>
                            <td>${sum}</td>
                            <td>${viewBudgets.amount - sum}</td>

                        </tr>
                    </tbody>
                </table>
                <table class='categoryBtn'>
                    <p>You can now add categories to your budget to group transactions! This will help you see where your spending most!</p>
                    <button onClick={setBudgetId(viewBudgets.name)}><Link to="../add-category">Create Category</Link></button>
                </table>
                <table class='categoryBtn'>
                    <p>Use the 'Create Transaction' button to add transaction details to your budget! Additionally, you can select a category for each transaction.</p>
                    <button onClick={setBudgetId(viewBudgets.name)} ><Link to="../add-transaction">Create Transaction</Link></button>
                </table> <br />
                <button><Link to="/">Return to All Budgets </Link></button>
                <h2>API Call</h2>
                <label>
                    <button
                        onClick={getResponse}
                    >Call API</button></label>
                <p>Your number is: {number}</p>
            </article>
            {/* <CategoryList budgets={budgets} onDelete={onDelete} onEdit={onEdit} handleDelete={handleDelete} toggle={toggle} onView={onView}></CategoryList> */}
            <CategoryList categories={categories} onDelete={onDelete} handleDelete={handleDelete} onView={onView} onEdit={onEdit}></CategoryList>


        </>
    );
}

export default ViewBudgetPage;