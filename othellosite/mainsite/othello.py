# ohello.py
# オセロを動作させるプログラム．(プログラムの概要) 
#
# digital signature
# Created by Morioka on Nov 7th.
#
# Revision
# - first making

# めも
# のちにクラス化しシングルトンで実装する

INT_BLANC = 0
INT_WHITE = 1
INT_BLACK = 2




def othello_board(height,width):
    """
    引数で指定された形のマスを作成し、初期配置したボードを返す
    ------
    引数
    height: int
        4~n
    width: int
        4~n
    ---
    返り値
    ## 引数がheight=6,width=6の場合
    # 0=空白,1=白,2=黒
    [
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,1,2,0,0],
        [0,0,2,1,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
    ]
    """
    # boardを完成させる
    board = [[0 for j in range(width)] for i in range(height)]

    # 駒の初期配置を決定する
    baseX = int(width / 2 - 1)
    baseY = int(height / 2 - 1)
    board[baseY][baseX] = INT_WHITE #配列[縦,横]
    board[baseY + 1][baseX + 1] = INT_WHITE
    board[baseY][baseX + 1] = INT_BLACK
    board[baseY + 1][baseX] = INT_BLACK
    
    return board

def play(x , y):
    """
    引数で指定された位置に駒を置き、ゲームを進行する
    ------
    引数
    x: int
        0~n
    y: int
        0~n
    ---
    返り値
    ## ゲームの勝ち負け
    [
        win : black
        lose : white
    ]
    """
    board = othello_board(6,6)
    
    
    
    # ログを取得するプログラム
    
    #
    return