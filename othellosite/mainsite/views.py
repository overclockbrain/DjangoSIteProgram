"""
Created by R.Morioka 11/14
Merge Miyamoto's Program

"""
from django.http import HttpRequest,JsonResponse
from django.shortcuts import HttpResponse
from django.shortcuts import render
# Create your views here.
from mainsite.game import TurnOfAi


# topページの表示設定
def topPage(request):
    return render(request,"mainsite/topPage.html")

# 同意後のtopページの設定
def acceptedTopPage(request):
    return render(request,"mainsite/acceptedTopPage.html")

def gamePage(request):
    """ boardInfo = {}
    boardInfo["board"] = o.othello_board(6,6)
    return render(request,"mainsite/gamePage.html",boardInfo) """
    if request.method == "POST":
        height = request.POST["high"]
        width = request.POST["width"]
        board = {
            "height":height,
            "width":width
        }
        return render(request,"mainsite/gamePage.html",board)
    
    # 何もポストされてない状態だとtopに返す。
    return render(request,"mainsite/topPage.html")

def resultPage(request):
    if request.method == "POST":
        white = int(request.POST["whiteVal"])
        black = int(request.POST["blackVal"])
        komaInfo = {
            "white":white,
            "black":black
        }
            
        return render(request,"mainsite/result.html",komaInfo)
    # 何もポストされてない状態だとtopに返す。
    return render(request,"mainsite/topPage.html")

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