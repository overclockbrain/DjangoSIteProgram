#from django.shortcuts import render
from django.http import HttpRequest,JsonResponse
from django.shortcuts import HttpResponse
from django.shortcuts import render
# Create your views here.
import mainsite.othello as o

def topPage(request):
    return render(request,"mainsite/topPage.html")

def topPage2(request):
    return render(request,"mainsite/topPage2.html")

def gamePage(request):
    """ boardInfo = {}
    boardInfo["board"] = o.othello_board(6,6)
    return render(request,"mainsite/gamePage.html",boardInfo) """
    return render(request,"mainsite/gamePage.html")

def resultPage(request):
    return render(request,"mainsite/result.html")

# ajax で送られてきたデータ取得
def predict(request):
    
    height = int(request.POST.get("height"))
    width = int(request.POST.get("width"))
    state = request.POST.getlist("state")

    print(height,":",width,":",state)

    area = height * width

    d = {
        "height": height,
        "width": width,
        "area": state
    }
    return JsonResponse(d)