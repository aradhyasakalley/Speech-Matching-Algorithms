let actualText = 'Hello there how are you hope you are doing well';

function sliceActualText(text, spokenTextLength) {
  const actualTextArray = text.split(' ');
  const leftSlice = actualTextArray.slice(0, spokenTextLength).join(' ');
  const rightSlice = actualTextArray.slice(spokenTextLength).join(' ');
  console.log('Left slice:', leftSlice);
  console.log('Right slice:', rightSlice);
  actualText = rightSlice; 
}

sliceActualText(actualText, 3);
console.log(actualText);
sliceActualText(actualText, 2);
