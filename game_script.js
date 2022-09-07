var player1 = prompt("player 1, Enter your Name, Your color will be blue");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("player 2, Enter your Name, Your color will be red");
var player2Color = 'rgb(237, 45, 73)';

var table = $('table tr');

// function to change color of a cell
function changeColor(rowIndex,colIndex,color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

// function that will return the color of a cell
function returnColor(rowIndex,colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

// check bottom of the column to see iffunction checkBottom(colIndex){
function checkBottom(colIndex){
    var colorReport = returnColor(5,colIndex);
    for(var row = 5; row> -1; row--){
        colorReport = returnColor(row,colIndex);
        if(colorReport === 'rgb(128, 128, 128)'){
            return row;
        }
    }
}

// function to check color of four consecutive cells
function colorMatchCheck(one, two, three, four){
    return(one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined )
}

// horizontal row check
function horizontalWinCheck(){
    for(var row = 0; row < 6; row++){
        for(var col = 0; col < 4; col++){
            if(colorMatchCheck(returnColor(row,col), returnColor(row,col+1), returnColor(row,col+2), returnColor(row,col+3))){
                console.log('horizontal');
                return true;
            }else{
                continue;
            }
        }
    }
}

// vertical row check 
function verticalWinCheck(){
    for(var col = 0; col < 7; col++){
        for(var row = 0; row < 3; row++){
            if(colorMatchCheck(returnColor(row,col), returnColor(row+1,col), returnColor(row+2,col), returnColor(row+3,col))){
                console.log('vertical');
                return true;
            }else{
                continue;
            }
        }
    }
}

// diagonal row check 
function diagonalWinCheck(){
    for(var col = 0; col < 5; col++){
        for(var row = 0; row < 7; row++){
            if(colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1), returnColor(row+2,col+2), returnColor(row+3,col+3))){
                console.log('diagonal');
                return true;
            }else if(colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1), returnColor(row-2,col+2), returnColor(row-3,col+3))){
                console.log('diagonal');
                return true;
            }else{
                continue;
            }
        }
    }
}


// Game logic 
var game_on = true;
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1 + ", it is your turn");

$('.board button').on('click', function(){
    if(game_on){
        var col = $(this).closest('td').index();

        var bottomAvail = checkBottom(col);

        changeColor(bottomAvail, col, currentColor);

        if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
            $('h1').text(currentName+", You have won!");
            $('h2').fadeOut('fast');
            $('h3').fadeOut('fast');
            game_on = false;
        }

        currentPlayer = (currentPlayer)*(-1);
        if(currentPlayer === 1){
            currentName = player1;
            $('h3').text(currentName+" it is your turn");
            currentColor = player1Color;
        }else if(currentPlayer === -1){
            currentName = player2;
            $('h3').text(currentName+" it is your turn");
            currentColor = player2Color;
        }
    }   
})

