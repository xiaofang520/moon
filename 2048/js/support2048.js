/**
 * Created by Administrator on 2015/6/2.
 */
documentWidth=window.screen.availHeight;
gridContainerWidth=0.92*documentWidth;
cellSideLength=0.18*documentWidth;
cellSpace=0.04*documentWidthWidth;
function getPostTop(i, j) {
    return 20 + i * 120;

}
function getPostLeft(i, j) {
    return 20 + j * 120;
}

function getNumberBackgroundColor(number) {
    switch (number) {
        case 2 :
            return "#eee4da";
            break;
        case 4 :
            return "#eda0c8";
            break;
        case 8 :
            return "#f2b179";
            break;
        case 16 :
            return "#f59563";
            break;
        case 32:
            return "#f67e5f";
            break;
        case 64 :
            return "#f65e3b";
            break;
        case 128 :
            return "#edcf72";
            break;
        case 256 :
            return "#edcc61";
            break;
        case 512 :
            return "#9c0";
            break;
        case 1024 :
            return "#33b5e5";
            break;
        case 2048 :
            return "#09c";
            break;
        case 4096 :
            return "#a6c";
            break;
        case 8192 :
            return "#93c";
            break;
    }
    return "black";
}

function getNumberColor(number) {
    if (number <= 4) {
        return '#776e65'
    }
    return "white";
}

function nospace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }

    }
    return true;

}
//能否移动方法
function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }

    }
    return false;
}
// Up
function canMoveUp(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[j][i] != 0) {
                if (board[j - 1][i] == 0 || board[j - 1][i] == board[j][i]) {
                    return true;
                }
            }
        }

    }
    return false;
}
function canMoveDown(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[j][i] != 0) {
                if (board[j + 1][i] == 0 || board[j + 1][i] == board[j][i]) {
                    return true;
                }
            }
        }

    }
    return false;
}
function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                    return true;
                }
            }
        }

    }
    return false;
}

//有没有障碍物
function noBlockHorizontal(row, col1, col2, board) {

    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0) {
            return false;
        }


    }
    return true;

}

function noBlockVertical(row1, row2, col, board) {

    for (var i = row1 + 1; i < row2; i++) {
        if (board[i][col] != 0) {
            console.log(i + " @:@ " + col);
            return false;
        }


    }
    return true;
}

//不能移动
function nomove(board) {
    if (canMoveLeft(board) || canMoveUp(board) || canMoveRight(board) || canMoveDown(board)) {
        return false;
    }

    return true;
}