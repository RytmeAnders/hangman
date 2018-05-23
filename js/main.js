var Main = {};
Main.WordArray = []; //Contains letters for the chosen word
Main.WordUArray = []; //Underline array

Main.Lives = 6;
Main.NumInWordBank = Words.Length;

Main.Word = "test"
Main.WordU = ""; //Word that gets displayed

//For turn based
Main.turn = true;
Main.p1 = 0;
Main.p2 = 0;

//Functions
Main.PullWord = function(){
    Main.Word = Words.List[(Math.floor(Math.random()*Main.NumInWordBank))] //Random number between 0 and word array length (5) now
}

Main.SetUnderline = function(){
    Main.PullWord(); //Gets new word
    for(var i=0; i<Main.Word.length; i++){
        Main.WordArray[i] = Main.Word.charAt(i);
        Main.WordUArray[i] = "_" //The word being displayed is automatically underlined
    }
    Main.WordU = Main.WordUArray.join(" ")
    document.getElementById("WORD").innerHTML = Main.WordU;
    document.getElementById("numLetters").innerHTML = Main.Word.length;
}

Main.Draw = function(){
    var ctx = document.getElementById("hangman").getContext('2d');
        ctx.fillStyle = "white";
        ctx.lineWidth=3;
        ctx.fillRect(0, 0, 300, 300);
        ctx.beginPath(); //vertical bar
            ctx.moveTo(50,270);
            ctx.lineTo(50,25);
            ctx.stroke();
        ctx.beginPath(); //horizontal bar
            ctx.moveTo(49,25);
            ctx.lineTo(175,25);
            ctx.stroke();
        ctx.beginPath(); //Cross bar
            ctx.moveTo(50,80);
            ctx.lineTo(100,25);
            ctx.stroke();
        ctx.beginPath(); //Ground
            ctx.moveTo(35,270);
            ctx.lineTo(265,270);
            ctx.stroke();
        ctx.beginPath(); //Rope
            ctx.moveTo(150,25);
            ctx.lineTo(150,80);
            ctx.stroke();
    var ctx = document.getElementById("container").getContext('2d');
        ctx.fillStyle = "white";
        ctx.lineWidth=3;
        ctx.fillRect(0, 0, 300, 300);
        ctx.beginPath(); //vertical bar
            ctx.moveTo(50,270);
            ctx.lineTo(50,25);
            ctx.stroke();
        ctx.beginPath(); //horizontal bar
            ctx.moveTo(49,25);
            ctx.lineTo(175,25);
            ctx.stroke();
        ctx.beginPath(); //Cross bar
            ctx.moveTo(50,80);
            ctx.lineTo(100,25);
            ctx.stroke();
        ctx.beginPath(); //Ground
            ctx.moveTo(35,270);
            ctx.lineTo(265,270);
            ctx.stroke();
        ctx.beginPath(); //Rope
            ctx.moveTo(150,25);
            ctx.lineTo(150,80);
            ctx.stroke();
}

