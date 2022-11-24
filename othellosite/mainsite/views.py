"""
Created by R.Morioka 11/14
Merge Miyamoto's Program

11/24
Made DoS Attack avoidance code

"""
from django.http import HttpRequest,JsonResponse
from django.shortcuts import HttpResponse
from django.shortcuts import render
# Create your views here.
from mainsite.game import TurnOfAi
from mainsite.models import AiLoseManage,AiWinManage,PlayBoardMange


# topページの表示設定
def topPage(request):
    return render(request,"mainsite/topPage.html")

# 同意後のtopページの設定
def acceptedTopPage(request):
    return render(request,"mainsite/acceptedTopPage.html")

# ゲームページ
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
        request.session["session"] = "session"
        return render(request,"mainsite/gamePage.html",board)
    
    # 何もポストされてない状態だとtopに返す。
    return render(request,"mainsite/topPage.html")

def resultPage(request):
    if request.method == "POST":
        white = int(request.POST["whiteVal"])
        black = int(request.POST["blackVal"])
        height = int(request.POST["height"])
        width = int(request.POST["width"])
        if black < white:
            winner = "AI"
        elif black > white:
            winner = "あなた"
            """
            もし、AIが負けた場合は日付とデータがどこにあるのか
            保存する
            import datatime
            today = datetime.date.today()
            lose = AILoseManage(game_date=today,file_path=,width=width,height=height)
            """
        elif white == black:
            winner = "ドロー"
        else:
            winner = "error:正しく実行してください"
            
        # データベースに保存
        if request.session["session"] == "session":
            playboardmanage = PlayBoardMange(width=width,height=height)
            playboardmanage.save()
            win = AiWinManage(winLoseDate=winner)
            win.save()
        else:
            return render(request,"mainsite/topPage.html")
            
        komaInfo = {
            "white":white,
            "black":black,
            "winner":winner
        }
        request.session.clear()
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