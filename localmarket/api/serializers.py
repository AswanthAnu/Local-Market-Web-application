from rest_framework import serializers
from .models import CustomUser, Product, ProductVariant, ProductPricing, CartItem, Customer, Order, OrderDetails

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



class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class OrderDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetails
        fields = '__all__'
