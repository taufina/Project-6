/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 // Adding a phrase Class, through which a phrase is chosen and shown. 

class Phrase {

  // The chosen phrase's letters are shown in lower case.
    constructor(phrase) {
      this.phrase = phrase.toLowerCase();
    }

    
    /*
    This methods splits the phrase into separates letters and creates an array of letters.
    It creates li elements inside ul element.  These li elements holds the letters. 
    The class of each li element is set depending on what it is.
    */
    addPhraseToDisplay(){

      let ul = document.querySelector('#phrase ul');
      ul.innerHTML = "";
      const splittingPhrase = this.phrase.split('');

      splittingPhrase.forEach(phraseLetter => {
        const liElement = document.createElement('li');
        ul.appendChild(liElement);
        if(phraseLetter===" "){
          liElement.setAttribute("class", "space");
        } else {
          liElement.innerHTML = phraseLetter;
          liElement.setAttribute("class", `hide letter ${phraseLetter}`);
        }
      });   
    };

    /*
    This methods checks to see if the letter is in the phrase or not.
    If the letter is there, then the letters are shown.
    */

  checkLetter(inputLetter){
      if(this.phrase.indexOf(inputLetter) > -1){
        return true;
      } else { return false;}
      
  };

  showMatchedLetter(phraseLetter){
    $(`.letter.${phraseLetter}`).removeClass('hide').addClass('show');

  };
}
