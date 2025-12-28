import toast from "react-hot-toast";

export const notify = {
  loading(message = "Loading...") {
    return toast.loading(message);
  },

  success(message = "Success") {
    toast.dismiss();
    toast.success(message);
  },

  error(message = "Something went wrong") {
    toast.dismiss();
    toast.error(message);
  },

  dismiss() {
    toast.dismiss();
  }
};
