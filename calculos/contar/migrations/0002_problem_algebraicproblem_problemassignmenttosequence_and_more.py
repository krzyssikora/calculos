# Generated by Django 5.0.4 on 2024-04-21 22:49

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contar', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Problem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='AlgebraicProblem',
            fields=[
                ('problem_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='contar.problem')),
                ('number_1', models.IntegerField()),
                ('number_2', models.IntegerField()),
                ('operation', models.CharField(max_length=2)),
                ('result', models.FloatField()),
                ('latex_string', models.CharField(max_length=127)),
            ],
            bases=('contar.problem',),
        ),
        migrations.CreateModel(
            name='ProblemAssignmentToSequence',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contar.problem')),
            ],
        ),
        migrations.CreateModel(
            name='ProblemSequence',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total', models.IntegerField()),
                ('problems', models.ManyToManyField(through='contar.ProblemAssignmentToSequence', to='contar.problem')),
            ],
        ),
        migrations.AddField(
            model_name='problemassignmenttosequence',
            name='problem_sequence',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contar.problemsequence'),
        ),
    ]