Main.Hang = function(lives){
    var ctx = document.getElementById("hangman").getContext('2d');
    switch(lives){
        case 5:
            ctx.beginPath(); //head
                ctx.arc(150, 100, 20, 0, 2*Math.PI);
                ctx.stroke();
            ctx.beginPath(); //left eye
                ctx.arc(143, 95, 3.5, 0, 2*Math.PI);
                ctx.stroke();
            ctx.beginPath(); //right eye
                ctx.arc(157, 95, 3.5, 0, 2*Math.PI);
                ctx.stroke();
            ctx.beginPath(); //mouth
                ctx.arc(150, 103, 9, 0, Math.PI);
                ctx.stroke();
            break;
        case 4:
            ctx.beginPath(); //body
                ctx.moveTo(150,120);
                ctx.lineTo(150,190);
                ctx.stroke();
            break;
        case 3:
            ctx.fillStyle = "white";
            ctx.fillRect(138, 102, 24, 12); //cover mouth
            ctx.beginPath(); //straight mouth
                ctx.moveTo(140,108);
                ctx.lineTo(160,108);
                ctx.stroke();
            ctx.beginPath(); //right arm
                ctx.moveTo(150,135);
                ctx.lineTo(180,160);
                ctx.stroke();
            break;
        case 2:
            ctx.beginPath(); //left arm
                ctx.moveTo(150,135);
                ctx.lineTo(120,160);
                ctx.stroke();
            break;
        case 1:
            ctx.fillRect(138, 102, 24, 12); //cover mouth
            ctx.beginPath(); //sad mouth
                ctx.arc(150, 112, 9, 0, Math.PI, true);
                ctx.stroke();
            ctx.beginPath(); //right leg
                ctx.moveTo(149,188);
                ctx.lineTo(180,230);
                ctx.stroke();
            ctx.beginPath(); //left leg
                ctx.moveTo(151,188);
                ctx.lineTo(120,230);
                ctx.stroke();
            break;
    }
}

Main.DisplayCurrentPlayer = function(){
    document.getElementById("lives").innerHTML = Main.Lives; //Initialize correct amount of lives
    if(Main.turn){
        document.getElementById("currentPlayer").innerHTML = "PLAYER 1"
    }
    if(!Main.turn)
        document.getElementById("currentPlayer").innerHTML = "PLAYER 2"
}

Main.GivePoint = function(p){ //Currently a bool since only 2 players
    //Give point to a player
    if(p){
        Main.p1 = Main.p1 + 1;
        document.getElementById("p1Points").innerHTML = Main.p1;
    }
    if(!p){
        Main.p2 = Main.p2 + 1;
        document.getElementById("p2Points").innerHTML = Main.p2;
    }
}

Main.CheckWinner = function(){
    //Create two strings for comparison in win condition
    Main.Word1 = Main.WordArray.join("");
    Main.Word2 = Main.WordUArray.join("");
    
    //Check if the guess is equal to the word
    if(Main.Word1 == Main.Word2){
        if(Main.p1 > Main.p2){
            alert("Player 1 wins! Loading a new word");
        }
        if(Main.p2 > Main.p1){
            alert("Player 2 wins! Loading a new word");
        }
        if(Main.p1 == Main.p2){
            alert("We have a tie! Loading a new word");
        }
        window.location.reload(); //Reload the page 
    }
}

Main.CheckWrong = function(letter){
    //Check if wrong (check if changes were made)
    if(Main.Changes < 1){
        Main.Lives -= 1;
        document.getElementById("lives").innerHTML = Main.Lives;
        document.getElementById(letter).classList.add("wrong")
        if(Main.Lives > 0){ //So that it doesn't pass the turn if you are dead
            alert("You guessed wrong! Next players turn!")
            Main.turn = !Main.turn;
            Main.DisplayCurrentPlayer();
            Main.Hang(Main.Lives);
        }
    }
    
    //Check if you have lives left
    if(Main.Lives < 1){
        document.getElementById("WORD").innerHTML = Main.Word1;
        alert("You have run out of lives! Please try again!");
        window.location.reload();
    }
}

Main.UpdateLetter = function(letter){
    Main.Changes = 0;
    //Check if letter exists, then update the arrays
    for(var i=0; i<Main.Word.length; i++){
        Main.WordArray[i] = Main.Word.charAt(i);
        if(Main.Word.charAt(i) == letter){
            Main.WordUArray[i] = letter;
            Main.Changes += 1;
            document.getElementById(letter).classList.add("correct")
            Main.GivePoint(Main.turn)
        }
    }
    
    //Update the displayed word
    Main.WordU = Main.WordUArray.join(" ");
    document.getElementById("WORD").innerHTML = Main.WordU;
    
    Main.CheckWrong(letter);
    Main.CheckWinner();
}

//Setup
Main.PullWord();
Main.SetUnderline();
Main.DisplayCurrentPlayer();
Main.Draw();