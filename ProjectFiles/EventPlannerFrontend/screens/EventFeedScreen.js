import faker from 'faker';
import React, { useEffect } from 'react';
import ListView from '../components/ListView';
import EventItem from '../components/EventItem';

export const EventFeedScreen = props => {
    useEffect(() => {

    }, []);

    return(
        <ListView data={Array.from(Array(10), () => faker.commerce.product())} keyExtractor={(product, idx) => product + idx} renderItem={(item) => <EventItem title={item.product}/>}/>
    );
}