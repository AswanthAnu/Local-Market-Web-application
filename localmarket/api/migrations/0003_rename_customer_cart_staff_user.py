# Generated by Django 4.2.4 on 2023-10-02 14:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_cart_customer'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cart',
            old_name='customer',
            new_name='staff_user',
        ),
    ]
