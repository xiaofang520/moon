/**
 * Created by Administrator on 2015/6/2.
 */
function showNumberWithAnimation(i, j, randNumber) {
    var numberCell = $("#number-cell-" + i + "-" + j);
    numberCell.css("background-color", getNumberBackgroundColor(randNumber));
    numberCell.css("color", getNumberColor(randNumber));
    numberCell.text(randNumber);
    numberCell.animate({
        width: "100px",
        height: '100px',
        top: getPostTop(i, j),
        left: getPostLeft(i, j)
    }, 50)
}

function showMoveAnimation(fromx, fromy, topx, topy) {
    var numberCell = $('#number-cell-' + fromx + "-" + fromy);
    numberCell.animate({
        top: getPostTop(topx, topy),
        left: getPostLeft(topx, topy)
    }, 200)
}

function updateScore(score){
    $("#score").text(score);
}