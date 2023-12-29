from rest_framework import status, generics, filters, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.pagination import PageNumberPagination
from .serializers import UserSerializer, ProductSerializer, CartItemSerializer, OrderSummaryCartItemSerializer, OrdersSerializer, CustomerSerializer, CustomerAddressSerializer, CustomerLocationSerializer, DealOfTheDaySerializer, OfferCartItemSerializer
from .models import CustomUser, Product, Category, Cart, CartItem, ProductVariant, CartItem, Customer, Order, OrderDetails, CustomerAddress, Delivery, CustomerLocation, DealOfTheDay, OfferCartItem
from django.http import JsonResponse
from django.views import View
from rest_framework.views import APIView
from django.contrib.auth import login
from django.utils import timezone
from django.db import transaction
from reportlab.pdfgen import canvas
from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
from io import BytesIO
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response


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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def is_staff(request):
    if request.method == 'POST':
        try:
            is_staff = request.user.is_staff
            print(request.user, 'request user')
            print(is_staff, "is staff")
            return Response({'is_staff': is_staff}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly] 
    def get_queryset(self):
        page = self.request.GET.get('page', 1)
        page_size = 16  # Products per page
        start_index = (int(page) - 1) * page_size
        end_index = start_index + page_size
        queryset = Product.objects.all()[start_index:end_index]
        total_products = Product.objects.count()
        return queryset, total_products
    
    def list(self, request, *args, **kwargs):
        queryset, total_products = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'total_products': total_products,
            'products': serializer.data,
        })
    

class ProductSearchView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['product_name', 'category__category_name']
    permission_classes = [IsAuthenticatedOrReadOnly]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'total_products': queryset.count(),
            'products': serializer.data,
        })

class ProductCategoryView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly] 
    def get_queryset(self):
        page = self.request.GET.get('page', 1)
        page_size = 16  # Products per page
        start_index = (int(page) - 1) * page_size
        end_index = start_index + page_size
        category_name = self.kwargs['category_name']
        category = get_object_or_404(Category, category_name=category_name)
        queryset = Product.objects.filter(category=category)[start_index:end_index]
        total_products = len(queryset)
        return queryset, total_products
    
    def list(self, request, *args, **kwargs):
        queryset, total_products = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'total_products': total_products,
            'products': serializer.data,
        })
    

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
    




