from django.http import HttpResponse,JsonResponse
from django.shortcuts import render
import json

def test(request):
    x = {'text':'Just a note to someone who is new: When adding :any, make sure to enclose the entire thing in parenthesis. For example, when you want to cast data as any, use (data: any). Another example, if you want to cast result as any is: (result: any). Make sure to use the () or else you will face TSLint errors. Hope this helps someone.'}
    dump = json.dumps(x)
    return HttpResponse(dump, content_type='application/json',status=200)