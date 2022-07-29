const initialState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
    userId: null,
};

const AuthReducer = (prevState, action) => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
                userId: action.id,
            };
        case 'SIGN_IN':
            return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
                userId: action.id,
            };
        case 'SIGN_OUT':
            return {
                ...prevState,
                isSignout: true,
                userToken: null,
                userId: null,
            };
        case 'TEST': 
            return {
                ...prevState,
                isSignout: true,
            }
        default:
            return prevState;
    }
};

export { AuthReducer, initialState };