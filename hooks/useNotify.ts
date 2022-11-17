import { useSnackbar } from 'notistack';

const useNotify = () => {
    const { enqueueSnackbar } = useSnackbar();
    const notify = (message: string, type: any = 'success') => {
        return enqueueSnackbar(message, {
            variant: type
        });
    };
    return notify;
};

export default useNotify;
