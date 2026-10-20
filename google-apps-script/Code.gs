/**
 * ระบบติดตามตัวชี้วัด กพร. ประจำปีงบประมาณ พ.ศ. 2570
 * Google Apps Script Backend API
 * เชื่อมต่อกับ Google Sheet: 1Lro8WK25uexe97cFHHedqC5iu2B65VyfiQ2AWUXyIUw
 */

const SPREADSHEET_ID = '1Lro8WK25uexe97cFHHedqC5iu2B65VyfiQ2AWUXyIUw';
const SHEET_NAME = 'KPI_2570';
const HEADERS = [
  'id',
  'code',
  'name',
  'dimension',
  'unit',
  'weight',
  'target',
  'actual',
  'polarity',
  'level1',
  'level2',
  'level3',
  'level4',
  'level5',
  'owner',
  'evidenceUrl',
  'evidenceName',
  'note',
  'updatedAt'
];

function getOrCreateSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.setName(SHEET_NAME);
    } else {
      sheet = ss.insertSheet(SHEET_NAME);
    }
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#0d162d')
      .setFontColor('#00f2fe');
  }
  return sheet;
}

function readAllRows() {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  const headers = data[0].map(String);
  const items = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[0] && !row[1] && !row[2]) continue;
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = row[idx];
    });
    items.push(obj);
  }
  return items;
}

function writeAllRows(items) {
  const sheet = getOrCreateSheet();
  sheet.clearContents();
  const matrix = [HEADERS];
  items.forEach(item => {
    matrix.push(HEADERS.map(h => (item[h] !== undefined && item[h] !== null) ? item[h] : ''));
  });
  sheet.getRange(1, 1, matrix.length, HEADERS.length).setValues(matrix);
  return items.length;
}

function doGet(e) {
  try {
    const items = readAllRows();
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', spreadsheetId: SPREADSHEET_ID, data: items }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;
    let items = readAllRows();

    if (action === 'replaceAll') {
      const newItems = Array.isArray(payload.items) ? payload.items : [];
      writeAllRows(newItems);
      items = newItems;
    } else if (action === 'upsert') {
      const item = payload.item;
      const idx = items.findIndex(x => String(x.id) === String(item.id));
      if (idx >= 0) {
        items[idx] = item;
      } else {
        items.push(item);
      }
      writeAllRows(items);
    } else if (action === 'delete') {
      const id = String(payload.id);
      items = items.filter(x => String(x.id) !== id);
      writeAllRows(items);
    } else if (action === 'uploadFile') {
      const folderName = 'KPI_2570_Evidence_Files';
      const folders = DriveApp.getFoldersByName(folderName);
      const folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
      const bytes = Utilities.base64Decode(payload.base64Data);
      const blob = Utilities.newBlob(bytes, payload.mimeType || 'application/octet-stream', payload.fileName);
      const file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      const fileUrl = file.getUrl();

      if (payload.kpiId) {
        const idx = items.findIndex(x => String(x.id) === String(payload.kpiId));
        if (idx >= 0) {
          items[idx].evidenceUrl = fileUrl;
          items[idx].evidenceName = payload.fileName;
          items[idx].updatedAt = new Date().toISOString();
          writeAllRows(items);
        }
      }

      return ContentService
        .createTextOutput(JSON.stringify({ status: 'ok', fileUrl: fileUrl, fileName: payload.fileName, data: items }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', data: items }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
