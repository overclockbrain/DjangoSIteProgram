# DjangoSiteProgram

- 卒業研究のDjangoプログラムを管理するためのものだよ
- ここに作ったものをアップロードしてね
- 各自のファイルを作成するからそこを指定してね
- もし間違ってしまってもいいように毎日バックアップとしてPCに全体のファイルを保存しておくよ

## 使用言語,使用環境
![My Skills](https://skillicons.dev/icons?i=js,jquery,html,css,bootstrap,sqlite,py,tensorflow,django,md,vscode,github)

## 実行確認
- 仮想環境の作成
  ※Pythonがあらかじめインストールされている前提
~~~bash
python –m venv お好きな名前
~~~
- 仮想環境の起動
~~~bash
.\お好きな名前\Scripts\activate
~~~
- Djangoのインストール
~~~bash
pip install django
pip install django-bootstrap5
pip install django-pygments-renderer
~~~
- ゲームで遊ぶために  
~~~bash
# tensorflowの最新版をダウンロード
# 時間がかかるので紅茶を飲んで待ちましょう
pip install --upgrade tensorflow
pip install numpy

# この中にtensorflowとnumpyがあることを確認
pip list
~~~
- ダウンロードまたはクローンしたフォルダーでmanage.pyがあるディレクトリまでコマンドで移動
~~~bash
python manage.py runserver
~~~
- ローカルのサーバーにアクセス
~~~
http://127.0.0.1:8000/
~~~
- サーバー終了
~~~
#ターミナル画面で
Ctrl + C
~~~
- 仮想環境の終了
~~~bash
deactivate
~~~
