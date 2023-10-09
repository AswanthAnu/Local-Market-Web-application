from django.urls import path
from .views import register_user, user_login, user_logout, ProductListView, ProductCategoryView, ProductSearchView, AddToCartView, CartItemListView, UpdateCartItemQuantity, remove_cart_item, OrderSummaryCartItemListView, create_order, OrdersListView, update_delivery_status, CheckPhoneNumberExists

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/search/', ProductSearchView.as_view(), name='product-search'),
    path('products/category/<str:category_name>/', ProductCategoryView.as_view(), name='product-category'),
    path('add-to-cart/<int:variant_id>/', AddToCartView.as_view(), name='add-to-cart'),
    path('cart/', CartItemListView.as_view(), name='cart-item-list'),
    path('update-cart-item-quantity/<int:cartitem_id>/', UpdateCartItemQuantity.as_view(), name='update-cart-item-quantity'),
    path('remove-cart-item/<int:cart_item_id>/', remove_cart_item, name='remove_cart_item'),
    path('ordersummary-cart/', OrderSummaryCartItemListView.as_view(), name="showing-order-summary"),
    path('create-order/', create_order, name='create-order'),
    path('orders/', OrdersListView.as_view(), name="orders-list"),
    path('update-delivery-status/<int:order_id>/', update_delivery_status, name='update-delivery-status'),
    path('check-phone-number-exists/', CheckPhoneNumberExists.as_view(), name='check_phone_number_exists'),
]