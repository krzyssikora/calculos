from django.shortcuts import render
from .models import AlgebraicOperation


def game(request):
    problems_no = 20
    digits_no = 1
    operation = AlgebraicOperation.create(digits_no, AlgebraicOperation.TIMES)
    problems = set()
    while len(problems) < problems_no:
        problem = operation.get_new()
        problems.add(problem)
    problems = list(problems)
    context = {
        'problems': problems,
        'results': {idx: problems[idx].result for idx in range(len(problems))}
    }

    return render(request, 'contar/game.html', context)
