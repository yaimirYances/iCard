import React, { useEffect } from "react";
import { HeaderPage, TablePayments } from "../../components/Admin";
import { usePayment } from "../../hooks";
import { Loader } from "semantic-ui-react";

export const PaymentHistory = () => {
  const { getPayments, loading, payments } = usePayment();

  useEffect(() => {
    (async () => {
      getPayments();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <HeaderPage title="Historial de pagos" />
      {loading ? (
        <Loader active inline="centered">
          Cargando
        </Loader>
      ) : (
        <TablePayments payments={payments} />
      )}
    </div>
  );
};
