import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TransactionActions from '../actions';

export class TransactionForm extends Component {

    shouldComponentUpdate() {
        return false;
    }

    addCategory(e) {
        e.preventDefault();
        const { name } = this.refs;

        if (name) {
            this.props.add(name.value);
            name.value = '';
        }
    }

    render() {
        return (
            <div className="transactionForm">
                <Link to="/">Back</Link>
                <form onSubmit={e => this.addCategory(e)}>
                    <div>
                        <label>Category name:<br/></label>
                        <input type="text" ref="name" placeholder="Category"/>
                    </div>
                    <button type="submit">Add Category</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({...state.categories});
const mapDispatchToProps = dispatch => bindActionCreators({...TransactionActions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);