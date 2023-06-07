from django.db import models


# Create your models here.
CHOICES_PAYMENT = (("CARD", "card"), ("CASH", "cash"))
CHOICES_STATUS = (("PENDING", "pendind"), ("PAID", "paid"))


class Payment(models.Model):
    table = models.ForeignKey("tables.Table", on_delete=models.SET_NULL, null=True)
    totalPayment = models.DecimalField(max_digits=10, decimal_places=2)
    paymentType = models.CharField(max_length=255, choices=CHOICES_PAYMENT)
    statusPayment = models.CharField(max_length=255, choices=CHOICES_STATUS)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Payment"
        verbose_name_plural = "Payments"
