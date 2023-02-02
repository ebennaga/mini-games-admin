/* eslint-disable no-param-reassign */
import { AnyAction, ThunkAction, configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import { nextReduxCookieMiddleware, wrapMakeStore } from 'next-redux-cookie-wrapper';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { useDispatch } from 'react-redux';

export const pageSlice = createSlice({
    name: 'webpage',
    initialState: { user: null },
    reducers: {
        setAuthData(state: any, action: any) {
            state.user = action.payload;
        }
    }
});

const combinedReducers = combineReducers({
    [pageSlice.name]: pageSlice.reducer
    // [otpSlice.name]: otpSlice.reducer
});

const rootReducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload
        };
        return nextState;
    }

    return combinedReducers(state, action);
};

// const now = new Date();
// const time = now.getTime();
// const expireTime = time + 1000 * 360000;
// now.setTime(expireTime);
// const expired = now.toUTCString();

const makeStore = wrapMakeStore(() =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().prepend(
                nextReduxCookieMiddleware({
                    subtrees: [
                        {
                            subtree: `webpage.user`,
                            cookieName: 'prizeplay.persist'
                            // expires: new Date(expired)
                        }
                    ]
                })
            )
    })
);

// eslint-disable-next-line no-use-before-define
export const selectPage = (state: AppState) => state[pageSlice.name];
// eslint-disable-next-line no-use-before-define
// export const selectOtp = (state: AppState) => state[otpSlice.name];

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunkAction<ReturnType = Promise<void>> = ThunkAction<ReturnType, AppState, unknown, AnyAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
