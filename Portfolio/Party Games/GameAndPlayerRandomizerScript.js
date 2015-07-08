 <!--
var players = [];
var games = [];
var currentPlayers = []; 
var currentGame = "";
var minutes = 0;
var seconds = 0;

// Game Object
function Game(title, rules, minPlayers, maxPlayers, timeLimit)
{
	this.title = title;
	this.rules = rules;
	this.minPlayers = minPlayers;
	this.maxPlayers = maxPlayers;
	this.timeLimit = timeLimit; // in minutes
	
	// make sure you can't have a higher minimum of one gender than a minimum of all players
	if (this.minPlayers < 1)
	{
		this.minPlayers = 1;
	}
	if (this.maxPlayers < this.minPlayers)
	{
		this.maxPlayers = this.minPlayers;
	}
	
	function equals(p)
	{
		if (p.title === this.title)
		{
			return true;
		}
		return false;
	}
} // end Game object

// load a certain page
function loadPage(pageNumber)
{
	writeCookie(0);
	switch(pageNumber){
		case 1: //Player menu
			window.location = 'AddPlayer.html';
			break;
		case 2: //Game menu
			window.location = 'AddGame.html';
			break;
		case 3: //Choose screen
			if (players.length < 1){
				loadPage(1);
			}else if (games.length < 1){
				loadPage(2);
			}else{
				window.location = 'Play.html';
			}
			break;
		case 4: //Timer screen
			window.location = 'Timer.html';
			break;
		default: //Title menu
			window.location = 'GameAndPlayerRandomizer.html';
			break;
	}
	
}

// edit the list of player & games
function addPlayer()
{
	// initialize variables from html
	var firstName = document.getElementById("firstnamebox").value; // id="namebox"
	var lastName = document.getElementById("lastnamebox").value; // id="namebox"
	var name = firstName + " " + lastName; // id="namebox"
	
	if ((name == "") || (name == " ") || (firstName == "") || (lastName == "")){ // display error if user does not enter a name
		document.getElementById("errorMessage").innerHTML = "Error: You must enter a player name.";
		return;
	}
	
	// add new name to list if the name is not already part of the list
	for (i = 0; i < players.length; i++){
		if( players[i] === name) {
			document.getElementById("errorMessage").innerHTML = name + " is already in this list. Duplicates are not allowed.";
			return;
		}
	}
	
	players[players.length] = name;
	
	// clear the name box
	document.getElementById("firstnamebox").value = "";
	document.getElementById("lastnamebox").value = "";

	// alert the user that the player has been added or not
	if (players[players.length - 1] === name){
		document.getElementById("errorMessage").innerHTML = players[players.length - 1] + " is added to the list of players.";
	}else{
		document.getElementById("errorMessage").innerHTML = "Something fucked up.";
	}
}

function removePlayer()
{
	// initialize variables from html
	var firstName = document.getElementById("firstnamebox").value; // id="namebox"
	document.getElementById("firstnamebox").value = "";
	
	var lastName = document.getElementById("lastnamebox").value; // id="namebox"
	document.getElementById("lastnamebox").value = "";
	
	var name = firstName + " " + lastName;
	
	if ((name == "") || (name == " ") || (firstName == "") || (lastName == "")){ // display error if user does not enter a name
		document.getElementById("errorMessage").innerHTML = "Error: You must enter a player name.";
		return;
	}
	
	// add new name to list if the name is not already part of the list
	for (i = 0; i < players.length; i++){
		if( players[i] === name) {
			var temp = players[i];
			players[i] = players[players.length - 1];
			players[players.length - 1] = temp; // not needed for the way it's set up, but there for good practice
			players.pop();
		}
	}
	
	// set the message now so that if something messes up it gets overwritten
	//otherwise it remains this
	document.getElementById("errorMessage").innerHTML = name + " is not in the list anymore (if ever).";
	
	for (i = 0; i < players.length; i++){
		if( players[i] === name) {
			document.getElementById("errorMessage").innerHTML = "Something fucked up. " + name + " is still in the list.";
		}
	}
}

