# DjangoSiteProgram

- 卒業研究のDjangoプログラムを管理するためのものだよ
- ここに作ったものをアップロードしてね
- 各自のファイルを作成するからそこを指定してね
- もし間違ってしまってもいいように毎日バックアップとしてPCに全体のファイルを保存しておくよ


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
~~~
- ダウンロードまたはクローンしたフォルダーでmanage.pyがあるディレクトリまでコマンドで移動
~~~bash
python manage.py runserver
~~~
- ローカルのサーバーにアクセス
~~~
http://127.0.0.1:8000/game
~~~
- サーバー終了
~~~
Ctrl + C
~~~
- 仮想環境の終了
~~~bash
deactivate
~~~
