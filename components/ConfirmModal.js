import React from 'react';
import { StyleSheet, Modal, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import View from './View';
import Text from './Text';
import Button from './Button';
import Logo from './Logo';
import { Colors, Spacing } from '../styles';

const { SCALE_16, SCALE_12, SCALE_8 } = Spacing;

const ConfirmModal = props => {

    return (
        <Modal
            {...props}
            animationType="slide"
            transparent={true}
            visible={props.showConfirm}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                onPressOut={props.onClose}
            >

                <TouchableWithoutFeedback>
                    <View style={{ ...styles.modal, ...props.style }}>
                        <Logo style={styles.logo} />
                        <Text title white center>
                            {
                                props.isCancel ?
                                    'Confirm Cancel!' :
                                    'Confirm Booking!'
                            }
                        </Text>

                        <Text subtitle white center>
                            {
                                props.isCancel ?
                                    'Are you sure you want to cancel the class?' :
                                    'NOTE: You must attend the class!'
                            }

                        </Text>

                        <View row space style={styles.buttonsContainer}>
                            <Button onPress={props.onNo} style={{ ...styles.buttons, backgroundColor: Colors.ERROR }}>NO</Button>
                            <Button onPress={props.onYes} style={styles.buttons}>YES</Button>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>

        </Modal>
    )
};

const styles = StyleSheet.create({
    modalOverlay:{
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: Colors.SECONDARY
    },
    modal: {
        padding: SCALE_16 * 1.5,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 20,
        width: Dimensions.get('window').width,
        shadowColor: Colors.PRIMARY,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .6,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logo: {
        marginBottom: 50,
        alignSelf: "center",
    },
    buttonsContainer: {
        marginBottom: 50,
    },
    buttons: {
        width: "30%",
        marginTop: SCALE_12 * 2,
        paddingVertical: SCALE_8 * .625,
    }

});

export default ConfirmModal;