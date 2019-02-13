

var playerColor = ''

var displayColor = document.querySelector('#displayColor')
var displayMessage  = document.querySelector('#displayMessage')
var table = document.querySelector('#table')
var td = document.getElementsByTagName('td')


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

document.querySelectorAll('#myTable tbody tr td').forEach(e => e.addEventListener("click", function(){
	e.style.backgroundColor = "red"
}))

document.querySelector('#red').addEventListener("click", function(){
	playerColor = 'red'
	printText()
})

document.querySelector('#blue').addEventListener("click", function(){
	playerColor = 'blue'
	printText()

})

document.querySelector('#yellow').addEventListener("click", function(){
	playerColor = 'yellow'
	printText()
})

document.querySelector('#purple').addEventListener("click", function(){
	playerColor = 'purple'
	printText()

})


