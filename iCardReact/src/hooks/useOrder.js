import { useState } from "react";
import {
  addPaymentToOrderApi,
  addUOrderToTableApi,
  checkDeliveredOrderApi,
  closeOrderApi,
  getOrderByPaymentApi,
  getOrderTableApi,
} from "../api/orders";

export const UseOrder = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState(null);

  const getOrdersByTable = async (id, status, ordering) => {
    try {
      setLoading(true);
      const response = await getOrderTableApi(id, status, ordering);
      setLoading(false);
      setOrders(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const checkDeliveredOrder = async (id) => {
    try {
      setLoading(true);
      const response = await checkDeliveredOrderApi(id);
      setLoading(false);
      setOrders(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addOrderToTable = async (idTable, idProduct) => {
    try {
      await addUOrderToTableApi(idTable, idProduct);
    } catch (error) {
      setError(error);
    }
  };

  const addPaymentToOrder = async (idOrder, idPayment) => {
    try {
      await addPaymentToOrderApi(idOrder, idPayment);
    } catch (error) {
      setError(error);
    }
  };

  const closeOrder = async (idOrder) => {
    try {
      await closeOrderApi(idOrder);
    } catch (error) {
      setError(error);
    }
  };

  const getOrdersByPayment = async (idPayment) => {
    try {
      await getOrderByPaymentApi(idPayment);
    } catch (error) {
      setError(error);
    }
  };

  return {
    loading,
    error,
    orders,
    getOrdersByTable,
    checkDeliveredOrder,
    addOrderToTable,
    addPaymentToOrder,
    closeOrder,
    getOrdersByPayment,
  };
};
