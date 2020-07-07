import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../constants/colors';

const Header = props => {
    <View {...props}  style={StyleSheet.flatten([styles.header, props.style])}></View>
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        backgroundColor: colors.darkGreen + '75',
    }
});

export default Header;