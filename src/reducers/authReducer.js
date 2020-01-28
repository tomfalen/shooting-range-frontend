export const initialAuthState = {
    isLoggedIn: false,
    error: '',
    sessionId: '',
	IsWorker: false,
    permissions: []
};

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                isLoggedIn: true,
                error: '',
                sessionId: action.payload.sessionId,
                IsWorker: action.payload.IsWorker,
                permissions: action.payload.permissions
            };
        case 'LOGIN_ERROR':
            return {
                isLoggedIn: false,
                error: action.payload.error,
                sessionId: '',
                IsWorker: false,
                permissions: []
            };
        case 'REGISTER':
            return {
                isLoggedIn: false,
                error: '',
                sessionId: action.payload.sessionId,
                IsWorker: action.payload.IsWorker,
                permissions: action.payload.permissions
        };
        case 'REGISTER_ERROR':
            return {
                isLoggedIn: false,
                error: '',
                sessionId: action.payload.sessionId,
                IsWorker: action.payload.IsWorker,
                permissions: action.payload.permissions
        };      
        case 'LOGOUT':
            localStorage.removeItem("permissions");
            localStorage.removeItem("sessionId");
            localStorage.removeItem("isWorker");
            return {
                isLoggedIn: false,
                error: '',
                sessionId: '',
                IsWorker: false,
                permissions: []
        };
        case 'LOGOUT_ERROR':
            return {
                isLoggedIn: false,
                error: '',
                sessionId: '',
                IsWorker: false,
                permissions: []
        };
        default:
            return state;
    }
};