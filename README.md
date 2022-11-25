# DjangoSiteProgram

- 卒業研究のDjangoプログラムを管理するためのものだよ
- ここに作ったものをアップロードしてね
- 各自のファイルを作成するからそこを指定してね
- もし間違ってしまってもいいように毎日バックアップとしてPCに全体のファイルを保存しておくよ

## 使用言語
[![My Skills](https://skillicons.dev/icons?i=js,html,css,wasm)](https://skillicons.dev)

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
- ゲームで遊ぶために  
~~~bash
# tensorflowの最新版をダウンロード
# 時間はかかるので紅茶を飲んで待ちましょう
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
