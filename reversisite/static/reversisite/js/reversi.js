/**
 * reversi.js
 * 
 *  created by Y.Miyamoto on 2022.11.8
 * 
 * Revision
 * - 11.10  ほぼ完成
 * - 11.11  class Board の引数の順を (width, height, ...) から (height, width, ...) に変更した
 *
 */

class Board {
    constructor(height, width, color = 1) {
        this.width = width;
        this.height = height;
        this.toggleTurn = color;
        this.history = new Array();
        this.winner = '';

        this.boardElement = document.createElement('table');
        this.boardElement.id = 'mainTable';

        this.messageElement = document.createElement('div');
        this.messageElement.id = 'message';

        this.setStateAndElement(height, width);
    }

    setStateAndElement(height, width) {
        this.viewMessage('ゲームスタート!');

        this.width = width;
        this.height = height;
        this.boardElement.innerHTML = '';
        this.state = null;
        this.state = new Array(height);
        
        for (let y = 0; y < height; y++) {
            const row = document.createElement('tr');
            this.state[y] = new Array(width);

            for (let x = 0; x < width; x++) {
                const cell = document.createElement('td');
                const koma = new Koma();
                koma.imgElement.addEventListener('click', () => {
                    if (koma.state == 0 && this.toggleTurn == 1) {
                        let array = this.searchKoma(y, x, this.toggleTurn);
                        let reFlag = array["count"];
                        
                        if (reFlag) {           // 裏返すコマの数が1以上なら
                            koma.put(this.toggleTurn);
                            this.reverseKoma(array["place"]);
                            this.history.push({color: this.toggleTurn, flag: 'put', put: [y, x], state: this.state});
                            this.turnEnd();
                        } else {
                            this.viewMessage('そこには置けません!!');
                        }
                    }
                });
                this.state[y][x] = koma;

                cell.appendChild(koma.imgElement);
                row.appendChild(cell);
            }
            this.boardElement.appendChild(row);
        }

        this.#putCenterKoma();
    }

    viewMessage(message = '', time = 1200) {
        clearTimeout(this.viewSet);
        this.messageElement.innerHTML = '';

        if (message != '') {
            let parentElement = document.createElement('h3');
            parentElement.innerHTML = message;
            this.messageElement.appendChild(parentElement);
        }

        this.viewSet = setTimeout(() => {
            this.messageElement.innerHTML = '';
        }, time);
    }

    #putCenterKoma() {
        const basisX = this.width / 2 - 1;
        const basisY = this.height / 2 - 1;

