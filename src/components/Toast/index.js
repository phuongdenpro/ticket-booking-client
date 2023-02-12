import { toast } from 'react-toastify';
export const messToast = () => {
  return (type, message) => {
    const toaster = toast[type] || toast.info;
    toaster(message);
  };
};
