#from django.shortcuts import render
from django.http import HttpRequest
from django.shortcuts import HttpResponse
from django.shortcuts import render
# Create your views here.

def topPage(request):
    return render(request,"mainsite/topPage.html")

def topPage2(request):
    return render(request,"mainsite/topPage2.html")

def gamePage(request):
    return HttpResponse("ゲームのページ")

def resultPage(request):
    return render(request,"mainsite/result.html")