# Generated by Django 4.2.4 on 2023-10-09 11:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_customer_cart_staff_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='delivery',
            name='delivery_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]