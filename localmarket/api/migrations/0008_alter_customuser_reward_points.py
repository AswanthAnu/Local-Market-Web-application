# Generated by Django 4.2.4 on 2023-10-13 17:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_customuser_reward_points'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='reward_points',
            field=models.IntegerField(default=0),
        ),
    ]
