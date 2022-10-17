#from django.shortcuts import render
from django.http import HttpRequest
from django.shortcuts import HttpResponse
# Create your views here.

def topPage(request):
    return HttpResponse("オセロのページへようこそ！")

def gamePage(request):
    return HttpResponse("ゲームのページ")

def resultPage(request):
    return HttpResponse("結果表示画面")