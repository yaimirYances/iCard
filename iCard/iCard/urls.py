"""
URL configuration for iCard project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

##########################################
# Importando url de las imagenes
from django.conf import settings
from django.conf.urls.static import static

##########################################

#############################################################
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from users.api.urls import router_user
from categories.api.urls import router_category
from products.api.urls import router_product
from tables.api.urls import router_table
from orders.api.urls import router_order
from payments.api.urls import router_payment


schema_view = get_schema_view(
    openapi.Info(
        title="Icard - Documentacio oficial API",
        default_version="v1",
        description="Documentacion",
        terms_of_service="https://www.forticoPC.com.co",
        contact=openapi.Contact(email="forticoPC@hotmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
)
#############################################################
urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "docs/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redocs/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path("api/", include(router_user.urls)),  # url usuarios
    path("api/", include("users.api.urls")),  # url de las api
    path("api/", include(router_category.urls)),  # url categorias
    path("api/", include(router_product.urls)),  # url productos
    path("api/", include(router_table.urls)),  # url tablas
    path("api/", include(router_order.urls)),  # url Ordenes
    path("api/", include(router_payment.urls)),  # url Pagos
]

######################### URL PARA CARGAR IMAGENES #########################
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
