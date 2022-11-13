import './App.css';
import React from 'react';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateBudgetPage from './pages/CreateBudgetPage';
import EditBudgetPage from './pages/EditBudgetPage';
import faq from './pages/FAQ';
import Navigation from './components/Nav'
import About from './pages/About';
import { useState } from 'react';
import FAQ from './pages/FAQ';
import ViewBudgetPage from './pages/ViewExercisePage';
import CreateCategory from './pages/CreateCategory';
import CreateTransaction from './pages/CreateTrans';
import EditCategory from './pages/EditCategory';
import ViewCategoryPage from './pages/ViewCategoryPage';
import API from './pages/API';
function App() {
  const [budgetToEdit, setBudgetToEdit] = useState([]);
  const [viewBudgets, setViewBudgets] = useState([])
  const [budgetId, setBudgetId] = useState([])
  const [category, setCategory] = useState([])
  const [categoryToEdit, setCategoryToEdit] = useState([])
  const [cats, setCats] = useState([])



  return (
    <div className="App">
      <Router>
        <Navigation />
        {/* <header className="App-header">
          <h1>Exercise Tracker</h1>
          <p>When performance is measured, performance is improved!</p>
        </header> */}
        <main>
          <Route path="/" exact> <HomePage setBudgetToEdit={setBudgetToEdit} setViewBudgets={setViewBudgets} /> </Route>
          <Route path="/add-budget"> <CreateBudgetPage /> </Route>
          <Route path="/edit-budget"><EditBudgetPage budgetToEdit={budgetToEdit} /></Route>
          <Route path="/view-budget"><ViewBudgetPage viewBudgets={viewBudgets} setBudgetId={setBudgetId} setCategoryToEdit={setCategoryToEdit} setCategory={setCategory} setCats={setCats} /></Route>
          <Route path="/add-category"><CreateCategory budgetId={budgetId} /></Route>
          <Route path="/add-transaction"><CreateTransaction budgetId={budgetId} setCategoryToEdit={setCategoryToEdit} cats={cats} /></Route>
          <Route path="/edit-category"><EditCategory categoryToEdit={categoryToEdit} /></Route>
          <Route path="/view-category"><ViewCategoryPage category={category} /></Route>


          <Route path="/faq"> <FAQ /></Route>
          <Route path="/about"> <About /></Route>
          <Route path="/view-api"><API /></Route>


        </main>
        <footer>
          <p><cite>&copy; 2022 Coleton Wilson</cite></p>
        </footer>
      </Router>
    </div>
  );
}

export default App;
