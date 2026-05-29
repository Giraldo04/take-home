/**
 * Backend del take-home: Google Sheets como base de datos + Apps Script como API.
 *
 * Hojas esperadas en el Spreadsheet:
 *   "Products": id | name | description | price | image | category   (con encabezados)
 *   "Orders":   fecha | nombre | email | notas | items_json | total  (se llena solo)
 *
 * Deploy: Implementar > Nueva implementación > Aplicación web
 *   - Ejecutar como: Yo
 *   - Quién tiene acceso: Cualquiera
 *   Copia la URL /exec en PUBLIC_APPS_SCRIPT_URL del frontend.
 *   Importante: tras cada cambio, crea una NUEVA versión de la implementación.
 */

function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Products');
  var values = sheet.getDataRange().getValues();
  var headers = values.shift();

  var products = values
    .filter(function (row) {
      return row[0] !== '';
    })
    .map(function (row) {
      var obj = {};
      headers.forEach(function (h, i) {
        obj[h] = row[i];
      });
      obj.price = Number(obj.price);
      return obj;
    });

  return json(products);
}

function doPost(e) {
  try {
    var order = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Orders');

    sheet.appendRow([
      new Date(),
      order.customer ? order.customer.name : '',
      order.customer ? order.customer.email : '',
      order.customer ? order.customer.notes : '',
      JSON.stringify(order.items),
      order.total,
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
