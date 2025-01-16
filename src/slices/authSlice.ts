import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface AuthState {
    isLogged: boolean
    user: IUser | null
}

const initialState: Partial<AuthState> = {
    isLogged: false,
    user: null
}

export const signOut = createAsyncThunk('auth/signOut', async () => {
    await AsyncStorage.removeItem('access_token')
    await AsyncStorage.removeItem('refresh_token')
    return initialState
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, { payload }: { payload: IUser }) => {
            state.user = payload
        },
        setLogged: (state, { payload }: { payload: boolean }) => {
            state.isLogged = payload
        }
    },
    extraReducers: builder => {
        builder.addCase(signOut.fulfilled, () => {
            return initialState
        })
    }
})

export const { setUser, setLogged } = authSlice.actions
export default authSlice.reducer
