

var colors = ["red", "blue", "yellow", "purple"];

var userBoolArray = new Array(42)
var computerBoolArray = new Array(42)
initializeArray()


var playerColor = ''
var enemyColor = ''

var playerTurn = 1 // User's turn is defined by 1, the computer by 0

var displayColor = document.querySelector('#displayColor')
var displayMessage  = document.querySelector('#displayMessage')
var table = document.querySelector('#table')
//var td = document.getElementsByTagName('td')
var td = document.querySelectorAll('#myTable tbody tr td')
var resetButton = document.querySelector('#resetGame')



function initializeArray() // Create 2D array
{
	for(var i = 0;i < userBoolArray.length;i++)
	{
		userBoolArray[i] = false
		computerBoolArray[i] = false
	}
}

// Adds css class that shows the users color when hovering over td elements
function addCssClass()
{
	var cssClass = ''

	cssClass = playerColor + 'Hover'

	for(var i = 0;i < td.length;i++)
	{
		td[i].classList.add(cssClass)
	}

}


// After choosing a color, print text 
function printText()
{
	var cssClass = ''

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

function calculateComputerMove()
{
	var num = Math.floor(Math.random() * td.length) // Assign random td element number

	if(td[num].style.backgroundColor != '') // Check if the spot is already filled
	{
		while(td[num].style.backgroundColor != '') // Assign a different td element until it finds one that is empty
			num = Math.floor((Math.random() * td.length))
	}

	td[num].style.backgroundColor = enemyColor // Found an empty element 
	computerBoolArray[num] = true // Show that the enemy is occupying this spot
}

// Checks to see if the user has 4 in a row horizontally
function horizontalWinCondition() 
{
	var j = 0
	var cnt = 0

	for(var i = 0;i < td.length;i++)
	{
		if(td[i].style.backgroundColor == playerColor)
		{
			var j = i
			while(td[j].style.backgroundColor == playerColor)
			{
				console.log("Background color: " + td[j].style.backgroundColor)
				cnt++
				j++
			}	
		}
		if(cnt == 4)
				return true	
		
		cnt = 0
	}

	return false
}

// Bug that shows win condition choosing 4 in a row from 2 rows 
// Checks to see if the computer has 4 in a row horizontally
function computerHorizontalWinCondition()
{
	var j = 0
	var cnt = 0

	for(var i = 0;i < td.length;i++)
	{
		if(td[i].style.backgroundColor == enemyColor)
		{
			var j = i
			while(td[j].style.backgroundColor == enemyColor)
			{
				cnt++
				j++
			}	
		}
		if(cnt == 4)
				return true	
		
		cnt = 0
	}

	return false
}

// Checks for vertical win condition
function vertalWinCondition(color)
{

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
		playerTurn = 0

		var winUser = checkUserWinCondition()

		if(winUser)
			alert("You won")
		else
			console.log("No win condition")
		
		
		calculateComputerMove()

		var winComputer = computerHorizontalWinCondition()

		if(winComputer)
			alert("The computer has won")
		else	
			console.log("No computer win condition")
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

function setPlayerColor(color)
{
	playerColor = color
}

function getPlayerColor()
{
	return playerColor
}

function setEnemyColor(color)
{
	enemyColor = color // Give enemy random color
}

function getEnemyColor()
{
	return enemyColor
}


