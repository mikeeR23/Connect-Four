

var colors = ["red", "blue", "yellow", "purple"];

var playerColor = '' // Keeps track of the player's color
var enemyColor = '' // Keeps track of the enemy's color

var displayColor = document.querySelector('#displayColor')
var displayMessage  = document.querySelector('#displayMessage')
var table = document.querySelector('#table')
//var td = document.getElementsByTagName('td')
var td = document.querySelectorAll('#myTable tbody tr td')
var resetButton = document.querySelector('#resetGame')


// Adds css class that shows the users color when hovering over td elements
function addCssClass()
{
	var cssClass = ''

	cssClass = playerColor + 'Hover'

	// Add the css class to all td elements
	for(var i = 0;i < td.length;i++)
		td[i].classList.add(cssClass)
}

// After choosing a color, print text 
function printText()
{
	displayColor.textContent = 'Your color is ' + playerColor
	displayMessage.textContent = 'Place a node anywhere to start the game'

	addCssClass()
}

// Hides other color choices so user can't change color mid-game
function removeColors()
{
	for(var i = 0;i < colors.length;i++)
		if(playerColor != colors[i])
			document.getElementById(colors[i]).style.visibility = "hidden"		
}

function setResetButton()
{
	resetButton.style.visibility = "visible"
	resetButton.style.display = "block"
}

// Randomly picks a node for computer
function calculateComputerMove()
{
	var num = Math.floor(Math.random() * td.length) // Assign random td element number

	if(td[num].style.backgroundColor != 'white') // Check if the spot is already filled
	{
		while(td[num].style.backgroundColor != 'white') // Assign a different td element until it finds one that is empty
			num = Math.floor((Math.random() * td.length))
	}

	td[num].style.backgroundColor = enemyColor // Found an empty element 
}

// Checks to see if the user has 4 in a row horizontally
// Bug: if I get the last 3 at the end of a row then the first one at the beginning
// of the next row it will count that as 4 in a row
function horizontalWinCondition(userColor) 
{
	var j = 0
	var cnt = 0

	for(var i = 0;i < td.length;i++) // Loop through td elements
	{
		if(td[i].style.backgroundColor == userColor) // found an occupied node
		{	
			var j = i
			while(td[j].style.backgroundColor == userColor) // check the following nodes to see if they are occupied
			{
				cnt++ // update the total count
				j++ // variable to check next node
				if(j > 41)
					break
			}
		}

		if(cnt == 4) // return true if we get 4 in a row
				return true	
		
		cnt = 0
	}

	return false	// didn't get 4 in a row
}


// Checks for vertical win condition
// Should be done -- still need to do some testing
function vertalWinCondition(userColor)
{
	var cnt = 0 // Keep track of how many nodes in a row

	for(var i = 0;i < td.length;i++)
	{
		if(cnt == 4) // Found 4 nodes in a row
			return true

		if(td[i].style.backgroundColor == userColor && cnt == 0) // First instance of an occupied node
		{
			var modValue = i % 7	// gets the column 
			cnt++
		}
		// Occupied node with same color in the same column following the first node
		else if(td[i].style.backgroundColor == userColor && cnt > 0 && i % 7 == modValue) 
		{
			cnt++ 
		}
		// Either unoccupied node or computer node in the same column
		else if(td[i].style.backgroundColor != userColor && i %7 == modValue)
		{
			cnt--
		}
		else	
			continue
		
		
	}

	return false	// Didn't find 4 in a row
}

// Checks for right and left diagonals
// TODO: check for left diagonal
function diagonalWinCondition(userColor)
{
	var cnt = 0
	var row = -1

	// Determine a right diagonal
	for(var i = 0;i < td.length;i++)
	{
		if(cnt == 4) // check for 4 in a row
			return true

		if(i % 7 == 0) // Get the row number 
			row++

		if(td[i].style.backgroundColor == userColor && cnt == 0) // Check for first instance of a node
		{
			var col = i % 7 // gets the column of the first node
			var myCol = col + 1 // variable for checking following nodes are 1 column after 
			var myRow = row + 1  // varibale for checking following nodes are in the next row
			cnt++	// update node count
		}
		else if(td[i].style.backgroundColor == userColor && cnt > 0 && row == myRow) // node found in next row
		{
			if(i % 7 == myCol) // if the node is 1 column after the previous
			{
				cnt++
				myCol++
				myRow++
			}
		}
		// checks to see if a node that should be next in the diagonal doesn't appear
		else if(cnt > 0 && row == myRow && col == myCol)
		{
			if(td[i].style.backgroundColor != userColor)
				cnt--
		}
		else 
			continue
	}


	return false
}

