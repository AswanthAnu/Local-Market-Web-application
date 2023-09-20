from django.urls import path
from .views import index

urlpatterns = [
    path('', index ),
    path('login', index ),
    path('register', index ),
    path('orders', index ),
    path('delivery', index ),
    path('cart', index ),
    path('checkout', index ),
]