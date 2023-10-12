from rest_framework import status, generics, filters, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.pagination import PageNumberPagination
from .serializers import UserSerializer, ProductSerializer, CartItemSerializer, OrderSummaryCartItemSerializer, OrdersSerializer, CustomerSerializer, CustomerAddressSerializer, CustomerLocationSerializer
from .models import CustomUser, Product, Category, Cart, CartItem, ProductVariant, CartItem, Customer, Order, OrderDetails, CustomerAddress, Delivery, CustomerLocation
from django.http import JsonResponse
from django.views import View
from rest_framework.views import APIView
from django.contrib.auth import login
from django.utils import timezone
from django.db import transaction


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
        


@api_view(['DELETE'])
def remove_cart_item(request, cart_item_id):
    try:
        # Get the cart item by ID
        cart_item = CartItem.objects.get(pk=cart_item_id)

        # Check if the cart item belongs to the current user (add your own logic)
        if cart_item.cart.staff_user != request.user:
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

        # Delete the cart item
        cart_item.delete()

        return Response({'message': 'Cart item removed successfully'}, status=status.HTTP_204_NO_CONTENT)
    except CartItem.DoesNotExist:
        return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
    
class OrderSummaryCartItemListView(generics.ListAPIView):
    serializer_class = OrderSummaryCartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        print(self.request.user, ' --> user at ordersummary')
        staff_user = self.request.user
        try:
            cart = Cart.objects.get(staff_user=staff_user, status='active')
            return CartItem.objects.filter(cart=cart)
        except Cart.DoesNotExist:
            return CartItem.objects.none()
        
@api_view(['POST'])
def create_order(request):
    customer_data = request.data.get('customer')
    order_details_data = request.data.get('order_details')
    cart_id = order_details_data['cart_id']  # Get cart_id from the data sent from the frontend
    print('current user', request.user)
    custom_user = request.user

    # Check if the customer already exists based on phone_number
    customer, created = Customer.objects.get_or_create(phone_number=customer_data['phone_number'], defaults={
        'first_name': customer_data['first_name'],
        'last_name': customer_data['last_name'],
        'custom_user': custom_user  # Associate with the CustomUser
    })

    with transaction.atomic():
        if not created:
            # If the customer already exists, update the CustomerAddress
            try:
                customer_address = CustomerAddress.objects.get(customer=customer)
                customer_address.address_line1 = customer_data['address_line1']
                customer_address.address_line2 = customer_data.get('address_line2', '')  # Handle optional field
                customer_address.street_name = customer_data['street_name']
                customer_address.city = customer_data['city']
                customer_address.pincode = customer_data['pincode']
                customer_address.save()
            except CustomerAddress.DoesNotExist:
                # Handle the case where the customer exists but doesn't have a CustomerAddress (create one)
                customer_address = CustomerAddress.objects.create(
                    customer=customer,
                    address_line1=customer_data['address_line1'],
                    address_line2=customer_data.get('address_line2', ''),  # Handle optional field
                    street_name=customer_data['street_name'],
                    city=customer_data['city'],
                    pincode=customer_data['pincode']
                )


        # Check if latitude and longitude are provided in customer_data
        if customer_data['latitude'] and customer_data['longitude']:
            # Check if a CustomerLocation exists for the associated CustomerAddress
            print("entered in to the coordinates")
            try:
                customer_location = CustomerLocation.objects.get(customer_address=customer_address)
                # Update the latitude and longitude
                customer_location.latitude = customer_data['latitude']
                customer_location.longitude = customer_data['longitude']
                customer_location.save()
            except CustomerLocation.DoesNotExist:
                # Handle the case where CustomerLocation doesn't exist (create one)
                CustomerLocation.objects.create(
                    customer_address=customer_address,
                    latitude=customer_data['latitude'],
                    longitude=customer_data['longitude']
                )
        else:
            # Check if a CustomerLocation exists for the associated CustomerAddress
            try:
                customer_location = CustomerLocation.objects.get(customer_address=customer_address)
            except CustomerLocation.DoesNotExist:
                return Response({'message': 'Enable location permission'}, status=status.HTTP_400_BAD_REQUEST)

   
    # Create an order for the customer
    order = Order.objects.create(
        customer=customer,
        total_amount=order_details_data['total_amount'],
        total_discount=float(order_details_data['total_discount']),
        discount_amount=order_details_data['discount_amount']
    )

    delivery = Delivery.objects.create(order=order, delivery_status="pending")

    print('order', order)

    order_details_list = []

    # Create order details and add them to the list
    for order_detail_data in order_details_data['order_details']:
        order_detail = OrderDetails(
            order=order,
            product_id=order_detail_data['product'],
            variant_id=order_detail_data['variant'],
            quantity=int(order_detail_data['quantity']),
            total_price=order_detail_data['total_price'],
            discount=order_detail_data['discount'],
            discount_price=order_detail_data['discount_price']
        )
        order_details_list.append(order_detail)

    # Bulk create order details
    OrderDetails.objects.bulk_create(order_details_list)
    print('order details', OrderDetails)

    # Update cart status to completed
    try:
        cart = Cart.objects.get(id=cart_id)
        cart.status = 'completed'
        cart.save()
    except Cart.DoesNotExist:
        Cart.objects.none()

    # Reduce the stock quantity of the product variants
    for order_detail in order_details_list:
        product_variant_id = order_detail.variant_id
        quantity = order_detail.quantity
        try:
            cart_item = CartItem.objects.get(cart=cart, variant_id=product_variant_id)
            cart_item_quantity = cart_item.quantity
            if cart_item_quantity >= quantity:
                # Reduce the stock quantity
                product_variant = cart_item.variant
                product_variant.stock_quantity -= quantity
                product_variant.save()  # Save the product variant after reducing the stock
            else:
                return Response({'message': 'Not enough stock'}, status=status.HTTP_400_BAD_REQUEST)
        except CartItem.DoesNotExist:
            CartItem.objects.none()  # Handle the case where the cart item does not exist

    return Response({'message': 'Order created successfully'}, status=status.HTTP_201_CREATED)

