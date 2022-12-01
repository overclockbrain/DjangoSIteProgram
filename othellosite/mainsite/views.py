"""
Created by R.Morioka 11/14
Merge Miyamoto's Program

11/24
Made DoS Attack avoidance code

11/26
Made ratepage

"""
from django.http import HttpRequest,JsonResponse
from django.shortcuts import HttpResponse
from django.shortcuts import render
# Create your views here.
from mainsite.game import TurnOfAi
from mainsite.models import AiLoseManage,AiWinManage,PlayBoardManage


# topページの表示設定
def topPage(request):
    return render(request,"mainsite/topPage.html")

# 同意後のtopページの設定
def acceptedTopPage(request):
    return render(request,"mainsite/acceptedTopPage.html")

# ゲームページ
def gamePage(request):
    if request.method == "POST":
        height = int(request.POST["high"])
        width = int(request.POST["width"])
        # 値チェック
        if height > 10 or height < 4:
            height = 4
        if width > 10 or width < 4:
            width = 4
        
        board = {
            "height":height,
            "width":width
        }
        request.session["session"] = "session"
        return render(request,"mainsite/gamePage.html",board)
    
    # 何もポストされてない状態だとtopに返す。
    return render(request,"mainsite/topPage.html")

def resultPage(request):
    if "session" in request.session:
        if request.method == "POST" and request.session["session"] == "session":
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
        
            playboardmanage = PlayBoardManage(width=width,height=height,winner=winner)
            win = AiWinManage(winLoseData=winner)
            playboardmanage.save()
            win.save()
            
            komaInfo = {
                "white":white,
                "black":black,
                "winner":winner
            }
            request.session.clear()
            return render(request,"mainsite/result.html",komaInfo)
    else:
        # 何もポストされてない状態だとtopに返す。
        return render(request,"mainsite/topPage.html")
    
    
# ratepage
def rate(request):
    aiwin = AiWinManage.objects.all().filter(winLoseData="AI").count()
    userwin = AiWinManage.objects.all().filter(winLoseData="あなた").count()
    draw = AiWinManage.objects.all().filter(winLoseData="ドロー").count()
    
    # ボードごとの試合数を取ってくる
    boards = []
    manboards = []
    aiWinOfBoards = []
    userWinOfBoards = []
    winrateBoards = []
    i = 0
    for height in range(4,12,2):
        for width in range(4,12,2):
            manboards.append(str(height) + "×" + str(width))
            # プレイ回数の入った配列を作成
            boards.append(PlayBoardManage.objects.all().filter(height=height,width=width).count())
            # ボードごとのとAI、ユーザーの勝利数を取得
            aiWinOfBoards.append(PlayBoardManage.objects.all().filter(height=height,width=width,winner="AI").count())
            userWinOfBoards.append(PlayBoardManage.objects.all().filter(height=height,width=width,winner="あなた").count())
            # ゼロ除算を避けるためにあえてややこしく
            if aiWinOfBoards[i] == 0 and userWinOfBoards[i] == 0:
                winrateBoards.append(0)
            else:
                winrateBoards.append(aiWinOfBoards[i] / (aiWinOfBoards[i] + userWinOfBoards[i]) * 100)
            i += 1
        
    #zip化して使いやすくする     
    zipListBoards = zip(manboards,winrateBoards)
    #ゼロ除算が発生した場合の処理
    if aiwin == 0:
        return render(request,"mainsite/topPage.html")
    else:
        winrate = int((aiwin / (aiwin + userwin)) * 100)
        
    data = {
        "aiwin":aiwin,
        "userwin":userwin,
        "draw":draw,
        "win":winrate,
        "winBoard":zipListBoards
    }
    return render(request,"mainsite/rate.html",data)

def outline(request):
    return render(request,"mainsite/outline.html")

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