class CartItemListView(generics.ListAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        staff_user = self.request.user
        try:
            cart = Cart.objects.get(staff_user=staff_user, status='active')
            total_cart_items = CartItem.objects.filter(cart=cart).count()

            # Handle pagination
            page = self.request.GET.get('page', 1)
            page_size = 12
            start_index = (int(page) - 1) * page_size
            end_index = start_index + page_size
            paginated_cart_items = CartItem.objects.filter(cart=cart)[start_index:end_index]

            return paginated_cart_items, total_cart_items
        except Cart.DoesNotExist:
            return CartItem.objects.none(), 0

    def list(self, request, *args, **kwargs):
        queryset, total_cart_items = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        # Retrieve OfferCartItems
        staff_user = self.request.user
        offer_cart_items = OfferCartItem.objects.filter(cart__staff_user=staff_user)

        return Response({
            'total_cart_items': total_cart_items,
            'cart_items': serializer.data,
        })


        
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
    cart_id = order_details_data['cart_id']
    custom_user = request.user
    created = False

    with transaction.atomic():
        try:
            customer = Customer.objects.get(phone_number=customer_data['phone_number'])
        except Customer.DoesNotExist:
            
            phone_number = str(customer_data.get('phone_number', ''))
            if phone_number.isnumeric() and len(phone_number) == 10:
                
                print(customer_data.get('phone_number'), 'phone number')
                customer, created = Customer.objects.get_or_create(
                    phone_number=customer_data['phone_number'],
                    defaults={
                        'first_name': customer_data['first_name'],
                        'last_name': customer_data['last_name'],
                        'custom_user': custom_user
                    }
                )
            else:
                return Response({'message': '10 digit mobile number is required'}, status=status.HTTP_400_BAD_REQUEST)

            if created:
                custom_user.reward_points += 10
                custom_user.save()

        customer_address, created = CustomerAddress.objects.get_or_create(
            customer=customer,
            defaults={
                'address_line1': customer_data['address_line1'],
                'address_line2': customer_data.get('address_line2', ''),
                'street_name': customer_data['street_name'],
                'city': customer_data['city'],
                'pincode': customer_data['pincode'],
            }
        )

        if not created:
            customer_address.address_line1 = customer_data['address_line1']
            customer_address.address_line2 = customer_data.get('address_line2', '')
            customer_address.street_name = customer_data['street_name']
            customer_address.city = customer_data['city']
            customer_address.pincode = customer_data['pincode']
            customer_address.save()

        if customer_data['latitude'] and customer_data['longitude']:
            try:
                customer_location = CustomerLocation.objects.get(customer_address=customer_address)
                customer_location.latitude = customer_data['latitude']
                customer_location.longitude = customer_data['longitude']
                customer_location.save()
            except CustomerLocation.DoesNotExist:
                CustomerLocation.objects.create(
                    customer_address=customer_address,
                    latitude=customer_data['latitude'],
                    longitude=customer_data['longitude']
                )
        else:
            try:
                customer_location = CustomerLocation.objects.get(customer_address=customer_address)
            except:
                pass

    order = Order.objects.create(
        customer=customer,
        user=custom_user,  # Set the user field to the appropriate user
        total_amount=order_details_data['total_amount'],
        total_discount=float(order_details_data['total_discount']),
        discount_amount=order_details_data['discount_amount']
    )


    Delivery.objects.create(order=order, delivery_status="pending")

    order_details_list = []

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

    OrderDetails.objects.bulk_create(order_details_list)

    try:
        cart = Cart.objects.get(id=cart_id)
        cart.status = 'completed'
        cart.save()
    except Cart.DoesNotExist:
        Cart.objects.none()

    for order_detail in order_details_list:
        product_variant_id = order_detail.variant_id
        quantity = order_detail.quantity
        try:
            cart_item = CartItem.objects.get(cart=cart, variant_id=product_variant_id)
            cart_item_quantity = cart_item.quantity
            if cart_item_quantity >= quantity:
                product_variant = cart_item.variant
                product_variant.stock_quantity -= quantity
                product_variant.save()
            else:
                return Response({'message': 'Not enough stock'}, status=status.HTTP_400_BAD_REQUEST)
        except CartItem.DoesNotExist:
            CartItem.objects.none()

    # Fetch offer cart items
    offer_cart_items = OfferCartItem.objects.filter(cart=cart)

    with transaction.atomic():
        offer_order_details_list = []
        for offer_cart_item in offer_cart_items:
            offer_order_detail = OrderDetails(
                order=order,
                product_id=offer_cart_item.variant.product.id,
                variant_id=offer_cart_item.variant.id,
                quantity=offer_cart_item.quantity,
                total_price=0,  # Assuming the offer items are free
                discount=0,
                discount_price=0
            )
            offer_order_details_list.append(offer_order_detail)

        OrderDetails.objects.bulk_create(offer_order_details_list)

    return Response({'message': 'Order created successfully'}, status=status.HTTP_201_CREATED)

class OrdersListView(generics.ListAPIView):
    serializer_class = OrdersSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        is_staff = user.is_staff

        if is_staff:
            # If the user is staff, return all orders
            orders = Order.objects.order_by('-order_date')
        else:
            # If the user is not staff, return orders of the current user
            orders = Order.objects.filter(user=user).order_by('-order_date')

        # Handle pagination
        page = self.request.GET.get('page', 1)
        page_size = 12
        start_index = (int(page) - 1) * page_size
        end_index = start_index + page_size
        paginated_orders = orders[start_index:end_index]

        return paginated_orders, len(orders)

    def list(self, request, *args, **kwargs):
        queryset, total_orders = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'total_orders': total_orders,  # Total number of orders
            'order_items': serializer.data,
        })

