import React from 'react';
import { Button } from 'react-native';
import {Link} from '@react-navigation/native';

const LinkButton = props => {
    return(
        <Link to={props.to}><Button title={props.title} color={props.color} onPress={props.onPress}/></Link>
    );
};

export default LinkButton;

