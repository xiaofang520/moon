/**
 * Created by Administrator on 2015/6/2.
 */
var board = [];
var score = 0;
var hasconflicted = [];



//
$(function () {
    prepareForMobile();
    newgame();
});

function prepareForMobile(){

}
function newgame() {
    //初始化棋盘格
    init();
//    在随机的两个格子生成数字
    generateOneNumber();
    generateOneNumber();

}
function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPostTop(i, j) + "px");
            gridCell.css('left', getPostLeft(i, j) + "px")
        }

    }
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasconflicted[i] = [];
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasconflicted[i][j] = false;
        }
    }
    updateBoardView();
    score = 0;
}

function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {

            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $("#number-cell-" + i + '-' + j);
            if (board[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPostTop(i, j) + 50);
                theNumberCell.css('left', getPostLeft(i, j) + 50);

            } else {
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPostTop(i, j));
                theNumberCell.css('left', getPostLeft(i, j));
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);

            }
            hasconflicted[i][j] = false;
        }

    }

}

//生成数字
function generateOneNumber() {
    if (nospace(board)) {
        return false;
    }
    //随机生成一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    var times = 0;
    while (times < 50) {
        if (board[randx][randy] == 0) {
            break;
        }
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
        time++;
    }
    if (times == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    randx = i;
                    randx = y;
                }
            }
        }
    }
    //随机生成一个数字
    var ranNumber = Math.random() < 0.5 ? 2 : 4;
    //在随机位置显示随机数字
    board[randx][randy] = ranNumber;
    showNumberWithAnimation(randx, randy, ranNumber);


    return true;
}
$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37: //left
            if (moveLeft()) {

                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300)


            }
            break;
        case 38: //up
            if (moveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300)
            }
            break;
        case 39:  //right
            if (moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300)
            }
            break;
        case 40:  //default
            if (moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300)
            }
            break;
        default :
            break;
    }
});
function isgameover() {
    if (nospace(board) && nomove(board)) {
        gameover();
    }
}
function gameover() {
    alert("sorry,gameover");
}
function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
//                        continue;

                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasconflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);

                        hasconflicted[i][k] = true;
//                        continue;
                        //add
                    }
                }
            }
        }

    }
    setTimeout("updateBoardView()", 200);

    return true;
}
function moveUp() {
    if (!canMoveUp(board)) {
        console.log("false up");
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[j][i] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[k][i] == 0 && noBlockVertical(k, j, i, board)) {
                        //move
                        console.log("-------------------------");
                        console.log(board[k][i] + ":" + board[j][i]);
                        showMoveAnimation(j, i, k, i);
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
//                        continue;

                    } else if (board[k][i] == board[j][i] && noBlockVertical(k, j, i, board) && !hasconflicted[k][i]) {
                        //move
                        console.log("*******************");
                        console.log(board[k][i] + ":" + board[j][i]);
                        showMoveAnimation(j, i, k, i);
                        board[k][i] += board[j][i];
                        board[j][i] = 0;
                        score += board[k][i];
                        updateScore(score);

                        hasconflicted[i][k] = true;
//                        continue;
                        //add
                    }
                }
            }
        }

    }
    setTimeout("updateBoardView()", 200);

    return true;
}
function moveDown() {
    if (!canMoveDown(board)) {

        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[j][i] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[k][i] == 0 && noBlockVertical(j, k, i, board)) {
                        //move
                        console.log("-------------------------");
                        console.log(board[k][i] + ":" + board[j][i]);
                        showMoveAnimation(j, i, k, i);
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
//                        continue;

                    } else if (board[k][i] == board[j][i] && noBlockVertical(j, k, i, board) && !hasconflicted[k][i]) {
                        //move
                        console.log("*******************");
                        console.log(board[k][i] + ":" + board[j][i]);
                        showMoveAnimation(j, i, k, i);
                        board[k][i] += board[j][i];
                        board[j][i] = 0;
                        score += board[k][i];
                        updateScore(score);

                        hasconflicted[i][k] = true;
//                        continue;
                        //add
                    }
                }
            }
        }

    }
    setTimeout("updateBoardView()", 200);

    return true;
}
function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
//                        continue;

                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasconflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);

                        hasconflicted[i][k] = true;
//                        continue;
                        //add
                    }
                }
            }
        }

    }
    setTimeout("updateBoardView()", 200);

    return true;
}