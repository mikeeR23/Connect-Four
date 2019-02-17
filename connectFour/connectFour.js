

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

	if(td[num].style.backgroundColor != '') // Check if the spot is already filled
	{
		while(td[num].style.backgroundColor != '') // Assign a different td element until it finds one that is empty
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
		else	// keep checking
			continue
		
		if(cnt == 4) // Found 4 nodes in a row
			return true
	}

	return false	// Didn't find 4 in a row
}

// TODO
function diagnalWinCondition()
{

}

// Performs all checks for a win condition
function doChecks()
{
	if(horizontalWinCondition(playerColor)) // Check if the player has 4 in a row horizontally
		alert("Congrats, Horizontally, you have won")
	else if(vertalWinCondition(playerColor))
		alert("Congrats, Vertically, you have won!")
	else if(horizontalWinCondition(enemyColor)) // Check if the computer has 4 in a row horizontally
		alert("Computer has won, proceed with world domination, horizontally..")
	else if(vertalWinCondition(enemyColor))
		alert("Computer has won, proceed with world domination, vertically...")
	else	// Nobody has 4 in a row horizontally
		console.log("Keep going, nobody has satisfied horizontal win condition")
}

// Adds event listeners for all td elements in table
// When user clicks on the td element the background color changes to the players color choice
document.querySelectorAll('#myTable tbody tr td').forEach(e => e.addEventListener("click", function(){

	if(e.style.backgroundColor == '' && playerColor == '')
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


document.querySelector('#red').addEventListener("click", function(){
	setPlayerColor("red")
	printText()
	setEnemy()
	removeColors()
	setResetButton()
})

document.querySelector('#blue').addEventListener("click", function(){
	setPlayerColor("blue")
	printText()
	setEnemy()
	removeColors()
	setResetButton()
})

document.querySelector('#yellow').addEventListener("click", function(){
	setPlayerColor("yellow")
	printText()
	setEnemy()
	removeColors()
	setResetButton()
})

document.querySelector('#purple').addEventListener("click", function(){
	setPlayerColor("purple")
	printText()
	setEnemy()
	removeColors()
	setResetButton()
})

resetButton.addEventListener("click", function(){
	playerColor = ''
	enemyColor = ''
	var hover = 'Hover'

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
			if(td[i].style.background != "white")
				td[i].style.background = "white"

	resetButton.style.visibility = "hidden"
})

// Assigns a random color to the computer and ensures the color is different from the users color
function setEnemy()
{
	enemyColor = enemyColor = colors[Math.floor(Math.random() * colors.length)];

	if(enemyColor == playerColor)  // Computer and user have same color
		while(enemyColor == playerColor)
			enemyColor  = colors[Math.floor(Math.random() * colors.length)];
}



