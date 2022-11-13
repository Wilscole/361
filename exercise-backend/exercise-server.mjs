import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

const budgetSchema = mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    active: { type: Boolean, required: true },
})

const categorySchema = mongoose.Schema({
    budgetId: { type: String, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    // spent: { type: Number, required: true }
})

const transactionSchema = mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    budgetId: { type: String, required: true }
})

const Budget = mongoose.model("Budget", budgetSchema)
const Category = mongoose.model("Category", categorySchema)
const Transaction = mongoose.model("Transaction", transactionSchema)

const createBudget = async (name, amount, active) => {
    console.log('Creating new budget')
    const budget = new Budget({ name: name, amount: amount, active: active })
    return budget.save()
}

const createCategory = async (budgetId, name, amount) => {
    console.log('Creating new category')
    const category = new Category({ budgetId: budgetId, name: name, amount: amount, spent: 0 })
    return category.save()
}

const createTransaction = async (name, category, amount, date, budgetId) => {
    console.log('Creating new transaction')
    const transaction = new Transaction({ name: name, category: category, amount: amount, date: date, budgetId: budgetId })
    return transaction.save()
}

const replaceBudget = async (_id, name, amount, active) => {
    const result = await Budget.replaceOne({ _id: _id }, { name: name, amount: amount, active: active })
    return result.modifiedCount
}

const replaceCategory = async (_id, budgetId, name, amount) => {
    const result = await Category.replaceOne({ _id: _id }, { budgetId: budgetId, name: name, amount: amount })
    return result.modifiedCount
}

const findBudgetById = async (_id) => {
    const query = Budget.findById(_id);
    return query.exec();
}

const findBudgetByWeight = async (_active) => {
    const query = Budget.find({}).select({ "weight": true, _id: 0 });
    return query.exec();
}

const findBudget = async (filter, projection, limit) => {
    const query = Budget.find(filter)
        .select(projection)
        .limit(limit)
    return query.exec()
}

const findTransaction = async (filter, projection, limit) => {
    const query = Transaction.find(filter)
        .select(projection)
        .limit(limit)
    return query.exec()
}

const findCategory = async (filter, projection, limit) => {
    const query = Category.find(filter)
        .select(projection)
        .limit(limit)
    return query.exec()
}

const deleteById = async (_id) => {
    const result = await Budget.deleteOne({ _id: _id });
    return result.deletedCount;
};

const deleteCatById = async (_id) => {
    const result = await Category.deleteOne({ _id: _id });
    return result.deletedCount;
};

const deleteTransById = async (_id) => {
    const result = await Transaction.deleteOne({ _id: _id });
    return result.deletedCount;
};


db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

export { deleteTransById, findTransaction, createTransaction, replaceCategory, deleteCatById, findCategory, createBudget, createCategory, findBudgetById, findBudget, replaceBudget, deleteById, findBudgetByWeight };