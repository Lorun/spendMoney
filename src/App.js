import React, { Component } from 'react';
import { Route, Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'

import { TransactionList, TransactionForm } from './transaction';
import { CategoryForm, CategoryList } from './category';
import Header from './common/Header';
import Navigation from './common/Navigation';
import './App.css';

const history = createBrowserHistory();

class App extends Component {

    render() {
        return (
            <Router history={history}>
                <div className="common">
                    <Header />

                    <Route exact path="/" component={TransactionList} />
                    <Route exact path="/transactions" component={TransactionList} />
                    <Route path="/transactions/add" component={TransactionForm} />
                    <Route path="/transactions/edit=:id" component={TransactionForm} />
                    <Route path="/transactions/filter=:filter" component={TransactionList} />

                    <Route exact path="/categories" component={CategoryList} />
                    <Route path="/categories/add" component={CategoryForm} />

                    <Navigation />
                </div>
            </Router>
        );
    };
}

// const mapStateToProps = state => ({ ...state });
//
// export default connect(mapStateToProps)(App);
export default App;