# DjangoSiteProgram ~ gamePage part ~
### このページはメインブランチではありません！製作したプログラムをアップロードする際は注意して！

デュアルネットワークで学習させた学習モデルを用いた，ガチのAIオセロゲームの **ゲーム部分** の実装．

## ゲームで遊ぶために...
1. TensorFlow をインストールしないといけない．
    1. ターミナル上で以下のコマンドを入力
        ~~~
        pip install --upgrade tensorflow
        ~~~

        途中で止まったように見えることもあるが，問題無し．
        焦らずステイすること．

    1.  インストールが終わったら確認する
        ~~~
        pip list
        ~~~

        一覧の中に
        > tensorflow　　2.10.0

        があればインストールされています．

1. あとはローカルサーバーにアクセスして
    ~~~
    http://127.0.0.1:8000/game
    ~~~
    好きに遊んでくれ（Gitにあげてるモデルは未学習のモデルでとっても弱い）


## memo
メインブランチとの差異
- mainsite
    - templates \ mainsite
        - gamePage.html
    - game .py
    - pv_mcts .py
    - state .py
    - views .py
- static \ othellosite
    - css
        - body.css
    - js
        - othello.js
    - model
        - 6x6.h5 ※ best.h5 から 6x6.h5 にリネームしました
