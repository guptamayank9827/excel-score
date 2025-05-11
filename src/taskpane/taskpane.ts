export function getScoresFromText(text: string):number[] {
  let scores = text.split("\n")
    .filter(line => /^\d+\s+\d+\s+\d+$/.test(line))
    .map(line => {
      const parts = line.split(/\s+/); // split on one or more spaces
      return parseInt(parts[1]);       // extract middle column (Points Scored)
    });

  return scores;
}

export async function getStartRowNumber(context, sheet, startColumnChar) {
  let rowNumber = 2;

  try {
    await Excel.run(async () => {
      let rangeCells = sheet.getRange(`${startColumnChar}1:${startColumnChar}100`);
      rangeCells.load("values");
      await context.sync();

      let rangeValues = rangeCells.values;

      for(let i = 0; i < rangeValues.length; i++) {
        if(rangeValues[i][0] === "" || rangeValues[i][0].length == 0) {
          rowNumber = i+1;
          break;
        }
      }
    });
  }
  catch(error) {
    console.log("Error: " + error);
  }
  finally {
    return rowNumber;
  }
}

export async function insertText(text: string, startColumnChar: string) {
  // Write text to the top left cell.
  try {
    await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet();

      let rowNumber = await getStartRowNumber(context, sheet, startColumnChar);

      let scores = getScoresFromText(text);

      let n = scores.length;
      let endColumnChar = String.fromCharCode(startColumnChar.charCodeAt(0) + n-1);

      let startCell = `${startColumnChar}${rowNumber}`;
      let endCell = `${endColumnChar}${rowNumber}`;

      const range = sheet.getRange(`${startCell}:${endCell}`);
      range.values = [scores];
      range.format.autofitColumns();

      await context.sync();
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}
