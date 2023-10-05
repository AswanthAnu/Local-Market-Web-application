from rest_framework import status, generics, filters, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.pagination import PageNumberPagination
from .serializers import UserSerializer, ProductSerializer, CartItemSerializer
from .models import CustomUser, Product, Category, Cart, CartItem, ProductVariant, CartItem
from django.http import JsonResponse
from django.views import View
from rest_framework.views import APIView
from django.contrib.auth import login


@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        print('login api', username)

        user = None
        if '@' in username:
            try:
                user = CustomUser.objects.get(email=username)
            except ObjectDoesNotExist:
                pass

        if not user:
            print('not current user', request.user)
            user = authenticate(username=username, password=password)
            

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            login(request, user)
            print('current user', request.user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    if request.method == 'POST':
        try:
            print('entered into the user_logout')
            request.user.auth_token.delete()
            return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CustomPagination(PageNumberPagination):
    page_size = 12 

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticatedOrReadOnly] 

class ProductSearchView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['product_name', 'category__category_name']
    permission_classes = [IsAuthenticatedOrReadOnly]

class ProductCategoryView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly] 

    def get_queryset(self):
        category_name = self.kwargs['category_name']
        category = get_object_or_404(Category, category_name=category_name)
        return Product.objects.filter(category=category)
    
class AddToCartView(View):
    def post(self, request, variant_id):
        print("entered into cart", request.user)
        variant = get_object_or_404(ProductVariant, pk=variant_id)
        quantity = int(request.POST.get('quantity', 1))

        active_cart, created = Cart.objects.get_or_create(
            staff_user=request.user,
            status='active',
            defaults={'status': 'active'}
        )

        cart_item, item_created = CartItem.objects.get_or_create(
            cart=active_cart,
            variant=variant,
            defaults={'quantity': quantity}
        )

        if not item_created:
            cart_item.quantity += quantity
            cart_item.save()

        return JsonResponse({'message': 'Item added to cart successfully'})
    
class CustomPagination(PageNumberPagination):
    page_size = 6  

class CartItemListView(generics.ListAPIView):
    serializer_class = CartItemSerializer
    pagination_class = CustomPagination
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        print(self.request.user, ' --> user at cart')
        staff_user = self.request.user
        try:
            cart = Cart.objects.get(staff_user=staff_user, status='active')
            return CartItem.objects.filter(cart=cart)
        except Cart.DoesNotExist:
            return CartItem.objects.none()
        
class UpdateCartItemQuantity(APIView):
    def post(self, request, cartitem_id):
        try:
            cart_item = CartItem.objects.get(id=cartitem_id)
            new_quantity = int(request.data.get('quantity'))

            if new_quantity < 1:
                return Response({'error': 'Quantity must be greater than or equal to 1'}, status=status.HTTP_400_BAD_REQUEST)

            if new_quantity <= cart_item.variant.stock_quantity:
                # quantity_change = new_quantity - cart_item.quantity

                cart_item.quantity = new_quantity
                cart_item.save()

                # product_variant = cart_item.variant
                # product_variant.stock_quantity -= quantity_change
                # product_variant.save()

                return Response({'message': 'Quantity updated successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Insufficient stock quantity'}, status=status.HTTP_400_BAD_REQUEST)
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)