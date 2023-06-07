from django.db import models


# Create your models here.
class Order(models.Model):
    CHOICE = (("PENDING", "pending"), ("DELIVERED", "delivered"))

    table = models.ForeignKey(
        "tables.Table", on_delete=models.SET_NULL, null=True, blank=True
    )
    product = models.ForeignKey(
        "products.Product", on_delete=models.SET_NULL, null=True, blank=True
    )
    payment = models.ForeignKey(
        "payments.Payment", on_delete=models.CASCADE, null=True, blank=True
    )
    status = models.CharField(max_length=255, choices=CHOICE)
    create_at = models.DateTimeField(auto_now_add=True)
    close = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"

    def __str__(self):
        return str(self.table)
