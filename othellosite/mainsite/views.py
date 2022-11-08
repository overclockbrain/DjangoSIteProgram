#from django.shortcuts import render
from django.http import HttpRequest
from django.shortcuts import HttpResponse
from django.shortcuts import render
# Create your views here.
import mainsite.othello as o

def topPage(request):
    return render(request,"mainsite/topPage.html")

def topPage2(request):
    return render(request,"mainsite/topPage2.html")

def gamePage(request):
    boardInfo = {}
    boardInfo["board"] = o.othello_board(6,6)
    return render(request,"mainsite/gamePage.html",boardInfo)

def resultPage(request):
    return render(request,"mainsite/result.html")