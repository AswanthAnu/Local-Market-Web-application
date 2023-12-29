from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone


class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    reward_points = models.IntegerField(default=0)

    def __str__(self):
        return self.username
    groups = models.ManyToManyField(
        Group,
        verbose_name='groups',
        blank=True,
        related_name='custom_user_set',  
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name='user permissions',
        blank=True,
        related_name='custom_user_set',  
    )


class Customer(models.Model):
    custom_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=15)  
    created_date = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return self.first_name

class CustomerAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    address_line1 = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255, blank=True, null=True) 
    street_name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10) 

    class Meta:
        verbose_name_plural = "CustomerAddress"

    def __str__(self) -> str:
        return self.customer.first_name + " -> " + self.address_line1 
    
class CustomerLocation(models.Model):
    customer_address = models.ForeignKey(CustomerAddress, on_delete=models.CASCADE)
    latitude = models.DecimalField(max_digits=15, decimal_places=10, null=True)  
    longitude = models.DecimalField(max_digits=15, decimal_places=10, null=True) 

    def __str__(self):
        return f"Location for {self.customer_address.customer.first_name}"


class Category(models.Model):
    category_name = models.CharField(max_length=255, unique=True)
    created_date = models.DateTimeField(auto_now_add=True)
    edited_date = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self) -> str:
        return self.category_name


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='product_images/')
    created_date = models.DateTimeField(auto_now_add=True)
    edited_date = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.product_name

class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    weight_unit = models.CharField(max_length=20, choices=[('gm', 'gm'), ('kg', 'kg'), ('ml', 'ml'), ('l', 'l'), ('piece', 'piece')])
    stock_quantity = models.PositiveIntegerField()
    created_date = models.DateTimeField(auto_now_add=True)
    edited_date = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.product.product_name} {str(self.weight)} {self.weight_unit}"

class ProductPricing(models.Model):
    variant = models.OneToOneField(ProductVariant, on_delete=models.CASCADE)
    original_price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(90)])
    discount_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_date = models.DateTimeField(auto_now_add=True)
    edited_date = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.discount_price = self.original_price - (self.original_price * self.discount / 100)
        super(ProductPricing, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.variant.product.product_name} {str(self.variant.weight)} {self.variant.weight_unit} {(self.original_price)}"

class Order(models.Model):
    user = models.ForeignKey( CustomUser, on_delete=models.CASCADE)
    customer = models.ForeignKey( Customer, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)  
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    total_discount = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(95)])
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self) -> str:
        return self.customer.first_name + ":  " + str(self.order_date)

class OrderDetails(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(95)])
    discount_price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        verbose_name_plural = "OrderDetails"

    def __str__(self) -> str:
        return str(self.order.customer.first_name) + " -> " + str(self.total_price)
    

class Delivery(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    delivery_status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('delivered', 'Delivered')])
    delivery_date = models.DateTimeField(null=True, blank=True)  # Allow null values for delivery_date

    def save(self, *args, **kwargs):
        if self.delivery_status == 'delivered' and not self.delivery_date:
            # If the status is "Delivered" and delivery_date is not set, populate it with the current timestamp
            self.delivery_date = timezone.now()
        elif self.delivery_status != 'delivered':
            # If the status is not "Delivered," set delivery_date to None
            self.delivery_date = None

        super(Delivery, self).save(*args, **kwargs)


    class Meta:
        verbose_name_plural = "Deliveries"

    def __str__(self) -> str:
        return self.delivery_status


class Cart(models.Model):
    staff_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('active', 'Active'), ('completed', 'Completed')])

    def __str__(self) -> str:
        return str(self.id) + ":- " +  str(self.staff_user)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self) -> str:
        return str(self.variant) + str(self.quantity) + " " + str(self.cart)


class DealOfTheDay(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    required_quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    free_product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='free_product')
    free_product_variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, related_name='free_product_variant')
    is_active = models.BooleanField(default=True)
    create_date = models.DateTimeField(default=timezone.now)
    image = models.ImageField(upload_to='deal_images/', null=True, blank=True)

    def __str__(self) -> str:
        return f"Deal: {self.required_quantity} {self.product.product_name} - Get {self.free_product.product_name} Free"



class OfferCartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self) -> str:
        return str(self.variant) + str(self.quantity) + " " + str(self.cart)

