import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Category from './Category';
import * as CategoryActions from '../actions';

// component part
const CategoryList = ({ list, remove }) => (
    <div>
        <h3>Categories</h3>
        {list.map(item => (
            <Category key={item.id} item={item} actions={{ remove }} />
        ))}
    </div>
);


// container part
const mapStateToProps = state => ({...state.categories});
const mapDispatchToProps = dispatch => bindActionCreators({...CategoryActions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);