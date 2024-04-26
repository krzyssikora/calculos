import json
from collections import defaultdict

from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse
from django.http import HttpResponseRedirect, JsonResponse

from .models import AlgebraicOperation


def index(request):
    return render(request, 'contar/index.html')


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


def game_summary_data(request):
    # problems_number = int(request.GET.get('problems_number', None))
    # attempts = request.GET.get('attempts', None)
    data = json.loads(request.body)
    problems_number = data.get('problems_number')
    attempts = data.get('attempts')
    moves_made = len(attempts) + problems_number
    ratio = moves_made / problems_number
    print('ratio:', ratio)

    if ratio == 1:
        message = 'Brawo! Bezbłędnie!'
    elif ratio < 1.1:
        message = 'Bardzo dobrze!'
    elif ratio < 1.25:
        message = 'Nieźle!'
    elif ratio < 1.5:
        message = 'Praktyka czyni mistrza!'
    else:
        message = 'Warto jeszcze poćwiczyć!'

    context = {
        'problems_number': problems_number,
        'attempts': moves_made,
        'message': message,
    }
    return JsonResponse(context)


def game_summary(request, **kwargs):
    print('request:', request.__dict__.keys())
    print('kwargs:', kwargs)
    context = {
        'problems_number': kwargs.get('pn'),
        'message': kwargs.get('msg')
    }

    # return render(request, 'contar/game_summary.html', context)
    return HttpResponseRedirect('/contar/game_summary.html', context)
