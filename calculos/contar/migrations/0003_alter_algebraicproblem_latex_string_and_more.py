# Generated by Django 5.0.4 on 2024-04-21 22:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contar', '0002_problem_algebraicproblem_problemassignmenttosequence_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='algebraicproblem',
            name='latex_string',
            field=models.CharField(blank=True, max_length=127),
        ),
        migrations.AlterField(
            model_name='algebraicproblem',
            name='result',
            field=models.FloatField(blank=True),
        ),
    ]
