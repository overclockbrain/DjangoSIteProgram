# ====================================================================== #
# game.py
#  モデルを読み込み最善手を返す
# 
#   created by Y.Miyamoto on 2022.11.10
# 
# 
# Revision
# - first making 11.10
# - 関数 get_model_file の作成．盤面ごとのモデルの選択をできるようにした．11.11
# 
# ====================================================================== #


from mainsite.state import State
from mainsite.pv_mcts import pv_mcts_action
from tensorflow.keras.models import load_model
import os

class TurnOfAi():
    def __init__(self, height, width, js_state):
        self.height = height
        self.width = width
        self.area = height * width

        self.model = self.get_model_file()

        self.state = State(height=self.height, width=self.width, depth=1)
        self.update_state(js_state)

        self.next_action = pv_mcts_action(self.model, 0.0) if (self.model) else False
        
    def update_state(self, js_state):

        li_state = js_state[0][1:-1].split(',')

        black_state = []
        white_state = []

        for koma in li_state:
            if koma == "0":
                black_state.append(0)
                white_state.append(0)
            elif koma == "1":
                black_state.append(1)
                white_state.append(0)
            else:
                black_state.append(0)
                white_state.append(1)

        self.state.pieces = white_state
        self.state.enemy_pieces = black_state
        
    def get_best_hand(self):
        return self.next_action(self.state)
        
    def get_model_file(self):
        FILE_BASE_NAME = "static/reversisite/model/$$$.h5"
        file_name = FILE_BASE_NAME.replace("$$$", str(self.height)+"x"+str(self.width))

        if os.path.isfile(file_name):
            return load_model(file_name)
        else:
            return False
        



