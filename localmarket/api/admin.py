from django.contrib import admin
from .models import CustomUser, Customer, CustomerAddress, Product, ProductVariant, ProductPricing, Order, OrderDetails, Delivery, Cart, CartItem, Category

# Register your models here.
class ProductPricingInline(admin.TabularInline):
    model = ProductPricing
    extra = 1

class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    inlines = [ProductPricingInline]
    extra = 1

class ProductVariantAdmin(admin.ModelAdmin):
    inlines = [ProductPricingInline]

class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductVariantInline ]

class CartItemVariantInline(admin.TabularInline):
    model = CartItem
    extra = 0

class CartAdmin(admin.ModelAdmin):
    inlines = [CartItemVariantInline]

class CustomerAddressInline(admin.TabularInline):
    model = CustomerAddress
    extra = 0

class CustomerAdmin(admin.ModelAdmin):
    inlines = [CustomerAddressInline]

    

admin.site.register(CustomUser)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(CustomerAddress)
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductVariant, ProductVariantAdmin)
admin.site.register(ProductPricing)
admin.site.register(Order)
admin.site.register(OrderDetails)
admin.site.register(Delivery)
admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem)
admin.site.register(Category)
