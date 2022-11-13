import React from 'react';
import BudgetList from '../components/BudgetList';
import Popup from '../components/PopUp';
import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

function HomePage({ setBudgetToEdit, setViewBudgets }) {
    const [budgets, setBudgets] = useState([])
    const [toggle, setToggle] = useState(true);
    const [popup, setPopup] = useState({
        show: false, // initial values set to false and null
        id: null,
    });

    const handleClick = () => {
        setToggle(!toggle)
        console.log(toggle)
    }
    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const newBudgets = budgets.filter(e => e._id !== _id);
            setBudgets(newBudgets);
        } else {
            console.error(`Failed to delete budget with _id = ${_id}, status code = ${response.status}`)
        }
    }


    const history = useHistory();

    const onView = async budget => {
        setViewBudgets(budget)
        history.push("/view-budget")
    }

    const onEdit = async budget => {
        setBudgetToEdit(budget);
        history.push("/edit-budget");
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

    const loadBudgets = async () => {
        const response = await fetch('/exercises')      //is a promise
        const budgetData = await response.json();     // also a promise
        setBudgets(budgetData);
    }

    const loadActives = async () => {
        const response = await fetch('/exercises/active')      //is a promise
        const budgetData = await response.json();     // also a promise
        setBudgets(budgetData);
    }

    useEffect(() => {
        loadBudgets();
    }, []);         //called when the component is first mounted

    useEffect(() => {
        console.log('we toggled', toggle)
        if (toggle) {
            loadActives()
        }
        else {
            loadBudgets()
        }
    }, [toggle]);

    return (
        <>
            {popup.show && (
                <Popup
                    handleDeleteTrue={handleDeleteTrue}
                    handleDeleteFalse={handleDeleteFalse}
                    onDelete={onDelete}
                />
            )}
            <h2>Budget Tracker</h2>
            <p>Welcome! Are you a new user? If so, start by creating a new budget with the button below!</p>
            <button><Link to="../add-budget">Create Budget</Link></button>
            <p>Below is a historical view of the budgets you have created! Toggle the 'Active' button to see budgets that are currently active. Toggling the button off, will
                remove any inactive budgets!
            </p>
            <p>Active View: </p>
            <label class="switch">
                <input type="checkbox" checked={toggle} onClick={handleClick} />
                <span class="slider round"></span>
            </label>
            <BudgetList budgets={budgets} onDelete={onDelete} onEdit={onEdit} handleDelete={handleDelete} toggle={toggle} onView={onView}></BudgetList>

        </>
    )
}

export default HomePage