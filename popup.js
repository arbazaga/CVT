// Global variables
let inputData;
let outputData = [];

// Add event listener to start processing button
document.getElementById('startProcessing').addEventListener('click', async () => {
  // Change button text to "Processing..."
  document.getElementById('startProcessing').textContent = 'Processing...';

  // Get input file
  const inputFile = document.getElementById('fileInput').files[0];

  // Read input Excel file
  inputData = await readExcelFile(inputFile);

  // Process each row
  for (const row of inputData) {
    // Get ASIN and strings
    const asin = row['ASIN'];
    delete row['ASIN'];
    const strings = Object.values(row);

    // Check strings and color code row
    const coloredRow = await checkAndColorStrings(asin, strings);

    // Add colored row to output
    outputData.push(coloredRow);
  }

  // Download output Excel file
  downloadExcelFile(outputData);
});

// Helper functions

async function readExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const headers = rows.shift();
      const result = rows.map((row) => {
        const obj = {};
        row.forEach((cell, index) => {
          obj[headers[index]] = cell;
        });
        return obj;
      });
      resolve(result);
    };
    reader.onerror = (e) => {
      reject(e);
    };
    reader.readAsBinaryString(file);
  });
}

async function checkAndColorStrings(asin, strings) {
  // Send message to background script
  const result = await new Promise((resolve) =>
    chrome.runtime.sendMessage(
      { type: 'CHECK_STRINGS', asin, strings },
      resolve
    )
  );

  // Color strings based on result
  for (let i = 0; i < strings.length; i++) {
    if (result.isPresent[i]) {
      strings[i] = colorGreen(strings[i]);
    } else {
      strings[i] = colorRed(strings[i]);
    }
  }

  return [asin, ...strings];
}

function downloadExcelFile(data) {
  const headers = ['ASIN', ...Object.keys(data[0])];
  const rows = [headers];
  for (const row of data) {
    rows.push([row['ASIN'], ...Object.values(row)]);
  }
  const sheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
  XLSX.writeFile(workbook, 'output.xlsx');
}

function colorGreen(cell) {
  return `\\color{green}{${cell}}`;
}

function colorRed(cell) {
  return `\\color{red}{${cell}}`;
}