function showPlayers()
{
	var text = "";
	for (var i = 0; i < players.length; i++){
		text = text + players[i] + "<br />";
	}
	document.getElementById("errorMessage").innerHTML = text;
}

function clearPlayers()
{
	//clear all
	players = [];
	
	//clear current
	currentPlayers = [];
}

function populatePlayers()
{
	clearPlayers();
	players = ["Colby Jones", 
				"Molly Berg", 
				"Shannon Smith", 
				"Rhianna Bennett", 
				"Ross Kroeber", 
				"Nicole Moran"
				];
}

function addGame() //INCOMPLETE
{

	// initialize variables from html
	var title = document.getElementById("namebox").value; // id="namebox"
	var rules = document.getElementById("rulesbox").value; // id="rulesBox"
	var minP = document.getElementById("minPlayer").value; // id="minPlayer"
	var maxP = document.getElementById("maxPlayer").value; // id="maxPlayer"
	var timeLimit = document.getElementById("timerA").value; // id="timer"
	
	if (title == ""){ // display error if user does not enter a name
		document.getElementById("errorMessage").innerHTML = "Error: You must enter a gameTitle.";
		return;
	}
	
	//make Game object
	var newGame = new Game(title, rules, minP, maxP, timeLimit);
	
	// add new name to list if the name is not already part of the list
	for (i = 0; i < games.length; i++){
		if( games[i].title == title) {
			document.getElementById("errorMessage").innerHTML = title + " is already in this list. Duplicates are not allowed.";
			return;
		}
	}
	
	games[games.length] = newGame;
	
	// clear the name box
	document.getElementById("namebox").value = "";
	document.getElementById("rulesbox").value = "";
	document.getElementById("minPlayer").value = "1";
	document.getElementById("maxPlayer").value = "1";
	document.getElementById("timer").value = "5";

	// alert the user that the player has been added or not
	if (games[games.length - 1] === name){
		document.getElementById("errorMessage").innerHTML = games[games.length - 1].title + " is added to the list of games.";
	}else{
		document.getElementById("errorMessage").innerHTML = "Something fucked up.";
	}

}

function removeGame()
{
	// initialize variables from html
	var name = document.getElementById("namebox").value; // id="namebox"
	document.getElementById("namebox").value = "";
	
	if (name == ""){ // display error if user does not enter a name
		document.getElementById("errorMessage").innerHTML = "Error: You must enter a game title.";
		return;
	}
	
	// add new name to list if the name is not already part of the list
	for (i = 0; i < games.length; i++){
		if( games[i].title === name) {
			var temp = games[i];
			games[i] = games[games.length - 1];
			games[games.length - 1] = temp; // not needed for the way it's set up, but there for good practice
			games.pop();
		}
	}
	
	// set the message now so that if something messes up it gets overwritten
	//otherwise it remains this
	document.getElementById("errorMessage").innerHTML = name + " is not in the list anymore (if ever).";
	
	for (i = 0; i < games.length; i++){
		if( games[i].title === name) {
			document.getElementById("errorMessage").innerHTML = "Something fucked up. " + name + " is still in the list.";
		}
	}
}

function showGames()
{
	var text = "";
	for (var i = 0; i < games.length; i++){
		text = text + games[i].title + "<br />";// + " - [" + games[i].minPlayers + ", " + games[i].maxPlayers + "] " + games[i].timeLimit + "<br />";
	}
	document.getElementById("errorMessage").innerHTML = text;
}

function clearGames()
{
	//clear all games
	games = [];
}

