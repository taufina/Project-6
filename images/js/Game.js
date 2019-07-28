/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

// Adding a Game class.
class Game {

  // Creating a constructor.
    constructor() {

    // In the beginning number of missed is set to 0, because the game didn't begin yet.
      this.missed = 0;

    // An array of phrases.
      this.phrases = [
          new Phrase('A piece of cake'),
          new Phrase('Break a leg'),
          new Phrase('The best of both worlds'),
          new Phrase('No pain no gain'), 
          new Phrase('To hit the nail on the head')];

    /* 
    This is the current phrase object that is being used.  It is set to null.  Then in startGame() method
    it will be set to the random phrase that we will get by calling the getRandomPhrase() method.
    */
      this.activePhrase = null;
    }

    /* 
    Through this method, a random phrase gets chosen from the array for the game.  
    */

    getRandomPhrase(){
        const randomNumber = Math.floor(Math.random()*(this.phrases.length));
        console.log(this.phrases[randomNumber]);
        return this.phrases[randomNumber];    
    };


    /* 
    In this method, we are hiding the overlay.  
    We are setting the activePhrase to equal to the random phrase that was chosen.
    Then we are calling the addPhraseToDisplay method which displays it on the board.
    */

    
    startGame(){
     
      $("#overlay").hide();
      this.activePhrase = this.getRandomPhrase();
      this.activePhrase.addPhraseToDisplay();
      
    };

    /*
    The activePhrase (the chosen phrase) is getting checked against the letter that is being clicked.
    If the letter clicked matches with a letter from the phrase:
      - the letter is revealed in the displayed phrase.
      - the button gets disabled, and changes color.
      - the checkForWin method is called to see if the game was won.
    If the letter clicked does not match with the letter from the phrase:
      - then the button is disabled, and turns a different color.
      - a life is removed (a heart turns gray).
    */

    handleInteraction(e){

      if (this.activePhrase.checkLetter(e.target.textContent)){

        this.activePhrase.showMatchedLetter(e.target.textContent);
        $(e.target).addClass("chosen").attr("disabled", true);
        this.checkForWin();
        console.log($(this));
        
      } else {

        $(e.target).addClass("wrong").attr("disabled", true);
        this.removeLife();

      }
    };


    /*
    This method removes a life everytime an incorrect letter is clicked.
    Once the player has five missed guesses, the last heart is removed and the game is lost.
    gameOver method is called, which shows the "You Lose" page.
    
    */

    removeLife(){
      this.missed +=1;
      
      if(this.missed<=5){
        $('.tries [src="images/liveHeart.png"]:first').attr("src","images/lostHeart.png");
      }
      
      if(this.missed===5){
        console.log("call game over");
        this.gameOver(false);
      }

    };


    /*
    This method checks to see if the game is won.  Once all the hidden letters are shown, the game is won.
    gameOver method is called, which displays the "You Win" message.
    */
    checkForWin(){
      let lettersLeft = $(".hide");

      if (lettersLeft.length===0){
        this.gameOver(true);
      }

    };

 
    /*
    This method shows the gameover page.  If the game is won, winning page is shown, and the "You win!!!" message is displayed.   
    If the game is lost, the lose page is shown, and the "You lose!!!" message is displayed.   
    The reset method is called, which resets all the hearts and deactivated buttons.
    */

    gameOver(gameWon){
      
      $("#overlay").show();

      console.log("game over called, game won: "+gameWon);
      if(gameWon){
        console.log("game won");
        $("#overlay h1").text("You win!!!");
        $(".start").removeClass("lose").addClass("win");
      }else{
        console.log("game lost");
        $("#overlay h1").text("You lost.  Better luck next time!");
        $(".start").removeClass("win").addClass("lose");
      }

      this.reset();

    };

    /*
    This method restores all the hearts.  
    It removes the displayed phrase, so that a new phrase can be chosen.
    It enables all the disabled keys so the colors is back to the original color.
    */

    reset (){
      $('.tries [src="images/lostHeart.png"]').attr("src","images/liveHeart.png");
      $("#phrase ul").html("");
      $(".key").removeClass("chosen").removeClass("wrong").removeAttr("disabled");
    }
  }