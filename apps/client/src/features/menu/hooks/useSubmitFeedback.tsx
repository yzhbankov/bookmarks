import { useContext } from 'react';
import { useMutation } from 'react-query';
import { AppContext, AppContextType } from '../../../context';
import { IFeedbackCreate } from '../../../api/axios/AxiosFeedbackApi';

export interface IFeedbackSubmit {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    submitFeedback: (feedback: IFeedbackCreate) => Promise<any>;
    reset: () => void;
}

export function useSubmitFeedback(): IFeedbackSubmit {
    const { api } = useContext<AppContextType>(AppContext);

    async function postFeedback(data: IFeedbackCreate) {
        return api?.feedback.submit(data);
    }

    const { isLoading, isError, isSuccess, mutateAsync: submitFeedback, reset } = useMutation(postFeedback);

    return { isLoading, isError, isSuccess, submitFeedback, reset };
}
