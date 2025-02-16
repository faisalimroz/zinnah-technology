import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null,
    loading: true,
    error: null,
};



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.loading=false
        },
        clearUser: (state) => {
            state.user = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;

export const login = (token) => (dispatch) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    dispatch(setUser(decodedToken));
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch(clearUser());
};

export const initializeAuth = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            dispatch(setUser(decodedToken));
            localStorage.getItem('token')
        } catch (error) {
            console.error('Invalid token:', error);
            localStorage.removeItem('token');
        }
    }
    dispatch(setLoading(false));
};

export default authSlice.reducer;