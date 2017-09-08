import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import * as TransactionActions from '../actions';

import './transactionForm.css';

/* Clean the typed value */
const cleanValue = (value) => ((isNaN(+value) || value === '') ? value : +value);

export class TransactionForm extends Component {

    constructor(props) {
        super(props);


        this.state = this.getInitialState();

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    getInitialState() {
        const isEditing = !!this.props.match.params.id && this.props.transactions.list[this.props.match.params.id];
        const currentId = isEditing ? this.props.match.params.id : this.props.transactions.lastId + 1;
        const values = isEditing
            ? {
                ...this.props.transactions.list[currentId],
                date: moment(this.props.transactions.list[currentId].date, 'x').format('DD.MM.YYYY')
            }
            : {
                id: currentId,
                transaction_type: 1,
                amount: 0,
                date: moment().format('DD.MM.YYYY'),
                category: 0,
                description: ''
            };

        return {
            isEditing,
            values
        }
    }

    handleChange(event) {
        const target = event.target;

        if (target.validity.valid) {
            this.setState(prevState => ({
                values: {
                    ...prevState.values,
                    [target.name]: cleanValue(target.value)
                }
            }));
        }
    }

    onSubmit(e){
        e.preventDefault();
        const values = {
            ...this.state.values,
            date: moment(this.state.values.date, 'DD.MM.YYYY').format('x')
        };

        if (values.amount !== 0) {
            this.isEditing ? this.addTransaction(values) : this.editTransaction(values);
        }
    }

    addTransaction(values) {
        this.props.add(values);
        this.props.incrementId();
        this.setState(this.getInitialState())
    }

    editTransaction(values) {
        this.props.edit(values);
        this.props.history.push('/transactions');
    }

    render() {
        const categories = this.props.categories.list;

        return (
            <div className="transactionForm">
                <form onSubmit={this.onSubmit}>
                    <input type="hidden" name="id" value={this.state.values.id} />
                    <div>
                        <input type="radio" name="transaction_type" value="1" onChange={this.handleChange} checked={this.state.values.transaction_type === 1} />
                        <input type="radio" name="transaction_type" value="2" onChange={this.handleChange} checked={this.state.values.transaction_type === 2} />
                    </div>
                    <div>
                        <input type="text" pattern="[0-9]*" name="amount" placeholder="0" value={this.state.values.amount} onChange={this.handleChange} /> $
                    </div>
                    <div>
                        <input type="text" name="description" placeholder="Description" value={this.state.values.description} onChange={this.handleChange} />
                    </div>
                    <div>
                        <input type="text" name="date" value={this.state.values.date} onChange={this.handleChange} />
                    </div>
                    <div>
                        <select name="category" onChange={this.handleChange} defaultValue={this.state.values.category}>
                            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                    </div>
                    <button type="submit" className="btn">{this.state.isEditing ? 'Edit' : 'Add'}</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = dispatch => bindActionCreators({...TransactionActions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);