class OrdersListView(generics.ListAPIView):
    serializer_class = OrdersSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.order_by('-order_date')
    
@api_view(['PUT'])
def update_delivery_status(request, order_id):
    try:
        delivery = Delivery.objects.get(order_id=order_id)
        new_status = request.data.get('delivery_status')
        
        # Update delivery_status
        delivery.delivery_status = new_status

        if new_status == 'delivered':
            # If the new_status is 'delivered', set delivery_date to the current timestamp
            delivery.delivery_date = timezone.now()
        elif new_status == 'pending':
            # If the new_status is 'pending', set delivery_date to None
            delivery.delivery_date = None

        delivery.save()

        return Response({'message': 'Delivery status updated successfully'}, status=status.HTTP_200_OK)
    except Delivery.DoesNotExist:
        return Response({'message': 'Delivery not found'}, status=status.HTTP_404_NOT_FOUND)
    
class CheckPhoneNumberExists(APIView):
    def get(self, request):
        phone_number = request.query_params.get('phone_number')
        print(phone_number)
        
        try:
            # Check if a customer with the given phone number exists
            customer = Customer.objects.get(phone_number=phone_number)
            
            # Retrieve the associated customer address
            customer_address = CustomerAddress.objects.get(customer=customer)
            
            # Serialize the data
            customer_data = CustomerSerializer(customer).data
            customer_address_data = CustomerAddressSerializer(customer_address).data

            print(customer_data, "customer_data")
            
            return Response({
                'exists': True,
                'customer': customer_data,
                'customerAddress': customer_address_data,
            })
        except Customer.DoesNotExist:
            return Response({'exists': False}, status=status.HTTP_404_NOT_FOUND)
        
class GetCustomerCoordinates(APIView):
    def get(self, request, *args, **kwargs):
        phone_number = request.GET.get('phone_number')
        print('[phone_number]', phone_number)
        try:
            customer = Customer.objects.get(phone_number=phone_number)
            customer_address = CustomerAddress.objects.get(customer=customer)
            customer_location = CustomerLocation.objects.get(customer_address=customer_address)
            serializer = CustomerLocationSerializer(customer_location)
            return Response(serializer.data)
        except CustomerAddress.DoesNotExist:
            return Response({'message': 'Customer not found'}, status=status.HTTP_404_NOT_FOUND)
        except CustomerLocation.DoesNotExist:
            return Response({'message': 'Location not found for the customer'}, status=status.HTTP_404_NOT_FOUND)