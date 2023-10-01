from rest_framework import serializers
from .models import CustomUser, Product, ProductVariant, ProductPricing, Category

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

