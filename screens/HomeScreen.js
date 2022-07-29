import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { db } from '../firebase';
import LoadingScreen from './LoadingScreen';
import { Text, View, TitleBox, ClassView, GraphBar, Stat } from '../components';

import { Colors, Spacing, Mixins } from '../styles';
import { stats } from '../utils/mockData';

const { SCALE_18, SCALE_16, SCALE_12, SCALE_8 } = Spacing;
//const { stats } = mockData; //0 = duration, 1=classes p/week

import { AuthContext } from '../utils/AuthProvider';

const HomeScreen = () => {
    const { userId } = useContext(AuthContext);

    const [gymClasses, setGymClasses] = useState();
    const [classesIds, setClassesIds] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        const abortController = new AbortController();

        const fetchData = () => {
            userId && db.ref(`/users/${userId}/classes`).on('value', snapshot => {
                let classes = Object.entries(snapshot.val());
                fetchGymClasses(classes);
            });
        };

        const fetchGymClasses = (classesIds) => {
            let gymClasses = [];
            classesIds && classesIds.map(([className, isTrue], index) => {
                db.ref('/classes/' + className).once('value').then( snapshot => {
                    if (isTrue) { gymClasses[index] = snapshot.val()}

                    if (classesIds.length === index + 1) {
                        setGymClasses(gymClasses);
                        setClassesIds(classesIds);
                        setIsLoading(false);
                    }
                });
            });
        };

        fetchData();
        return () => {
            db.ref('/users').off('value');
            abortController.abort();
        }
    }, []);

    if (isLoading) return <LoadingScreen/>

    return (
        <View flex style={styles.screen}>
            <ScrollView >
                <View style={styles.titleContainer}>
                    <Text title primary>YOUR ACTIVITY</Text>
                    <Text subtitle secondary>Overall visits</Text>
                </View>

                <View style={styles.graphContainer}>
                    <GraphBar />
                </View>

                <View row space center style={styles.statContainer}>
                    <View style={styles.stat}>
                        <Stat data={stats[0]} />
                    </View>

                    <View style={styles.midBorder} />

                    <View style={styles.stat}>
                        <Stat data={stats[1]} />
                    </View>
                </View>

                <View>
                    <TitleBox>Upcoming Classes</TitleBox>
                    
                    {/* RENDER CLASS */
                        (gymClasses && userId && classesIds)
                            && gymClasses.length !== 0 ? 
                        <ClassView 
                            date 
                            location 
                            data={gymClasses}
                            classes={classesIds}
                            userId={userId}
                        /> 
                        :
                        <View style={styles.emptyMessage}>
                            <Text title secondary>No Class Joined:</Text>
                            <Text body secondary>Please browse the classes section and book one now!</Text>
                        </View>
                    }
                </View>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.WHITE,
    },
    titleContainer: Mixins.padding(
        SCALE_16, 
        0, 
        0, 
        SCALE_16
    ),
    graphContainer: Mixins.padding(
        SCALE_16 * 1.25,
        SCALE_16 * 1.15,
        SCALE_8 * 1.25,
        SCALE_16 * 1.15

    ),
    midBorder: {
        borderWidth: 0.3,
        borderColor: Colors.SECONDARY,
        height: SCALE_16 * 6,
    },
    statContainer: Mixins.padding(
        SCALE_16 , //top
        SCALE_16 * 1.25, //right
        SCALE_8 * 1.25, //bottom
        SCALE_16 * 1.15 //left
    ),
    stat: {
        width: "45%",
    },
    emptyMessage: {
        padding: SCALE_16,
    }
});

export default HomeScreen;