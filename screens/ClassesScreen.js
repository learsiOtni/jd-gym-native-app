import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { db } from '../firebase';
import LoadingScreen from './LoadingScreen';
import { Text, View, TitleBox, ClassView } from '../components';
import { formatDate, createDays } from '../utils/helper';

import { Colors, Spacing, Mixins, Typography } from '../styles';
const { SCALE_18, SCALE_16, SCALE_12, SCALE_8 } = Spacing;

import { AuthContext } from '../utils/AuthProvider';
import { fetchGymClasses } from '../utils/helper';

const ClassesScreen = () => {

    const { userId } = useContext(AuthContext);

    const [gymClasses, setGymClasses] = useState();
    const [classesIds, setClassesIds] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const [date, setDate] = useState('20200511');
    const [days, setDays] = useState();
    const [selectedDay, setSelectedDay] = useState(3);
    
    const selectDayHandler = (index, day) =>{
        let year = date.substring(0, 3);
        let month = date.substring(3,6);
        let newDate = year + month + day; 
        
        setDate(newDate);
        setSelectedDay(index);
        setIsLoading(true);
    };

    // CREATE DAY ARRAY
    const createDaysHandler = () => {
        setDays(createDays(date));
    }
    !days && createDaysHandler();


    // FETCH DATA
    useEffect ( () => {
        const abortController = new AbortController();
        const fetchData = async () => {
            //GET DATES FIRST
            let newDate = date;
            db.ref('/dates/' + date).on('value', snapshot => {
                if (!snapshot.val()) {
                    setGymClasses(null);
                    setIsLoading(false);
                    return alert("Cannot find date for " + formatDate(newDate));
                }
                let classes = Object.entries(snapshot.val().classes);
                fetchGymClasses(classes);
            });
        };

        const fetchGymClasses = (classesIds) => {
            let gymClasses = [];
            classesIds && classesIds.map(([className, isTrue], index) => {
                db.ref('/classes/' + className).on('value', snapshot => {
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
            try {
                db.ref('classes').off('value');
                abortController.abort();
            } catch (e) {
                if (!abortController.signal.aborted) {
                    control.log(e);
                }
            }
        }
    }, [date]);
    // END OF FETCH*/

    if (isLoading) return <LoadingScreen/>;

    return(
        <View flex style={styles.screen}>
            <View style={styles.dateContainer}>
                <View row middle center>
                    <Icon style={styles.icon} name="chevron-left" size={9}/>
                    <Text white title>May</Text>
                    <Icon style={styles.icon} name="chevron-right" size={9}/>
                </View>

                <View row space>
                    {days && days.map( (day, index) => {
                        let style = styles.dayContainer;
                        let selectedStyle = styles.selectedDay;
                        //let hasBookedStyle = styles.hasBooked;

                        if (selectedDay === index) {
                            style = {...style, ...selectedStyle}
                        }
                        return (
                            <TouchableWithoutFeedback onPress={selectDayHandler.bind(this, index, day)} key={index} >
                                <View style={style} center middle>
                                    <Text white body center>{day}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }) }
                </View>
            </View> 
            { /* End of date box */}

            <ScrollView>
                <TitleBox>{date && formatDate(date)}</TitleBox>
    
                {
                    (gymClasses && userId && classesIds) &&
                        <ClassView
                            data={gymClasses} 
                            userId={userId} 
                            classes={classesIds}
                            button 
                            booked
                        />
                }
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.WHITE,
    },
    dateContainer: {
        paddingVertical: SCALE_16,
        paddingHorizontal: SCALE_8,
        backgroundColor: Colors.PRIMARY,
        borderTopWidth: .2,
        borderTopColor: Colors.TERTIARY,
    },
    icon: {
        color: Colors.WHITE,
        paddingHorizontal: SCALE_8 * 1.75,
        fontSize: Typography.FONT_SIZE_12 * 0.83,
    },
    dayContainer: {
        borderRadius: 40,
        width: SCALE_16 * 2,
        height: SCALE_16 * 2,
        marginTop: SCALE_8,
    },
    selectedDay: {
        backgroundColor: Colors.ACCENT,
    },
});

export default ClassesScreen;