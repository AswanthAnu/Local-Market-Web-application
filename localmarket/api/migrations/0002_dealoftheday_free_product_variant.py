# Generated by Django 4.2.4 on 2023-12-07 03:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='dealoftheday',
            name='free_product_variant',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='free_product_variant', to='api.productvariant'),
            preserve_default=False,
        ),
    ]
