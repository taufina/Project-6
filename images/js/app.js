/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */


 /*
    When the "Start Game" is clicked, a new game starts (the game class is called again).
 */


let game;

$("#btn__reset").on("click", function(){
    game = new Game();
    game.startGame();

});

 /*
    when keys are clicked, the handleInteraction method is fired.
 */

$(".key").on("click", function(e){

    game.handleInteraction(e);

});