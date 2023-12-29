from rest_framework import serializers
from .models import CustomUser, Product, ProductVariant, ProductPricing, CartItem, Customer, Order, OrderDetails, CustomerAddress, CustomerLocation, Delivery, DealOfTheDay, OfferCartItem

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            first_name=validated_data["first_name"],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class ProductPricingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductPricing
        fields = "__all__"

class ProductVariantSerializer(serializers.ModelSerializer):
    pricing = ProductPricingSerializer(source='productpricing')  

    class Meta:
        model = ProductVariant
        fields = "__all__"
        

class ProductSerializer(serializers.ModelSerializer):
    variants = ProductVariantSerializer(many=True, source='productvariant_set') 
    category = serializers.CharField(source='category.category_name')  


    class Meta:
        model = Product
        fields = "__all__"


class CartItemSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    product_variant = serializers.SerializerMethodField()
    product_pricing = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = '__all__'

    def get_product(self, obj):
        return {
            'product_name': obj.variant.product.product_name,
            'image': obj.variant.product.image.url,
        }

    def get_product_variant(self, obj):
        return {
            'weight': obj.variant.weight,
            'weight_unit': obj.variant.weight_unit,
            'stock_quantity': obj.variant.stock_quantity,
        }

    def get_product_pricing(self, obj):
        return {
            'original_price': obj.variant.productpricing.original_price,
            'discount': obj.variant.productpricing.discount,
            'discount_price': obj.variant.productpricing.discount_price,
        }


class OrderSummaryCartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.SerializerMethodField()
    cart_id = serializers.SerializerMethodField()
    variant_id = serializers.SerializerMethodField()
    quantity = serializers.SerializerMethodField()
    product_pricing = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['cart_id', 'product_id', 'variant_id', 'quantity', 'product_pricing']

    def get_product_id(self, obj):
        return obj.variant.product.id
    
    def get_cart_id(self, obj):
        return obj.cart.id

    def get_variant_id(self, obj):
        return obj.variant.id

    def get_quantity(self, obj):
        return obj.quantity

    def get_product_pricing(self, obj):
        product_pricing = obj.variant.productpricing
        return {
            'original_price': product_pricing.original_price,
            'discount': product_pricing.discount,
            'discount_price': product_pricing.discount_price,
        }



class CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerAddress
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    # Include the customer address data using the CustomerAddressSerializer
    customer_address = CustomerAddressSerializer(source='customeraddress', read_only=True)

    class Meta:
        model = Customer
        fields = '__all__'

class OrderDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetails
        fields = '__all__'


class OrdersSerializer(serializers.ModelSerializer):
    customer = serializers.SerializerMethodField()
    order_details = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'total_amount', 'total_discount', 'discount_amount', 'customer', 'order_details']

    def get_customer(self, obj):
        customer = obj.customer
        customer_address = CustomerAddress.objects.get(customer=customer)  
        return {
            'first_name': customer.first_name,
            'last_name': customer.last_name,
            'phone_number': customer.phone_number,
            'address_line1': customer_address.address_line1,
            'address_line2': customer_address.address_line2,
            'street_address': customer_address.street_name,
            'city': customer_address.city,
            'pincode': customer_address.pincode,
        }

    def get_order_details(self, obj):
        order_details = OrderDetails.objects.filter(order=obj)
        serialized_data = []
        for order_detail in order_details:
            # Fetch the related Delivery model
            try:
                delivery = Delivery.objects.get(order=obj)
                delivery_status = delivery.delivery_status
            except Delivery.DoesNotExist:
                delivery_status = None  # Handle the case where delivery status is not available

            serialized_data.append({
                'product_name': order_detail.product.product_name,  
                'variant_weight': order_detail.variant.weight,
                'variant_weight_unit': order_detail.variant.weight_unit,
                'quantity': order_detail.quantity,
                'original_price': order_detail.total_price,
                'discount': order_detail.discount,
                'discount_price': order_detail.discount_price,
                'delivery_status': delivery_status,
            })
        return serialized_data
    
class CustomerLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerLocation
        fields = '__all__'

class DealOfTheDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = DealOfTheDay
        fields = '__all__'


class OfferCartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(source='variant.product', read_only=True)

    class Meta:
        model = OfferCartItem
        fields ="__all__"