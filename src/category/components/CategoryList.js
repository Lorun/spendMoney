import React from 'react';
import { createConnection } from '../../utils';
import Category from './Category';
import * as CategoryActions from '../actions';

// component part
const CategoryList = ({ list, remove, edit }) => (
    <div>
        <h3>Categories</h3>
        {list.map(item => (
            <Category key={item.id} item={item} actions={{ remove, edit }} />
        ))}
    </div>
);


// container part
export default createConnection(CategoryList, CategoryActions, ['categories']);