from django.db import models

# Create your models here.
class AiLoseManage(models.Model):
    # idは自動的に付与される
    game_date = models.DateField("対局日",auto_now_add=True)
    file_path = models.CharField("ファイルパス",blank=True,max_length=100)
    width = models.IntegerField("width")
    height = models.IntegerField("height")
    
    
class AiWinManage(models.Model):
    winLoseData = models.CharField("AIの勝ち負け",max_length=10)
    
class PlayBoardManage(models.Model):
    width = models.IntegerField("width")
    height = models.IntegerField("height")
    winner = models.CharField("winner",max_length=5,null=True)