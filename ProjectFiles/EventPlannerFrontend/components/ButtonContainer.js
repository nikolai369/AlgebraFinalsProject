import React from 'react';
import {View, StyleSheet} from 'react-native';

const ButtonContainer = props => {
    return(
        <View {...props} style={StyleSheet.flatten([styles.buttonContainer, props.style])}>{props.children}</View>
    )
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
      },
});

export default ButtonContainer;