class DeliveryListView(generics.ListAPIView):
    serializer_class = OrdersSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        orders = Order.objects.order_by('-order_date')

        # Handle pagination
        page = self.request.GET.get('page', 1)
        page_size = 6
        start_index = (int(page) - 1) * page_size
        end_index = start_index + page_size
        paginated_orders = orders[start_index:end_index]

        return paginated_orders, Order.objects.count()

    def list(self, request, *args, **kwargs):
        queryset, total_orders = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'total_orders': total_orders,  # Total number of orders
            'order_items': serializer.data,
        })


    
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

def generate_invoice(order):
    template_path = 'invoice_template.html'  # Replace with the path to your HTML template
    template = get_template(template_path)
    context = {'order': order}
    html_content = template.render(context)

    # Create a PDF file
    buffer = BytesIO()
    pisa_status = pisa.CreatePDF(html_content, dest=buffer)

    if pisa_status.err:
        return HttpResponse('Error generating PDF', status=500)

    buffer.seek(0)
    return buffer

def download_invoice(request, order_id):
    order = get_object_or_404(Order, id=order_id)

    # Call the function to generate the invoice
    pdf_buffer = generate_invoice(order)

    # File response with correct MIME type
    response = HttpResponse(pdf_buffer, content_type='application/pdf')
    response['Content-Disposition'] = f'filename=invoice_of_order_id_{order.id}.pdf'

    return response


class DealOfTheDayView(generics.ListAPIView):
    serializer_class = DealOfTheDaySerializer
    permission_classes = [IsAuthenticatedOrReadOnly] 
    def get_queryset(self):
        queryset = DealOfTheDay.objects.order_by('-create_date')
        total_deals = DealOfTheDay.objects.count()
        return queryset, total_deals
    
    def list(self, request, *args, **kwargs):
        queryset, total_deals = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        print("entered into deal of the day", total_deals, serializer.data)
        return Response({
            'total_deals': total_deals,
            'offers': serializer.data,
        })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_offer_cart_items(request):
    user = request.user

    # Get all cart items for the user
    cart_items = CartItem.objects.filter(cart__staff_user=user)

    # Create a set to store the IDs of valid deal of the day products
    valid_deal_products = set()

    # Iterate through cart items
    for cart_item in cart_items:
        # Check if the product is part of the deal of the day
        deal_of_the_day = DealOfTheDay.objects.filter(
            product=cart_item.variant.product,
            variant=cart_item.variant,
            required_quantity__lte=cart_item.quantity,
            is_active=True
        ).first()

        if deal_of_the_day:
            # Add the ID of the valid deal of the day product to the set
            valid_deal_products.add(deal_of_the_day.free_product_variant.id)

            # Check if the OfferCartItem already exists
            offer_cart_item, created = OfferCartItem.objects.get_or_create(
                cart=cart_item.cart,
                variant=deal_of_the_day.free_product_variant,
                defaults={'quantity': 0}  # Initialize quantity to 0
            )

            # Update quantity based on deal conditions
            division_result = cart_item.quantity // deal_of_the_day.required_quantity
            if division_result >= 1:
                offer_cart_item.quantity = division_result
            else:
                # If division is less than 1, remove the OfferCartItem
                offer_cart_item.quantity = 0

            offer_cart_item.save()

    # Remove OfferCartItems that don't correspond to valid deal of the day products
    OfferCartItem.objects.filter(cart__staff_user=user).exclude(variant__id__in=valid_deal_products).delete()

    # Retrieve free items
    free_items = OfferCartItem.objects.filter(cart__staff_user=user)
    free_items_serializer = OfferCartItemSerializer(free_items, many=True)
    print(free_items_serializer.data, "free items ----------------------------------------------------------------")

    return Response({'message': 'OfferCartItems updated successfully', 'free_items': free_items_serializer.data}, status=status.HTTP_200_OK)



