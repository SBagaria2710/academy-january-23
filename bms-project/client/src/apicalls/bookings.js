import { axiosInstance } from ".";

export const makePayment = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/booking/make-payment", payload);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const bookShow = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/booking/book-show", payload);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAllBookings = async (payload) => {
  try {
    const response = await axiosInstance.get("/api/booking/get-all-bookings", payload);
    return response.data;
  } catch (err) {
    return err;
  }
};