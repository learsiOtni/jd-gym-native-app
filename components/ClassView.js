import React, {useState} from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { db } from '../firebase';

import View from './View';
import Text from './Text';
import Button from './Button';
import BookedView from './BookedView';
import ConfirmModal from './ConfirmModal';
import { Colors, Spacing } from '../styles';
import { formatDate } from '../utils/helper';

const ClassView = props => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState();

    const [showConfirm, setShowConfirm ] = useState(false);
    const [updatesDb, setUpdatesDb] = useState();
    const [isCancel, setIsCancel] = useState();

    // Toggle more info for class
    const toggleHandler = index => {
        if (index !== selectedIndex) {
            setIsOpen(true);
        } else if (isOpen) {
            setIsOpen(false);
        } else {
            setIsOpen(true)
        }
        setSelectedIndex(index);
    }  

    // JOIN OR CANCEL CLASS
    //const db = firebase.database();
    const joinCancelHandler = (type, index) => {

        setShowConfirm(true);
        let classId = props.classes[index][0];
        // SET
        let update;
        type ? update = true : update = false;
        //UPDATE
        let updates = {}
        updates[`/users/${props.userId}/classes/${classId}`] = update;
        updates[`/classes/${classId}/users/${props.userId}`] = update;
        setUpdatesDb(updates); // For db update when confirmed
        setIsCancel(type ? false : true); // For Modal*/
    }

    // CONFIRM YES
    const commitUpdate = () => {
        closeConfirm();
        db.ref().update(updatesDb);
    }

    // CLOSE MODAL
    const closeConfirm = () => {
        setShowConfirm(false);
    };

    // RENDERS
    const renderButton = (type, index) => {
        let buttonStyle = styles.button;
        if (!type) {
            buttonStyle = {...styles.button, ...styles.cancelButton}
        };

        return (
            <Button 
                textStyle={{fontSize: 12}} 
                style={buttonStyle}
                onPress={joinCancelHandler.bind(this, type, index)}
            >
                {type ? "JOIN CLASS" : "CANCEL CLASS"  }
            </Button>
        )
    };

    const renderLocation = (location) => (
        <View row>
            <Text subtitle secondary>Location - </Text>
            <Text body secondary>{location}</Text>
        </View>
    );
    // END OF RENDERS
    
    return (
        <View>
            <ConfirmModal 
                showConfirm={showConfirm} 
                onNo={closeConfirm}
                onYes={commitUpdate}
                isCancel={isCancel}
                onClose={closeConfirm}
            />

            { props.data && props.data.map( (item, index) => {
                return (
                    <View style={styles.classView} key={index}>
                        { /* MAIN VIEW */}
                        <TouchableWithoutFeedback onPress={toggleHandler.bind(this, index)}>
                            <View row>
                                <View style={styles.detailsContainer}>
                                    <Text title>{item.name.toUpperCase()}</Text>

                                    <View row>
                                        {
                                            props.date ? (
                                                <Text subtitle secondary>
                                                    {formatDate(item.date)} - <Text body>{item.startTime}</Text>
                                                </Text>
                                                ) : (
                                                <Text subtitle secondary>{item.startTime}</Text>
                                                )    
                                        }
                                        <Text body secondary> ({item.length})</Text>
                                    </View>
                                    
                                    {
                                        props.location && renderLocation(item.location)
                                    }
                        
                                </View>

                                {
                                    props.booked && 
                                    (item.users && item.users[props.userId]) &&
                                        <View middle style={styles.bookedContainer}>
                                            <BookedView />
                                        </View>
                                }

                            </View>
                        </TouchableWithoutFeedback>

                        { /* MORE INFO VIEW */
                        (isOpen && selectedIndex === index ) &&
                            <View style={styles.moreContainer}>

                                <View row>
                                    <Text subtitle secondary>Places remaining - </Text>
                                    <Text body secondary>20</Text>
                                </View>

                                {
                                    !props.location && renderLocation(item.location)
                                }
                                
                                <View row>
                                    <Text subtitle secondary>Instructor - </Text>
                                    <Text body secondary>{item.instructor}</Text>
                                </View>

                                <View style={styles.descContainer}>
                                    <Text subtitle primary>Description</Text>
                                    <Text body secondary>{item.description}</Text>
                                </View>
                                
                                {   
                                    props.button && // Pass button as props if want to toggle between join and cancel
                                    ( !item.users || (item.users && !item.users[props.userId]) ) ?
                                    renderButton("join", index) 
                                    :
                                    renderButton('', index)
                                }
                            </View>
                        }
                    </View>
                ) /* Return ends */
            }) /* Data map ends */  } 
        </View>
    )
}

const styles = StyleSheet.create({
    classView: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.TERTIARY,
        paddingHorizontal: Spacing.SCALE_16,
        paddingVertical: Spacing.SCALE_8 * 1.25,
    },
    detailsContainer: {
        width: "75%",
    },
    bookedContainer: {
        paddingLeft: Spacing.SCALE_8,
    },
    moreContainer: {
        paddingTop: Spacing.SCALE_8 * .625,
    },
    descContainer:{
        marginTop: Spacing.SCALE_8 * 1.25,
    },
    button: {
        marginVertical: Spacing.SCALE_8 * 1.25,
        paddingVertical: Spacing.SCALE_8 * 1.25,
        backgroundColor: Colors.ACCENT,
    },
    cancelButton: {
        backgroundColor: Colors.ERROR,
    },
    

});

export default ClassView;