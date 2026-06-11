import { isAxiosError } from 'axios';
import { useState } from 'react';

const useErrorApi = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const handleError = (error: unknown) => {
    if (!isAxiosError(error)) return;
    switch (error.response?.status) {
      case 400:
        break;
      case 401:
        setErrorMessage(
          'This user does not exist, or the login credentials are incorrect',
        );
        return;

      case 409:
        setErrorMessage('A user with this email address already exists ');
        return;

      default:
        setErrorMessage('Unknown error');
        return;
    }
  };
  return { handleError, errorMessage };
};

export default useErrorApi;
