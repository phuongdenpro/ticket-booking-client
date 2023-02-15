import { toast } from 'react-toastify';
import { css } from 'glamor';

const customToast = {
  success(msg, options = {}) {
    return toast.success(msg, {
      ...options,
      className: 'toast-success-container toast-success-container-after',
      progressClassName: css({
        background: '#34A853',
      }),
    });
  },
  error(msg, options = {}) {
    return toast.error(msg, {
      ...options,
      className: 'toast-error-container toast-error-container-after',
      progressClassName: css({
        background: '#EE0022',
      }),
    });
  },
  info(msg, options = {}) {
    return toast.info(msg, {
      ...options,
      className: 'toast-info-container toast-info-container-after',
      progressClassName: css({
        background: '#07F',
      }),
    });
  },
  warning(msg, options = {}) {
    return toast.warning(msg, {
      ...options,
      className: 'toast-warning-container toast-warning-container-after',
      progressClassName: css({
        background: '#f4e807',
      }),
    });
  },
};


export default customToast;
