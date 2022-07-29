import { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../firebase';

import LoadingScreen from './LoadingScreen';
import { Text, View, ActivityBox } from '../components';
import { Colors, Spacing} from '../styles';

const { SCALE_16, SCALE_8 } = Spacing;

const ActivitiesScreen = () => {

    const [database, setDatabase] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        const abortController = new AbortController();
        
        const fetchData = async () => {
            let userId = await AsyncStorage.getItem('userId');
            const activitiesRef = db.ref(`users/${userId}/activities`);
            activitiesRef.on('value',  snapshot => {
                if (snapshot.val()) {
                    let activities = Object.entries(snapshot.val());
                    getActivities(activities.reverse(), userId); // reverse order
                } else {
                    setIsLoading(false);
                }
            });
        };

        const getActivities = (activities, userId) => {
            let tempArray = [];
            activities && activities.map( ([activitiesId, isTrue], index) => {

                db.ref(`/activities/${userId}/${activitiesId}`).on('value', snapshot => {
                    if (isTrue) {
                        tempArray[index] = snapshot.val();
                    }

                    if (activities.length === index + 1) {
                        setDatabase(tempArray);
                        setIsLoading(false);
                    }
                });
            });
        }

        !database && fetchData();
        return () => {
            //activitiesRef.off("value");
            abortController.abort();
        }
    }, []);

    

    if (isLoading) {
        return <LoadingScreen />
    }

    const noData = [
        {
        name: 'NO DATA FOUND',
        },
    ]

    return (
        <View flex style={styles.screen}>
            <View style={styles.titleContainer}>
                <Text title primary>ACTIVITIES</Text>
                <View row>
                    <Text subtitle secondary>Visits in last 3 months</Text>
                    <Text body secondary style={styles.paddingLeft}>(Updated just now)</Text>
                </View>
            </View>

            <FlatList
                data={database ? database : noData}
                renderItem={ 
                    ({item}) => 
                        <ActivityBox 
                            date={item.date}
                            length={item.length}
                            location={item.location}
                            name={item.name.toUpperCase()}
                            time={item.time}
                        />
                }
                keyExtractor= { (item ,index) => `${item}-${index}`} 
            />

            <View style={styles.bottomNote}>
                <Text body secondary center>Make sure you use your PIN upon entering and exiting the gym to log a visit.</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.WHITE,
    },
    titleContainer: {
        padding: SCALE_16,
        borderBottomColor: Colors.WHITE_2,
        borderBottomWidth: 1,
    },
    bottomNote: {
        padding: SCALE_16,
        borderTopColor: Colors.WHITE_2,
        borderTopWidth: .3,
    },
    paddingLeft: {
        paddingLeft: SCALE_8 * 1.25
    }
});

export default ActivitiesScreen;