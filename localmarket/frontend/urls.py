from django.urls import path, re_path
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
    re_path(r'^.*/$', index),
]