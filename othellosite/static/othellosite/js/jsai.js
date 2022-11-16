
class JsAi {
	constructor(color, state) {
		this.COLOR = color;
		this.STATE = state;

		this.legalHand = new Array();

		this.Predict();
	}

	get answer() {
		let max = -999;
		let bestHands = new Array();

		for (let i in this.legalHand) {
			let count = this.legalHand[i]["count"];
			max = (max < count) ? count : max;
		}

		for (let i in this.legalHand) {
			if (this.legalHand[i]["count"] == max) {
				bestHands.push(this.legalHand[i]["place"])
			}
		}
		return bestHands[Math.floor(Math.random()*bestHands.length)];
	}

	Predict() {
		this.legalHand = this.Search(this.STATE, this.COLOR);

        for (let i in this.legalHand) {
            let y = this.legalHand[i]["place"][0];
            let x = this.legalHand[i]["place"][1];
            if (this.IsCorner(y, x)) {
                this.legalHand[i]["count"] = 999;
            }
            let nextState = this.ReverseState(this.COLOR, this.legalHand[i]["place"], this.legalHand[i]["reArray"]);
            let nextHand = this.Search(nextState, (this.COLOR%2+1));

            for (let j in nextHand) {
                let ny = nextHand[j]["place"][0];
                let nx = nextHand[j]["place"][1];

                if (this.IsCorner(ny, nx)) {
                    this.legalHand[i]["count"] -= 5;
                }
            }
        }
	}

	/**
     * 合法手を探し、配列にして返す
     * @returns 要素の最後にkomaを置いた場所、それまでがReverese
     */
	Search(state, color) {
        let putArray = new Array();
        for (let y = 0; y < state.length; y++) {
            for (let x = 0; x < state[y].length; x++) {
                if (state[y][x] == 0) {
                    let array = this.ReverseSearch(y, x, color, state);
                    let reFlag = array["count"];

                    if (reFlag) {
						let a = new Object()
						a.count = array["count"];
                        a.place = [y, x];
                        a.reArray = array["place"];
                        putArray.push(a);
                    }
                }
            }
        }
        return putArray;
    }

    ReverseState(color, place, reArray) {
        let board = new Array();
        for (let i in  this.STATE) {
            board[i] = new Array();
            for (let j in this.STATE[i]) {
                board[i][j] = this.STATE[i][j];
            }
        }
        board[place[0]][place[1]] = color;
        for (let i in reArray) {
            let y = reArray[i][0];
            let x = reArray[i][1];
            
            board[y][x] = board[y][x] % 2 + 1;
        }
        return board;
    }

    ReverseSearch(stateY, stateX, stateColor, board) {
        const SEARCH_ARGS = [
            [0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [1, -1], [-1, 1], [1, 1]
        ];
        let reverseColor = (stateColor % 2) + 1;

        let reverseArray = new Array();
        let reverseCount = 0;

        for (let i in SEARCH_ARGS) {
            let searchArray = new Array();
            let y = stateY;
            let x = stateX;

            let YY = SEARCH_ARGS[i][0];
            let XX = SEARCH_ARGS[i][1];
            // 裏返すコマを探す処理
            for (; ;) {
                y += YY;
                x += XX;
                if (y == -1 || y == board.length || x == -1 || x == board[y].length) {    // 枠にあたったら
                    searchArray.push({ flag: -1 });
                    break;
                }

                let state = board[y][x];
                if (state == reverseColor) {        // 裏返すことができるコマが置かれていたら
                    searchArray.push({ flag: 1, y: y, x: x });
                } else if (state == stateColor) {   // 置いたコマと同じ色のコマが見つかったら
                    searchArray.push({ flag: 0 });
                    break;
                } else {                            // まだ何も置かれていないなら
                    searchArray.push({ flag: -1 });
                    break;
                }
            }
            if (searchArray[searchArray.length - 1]['flag'] == 0) {
                for (let j = 0; j < searchArray.length - 1; j++) {
                    reverseArray.push(
                        [searchArray[j]['y'], searchArray[j]['x']]
                    );
                    reverseCount++;
                }
            }
        }

        return { count: reverseCount, place: reverseArray };
    }

    IsCorner(stateY, stateX) {
        let yCorner = this.STATE.length - 1;
        let xCorner = this.STATE[0].length - 1;
        return !!((stateY == 0 && stateX == 0) || (stateY == 0 && stateX == xCorner) ||
            (stateY == yCorner && stateX == 0) || (stateY == yCorner && stateX == xCorner));
    }
    IsNextToCorner(stateY, stateX) {
        let dangerPlace = new Array();
        let yl = this.STATE.length - 1;
        let xl = this.STATE[0].length - 1;
        dangerPlace.push([0, 1], [1, 0], [1, 1]);
        dangerPlace.push([0, xl-1], [1, xl-1], [1, xl]);
        dangerPlace.push([yl-1, 0], [yl-1, 1], [yl, 1]);
        dangerPlace.push([yl-1, xl-1], [yl-1, xl], [yl, xl-1]);

        for(let i in dangerPlace) {
            let y = dangerPlace[i][0];
            let x = dangerPlace[i][1];
            if (y == stateY && x == stateX) {
                return true;
            }
        }
        return false;
    }
}