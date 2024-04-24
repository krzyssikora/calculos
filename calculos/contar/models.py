import random

from django.db import models
from django.contrib.auth.models import User


class Problem(models.Model):
    pass


class AlgebraicOperation(models.Model):
    PLUS = 'PL'
    MINUS = 'MN'
    TIMES = 'ML'
    DIVIDE = 'DV'

    OPERATIONS = [
        (PLUS, 'dodawanie'),
        (MINUS, 'odejmowanie'),
        (TIMES, 'mnożenie'),
        (DIVIDE, 'dzielenie')
    ]

    result_functions = {
        PLUS: int.__add__,
        MINUS: int.__sub__,
        TIMES: int.__mul__,
    }

    operation_strings = {
        PLUS: '+',
        MINUS: '-',
        TIMES: '\\cdot',
        DIVIDE: ':'
    }

    operation = models.CharField(
        max_length=2,
        choices=OPERATIONS,
        default=TIMES,
    )

    digits = models.IntegerField(default=1)
    negative_input = models.BooleanField(default=False)

    @staticmethod
    def create(digits, operation):
        algebraic_operation, created = AlgebraicOperation.objects.get_or_create(
            digits=digits,
            operation=operation
        )
        return algebraic_operation

    def get_number(self):
        digits = int(str(self.digits))
        number = random.randint(0, 10 ** digits - 1)
        if number < 10 ** (digits - 1):
            number = random.randint(0, 10 ** digits - 1)
        if self.negative_input:
            number *= random.choice([-1, 1])
        return number

    def get_latex_string(self, number_1: int, number_2: int):
        n1_str = str(number_1) if number_1 >= 0 else f'({number_1})'
        n2_str = str(number_2) if number_2 >= 0 else f'({number_2})'
        return f'{n1_str} {self.operation_strings.get(self.operation)} {n2_str}'

    def get_new(self):
        number_1 = self.get_number()
        number_2 = self.get_number()
        algebraic_problem, created = AlgebraicProblem.objects.get_or_create(
            number_1=number_1,
            number_2=number_2,
            operation=self.operation
        )
        if created:
            algebraic_problem.result = self.result_functions.get(self.operation)(number_1, number_2)
            algebraic_problem.latex_string = self.get_latex_string(number_1, number_2)
            algebraic_problem.save()
        return algebraic_problem


class AlgebraicProblem(Problem):
    number_1 = models.IntegerField()
    number_2 = models.IntegerField()
    operation = models.CharField(max_length=2)
    result = models.FloatField(blank=True, null=True)
    latex_string = models.CharField(max_length=127, blank=True, null=True)


class ProblemSequence(models.Model):
    total = models.IntegerField()
    problems = models.ManyToManyField(Problem, through='ProblemAssignmentToSequence')


class ProblemAssignmentToSequence(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    problem_sequence = models.ForeignKey(ProblemSequence, on_delete=models.CASCADE)


class UserSpace(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    points = models.IntegerField(default=0)
    days_streak = models.IntegerField(default=0)
    questions_streak = models.IntegerField(default=0)
    date_of_birth = models.DateField(null=True)
    questions_solved = models.IntegerField(default=0)