function populateGames()
{
	games = [
		//new Game("Spud", "One person throws something in the air.<br/>Everyone runs away.<br/>When the person catches the object again, they yell 'Spud'.<br/>The person has 5 steps to get to someone and tag them with the object they caught.", 1, 1, 15),
		//new Game("Battleshots", "Take the shot when your ship is hit.<br/>Loser drinks all remaining shots", 2, 2, 15),
		new Game("Circle of Death", "A: Waterfall<br/>2: You (give a drink)<br/>3: Me (take a drink)<br/>4: Floor (last to touch floor with hand drinks)<br/>5: Guys<br/>6: Chicks<br/>7: Heaven (last to point up drinks)<br/>8: mate (when you drink your mate drinks too)<br/>9: Rhyme<br/>10: Never Have I Ever<br/>J: Make a Rule<br/>Q: Questions<br/>K: Categories", 5, 8, 15),
		//new Game("Zoo", "Pick an animal to represent you and a gesture to represent the animal.<br/>1-2-3 beat, on 3 do your gesture, on the next beat do another guesture.<br/>It's now that person's turn.<br/>If you mess up, you're out.", 1, 1, 15),
		new Game("Laptag", "Someone sits in the middle<br/>Everyone else pairs up<br/>Center calls a name, and the partner tries to prevent the called from reaching the center<br/>whoever touches the center first becomes the new center", 1, 1, 15),
		//new Game("Coup", "Duke: Take 3 coins. Prevent other players from collecting Foreign Aid<br/>Assassin: Pay 3 coins to kill<br/>Contessa: Block an assassination against yourself<br/>Captain: Collect 2 coin tax from another player, block tax against yourself<br/>Ambassador: Draw 2 cards from the deck, put back 2 cards. Block Captains from collecting tax against you.<br/>Each turn: a) Collect 1 coin, b) collect 2 coins (Foreign Aid), c) use a power, d) coup someone (7 coins, must do so if you have 10 coins)<br/>Everyone starts with 2 cards and 3 coins", 3, 6, 15),
		new Game("Honey, If You Love Me, Smile", "Everyone sits in a big circle and one person at a time tries to make someone else smile.<br/>If they smile, they lose and it is their turn to make someone else smile.", 1, 1, 15),
		new Game("Return of the Mummy", "2 wrappers try to cover their mummies as thoroughly as possibly in the time limit", 4, 4, 15),
		new Game("Hips Dont Lie", "One person is blindfolded then slow dances to Hips Dont Lie trying to guess 3 different peoples hips.<br/>When the dancing is done, the blindfolded player guess who they danced with. If they guess all 3 in order, the dancers take a shot each. Otherwise, the player takes as many shots as incorrect answers they gave.", 1, 1, 15),
		new Game("Shoot Cuff Kiss", "Must give one person a shot, handcuff with the other, and kiss the last person.", 4, 4, 15),
		//new Game("Resistance", "Lie to your friends", 5, 10, 15),
		//new Game("Mafia", "Narrator picks a Mafia, Sheriff, and Doctor.<br/>Mafia kills people, Doctor can prevent this, Sheriff can end game by guessing Mafia.", 1, 1, 15),
		new Game("Murder", "Cop goes into another room.<br/>A murderer is randomly chosen.<br/>Lights off.<br/><br/>Want to play a game?", 1, 1, 30),
		//new Game("Drive", "Vroom to keep the flow.<br/>Bump to skip a player.<br/>Skeet to change direction.", 1, 1, 15),
		//new Game("Love Letter", "1 Guard: Name a non-Guard card and choose a player. If you're correct, that player is out<br/>2 Priest: Look at another player's hand<br/>3 Baron: You and another player secretly compare hands. The player with the lower value is out<br/>4 Handmaid: Ignore all effects until your next turn<br/>5 Prince: Choose any player (self included) to discard and draw<br/>6 King: Trade hands with another player of your choice<br/>7 Countess: You must discard this card if you hold the King or Prince<br/>8 Princess: If you discard this card you are out", 2, 4, 15),
		//new Game("Once Upon a Time", "One player is the Storyteller and creates a story using the ingredients on her cards.<br/>She tries to guide the plot towards her own ending.<br/>The other players try to use cards to interrupt her and become the new Storyteller.<br/>The winner is the first player to play out all her cards and end with her Happy Ever After card.", 2, 6, 15),
		//new Game("One Night Ultimate Werewolf", "Like Ultimate Werewolf, but only lasts one round", 3, 10, 10),
		new Game("Ultimate Werewolf", "Chosen player is Moderator.", 1, 1, 30),
		new Game("Bobbing for Apples", "The first person to take out 3 apples from the bucket using only their mouth wins a prize.<br/>The loser takes a shot.", 2, 2, 15),
		new Game("Pinata", "WHO YA GONNA CALL?<br/><br/><br/>GHOST SMASHERS!", 5, 5, 15),
		new Game("Hot Pumpkin", "Anyone who drops the 'pumpkin' takes a shot.", 5, 8, 15),
		new Game("One Card Draw", "All players divide into groups of 3.<br/>Each player is given a playing card.<br/>Two cards are flipped over.<br/>Whichever team has the best hand including the two cards wins.<br/>All losers take a shot.<br/><br/>Card Rankings:<br/>Straight Flush: 5 consecutive cards of same suit<br/>Four of a Kind<br/>Full House: 3 of a Kind + Pair<br/>Flush: 5 cards same suit<br/>Straight: 5 consecutive cards any suit<br/>3 of a Kind<br/>2 Pair<br/>Pair<br/>High Card", 6, 15, 15),
		new Game("Sadie Hawkins Dance", "Each girl (except for the chosen player) gives a shot to a guy of their choosing.<br/>Any guys who refuse the shot must slow dance with the chosen player.<br/>If nobody dances with the chosen player, he or she takes 2 shots.",1,1,15),
		new Game("Homecoming Dance", "Each guy (except for the chosen player) gives a shot to a girl of their choosing.<br/>Any girls who refuse the shot must slow dance with the chosen player.<br/>If nobody dances with the chosen player, he or she takes 2 shots.", 1,1,15),
		new Game("Double Double Toil and Trouble", "The chosen players take a shot of Witches' Brew.",3,6,15),
		new Game("Ninja", "Each turn a player may move once to try and tag another player's hands.<br/>If someone's hand has been tagged, they put that hand behind his or her back.<br/>When both hands are behind a player's back, they are out of the game.<br/>All losers must take a shot.", 4, 8, 15)
		
		]
}

