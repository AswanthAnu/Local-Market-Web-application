from django.urls import path
from .views import index
from django.views.generic import RedirectView

urlpatterns = [
    path('', index ),
    path('login', index ),
    path('register', index ),
    path('orders', index ),
    path('delivery', index ),
    path('cart', index ),
    path('checkout', index ),
    path('<path:route>', index),
]