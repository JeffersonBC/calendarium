from django.http import (
    JsonResponse, HttpResponseBadRequest, HttpResponseForbidden
)
from django.db.models import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

import json
import random
import string

from json import JSONDecodeError


from events.models import Event, EventSubscription


@csrf_exempt
@require_http_methods(['GET'])
def event_teste(request):

  return JsonResponse({'success': True})


@csrf_exempt
@require_http_methods(['POST'])
def event_add(request):
  success = True

  # Tenta extrair um json do request. Se não for possível, retorna status de erro
  json_request, error = json_from_request(request)

  if error:
    success = False

  elif 'name' not in json_request or 'description' not in json_request:
    success = False

  else:
    e = Event(
      name = json_request["name"],
      description = json_request["description"],
      creator_id = 1
    )

    e.save()

  return JsonResponse({'success': success})


# Processa o request para ver se ele apresenta um json válido
def json_from_request(request):
    error = False

    try:
        js = json.loads(request.body)
    except JSONDecodeError:
        error = True
        js = {}

    return js, error
