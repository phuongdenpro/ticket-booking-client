import { toast } from 'react-toastify';
export const messageToast = () => {
  return (type, message) => {
    const toaster = toast[type] || toast.info;
    toaster(message);
  };
};
