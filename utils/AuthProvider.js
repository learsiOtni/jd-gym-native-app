import { createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase';

const AuthContext = createContext();

const provider = ([dispatch]) => ({

    signIn: async (email, password) => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            let user = auth.currentUser;
            if (user) {
                let token = await user.getIdToken();
                //await AsyncStorage.setItem("userData", JSON.stringify(user));
                await AsyncStorage.setItem("userToken", token);
                await AsyncStorage.setItem("userId", user.uid);
                dispatch({ type: "SIGN_IN", token: token, id: user.uid });
            }
        } catch (error) {
            alert(error.message);
        }
    },

    signOut: () => {
        auth.signOut();
        AsyncStorage.removeItem("userToken");
        AsyncStorage.removeItem('userId');
        dispatch({ type: 'SIGN_OUT' });
    },

    signUp: async (email, password) => {
        try {
            await auth.createUserWithEmailAndPassword(email, password);
        } catch (e) {
            console.log('here' + e.message);
        }
        dispatch({ type: 'SIGN_IN', token: user.getIdToken });
    },

    fetchToken: async () => {
        try {
            let token = await AsyncStorage.getItem('userToken');
            let id = await AsyncStorage.getItem('userId');
            dispatch({ type: 'RESTORE_TOKEN', token, id });
        } catch (e) {
            console.log(e);
            //dispatch error
        }
    },
})

export { AuthContext, provider };