import { useSelector } from 'react-redux';
import { pageSlice, selectPage, useAppDispatch } from 'redux/store';

const useAuthReducer = () => {
    const dispatch = useAppDispatch();
    const { user } = useSelector(selectPage);
    // const { otpData } = useSelector(selectOtp);
    const setUser = async (userData: any) => {
        return dispatch(
            pageSlice.actions.setAuthData({
                user: userData
            })
        );
    };

    // const setOtp = async (data: any) => {
    //     console.log('useAuth', data, otpData);
    //     return dispatch(
    //         otpSlice.actions.setOtpData({
    //             otpData: data
    //         })
    //     );
    // };

    const clearUser = () =>
        dispatch(
            pageSlice.actions.setAuthData({
                user: null
            })
        );
    // return { user, otpData, setUser, setOtp, clearUser };
    return { user, setUser, clearUser };
};

export default useAuthReducer;
