import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import colors from '../constants/colors';

const Input = props => {
    return <TextInput {...props} style={StyleSheet.flatten([styles.input, props.style])}/>
};

const styles = StyleSheet.create({
    input: {
        borderStyle: 'solid',
        backgroundColor: colors.lightGreen,
        opacity: 0.4,
        borderRadius: 5,
        height: 25,
        color: 'white',
        padding: 5,
        fontSize: 15,
        fontWeight: 'bold',
        //fontFamily: 'Segoe UI'
    }
});

export default Input;