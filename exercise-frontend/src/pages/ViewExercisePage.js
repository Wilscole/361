import CategoryList from '../components/CategoryList';
import Popup from '../components/PopUp';
import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { MdInfoOutline } from 'react-icons/md';



export const ViewBudgetPage = ({ viewBudgets, setBudgetId, setCategoryToEdit, setCategory, setCats }) => {
    const [amount, setAmount] = useState(viewBudgets.amount);
    // console.log('id', viewBudgets._id)
    const [categories, setCategories] = useState([])
    const [catNames, setCatName] = useState([])
    const [transactions, setTransactions] = useState([])
    const [number, setNumber] = useState([])
    const [catMap, setCapMap] = useState([])
    const [total, setTotal] = useState([])


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

    const onDeleteTrans = async category => {
        for (let i = 0; i < transactions.length; i++) {
            console.log(category)
            console.log(transactions[i])
            if (transactions[i].category === category) {
                let _id = transactions[i]._id
                const response = await fetch(`/transaction/${_id}`, { method: 'DELETE' });
            }
        }
        loadTransactions();

    }

    async function getResponse() {
        let datasets = []
        let dataMap = {}
        let amounts = []

        for (const [key, value] of Object.entries(catMap)) {
            if (catNames.includes(key))
                amounts.push(value)
        }
        console.log('Amounts', amounts)
        dataMap.data = amounts
        datasets.push(dataMap)

        const response = await fetch(
            'https://pifilling.vercel.app/api',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({

                    labels: catNames,
                    datasets: datasets,
                })
            }
        )
        const data = await response.json()
        setNumber(data.url)


        // console.log('Number variable', number)

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

    const handleDelete = (id, name) => {
        setPopup({
            show: true,
            id: id,
            name: name
        });
    }

    const handleDeleteTrue = () => {
        if (popup.show && popup.id) {
            setPopup({
                show: false,
                id: null,
            });
            console.log('popup', popup)
            onDelete(popup.id)
            onDeleteTrans(popup.name)

        }
    };



    const handleDeleteFalse = () => {
        setPopup({
            show: false,
            id: null,
        });
    };



    const name = viewBudgets.name
    const loadCategories = async () => {
        const response = await fetch(`/categories`)      //is a promise     
        const categoryData = await response.json();     // also a promise  
        const newCategories = categoryData.filter(e => e.budgetId === name)
        // console.log('categories for chart', newCategories)
        setCategories(newCategories);
        let catNames = []
        for (let i = 0; i < newCategories.length; i++) {
            catNames.push(newCategories[i].name)
        }
        setCatName(catNames)
        console.log('Category Names', catNames)
    }



    const loadTransactions = async () => {
        const response = await fetch(`/transaction`)      //is a promise     
        const transactionData = await response.json();     // also a promise
        // console.log(transactionData)
        const newData = transactionData.filter(e => e.budgetId === viewBudgets.name);
        console.log('Transaction Data', newData)
        let categoryMap = {}
        let totalAmount = 0
        for (let k = 0; k < newData.length; k++) {
            totalAmount += newData[k].amount
            let categoryName = newData[k].category;
            if (categoryName in categoryMap) {
                categoryMap[categoryName] += newData[k].amount
            }
            else {
                categoryMap[categoryName] = newData[k].amount
            }

        }
        setCapMap(categoryMap)
        setTotal(totalAmount)
        console.log('CategoryMap', categoryMap)
        console.log(catMap)


        setTransactions(newData);
    }
    // console.log('transact', transactions)
    // console.log('sum', sum)

    useEffect(() => {
        loadCategories();
        loadTransactions();
    }, []);         //called when the component is first mounted

    useEffect(() => {

    }, [number]);

    useEffect(() => {

    }, [total]);

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
                <Link to="/"><p align='left' ><i class="arrow left"></i>Return to Budgets</p></Link>
                <div>
                    <h2> Budget Health</h2>
                    <p class="hovertext" data-hover="The below data provides insights into your overall budget health with facts including your total budget amount, how much you have spent,
                your remaiing balance, and how much of your budget has been added to different categories!" > <MdInfoOutline /> Info </p> </div>
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
                            <td>${total}</td>
                            <td>${viewBudgets.amount - total}</td>
                            <td>${total}</td>
                            <td>${viewBudgets.amount - total}</td>

                        </tr>
                    </tbody>
                </table>
                <table class="categoryBtn">
                    <div>
                        <button onClick={setBudgetId(viewBudgets.name)}><Link to="../add-category">Create Category</Link></button>
                        <p class="hovertext" data-hover="You can now add categories to your budget to group transactions! 
                        This will help you see where your spending most!"> <MdInfoOutline /> Info
                        </p>
                    </div>
                </table>
                <table class='categoryBtn'>
                    <div>
                        <button onClick={setBudgetId(viewBudgets.name)} ><Link to="../add-transaction">Create Transaction</Link></button><span class="hovertext" data-hover="Use the 'Create Transaction' button to add transaction details to your budget! 
                    Additionally, you can select a category for each transaction."><MdInfoOutline /> Info</span>
                    </div>
                </table> <br />
            </article>
            <CategoryList categories={categories} onDelete={onDelete} handleDelete={handleDelete} onView={onView} onEdit={onEdit} onDeleteTrans={onDeleteTrans}></CategoryList>
            <label>

                <button onClick={getResponse}>Analyze Budget</button></label><br /> <br />
            {number.length !== 0 ? <img src={number} alt="Pie Chart" /> : null}

        </>
    );
}

export default ViewBudgetPage;