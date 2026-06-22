/**
 * 全店舗請求書更新
 */
function updateAllInvoices() {
  updateBillingPeriod();
  updateStoreA();
  updateStoreB();
  updateMultiStoreInvoice();

  SpreadsheetApp.getUi().alert(
    "全店舗の請求書更新が完了しました。"
  );
}

/**
 * サンプル商品コード
 */
const PRODUCTS = [
  "PRODUCT001",
  "PRODUCT002",
  "PRODUCT003",
  "PRODUCT004"
];

/**
 * 請求対象期間更新
 */
function updateBillingPeriod() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getSheetByName("入力シート");
  const period = sourceSheet.getRange("B2").getDisplayValue();

  const invoiceSheets = [
    "店舗A請求書",
    "店舗B請求書"
  ];

  invoiceSheets.forEach(name => {
    const sheet = ss.getSheetByName(name);
    if (sheet) {
      sheet.getRange("B5").setValue(period);
    }
  });
}

/**
 * 商品コード＋店舗コードから
 * 対象数量を取得
 */
function getStoreValue(
  sourceData,
  storeCode,
  productCode
) {
  for (let row = 0; row < sourceData.length; row++) {
    const currentStore = String(sourceData[row][0]);
    const currentProduct = String(sourceData[row][1]);

    if (
      currentStore === storeCode &&
      currentProduct === productCode
    ) {
      return sourceData[row][2];
    }
  }
  return 0;
}

/**
 * 店舗A請求書更新
 */
function updateStoreA() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getSheetByName("入力シート");
  const invoiceSheet = ss.getSheetByName("店舗A請求書");
  const sourceData = sourceSheet.getDataRange().getValues();

  PRODUCTS.forEach((code, index) => {
    const quantity = getStoreValue(
      sourceData,
      "STORE_A",
      code
    );
    invoiceSheet
      .getRange(index + 10, 3)
      .setValue(quantity);
  });
}

/**
 * 店舗B請求書更新
 */
function updateStoreB() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getSheetByName("入力シート");
  const invoiceSheet = ss.getSheetByName("店舗B請求書");
  const sourceData = sourceSheet.getDataRange().getValues();

  PRODUCTS.forEach((code, index) => {
    const quantity = getStoreValue(
      sourceData,
      "STORE_B",
      code
    );
    invoiceSheet
      .getRange(index + 10, 3)
      .setValue(quantity);
  });
}

/**
 * 複数店舗請求書更新
 */
function updateMultiStoreInvoice() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getSheetByName("入力シート");
  const targetSheet = ss.getSheetByName("集約請求書");
  const sourceData = sourceSheet.getDataRange().getValues();

  const stores = [
    "STORE_A",
    "STORE_B",
    "STORE_C"
  ];

  stores.forEach((storeCode, colIndex) => {
    PRODUCTS.forEach((productCode, rowIndex) => {
      const value = getStoreValue(
        sourceData,
        storeCode,
        productCode
      );
      targetSheet
        .getRange(
          rowIndex + 5,
          colIndex + 2
        )
        .setValue(value);
    });
  });
}
