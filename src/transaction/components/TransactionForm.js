import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import * as TransactionActions from '../actions';


export class TransactionForm extends Component {

    constructor() {
        super();
    }

    didComponentMount() {
        this.isEditing = !!this.props.match.params.id;
        console.log(this.props);
    }

    shouldComponentUpdate() {
        return false;
    }

    addTransaction(e) {
        e.preventDefault();
        const { id, amount, date, description, category } = this.refs;

        if (amount.value !== 0) {
            this.props.add({
                id: +id.value,
                amount: +amount.value,
                date: moment(date.value, 'DD.MM.YYYY').format('x'),
                description: description.value,
                category: +category.value
            });
            this.props.incrementId();
        }
    }

    render() {
        const lastId = this.props.transactions.lastId;
        const categories = this.props.categories.list;
        let defaultValues = {
            id: lastId + 1,
            amount: 0,
            date: moment().format('DD.MM.YYYY'),
            category: 0,
            description: ''
        };

        if (this.props.match.params.id) {
            let transaction = this.props.transactions.list.find(item => item.id === +this.props.match.params.id);
            defaultValues = {
                ...transaction,
                date: moment(transaction.date, 'x').format('DD.MM.YYYY'),
            };
        }

        return (
            <div className="transactionForm">
                <Link to="/">Back</Link>
                <form onSubmit={e => this.addTransaction(e)}>
                    <input type="hidden" ref="id" defaultValue={defaultValues.id} />
                    <div>
                        <label>Amount:<br/></label>
                        <input type="number" ref="amount" placeholder="0" defaultValue={defaultValues.amount}/>
                    </div>
                    <div>
                        <input type="text" ref="description" placeholder="Description" defaultValue={defaultValues.description}/>
                    </div>
                    <div>
                        <input type="text" ref="date" defaultValue={defaultValues.date}/>
                    </div>
                    <div>
                        <select ref="category">
                            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                    </div>
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = dispatch => bindActionCreators({...TransactionActions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);