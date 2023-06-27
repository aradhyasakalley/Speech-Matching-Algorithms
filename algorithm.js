
//function to compare text 
function compareText(actualText, textSnippet) {

    //splitting the text variables into arrays
    const actualTextArray = actualText.split(' ');
    const textSnippetArray = textSnippet.split(' ');
  
    //pointers to iterate over actual text and the text snippet 
    let atp = 0;
    let tsp = 0;
    //variable to store the match score
    let score = 0;
    //arrays to store matched,missed and extra words
    let missedWords = [];
    let extraWords = [];
    let matchedWords = [];

    while (tsp < textSnippetArray.length && atp < actualTextArray.length) {
      if (actualTextArray[atp].includes(textSnippetArray[tsp])) {
        //case of perfect index match

        matchedWords.push(actualTextArray[atp]);
        atp++;
        tsp++;
        score++;


      } else {
        let foundMatch = false;
        for (let i = atp + 1; i < Math.min(atp + 5, actualTextArray.length); i++) {
          //checking the next 5 words or so for the word spoken
          if (actualTextArray[i].includes(textSnippetArray[tsp])) {
            missedWords.push(actualTextArray[atp]);
            atp++;
            foundMatch = true;
            break;
          }
        }

        if (!foundMatch) {
          //if not found then added to extra words
          extraWords.push(textSnippetArray[tsp]);
          tsp++;
        }
      }
    }
  
    
    console.log('Matched words:', matchedWords);
    console.log('Extra words:', extraWords);
    console.log('Missed words:', missedWords);
    console.log('Match score: ',score);
  }
  
  //example text for testing
  const actualText = "I ate the red apple";
  const textSnippet = "I eight ate the extra red extra apple";
  console.log('Actual Text: ',actualText);
  console.log('Text detected: ',textSnippet);
  
  compareText(actualText, textSnippet);
  