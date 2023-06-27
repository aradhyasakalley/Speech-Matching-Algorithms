function compareText(actualText, textSnippet) {
    const actualTextArray = actualText.split(' ');
    const textSnippetArray = textSnippet.split(' ');
  
    let atp = 0;
    let tsp = 0;
    let score = 0;
    let missedWords = [];
    let extraWords = [];
    let matchedWords = [];
  
    while (tsp < textSnippetArray.length && atp < actualTextArray.length) {
      if (actualTextArray[atp].includes(textSnippetArray[tsp])) {
        matchedWords.push(actualTextArray[atp]);
        atp++;
        tsp++;
        score++;
      } else {
        let foundMatch = false;
        for (let i = atp + 1; i < Math.min(atp + 5, actualTextArray.length); i++) {
          if (actualTextArray[i].includes(textSnippetArray[tsp])) {
            missedWords.push(actualTextArray[atp]);
            atp++;
            foundMatch = true;
            break;
          }
        }
        if (!foundMatch) {
          extraWords.push(textSnippetArray[tsp]);
          tsp++;
        }
      }
    }
  
    while (tsp < textSnippetArray.length) {
      extraWords.push(textSnippetArray[tsp]);
      tsp++;
    }
  
    while (atp < actualTextArray.length) {
      missedWords.push(actualTextArray[atp]);
      atp++;
    }
    
    console.log('Matched words:', matchedWords);
    console.log('Extra words:', extraWords);
    console.log('Missed words:', missedWords);
    console.log('Match score: ',score);
  }
  
  const actualText = "I ate the red apple";
  const textSnippet = "I eight the red apple";
  console.log('Actual Text: ',actualText);
  console.log('Text detected: ',textSnippet);
  
  compareText(actualText, textSnippet);
  