// Performs all checks for a win condition
function doChecks()
{
	if(horizontalWinCondition(playerColor)) // Check if the player has 4 in a row horizontally
	{
		alert("Congrats, Horizontally, you have won")
		table.classList.toggle("lockElements")
	}
	else if(vertalWinCondition(playerColor))
		alert("Congrats, Vertically, you have won!")
	else if(horizontalWinCondition(enemyColor)) // Check if the computer has 4 in a row horizontally
		alert("Computer has won, proceed with world domination, horizontally..")
	else if(vertalWinCondition(enemyColor))
		alert("Computer has won, proceed with world domination, vertically...")
	else if(diagonalWinCondition(playerColor))
		alert("Congrats, you have won diagonally")
	else if(diagonalWinCondition(enemyColor))
		alert("Computer has won, proceed with world domination, diagonally...")
	else	// Nobody has 4 in a row horizontally
		console.log("Keep going, nobody has satisfied horizontal win condition")
}

// Adds event listeners for all td elements in table
// When user clicks on the td element the background color changes to the players color choice
document.querySelectorAll('#myTable tbody tr td').forEach(e => e.addEventListener("click", function(){

	if(e.style.backgroundColor == 'white' && playerColor == '')
		displayMessage.innerHTML = "Choose a color to start the game"
	else if(e.style.backgroundColor == playerColor || e.style.backgroundColor == enemyColor)
		displayMessage.innerHTML = "That spot has already been choosen, please choose another spot"
	else
	{
		displayMessage.innerHTML = ""
		e.style.backgroundColor = playerColor
		
		calculateComputerMove()

		doChecks()
	}
}))

function setBackground()
{
	for(var i = 0;i < td.length;i++)
		td[i].style.backgroundColor = 'white'

}

function callFunctions(colorClicked)
{
	setBackground()
	setPlayerColor(colorClicked)
	printText()
	setEnemy()
	removeColors()
	setResetButton()
}


document.querySelector('#red').addEventListener("click", function(){
	callFunctions("red")
})

document.querySelector('#blue').addEventListener("click", function(){
	callFunctions("blue")
})

document.querySelector('#yellow').addEventListener("click", function(){
	callFunctions("yellow")
})

document.querySelector('#purple').addEventListener("click", function(){
	callFunctions("purple")
})

resetButton.addEventListener("click", function(){
	playerColor = ''
	enemyColor = ''
	displayColor.textContent = ''
	displayMessage.textContent = ''
	var hover = 'Hover'

	//displayColor.innerHTML = ''
	//displayMessage.innerHTML = ''

	// Show all the colors at top of page again
	for(var i = 0;i < colors.length;i++)
		document.getElementById(colors[i]).style.visibility = "visible"
		
	for(var i = 0;i < td.length;i++) // Remove classes that change background color on hover
	{
		if(td[i].classList.contains('red' + hover))
			td[i].classList.remove('red' + hover)
		if(td[i].classList.contains('blue' + hover))
			td[i].classList.remove('blue' + hover)
		if(td[i].classList.contains('yellow' + hover))
			td[i].classList.remove('yellow' + hover)
		if(td[i].classList.contains('purple' + hover))
			td[i].classList.remove('purple' + hover)

	}

	// Clears the board of any pieces 
	for(var i = 0;i < td.length;i++)
		if(!td[i].classList.contains(""))
			if(td[i].style.backgroundColor != "white")
				td[i].style.backgroundColor = "white"

	resetButton.style.visibility = "hidden"
	table.classList.toggle("lockElements")
})

// Assigns a random color to the computer and ensures the color is different from the users color
function setEnemy()
{
	enemyColor  = colors[Math.floor(Math.random() * colors.length)];

	if(enemyColor == playerColor)  // Computer and user have same color
		while(enemyColor == playerColor)
			enemyColor  = colors[Math.floor(Math.random() * colors.length)];
}

function setPlayerColor(color)
{
	playerColor = color
}




