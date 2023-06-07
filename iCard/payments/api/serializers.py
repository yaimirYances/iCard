from rest_framework import serializers
from payments.models import Payment
from tables.api.serializers import TableSerializer


class PaymentSerializer(serializers.ModelSerializer):
    table_data = TableSerializer(source="table", read_only=True)

    class Meta:
        model = Payment
        fields = [
            "id",
            "table",
            "table_data",
            "totalPayment",
            "statusPayment",
            "paymentType",
            "created_at",
        ]