function showCurrentPlayers()
{
	var text = "";
	
	for (var i = 0; i < currentPlayers.length; i++){
		text = text + currentPlayers[i] + "<br />";
	}
	
	document.getElementById("errorMessage").innerHTML = text;
}

function showGameRules()
{
	document.getElementById("errorMessage").innerHTML = currentGame.rules;
}

// do cool things
function getGame()
{
	readCookie(0);
	//make sure there is at least one game
	if (games.length < 1)
	{
		loadPage(2);
		return;
	}
	//make sure a game has a minimum number of players less than or equal to the actual number of players
	var smallestMin = games[0].minPlayers;
	for (var j = 0; j < games.length; j++)
	{
		if (games[j].minPlayers < smallestMin)
		{
			smallestMin = games[j].minPlayers;
		}
	}
	if (smallestMin > players.length)
	{
		loadPage(1);
		return;
	}
	//get random game from list
	var bigNumber = Math.floor((Math.random() * 1000) + 1);
	//make sure the game chosen has a minimum player count no larger than the number of players playing
	while (games[bigNumber % games.length].minPlayers > players.length)
	{
		bigNumber = Math.floor((Math.random() * 1000) + 1);
	}
	return games[bigNumber % games.length];
}

function assignPlayers(game)
{


	//check that there are enough players to meet the minimum requirement
	if (game.minPlayers == players.length)
	{
		currentPlayers = players;
		return;
	}
	if (game.minPlayers > players.length)
	{
		document.getElementById("errorMessage").innerHTML = "There are not enough players to play this game.";
		loadPage(0);
		return;
	}

	currentPlayers = [];
	//generate number [games.min, games.max]
	var number = Math.floor((Math.random() * (game.maxPlayers - game.minPlayers + 1)) + game.minPlayers);
	number = number >= players.length ? players.length - 1 : number;
	number = number < 0 ? 0 : number;

	
	
	
	
	//add players to currentPlayers, checking if the selected player is already in the list
	while(currentPlayers.length < number)
	{
		//generate random number
		var pNumber = Math.floor((Math.random() * (players.length)));
		pNumber = pNumber < 0 ? 0 : pNumber;
		pNumber = pNumber > players.length - 1 ? players.length - 1 : pNumber;
		
		//check if players[randomNumber] is in currentPlayers
		var isOut = true;
		for (var count = 0; count < currentPlayers.length; count++)
		{
			if (players[pNumber] == currentPlayers[count])
			{
				isOut = false;
			}
		}
		
		//if not, add player[rN] to currentPlayers
		if (isOut)
		{
			currentPlayers[currentPlayers.length] = players[pNumber];
		}
	}
}

