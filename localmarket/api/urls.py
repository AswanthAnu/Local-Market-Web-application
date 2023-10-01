from django.urls import path
from .views import register_user, user_login, user_logout, ProductListView, ProductCategoryView, ProductSearchView

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/search/', ProductSearchView.as_view(), name='product-search'),
    path('products/category/<str:category_name>/', ProductCategoryView.as_view(), name='product-category'),


]