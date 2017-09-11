import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


export const createConnection = (Component, Actions, stateKeys) => {
    const mapStateToProps = state => (stateKeys.length > 1)
        ? stateKeys.reduce((prevState, key) => ({
            ...prevState,
            [key]: state[key]
        }), {})
        : ({ ...state[stateKeys[0]] });

    const mapDispatchToProps = dispatch => bindActionCreators({...Actions}, dispatch);

    return connect(mapStateToProps, mapDispatchToProps)(Component);
};