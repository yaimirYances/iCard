from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from products.models import Product
from products.api.serializers import ProductSerializers


class ProductApiViewSet(ModelViewSet):
    Permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ProductSerializers
    queryset = Product.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["category", "active"]
