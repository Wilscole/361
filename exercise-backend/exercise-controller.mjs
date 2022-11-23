import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as budgets from './exercise-server.mjs';

const cors = require("cors");



const PORT = process.env.PORT || 5000;

const app = express();



app.use(express.json())

app.post('/exercises', (req, res) => {

    budgets.createBudget(req.body.name, req.body.amount, req.body.active)
        .then(budget => {
            res.status(201).json(budget);
        })
        .catch(error => {
            console.error(error)
            res.status(400).json({ Error: 'Request Failed' })
        })

})
app.post('/categories', (req, res) => {

    budgets.createCategory(req.body.budgetId, req.body.name, req.body.amount)
        .then(category => {
            res.status(201).json(category);
        })
        .catch(error => {
            console.error(error)
            res.status(400).json({ Error: 'Request Failed' })
        })

})

app.post('/transaction', (req, res) => {

    budgets.createTransaction(req.body.name, req.body.category, req.body.amount, req.body.date, req.body.budgetId)
        .then(category => {
            res.status(201).json(category);
        })
        .catch(error => {
            console.error(error)
            res.status(400).json({ Error: 'Request Failed' })
        })

})

app.get('/transaction', (req, res) => {
    let filter = {}
    budgets.findTransaction(filter)
        .then(transactions => {
            res.json(transactions)
        })
        .catch(error => {
            console.error(error)
            res.status(400).json({ Error: 'Invalid Request' });
        })
})


app.get('/exercises', (req, res) => {
    let filter = {}
    budgets.findBudget(filter)
        .then(budgets => {
            res.json(budgets)
        })
        .catch(error => {
            console.error(error)
            res.status(400).json({ Error: 'Invalid Request' });
        })
})

app.get('/categories', (req, res) => {
    let filter = {}
    budgets.findCategory(filter)
        .then(categories => {
            res.json(categories)
        })
        .catch(error => {
            console.error(error)
            res.status(400).json({ Error: 'Invalid Request' });
        })
})

app.get('/exercises/active', (req, res) => {
    let filter = { 'active': true }
    budgets.findBudget(filter)
        .then(budgets => {
            res.json(budgets)
        })
        .catch(error => {
            console.error(error)
            res.status(400).json({ Error: 'Invalid Request' });
        })

})

app.get('/exercises/:_id', (req, res) => {
    const budgetId = req.params._id
    budgets.findBudgetById(budgetId)
        .then(budget => {
            if (budget !== null) {
                res.json(budget)
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Invalid Request' });
        })

})

app.put('/exercises/:_id', (req, res) => {
    budgets.replaceBudget(req.params._id, req.body.name, req.body.amount, req.body.active)
        .then(numUpdate => {
            if (numUpdate === 1) {
                res.json({ _id: req.params._id, name: req.body.name, amount: req.body.amount, active: req.body.active })
            } else {
                res.status(400).json({ Error: 'Invalid Request' })
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Invalid Request' })
        });
})

app.put('/categories/:_id', (req, res) => {
    budgets.replaceCategory(req.params._id, req.body.budgetId, req.body.name, req.body.amount)
        .then(numUpdate => {
            if (numUpdate === 1) {
                res.json({ _id: req.params._id, budgetId: req.body.budgetId, name: req.body.name, amount: req.body.amount })
            } else {
                res.status(400).json({ Error: 'Invalid Request' })
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Invalid Request' })
        });
})

app.delete('/exercises/:_id', (req, res) => {
    budgets.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request to delete a document failed' });
        });
});

app.delete('/categories/:_id', (req, res) => {
    budgets.deleteCatById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request to delete a document failed' });
        });
});
app.delete('/transaction/:_id', (req, res) => {
    budgets.deleteTransById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request to delete a document failed' });
        });
});

const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./exercise-frontend/build")));
// Step 2:
app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./exercise-frontend/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})