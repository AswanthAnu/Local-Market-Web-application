from django.urls import path
from .views import register_user, user_login, user_logout, is_staff, ProductListView, ProductCategoryView, ProductSearchView, AddToCartView, CartItemListView, UpdateCartItemQuantity, remove_cart_item, OrderSummaryCartItemListView, create_order, OrdersListView, update_delivery_status, CheckPhoneNumberExists, GetCustomerCoordinates, DeliveryListView, download_invoice, DealOfTheDayView, update_offer_cart_items

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
    path('is_staff/', is_staff, name='is_staff'),
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
    path('delivery/', DeliveryListView.as_view(), name="delivery-list"),
    path('update-delivery-status/<int:order_id>/', update_delivery_status, name='update-delivery-status'),
    path('check-phone-number-exists/', CheckPhoneNumberExists.as_view(), name='check_phone_number_exists'),
    path('get-customer-coordinates/', GetCustomerCoordinates.as_view(), name='get_customer_coordinates'),
    path('download_invoice/<int:order_id>/', download_invoice, name='download_invoice'),
    path('offers/', DealOfTheDayView.as_view(), name='deal_ofthe_day'),
    path('offercheck/',update_offer_cart_items, name="update_offer_cart_items" ),
]