function writeCookie(whichCookie)
{
	var text = "";
	switch(whichCookie)
	{
		case 1: // players
			for (var i = 0; i < players.length; i++)
			{
				text = text + players[i] + ",";
			}
			document.cookie="cookie1="+text;
			break;
		case 2: // games
			for (var i = 0; i < games.length; i++)
			{
				text = text + games[i].title + "_" + games[i].rules + "_" + games[i].minPlayers + "_" + games[i].maxPlayers + "_" + games[i].timeLimit + "|";
			}
			document.cookie="cookie2="+text;
			break;
		case(3): // currentPlayers
			for (var i = 0; i < currentPlayers.length; i++)
			{
				text = text + currentPlayers[i] + ",";
			}
			document.cookie="cookie3="+text;
			break;
		case(4):
			document.cookie="cookie4="+ currentGame.title + "_" + currentGame.rules +"_"+ currentGame.minPlayers +"_"+ currentGame.maxPlayers +"_"+ currentGame.timeLimit+"_";
			break;
		default:
			writeCookie(1);
			writeCookie(2);
			writeCookie(3);
			writeCookie(4); //?
			break;
	}
	
	
	
	//document.cookie="username=John Doe";
}

function readCookie(cname) {
	//parse all cookies by semi-colons
	var ca = document.cookie.split(';');

	//get rid of " " prefixes on cookies
	for(var i=0; i<ca.length; i++)
	{
		while (ca[i].substring(0, 1)==' ')
		{			
			ca[i] = ca[i].substring(1, ca[i].length-1);
		}
	}
	
	switch(cname)
	{
		case 1: //players
			players=[]; // empty any players
			var name = "cookie1=";
			
			//parse the names by commas
			var listOfNames = "";
			//find the correct cookie
			for (var i = 0; i < ca.length; i++)
			{
				if (ca[i].substring(0, name.length) == name)
				{
					listOfNames = ca[i].substring(name.length);
				}
			}
			
			for (var j = listOfNames.length - 1; j > 0; j--)
			{
				if ((listOfNames.charAt(j) == ',') || ((listOfNames.charAt(j) == ' ')))
				{
					listOfNames = listOfNames.substring(0, listOfNames.length -1);
				}
				else{
					j = -1;
				}
			}
			
			if ((listOfNames == "") || (listOfNames == ",") || (listOfNames == " ") || (listOfNames == " ,") || (listOfNames == ", ") || (listOfNames == " , ") )
			{
				break;
			}
			var tempPlayers = listOfNames.split(',');
			
			//get rid of any empty players or duplicates in cookie
			for(var i = 0; i < tempPlayers.length; i++)
			{
				var name = tempPlayers[i];
	
				if (name == ""){ // display error if user does not enter a name
					tempPlayers[i] = tempPlayers[tempPlayers.length-1];
					tempPlayers.pop();
				}
	
				// add new name to list if the name is not already part of the list
				for (var j = 0; j < players.length; j++)
				{
					if( players[j] === name) {
						continue;
					}
				}
	
				players[players.length] = name;
			}
			break;
		case 2: // games
			games=[];
			var name = "cookie2=";
			//find the correct cookie
			var listOfGames = "";
			for (var i = 0; i < ca.length; i++)
			{
				if (ca[i].substring(0, name.length) == name)
				{
					listOfGames = ca[i].substring(name.length);
				}
			}
			//parse all games by "|"
			var condencedGames = listOfGames.split('|');
			for (var j = 0; j < condencedGames.length; j++)
			{
				//parse all game info by "_"
				var gameStringArray = condencedGames[j].split('_');
				//convert the last 3 of each array into integers
				gameStringArray[gameStringArray.length-3] = parseInt(gameStringArray[gameStringArray.length-3]);
				gameStringArray[gameStringArray.length-2] = parseInt(gameStringArray[gameStringArray.length-2]);
				gameStringArray[gameStringArray.length-1] = parseInt(gameStringArray[gameStringArray.length-1]);
				//create new Game objects using each array
				games.push(new Game(gameStringArray[0], gameStringArray[1], gameStringArray[2], gameStringArray[3], gameStringArray[4]));
				
			}
			break;
		case 3: //currentPlayers
			currentPlayers=[];
			var name = "cookie3=";
			
			//parse the names by commas
			var listOfNames = "";
			//find the correct cookie
			for (var i = 0; i < ca.length; i++)
			{
				if (ca[i].substring(0, name.length) == name)
				{
					listOfNames = ca[i].substring(name.length);
				}
			}
			currentPlayers = listOfNames.split(',');
			break;
		case 4: //currentGame
			var name = "cookie4=";
			
			//parse the names by commas
			var listOfNames = "";
			//find the correct cookie
			for (var i = 0; i < ca.length; i++)
			{
				if (ca[i].substring(0, name.length) == name)
				{
					listOfNames = ca[i].substring(name.length);
				}
			}
			
			for (var j = listOfNames.length - 1; j > 0; j--)
			{
				if ((listOfNames.charAt(j) == '_') || (listOfNames.charAt(j) == ' ') || (listOfNames.charAt(j) == ',')|| (listOfNames.charAt(j) == ';'))
				{
					listOfNames = listOfNames.substring(0, listOfNames.length -1);
					j = listOfNames.length;
				}
				else{
					j = -1;
				}
			}
			
			//parse all game info by "_"
			var gameStringArray = listOfNames.split('_');
			//convert the last 3 of each array into integers
			gameStringArray[gameStringArray.length-3] = parseInt(gameStringArray[gameStringArray.length-3]);
			gameStringArray[gameStringArray.length-2] = parseInt(gameStringArray[gameStringArray.length-2]);
			gameStringArray[gameStringArray.length-1] = parseInt(gameStringArray[gameStringArray.length-1]);
			currentGame = new Game(gameStringArray[0], gameStringArray[1], gameStringArray[2], gameStringArray[3], gameStringArray[4]);
		default:
			readCookie(1);
			readCookie(2);
			readCookie(3);
			break;
	
	}
    return "";
} 

