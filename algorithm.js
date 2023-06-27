function compareText(actualText, textSnippet) {
    const actualTextArray = actualText.split(' ');
    const textSnippetArray = textSnippet.split(' ');

    let atp = 0;
    let tsp = 0;
    let missedWords = [];
    let extraWords = [];
    let matchedWords = [];

    while (tsp < textSnippetArray.length) {
        if (actualTextArray[atp].includes(textSnippetArray[tsp])) {
            matchedWords.push(actualTextArray[atp]);
            atp++;
            tsp++;
        } else {
            for (let i = atp + 1 ; i < Math.min(atp + 5, actualTextArray.length); i++) {
                if (actualTextArray[i].includes(textSnippetArray[tsp])) {
                    missedWords.push(textSnippetArray[tsp]);
                } else {
                    extraWords.push(textSnippetArray[tsp]);
                }
            }
        }
    }

    console.log('Matched words:', matchedWords);
    console.log('Extra words:', extraWords);
    console.log('Missed words:', missedWords);
}

const actualText = "I ate the red apple";
const textSnippet = "I extra the red apple";

compareText(actualText, textSnippet);
