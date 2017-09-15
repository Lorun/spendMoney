import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import * as TransactionActions from '../actions';

import './transactionForm.css';

/* Clean the typed value */
const cleanValue = (value) => ((isNaN(+value) || value === '') ? value : +value);

/* Prepare initial values to fill the form */
const prepareFormValues = (values) => {
    const dateTime = moment(values.date, 'x');
    return {
        ...values,
        date: dateTime.format('DD.MM.YYYY'),
        time: dateTime.format('HH:mm:ss')
    };
};

const preparePuttingValues = (values) => {
    const date = moment(values.date + ' ' + values.time, 'DD.MM.YYYY HH:mm:ss').format('x');
    delete values.time;
    return {
        ...values,
        date
    };
};

const initialFormValues = (id, filter) => {
    const dateTime = moment();
    return {
        id,
        transaction_type: filter === 0 ? 1 : filter,
        amount: 0,
        date: dateTime.format('DD.MM.YYYY'),
        time: dateTime.format('HH:mm:ss'),
        category: 1,
        description: ''
    };
};

export class TransactionForm extends Component {

    constructor(props) {
        super(props);

        this.isEditing = !!props.match.params.id && props.transactions.list[props.match.params.id];
        this.state = this.getInitialState();

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    getInitialState() {
        const currentId = this.isEditing
            ? this.props.match.params.id
            : this.props.transactions.lastId + 1;

        return this.isEditing
            ? prepareFormValues(this.props.transactions.list[currentId])
            : initialFormValues(currentId, this.props.transactions.filter);
    }

    handleChange(event) {
        const target = event.target;

        if (target.validity.valid) {
            this.setState(prevState => ({
                [target.name]: cleanValue(target.value)
            }));
        }
    }

    handleChangeType(event) {
        const target = event.target;
        const transaction_type = cleanValue(target.value);

        this.setState(prevState => ({
            transaction_type
        }));

        this.props.setFilter(transaction_type);
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
        let amountClassName = 'transactionForm-amount '
            + (this.state.transaction_type === 1
                ? 'transactionForm-amount--expenses'
                : 'transactionForm-amount--income');

        const categorySelect = this.props.categories.map(cat => (
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
                            <input type="radio" name="transaction_type" value="1" onChange={this.handleChangeType} checked={this.state.transaction_type === 1} />
                            <span className="tab-button tab-button--expenses">Expenses</span>
                        </label>
                        <label className="transactionForm-tab">
                            <input type="radio" name="transaction_type" value="2" onChange={this.handleChangeType} checked={this.state.transaction_type === 2} />
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
                        <input type="hidden" name="time" value={this.state.time} />
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

const mapStateToProps = state => ({
    transactions: state.transactions,
    categories: state.categories.list
});

const mapDispatchToProps = dispatch => bindActionCreators({...TransactionActions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);