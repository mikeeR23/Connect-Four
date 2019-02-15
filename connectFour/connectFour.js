

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
var td = document.getElementsByTagName('td')
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

function checkUserWinCondition()
{
	var cnt = 0 // keep track of how many in a row
	var j = 0
	var computerCount = 0
	var checkHorizontal = new Array(6)

	for(var i = 0;i < td.length;i++)
	{
		console.log("Td[" + i + "] = " +userBoolArray[i])
	}

	for(var i = 0;i < checkHorizontal.length;i++) // Horizontal array used to check for 4 in a row horizontal
		checkHorizontal[i] = false

	for(var i = 0;i < td.length;i++)
	{
		if(userBoolArray[i] && cnt == 0) // first node user has placed 
		{
			console.log("Ok starting horizontal check at td[" + i + "]")
			cnt++
			checkHorizontal[0] = true

			if(i % 7 > 3)
			{
				console.log("i is too big")
				cnt-- // reset back to 0
				continue
			}
			else
			{
				console.log("in the right spoot boi")
				j = i + 1
				// until we reach a computer node, an unoccupied node, or end of row
				while(j % 7 != 6 || !userBoolArray[j] || computerBoolArray[j])
				{
					if(userBoolArray[j])
						cnt++
					
					j++
				} 

				if(cnt == 4) // 4 in a row horizontal
				{
					console.log("returning true")
					return true
				}
					
			}
		}

	}
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
		userBoolArray[e] = true // User's color is in this spot
		playerTurn = 0

		var win = checkUserWinCondition()

		if(win)
			alert("we fucking did it boy")
		else
			console.log("fuck me sideways")
		calculateComputerMove()
		
	}

	//checkComputerWinCondition() // Checks to see if the computer got 4 in a row
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


