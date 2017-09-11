import React, { Component } from 'react';
import { createConnection } from '../../utils';
import moment from 'moment';
import * as TransactionActions from '../actions';

import './transactionForm.css';

/* Clean the typed value */
const cleanValue = (value) => ((isNaN(+value) || value === '') ? value : +value);

/* Prepare initial values to fill the form */
const prepareFormValues = (values) => ({
    ...values,
    date: moment(values.date, 'x').format('DD.MM.YYYY')
});

const preparePuttingValues = (values) => ({
    ...values,
    date: moment(values.date, 'DD.MM.YYYY').format('x')
});

const initialFormValues = (id) => ({
    id,
    transaction_type: 1,
    amount: 0,
    date: moment().format('DD.MM.YYYY'),
    category: 1,
    description: ''
});

export class TransactionForm extends Component {

    constructor(props) {
        super(props);

        this.isEditing = !!props.match.params.id && props.transactions.list[props.match.params.id];
        this.state = this.getInitialState();

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    getInitialState() {
        const currentId = this.isEditing
            ? this.props.match.params.id
            : this.props.transactions.lastId + 1;

        return this.isEditing
            ? prepareFormValues(this.props.transactions.list[currentId])
            : initialFormValues(currentId);
    }

    handleChange(event) {
        const target = event.target;

        if (target.validity.valid) {
            this.setState(prevState => ({
                [target.name]: cleanValue(target.value)
            }));
        }
    }

    onSubmit(e){
        e.preventDefault();
        const values = preparePuttingValues(this.state);

        if (values.amount !== 0) {
            this.isEditing
                ? this.editTransaction(values)
                : this.addTransaction(values);
            this.props.history.push('/transactions');
        }
    }

    addTransaction(values) {
        this.props.add(values);
        this.props.incrementId();
        this.setState(this.getInitialState())
    }

    editTransaction(values) {
        this.props.edit(values);
    }

    render() {
        const categories = this.props.categories.list;
        let amountClassName = 'transactionForm-amount '
            + (this.state.transaction_type === 1
                ? 'transactionForm-amount--expenses'
                : 'transactionForm-amount--income');

        const categorySelect = categories.map(cat => (
            <label key={cat.id} value={cat.id} className="transactionForm-catSelection">
                <input type="radio" name="category" value={cat.id} onChange={this.handleChange} checked={this.state.category === cat.id} />
                <span className="catSelection-label">{cat.name}</span>
            </label>
        ));

        return (
            <div className="transactionForm">
                <form onSubmit={this.onSubmit}>
                    <input type="hidden" name="id" value={this.state.id} />
                    <div className="transactionForm-types">
                        <label className="transactionForm-tab">
                            <input type="radio" name="transaction_type" value="1" onChange={this.handleChange} checked={this.state.transaction_type === 1} />
                            <span className="tab-button tab-button--expenses">Expenses</span>
                        </label>
                        <label className="transactionForm-tab">
                            <input type="radio" name="transaction_type" value="2" onChange={this.handleChange} checked={this.state.transaction_type === 2} />
                            <span className="tab-button tab-button--income">Incomes</span>
                        </label>
                    </div>
                    <div className={amountClassName}>
                        <input type="text" pattern="[0-9]*" name="amount" placeholder="0" value={this.state.amount} onChange={this.handleChange} />
                        <span className="transactionForm-currency">$</span>
                    </div>
                    <div className="transactionForm-description transactionForm-section">
                        <input type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange} />
                    </div>
                    <div className="transactionForm-date transactionForm-section">
                        <input type="text" name="date" value={this.state.date} onChange={this.handleChange} />
                    </div>
                    <div className="transactionForm-section transactionForm-categories">
                        <div className="transactionForm-label">Category:</div>
                        <div className="transactionForm-selectArea">
                            {categorySelect}
                        </div>
                    </div>
                    <div className="transactionForm-section transactionForm-section--white">
                        <button type="submit" className="btn">{this.isEditing ? 'Edit' : 'Add'} Transaction</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default createConnection(TransactionForm, TransactionActions, ['transactions', 'categories']);