function deleteCookie(numb)
{
	switch(numb)
	{
		case 1:
			document.cookie = "cookie1=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
			break;
		case 2:
			document.cookie = "cookie2=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
			break;
		case 3:
			document.cookie = "cookie3=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
			break;
		default:
			deleteCookie(1);
			deleteCookie(2);
			deleteCookie(3);
			break;
	}
}

function factoryReset()
{
	clearGames();
	clearPlayers();
	deleteCookie(0);
}

function play()
{
	readCookie(0);
	if(players.length < 1)
	{
		loadPage(1);
	}
	if (games.length < 1)
	{
		loadPage(2);
	}
	currentGame = getGame();
	writeCookie(4);
	assignPlayers(currentGame);

	var text = "";
	for (var i = 0; i < currentPlayers.length; i++)
	{
		text = text + currentPlayers[i] + "<br/>";
	}
	
	document.getElementById("gameTitle").innerHTML = currentGame.title;
	document.getElementById("players").innerHTML = text;
	document.getElementById("gameRules").innerHTML = currentGame.rules;

}

function timer()
{
	readCookie(4);
	minutes = currentGame.timeLimit;
	if (!minutes){
		minutes = 1;
	}
	seconds = 0;
	document.getElementById("timer").innerHTML = minutes + ":00";
	var countdown = setInterval( function(){timerCount()}, 1000 );
	//document.getElementById("message").innerHTML = "TIME REMAINING:";
}
function timerCount()
{
		seconds--;
	
		if (seconds < 0)
		{
			minutes--;
			seconds = 59;
		}
		if (seconds > 9){
			document.getElementById("timer").innerHTML = minutes + ":" + seconds;
		}else{
			document.getElementById("timer").innerHTML = minutes + ":0" + seconds;
		}
		if (minutes < 0)
		{
			//clearInterval(countdown);
			loadPage(0);
		}
}



-->