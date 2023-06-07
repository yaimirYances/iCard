import { useState } from "react";
import {
  addPaymentApi,
  closePaymentApi,
  getPaymentApi,
  getPaymentsApi,
} from "../api/payments";

export const usePayment = () => {
  const [payments, setPayments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addPayment = async (data) => {
    try {
      return await addPaymentApi(data);
    } catch (error) {
      setError(error);
    }
  };

  const getPayment = async (idTable) => {
    try {
      return await getPaymentApi(idTable);
    } catch (error) {
      setError(error);
    }
  };

  const getPayments = async () => {
    try {
      setLoading(true);
      const response = await getPaymentsApi();
      setLoading(false);
      setPayments(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const closePayment = async (idPayment) => {
    try {
      return await closePaymentApi(idPayment);
    } catch (error) {
      setError(error);
    }
  };

  return {
    error,
    loading,
    payments,
    addPayment,
    getPayment,
    closePayment,
    getPayments,
  };
};
