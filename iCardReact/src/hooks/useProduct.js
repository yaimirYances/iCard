import { useState } from "react";
import {
  addProductApi,
  deleteProductApi,
  getProductsApi,
  updateProductApi,
} from "../api/Product";
import { useAuth } from "./useAuth";

export const useProduct = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);
  const { auth } = useAuth();

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await getProductsApi();
      setLoading(false);
      setProducts(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addProduct = async (data) => {
    try {
      setLoading(true);
      const response = await addProductApi(data, auth.token);
      setLoading(false);
      setProducts(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateProduct = async (id, data) => {
    try {
      setLoading(true);
      const response = await updateProductApi(id, data, auth.token);
      setLoading(false);
      setProducts(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await deleteProductApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    products,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
