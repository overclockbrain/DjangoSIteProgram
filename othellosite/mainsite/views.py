# ====================================================================== #
#   views.py
# 
# Revision
# - 11.9    Y.M js (ajax)から送られてきたデータを受けとる
# - 11.10   Y.M モデルを用いた推論を行う機能の実装
# - 11.11   Y.M 可変マスに対応させる
#  ====================================================================== #

from django.http import HttpRequest,JsonResponse
from django.shortcuts import HttpResponse
from django.shortcuts import render

from mainsite.game import TurnOfAi
# Create your views here.

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

    AI = TurnOfAi(height, width, state)
    if (AI.model):
        action = AI.get_best_hand()     # 推論を行い最善手を取得する
    else:
        action = -1

    response_data = {
        "action": int(action)
    }
    
    return JsonResponse(response_data)