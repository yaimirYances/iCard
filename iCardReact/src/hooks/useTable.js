import { useState } from "react";
import { useAuth } from "./useAuth";
import {
  addUTableApi,
  deleteTableApi,
  getTableApi,
  getTableNumberApi,
  getTablesApi,
  updateTableApi,
} from "../api/Table";
import { size } from "lodash";

export const useTable = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tables, setTables] = useState(null);
  const [table, setTable] = useState(null);
  const { auth } = useAuth();

  const getTables = async () => {
    try {
      setLoading(true);
      const response = await getTablesApi(auth.token);
      setLoading(false);
      setTables(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getTable = async (id) => {
    try {
      setLoading(true);
      const response = await getTableApi(id);
      setLoading(false);
      setTable(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addTable = async (data) => {
    try {
      setLoading(true);
      await addUTableApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateTable = async (id, data) => {
    try {
      setLoading(true);
      await updateTableApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteTable = async (id) => {
    try {
      setLoading(true);
      await deleteTableApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const isExistTable = async (tableNumber) => {
    try {
      const response = await getTableNumberApi(tableNumber);
      if (size(response) > 0) return true;
      throw Error();
    } catch (error) {
      setError(error);
    }
  };

  const getTableByNumber = async (tableNumber) => {
    try {
      const response = await getTableNumberApi(tableNumber);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  return {
    loading,
    error,
    tables,
    table,
    getTables,
    addTable,
    updateTable,
    deleteTable,
    getTable,
    isExistTable,
    getTableByNumber,
  };
};
