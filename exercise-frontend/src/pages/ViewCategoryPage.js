import CategoryList from '../components/CategoryList';
import Popup from '../components/PopUp';
import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import TransactionList from '../components/TransactionList';


export const ViewCategoryPage = ({ category }) => {
    console.log('cat view', category)
    const [cats, setCats] = useState([])
    const [transactions, setTransactions] = useState([])
    const [popup, setPopup] = useState({
        show: false, // initial values set to false and null
        id: null,
    });

    const onDelete = async _id => {
        const response = await fetch(`/transactions/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const newTransactions = transactions.filter(e => e._id !== _id);
            setTransactions(newTransactions);
        } else {
            console.error(`Failed to delete budget with _id = ${_id}, status code = ${response.status}`)
        }
    }
    const catName = category.name
    console.log('name', catName)
    const loadTransactions = async () => {
        const response = await fetch(`/transaction`)      //is a promise     
        const transactionData = await response.json();     // also a promise
        console.log(transactionData)
        const newData = transactionData.filter(e => e.category === catName);

        setTransactions(newData);
    }
    let categorySum = transactions.reduce(function (prev, transactions) {
        return prev + +transactions.amount
    }, 0);

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

    useEffect(() => {
        loadTransactions();
    }, []);

    return (
        <>
            {popup.show && (
                <Popup
                    handleDeleteTrue={handleDeleteTrue}
                    handleDeleteFalse={handleDeleteFalse}
                    onDelete={onDelete}
                />
            )}
            <article>
                <h2>Cateogry Summary</h2>
                <p>Below are some insights into your budget. Specifically, your total budget for the category, and how much you have spent in this category.
                </p>
                <table id="exercises">
                    <thead>
                        <tr>
                            <th>Category Total</th>
                            <th>Spent</th>
                            <th>Remaining Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${category.amount}</td>
                            <td>${categorySum}</td>
                            <td>${category.amount - categorySum}</td>

                        </tr>
                    </tbody>
                </table>
                <table class='categoryBtn'>
                    <p>Want to head back to your budget?</p>
                    <button><Link to="../view-budget">Back To Budget</Link></button>
                </table>
                <table class='categoryBtn'>
                    <p>Use the 'Create Transaction' button to add transaction details to your this category!</p>
                    <button><Link to="../add-transaction">Create Transaction</Link></button>
                </table> <br />
                <button><Link to="/">Return to All Budgets </Link></button>
                <TransactionList transactions={transactions} handleDelete={handleDelete} />
            </article>


        </>
    );
}

export default ViewCategoryPage;

