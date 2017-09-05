import React, { Component } from 'react';
//import { connect } from 'react-redux';
import TransactionList from './transaction/components/TransactionList';
import './App.css';

class App extends Component {
    render() {
        return (
            <TransactionList />
        );
    };
}

// const mapStateToProps = state => ({ ...state });
//
// export default connect(mapStateToProps)(App);
export default App;