        this.state[basisY][basisX].put(1);
        this.state[basisY][basisX + 1].put(2);
        this.state[basisY + 1][basisX].put(2);
        this.state[basisY + 1][basisX + 1].put(1);
    }

    /**
     * 裏返すコマを探す処理
     * @param {Number} stateY 置いたコマのX座標
     * @param {Number} stateX 置いたコマのY座標
     * @param {Number} stateColor 置いたコマの色
     * @returns 裏返すコマの座標と裏返すコマの数
     */
    searchKoma(stateY, stateX, stateColor) {
        const SEARCH_ARGS = [
            [0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [1, -1], [-1, 1], [1, 1]
        ];
        let reverseColor = stateColor % 2 + 1;

        let reverseArray = new Array();
        let reverseCount = 0;

        for (let i in SEARCH_ARGS) {
            /**
             * searchArray の flag 対応表
             * 0 : 裏返し終了
             * 1 : 裏返すコマ
             * -1 : 枠またはコマが置かれていないところ
             */ 
            let searchArray = new Array();
            let y = stateY;
            let x = stateX;

            let YY = SEARCH_ARGS[i][0];
            let XX = SEARCH_ARGS[i][1];
            // 裏返すコマを探す処理
            while (true) {
                y += YY;
                x += XX;
                if (y == -1 || y == this.height || x == -1 || x == this.width) {    // 枠にあたったら
                    searchArray.push({flag: -1});
                    break;
                }

                let state = this.state[y][x]['state'];
                if (state == reverseColor) {        // 裏返すことができるコマが置かれていたら
                    searchArray.push({flag: 1, y: y, x: x});
                } else if (state == stateColor) {   // 置いたコマと同じ色のコマが見つかったら
                    searchArray.push({flag: 0});
                    break;
                } else {                            // まだ何も置かれていないなら
                    searchArray.push({flag: -1});
                    break;
                }
            }
            if (searchArray[searchArray.length - 1]['flag'] == 0) {
                for (let i = 0 ; i < searchArray.length - 1; i ++) {
                    let y = searchArray[i]['y'];
                    let x = searchArray[i]['x'];
                    reverseArray.push([y, x]);
                    reverseCount ++;
                }
            }
        }

        return {count: reverseCount, place: reverseArray};
    }
    
    reverseKoma(reverseArray) {
        for (let i in reverseArray) {
            let y = reverseArray[i][0];
            let x = reverseArray[i][1];
            this.state[y][x].flip();
        }
    }

    countKoma() {
        let putWhite = document.getElementsByClassName('putWhite'),
            putBlack = document.getElementsByClassName('putBlack');
        //hidden要素にvalue追加
        let whiteVal = document.getElementById("whiteVal"),
            blackVal = document.getElementById("blackVal");


        let black = 0;
        let white = 0;
        for (let y = 0; y < this.height; y ++) {
            for (let x = 0; x < this.width; x ++) {
                if (this.state[y][x]['state'] == 1) {
                    black ++;
                } else if (this.state[y][x]['state'] == 2) {
                    white ++;
                }
            }
        }
        for (const element of putWhite) {
            element.innerHTML = white;
            whiteVal.setAttribute("value",white);
        }
        for (const element of putBlack) {
            element.innerHTML = black;
            blackVal.setAttribute("value",black);
        }

        //ここ使えないからいるのかな？？
        //by 森岡の独り言...笑
        let winFlag = black - white;
        if (winFlag > 0) {
            return 'black';
        } else if (winFlag < 0) {
            return 'white';
        } else {
            return 'draw';
        }
        
    }

    turnEnd() {
        let turnElement = document.getElementById('turn');

        this.countKoma();

        this.toggleTurn = this.toggleTurn % 2 + 1;
        if(KOMACOLOR[this.toggleTurn] == "黒"){
            turnElement.innerHTML = KOMACOLOR[this.toggleTurn] + "(あなた)";
        }else if(KOMACOLOR[this.toggleTurn] == "白"){
            turnElement.innerHTML = KOMACOLOR[this.toggleTurn] + "(AI)";
        }
        

        // game終了条件
        //  # 盤面上全てにコマがおかれている
        //  # pass が二回連続
        let count = this.width * this.height - 4;
        for (let i in this.history) {
            if (this.history[i].flag == 'put') {
                count --;
            }
        }
        let passIndex = Object.keys(this.history).length - 1;
        if (this.history[passIndex].flag == 'pass') {
            passIndex --;
            if (passIndex > 0) {
                if (this.history[passIndex].flag == 'pass') {
                    count = 0;
                }
            }
        }
        if (!(count)) {
            setTimeout(() => {
                this.viewMessage('ゲーム終了!!<br>リザルト画面へ!', 3000);
                document.getElementById("to_result_page").style.display = "inline";
                this.winner = this.countKoma();
            }, 1000);
        } else {
            if (this.toggleTurn == 2) {
                
                let newState = this.getOneDemensionState();

                let data = {
                    "height": String(this.height),
                    "width": String(this.width),
                    "state": JSON.stringify(newState),
                }
                predict(data);

                document.getElementById('pass').disabled = true;
                document.getElementById('hint').disabled = true;
                
            }
        }
    }
    aiTurn(index) {

        if (index >= (this.height*this.width)) {
            this.pass()
        } else if (index < 0) {
            const AI = new JsAi(2, this.convertBoard());
            let ans = AI.answer;

            setTimeout(() => {
                if (ans) {
                    let array = this.searchKoma(ans[0], ans[1], this.toggleTurn);
                    this.state[ans[0]][ans[1]].put(this.toggleTurn);
                    this.reverseKoma(array["place"]);
                    this.history.push({color: this.toggleTurn, flag: 'put', put: [ans[0], ans[1]], state: this.state});

                    this.turnEnd();

                } else {
                    this.pass();
                }
            }, 500);  // 表示を遅延させる
        } else {        
            let ans = [];
            ans.push(Math.floor(index / this.width, 0));
            ans.push(index % this.width);

            let array = this.searchKoma(ans[0], ans[1], this.toggleTurn);
            this.state[ans[0]][ans[1]].put(this.toggleTurn);
            this.reverseKoma(array["place"]);
            this.history.push({color: this.toggleTurn, flag: 'put', put: [ans[0], ans[1]], state: this.state});

            this.turnEnd();

        }
        
        document.getElementById('pass').disabled = false;
        document.getElementById('hint').disabled = false;
    }

    search(view = true) {
        let reverseArray = new Array();
        let reFlag;
        let putPlaceFlag = false;

        for (let y = 0; y < this.height; y ++) {
            for (let x = 0; x < this.width; x ++) {
                if (this.state[y][x]["state"] == 0) {
                    let array = this.searchKoma(y, x, this.toggleTurn);
                    reFlag = array["count"];
                    if (reFlag) {
                        reverseArray.push({num: reFlag, y: y, x: x});
                        if (view) {
                            this.state[y][x].hint();
                        }
                        putPlaceFlag = true;
                    }
                }
            }
        }
        if (!putPlaceFlag) {
            this.viewMessage('置ける場所がないのでパスしてください');
        }

        return Object.keys(reverseArray).length;
    }
    corner(y, x) {
        return !!((y == 0 && x == 0) || (y == 0 && x == this.width - 1) || 
            (y == this.height - 1 && x == 0) || (y == this.height - 1 && x == this.width - 1));
    }
    pass() {
        let passFlag = this.search(false);
        let message;

        if (!this.history.length) { // 最初の黒ターンだけ合法手があってもpassできる
            passFlag = false
        }
        if (passFlag) {
            message = '置ける場所があるので<br>パスできません!!';
        } else {
            message = this.toggleTurn == 1 ? '黒 がパスしました!' : '白 がパスしました!';
            this.history.push({color: this.toggleTurn, flag: 'pass', put: [], state: this.state});
            this.turnEnd();
        }
        this.viewMessage(message);
    }

    convertBoard() {
        let newBoard = new Array();
        for (let i in this.state) {
            newBoard[i] = new Array();
            for (let j in this.state[i]) {
                newBoard[i][j] = this.state[i][j]["state"];
            }
        }
        return newBoard;
    }

    getOneDemensionState() {
        let newState = new Array()
        for (let i in this.state) {
            for (let j in this.state[i]) {
                newState.push(this.state[i][j]["state"]);
            }
        }
        return newState;
    }
}


//
// コマの色対応表
// 0 : 無し
// 1 : 黒
// 2 : 白
// 
const KOMACOLOR = {
    0: 'no', 1: '黒', 2: '白'
}

class Koma {
    constructor() {
        this.state = 0;

        this.imgElement = document.createElement('img');
        this.imgElement.src = KOMAIMG[this.state];
    }

    flip() {
        this.state = this.state % 2 + 1;
        anime({     // 入れ替え時に画像を回転させる
            targets: this.imgElement,
            rotateY: [180, -180],
            easing: 'easeInOutQuad',
            duration: 500,
        });
        setTimeout(() => {
            this.imgElement.src = KOMAIMG[this.state];
        }, 250);
    }

    put(state) {
        this.state = state;
        this.imgElement.src = KOMAIMG[this.state];
    }

    hint() {
        this.imgElement.style.backgroundColor = "orangered";
        setTimeout(() => {
            this.imgElement.style.backgroundColor = "lime";
        }, 2000);
    }
}

