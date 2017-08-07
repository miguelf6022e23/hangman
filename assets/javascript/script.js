
function init(){
	var games = ["Mortal Kombat Trilogy","Bomberman 64","Resident Evil 2","Star Wars: Shadows of the Empire","Pokemon Snap", "Kirby 64: The Crystal Shards", "Mario Tennis", "Yoshi Story", "Star Wars: Rogue Squadron", "Diddy Kong Racing", "Banjo-Tooie", "Mario Party", "Perfect Dark", "Pokemon Stadium", "Banjo-Kazooie", "Paper Mario", "Donkey Kong 64", "Star Fox 64", "Mario Kart 64", "Legend of Zelda: Majora's Mask", "Golden Eye 007", "Super Mario 64", "Super Smash Bros", "The Legend of Zelda: Ocarina of Time"];

	var game = games[Math.floor(Math.random()*games.length)];
			var gameLow = game.toLowerCase();
			var a = isLetter(gameLow,true,false);
			var gameSimp = "";
			for (i=0;i<a.length; i++){
				if(a[i]){
					gameSimp = gameSimp + gameLow.charAt(i);
				}
			}
			return [game, gameSimp];
}

var strs = init();
var state = {
	lives: 10,
	gameName: strs[0],
	gameSimp: strs[1],
	solved: isLetter(strs[1],false,true),
	guesses:[],

	play: function(letter){
		if (this.guesses.includes(letter)){
			alert("Already used that letter!");
		}else if (this.gameSimp.includes(letter)){
			for (i=0;i<this.gameSimp.length;i++){
				if (this.gameSimp.charAt(i) ==letter){
					this.solved[i] = true;
				}
			}
			this.guesses.push(letter);
		} else {
			this.lives = this.lives-1;
			this.guesses.push(letter);
		}
		this.disp();
		if (this.lives==0){
			alert("you lost!");
		} else if (!this.solved.includes(false)){
			alert("you won!");
		}
	},

	disp: function(){
		console.log(this.solved);
		var curr = "";
		// display word with blanks
		for (i=0;i<this.gameSimp.length;i++){
			if (this.gameSimp.charAt(i) === ' '){
				curr = curr + '&nbsp; &nbsp;'
			} else if (this.solved[i]){
				curr = curr + this.gameSimp.charAt(i);
				console.log('yes!');
			} else {
				curr = curr + " _"
			}
		}
			console.log(curr)
		var top = document.getElementById("word");
		top.innerHTML = curr;

		// display number of lives
		var livesHTML = "";
		for (i=0;i<this.lives;i++){
			livesHTML = livesHTML +'<img src="assets/images/heart.png" class="icon" alt="heart">';
		}
		document.getElementById("lives").innerHTML = livesHTML;

		// display letters that have been guessed
		var guessesHTML = "";
		for (i=0; i<this.guesses.length; i++){
			guessesHTML = guessesHTML+" "+this.guesses[i];
		}
		document.getElementById("guess").innerHTML = guessesHTML;
	},

};
console.log(state)

function isLetter(str,sp,invert){
	var a = new Array(str.length);
	var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	for (var j = 0; j<str.length;j++){
		if (invert){
			a[j] = !(alphabet.includes(str.charAt(j)) || (str.charAt(j) === ' ' && sp));
		}else{
			a[j] = alphabet.includes(str.charAt(j)) || (str.charAt(j) === ' ' && sp);
		}
		
	}
	return a
}