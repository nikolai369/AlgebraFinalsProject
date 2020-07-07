import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Modal, Button, View} from 'react-native';

import Input from '../components/Input';
import Card from '../components/Card';

export const EventInfoScreen = props => {
    const [editable, setEditable] = useState(false);
    useEffect(() => {

    }, []);

    return(
        <Center>
            <Card>
                <Text>Title: </Text>
                <Input name="title"/>
                <Text>Start: </Text>
                <Input name="start"/>
                <Text>End: </Text>
                <Input name="end"/>
                <Text>Host: </Text>
                <Input name="host"/>
                <Text>Description: </Text>
                <Input name="description"/>
                <Text>location</Text>
                <Input name="location"/>
                <View>
                    <Button title="Dolazim" onPress={() => {}}/>
                    <Button title="Kupi kartu"onPress={() => {}}/>
                </View>
            </Card>
        </Center>
    );
};

const styles = StyleSheet.create({

});
