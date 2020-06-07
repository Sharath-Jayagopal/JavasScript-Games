// Ask the players for their name !

var playerOne = prompt("Player One : Enter Your Name , Your Color is Blue ");
var playerOneColor = 'rgb(86, 151 , 255)';

var playerTwo = prompt("Player 2 : Enter Your Name , Your Color is Red");
var playerTwoColor = 'rgb(237, 45 , 73)';

var game_on = true;
var table = $('table tr');

function reportWin(rowNum,colNum){
    console.log("You won starting at this row,col");
    console.log(rowNum);
    console.log(colNum); 
}
// fn to change the color of the buttons when clicked.

function changeColor(rowIndex,colIndex,color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function returnColor(rowIndex,colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

// Take in column index, returns the bottom row that is still gray
function checkBottom(colIndex) {
    var colorReport = returnColor(5,colIndex);
    for (var row = 5; row > -1; row--) {
      colorReport = returnColor(row,colIndex);
      if (colorReport === 'rgb(128, 128, 128)') {
        return row
      }
    }
  }

// color matching 
function colorMatchCheck(one,two,three,four){
    return (one===two && one===three && one===four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

// win check's for horz , ver and dia 

function horizontalWinCheck(){
    for(var row = 0; row < 6; row++) {
        for(var col = 0; col < 4; col++) {
            if(colorMatchCheck(returnColor(row,col), returnColor(row,col+1), returnColor(row,col+2), returnColor(row,col+3))){
                console.log('horiz');
                reportWin(row,col);
                return true;
            } else {
                continue;
            }
        }
    }
}

function verticalWinCheck(){
    for(var col = 0; col < 7; col++) {
        for (var row =0; row < 3; row++) {
            if(colorMatchCheck(returnColor(row,col), returnColor(row+1,col), returnColor(row+2,col), returnColor(row+3,col))){
                console.log('vertical');
                reportWin(row,col);
                return true;
            } else {
                continue;
            }
        }
    }
}

function diagonalWinCheck(){
    for (var col = 0; col < 5; col++) {
        for (var row = 0; row < 7; row++) {
            if(colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1), returnColor(row+2,col+2), returnColor(row+3,col+3))){
                console.log('diag');
                reportWin(row,col);
                return true;
            }else if(colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1), returnColor(row-2,col+2), returnColor(row-3,col+3))){
                console.log('diag');
                reportWin(row,col);
                return true;
            } else {
                continue;
            }
        }
    }
}

var currentPlayer = 1;
var currentName = playerOne;
var currentColor = playerOneColor;

// change heading to indicate player one is playing 

$('h3').text(playerOne + " it's your turn, pick a column to drop in! ");

$('.board button').on('click',function(){
    var col = $(this).closest('td').index();

    var bottomAvail = checkBottom(col);

    changeColor(bottomAvail,col,currentColor);

    if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
        $('h1').text(currentName+" You have won! , Refresh page to play again !");
        $('h3').fadeOut('fast');
        $('h2').fadeOut('fast'); 
    }

    currentPlayer = currentPlayer * -1;

 // Re-Check who the current Player is.

    if( currentPlayer === 1) {
        currentName = playerOne;
        $('h3').text(currentName+" it is your turn, please pick a column to drop your blue chip.");
        currentColor = playerOneColor;
    }else {
        currentName = playerTwo;
        $('h3').text(currentName+" it is your turn, please pick a column to drop your red chip.");
        currentColor = playerTwoColor;
    }
})