//Restart Game Button

var restart = document.querySelector("#b");

//Grabs all the square / grid elements
var squares = document.querySelectorAll("td")


//clear the grid
function clearBoard(){
    for(var i =0;i<squares.length;i++){
        squares[i].textContent = '';
    }
}
restart.addEventListener('click',clearBoard);
// box content (x or o)

                    // var cellOne = document.querySelector('#one');

                    // cellOne.addEventListener('click',function(){
                    //     if(cellOne.textContent === ''){
                    //         cellOne.textContent = 'X';
                    //     }
                    //     else if (cellOne.textContent ==='X'){
                    //         cellOne.textContent='O';
                    //     }
                    //     else{
                    //         cellOne.textContent = '';
                    //     }
                    
                    // })
// function changeMarker(){
//     if(this.textContent === ''){
//         this.textContent = 'X';
//     }
//     else if(this.textContent === 'X'){
//         this.textContent = 'O';
//     }
//     else{
//         this.textContent = '';
//     }
// }
let current = "X";
function changeMarker(){
    if(this.textContent == ''){
        this.textContent = current;		
    }
    else {
		this.textContent = '';
    }
	
	checkWin();
	
	if(current == 'X') {
		current = 'O';
	} else {
		current = "X";
	}
}

	/*
		0 1 2
		3 4 5
		6 7 8
		
	*/
function checkWin(){
	// Row check
	for(let i = 0; i < 9; i += 3){
		if( squares[i].textContent != '' &&
			squares[i].textContent == squares[i+1].textContent &&
			squares[i+1].textContent == squares[i+2].textContent) {
			alert("Row check: " + current+ " wins.");
			clearBoard();
		}
	}
	
	// Column check
	for(let i = 0; i < 3; i += 1){
		if( squares[i].textContent != '' &&
			squares[i].textContent == squares[i+3].textContent &&
			squares[i+3].textContent == squares[i+6].textContent) {
			alert("Column check: " + current+ " wins.");
			clearBoard();
		}
	}
	
	// Diagonal check
   
    if(squares[0].textContent != '' && squares[4].textContent != '' && squares[8].textContent != '' &&
		squares[0].textContent == squares[4].textContent &&
		squares[4].textContent == squares[8].textContent){
		alert("Diagonal check: " + current+ " wins.");
		clearBoard();
	}
 
    if(squares[2].textContent != '' && squares[4].textContent != '' && squares[6].textContent != '' &&
		squares[2].textContent == squares[4].textContent &&
		squares[4].textContent == squares[6].textContent){
		alert("Diagonal check: " + current+ " wins.");
		clearBoard();
	}
   
	
}   
// loop through the grid and add X or O to it based on the cell click
for (var i =0;i< squares.length;i++) {
    squares[i].addEventListener('click',changeMarker);
    }
