from django.contrib import admin
from  mainsite.models import AiLoseManage , AiWinManage ,PlayBoardManage

# 11/10 created by Morioka
# this is admin manage page,We can see easyly to Database tables

admin.site.register(AiLoseManage)
admin.site.register(AiWinManage)
admin.site.register(PlayBoardManage)