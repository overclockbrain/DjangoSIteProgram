
class JsAi {
	constructor(color, state) {
		this.COLOR = color;
		this.STATE = state;

		this.legalHand = new Array();

		this.predict();
	}

	get answer() {
		let max = 0;
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

	predict() {
		this.legalHand = this.Search();
	}

	/**
     * 合法手を探し、配列にして返す
     * @returns 要素の最後にkomaを置いた場所、それまでがReverese
     */
	Search() {
        let putArray = new Array();
        for (let y = 0; y < this.STATE.length; y++) {
            for (let x = 0; x < this.STATE[y].length; x++) {
                if (this.STATE[y][x] == 0) {
                    let array = this.ReverseSearch(y, x, this.COLOR, this.STATE);
                    let reFlag = array["count"];

                    if (reFlag) {
						let a = new Object()
						a.count = array["count"];
                        a.place = array["place"].push([y, x]);
                        putArray.push(a);
                    }
                }
            }
        }
        return putArray;
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
    Corner(board, stateY, stateX) {
        let yCorner = board.length - 1;
        let xCorner = board[0].length - 1;
        return !!((stateY == 0 && stateX == 0) || (stateY == 0 && stateX == xCorner) ||
            (stateY == yCorner && stateX == 0) || (stateY == yCorner && stateX == xCorner));
    }
}