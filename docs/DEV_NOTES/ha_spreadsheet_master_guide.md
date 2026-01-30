# Home Assistant → Google Sheets Master Integration Guide

A full end-to-end system for managing Home Assistant registries in Google
Sheets. Includes export, auto-import, and YAML/script generation.

---

## 🧾 1. Export Script — Raw CSV Dumps (with Floors + Web Exposure)

**File:** `/config/ha_updater.sh`

Exports all Home Assistant registries — including Floors — into web-accessible
CSVs.

```bash
#!/bin/bash
# Home Assistant Raw Registry Export Script with Floors + Web Exposure

OUT="/config/www/ha_exports"
HA_URL="${HA_URL:-yzcm6icwt327ovrlkovlq6vvtbrwxk6j.ui.nabu.casa}/local/ha_exports"
mkdir -p "$OUT"
cd /config/.storage || {
  echo "❌ .storage not found"
  exit 1
}

echo "🔹 Exporting entities..."
jq -r '
  .data.entities[]
  | [
      .entity_id,
      .device_id,
      .platform,
      .name,
      .original_name,
      .disabled_by,
      .hidden_by,
      (.labels // [] | join(";")),
      .area_id
    ]
  | @csv
' core.entity_registry > "$OUT/ha_entities_raw.csv"

echo "🔹 Exporting devices..."
jq -r '
  .data.devices[]
  | [
      .id,
      (.name_by_user // .name // ""),
      .manufacturer,
      .model,
      .area_id,
      .via_device_id,
      (.entry_type // ""),
      (.disabled_by // "")
    ]
  | @csv
' core.device_registry > "$OUT/ha_devices_raw.csv"

echo "🔹 Exporting areas..."
jq -r '
  .data.areas[]
  | [
      .id,
      .name,
      (
        if (.aliases | type) == "array" then
          (.aliases | join(";"))
        else
          (.aliases // "")
        end
      ),
      (.floor_id // "")
    ]
  | @csv
' core.area_registry > "$OUT/ha_areas_raw.csv"

echo "🔹 Exporting labels..."
if [ -f core.label_registry ]; then
  jq -r '
    .data.labels[]
    | [
        .label_id,
        .name,
        (.color // ""),
        (.icon // ""),
        (.description // ""),
        (.created_at // ""),
        (.modified_at // "")
      ]
    | @csv
  ' core.label_registry > "$OUT/ha_labels_raw.csv"
else
  echo "⚠️ No label registry found; skipping label export."
fi

echo "🔹 Exporting floors..."
if [ -f core.floor_registry ]; then
  jq -r '
    .data.floors[]
    | [
        .id,
        .name,
        (.aliases // [] | join(";")),
        (.level // "")
      ]
    | @csv
  ' core.floor_registry > "$OUT/ha_floors_raw.csv"
  echo "✅ Floors exported to ha_floors_raw.csv"
else
  echo "⚠️ No floor registry found; skipping floors export."
fi

echo "✅ Raw registry exports complete:"
ls -1 "$OUT"/ha_*_raw.csv

echo "📂 Access your exports at:"
echo "🔹  http://$HA_URL/ha_entities_raw.csv"
echo "🔹  http://$HA_URL/ha_devices_raw.csv"
echo "🔹  http://$HA_URL/ha_areas_raw.csv"
echo "🔹  http://$HA_URL/ha_labels_raw.csv"
echo "🔹  http://$HA_URL/ha_floors_raw.csv"
```

**Outputs:**

- `ha_entities_raw.csv`
- `ha_devices_raw.csv`
- `ha_areas_raw.csv`
- `ha_labels_raw.csv`
- `ha_floors_raw.csv`

Each sheet corresponds to its respective registry in `.storage` and is hosted at
`/local/ha_exports/` for use with the Nabu Casa or internal URL system.

---

## 📊 2. Google Sheets — Structure & Derived Logic

### Source Tables (Raw Imports)

| Sheet          | File                 | Key       | Columns                                                                                      |
| -------------- | -------------------- | --------- | -------------------------------------------------------------------------------------------- |
| Entities (raw) | ha_entities_raw\.csv | entity_id | entity_id, device_id, platform, name, original_name, disabled_by, hidden_by, labels, area_id |
| Devices (raw)  | ha_devices_raw\.csv  | id        | id, name_by_user/name, manufacturer, model, area_id, via_device_id, entry_type, disabled_by  |
| Areas (raw)    | ha_areas_raw\.csv    | id        | id, name, aliases                                                                            |
| Labels (raw)   | ha_labels_raw\.csv   | id        | id, name, color, description                                                                 |

### Derived Sheet: Entities (Derived)

Working sheet for customizing, labeling, and managing registry data.

| Col | Header        | Description                             |
| --- | ------------- | --------------------------------------- |
| A   | entity_id     | Key; imported from Entities (raw)       |
| B   | platform      | Integration/platform                    |
| C   | device_id     | Reference to device                     |
| D   | name          | Display name                            |
| E   | original_name | Original registry name                  |
| F   | area_id       | Linked area (dropdown from Areas)       |
| G   | labels        | Comma-separated labels                  |
| H   | customize     | ✅ Checkbox → Include in customize.yaml |
| I   | friendly_name | Override name                           |
| J   | icon          | e.g. mdi\:led-strip-variant             |
| K   | description   | Note or context                         |
| L   | hidden        | Checkbox → hide in HA                   |
| M   | group         | Formula → detects group/template        |

**Formula (Group column):**

```excel
=IF(OR(LEFT(A2,6)="group.",B2="group"),TRUE,FALSE)
```

**Area Dropdown:**

```excel
='Areas (raw)'!B2:B
```

---

## ⚙️ 3. Derived Exports

### A. Customize YAML Export

```excel
=ARRAYFORMULA(
 IF(A2:A="","",
  IF(H2:H=TRUE,
   "homeassistant:" & CHAR(10) &
   "  customize:" & CHAR(10) &
   "    " & A2:A & ":" & CHAR(10) &
   IF(I2:I<>"","      friendly_name: '" & I2:I & "'" & CHAR(10),"") &
   IF(J2:J<>"","      icon: " & J2:J & CHAR(10),"") &
   IF(K2:K<>"","      description: '" & K2:K & "'" & CHAR(10),"") &
   IF(L2:L=TRUE,"      hidden: true" & CHAR(10),""),
  "")
 )
)
```

### B. Bulk Label Update Script Export

```excel
=ARRAYFORMULA(
 IF(A2:A="","",
  IF(G2:G<>"",
   "- service: entity_registry.update_entity" & CHAR(10) &
   "  data:" & CHAR(10) &
   "    entity_id: " & A2:A & CHAR(10) &
   "    labels:" & CHAR(10) &
   "      - " & SUBSTITUTE(TRIM(SUBSTITUTE(G2:G,",",CHAR(10)&"      - ")),CHAR(10)&"      - "&CHAR(10),CHAR(10)),
  "")
 )
)
```

**Combine all for full YAML:**

```excel
="alias: Bulk Label Update" & CHAR(10) & "sequence:" & CHAR(10) & JOIN(CHAR(10), FILTER(N2:N, N2:N<>"")) & CHAR(10) & "mode: single"
```

### C. Bulk Area Update Script Export

```excel
=ARRAYFORMULA(
 IF(A2:A="","",
  IF(F2:F<>"",
   "- service: entity_registry.update_entity" & CHAR(10) &
   "  data:" & CHAR(10) &
   "    entity_id: " & A2:A & CHAR(10) &
   "    area_id: " & F2:F,
  "")
 )
)
```

**Join into one script:**

```excel
="alias: Bulk Area Update" & CHAR(10) & "sequence:" & CHAR(10) & JOIN(CHAR(10), FILTER(O2:O, O2:O<>"")) & CHAR(10) & "mode: single"
```

---

## 🤖 4. Google Apps Script — Auto-Importer (Nabu Casa Secure)

### Purpose

Pulls the latest HA CSV exports (via Nabu Casa) directly into Sheets with
**secure Script Properties**, **explicit logging**, **auto-creation of sheets**,
**DNS-aware errors**, and **accurate success reporting**.

### Setup

1. Open your master spreadsheet → **Extensions → Apps Script**.
2. In **Project Settings → Script Properties**, set:
   - `AUTH_TOKEN` → your long-lived token
   - `BASE_URL` → your Nabu Casa URL, e.g.
     `http://yzcm6icwt327ovrlkovlq6vvtbrwxk6j.ui.nabu.casa/local/ha_exports/`
3. Reload the spreadsheet.
4. Use the menu: **Home Assistant → Import All CSVs**.

```js
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Home Assistant')
    .addItem('Import All CSVs', 'importAll')
    .addToUi();
}

function importAll() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const BASE_URL = PropertiesService.getScriptProperties().getProperty('BASE_URL');
  const AUTH_TOKEN = PropertiesService.getScriptProperties().getProperty('AUTH_TOKEN');

  // Include Floors
  const fileMap = {
    'Entities (raw)': 'ha_entities_raw.csv',
    'Devices (raw)': 'ha_devices_raw.csv',
    'Areas (raw)': 'ha_areas_raw.csv',
    'Labels (raw)': 'ha_labels_raw.csv',
    'Floors (raw)': 'ha_floors_raw.csv'
  };

  let summary = [];
  let successCount = 0;

  if (!BASE_URL || !AUTH_TOKEN) {
    const err = '❌ Missing BASE_URL or AUTH_TOKEN in Script Properties.';
    Logger.log(err);
    SpreadsheetApp.getActiveSpreadsheet().toast(err, 'Error', 30);
    return;
  }

  Logger.log('🚀 Starting Home Assistant import run...');
  SpreadsheetApp.getActiveSpreadsheet().toast('Running Import...', 'Progress', 5);

  for (const [sheetName, fileName] of Object.entries(fileMap)) {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      Logger.log(`📄 Creating missing sheet: ${sheetName}`);
      sheet = ss.insertSheet(sheetName);
      if (!sheet) {
        summary.push(`${sheetName}: ❌ Failed to create sheet`);
        continue;
      }
    }

    try {
      const url = BASE_URL.replace(/\/?$/, '/') + fileName; // ensure trailing slash
      Logger.log(`📡 Fetching ${url}`);

      const response = UrlFetchApp.fetch(url, {
        headers: { Authorization: 'Bearer ' + AUTH_TOKEN },
        muteHttpExceptions: true,
      });

      const status = response.getResponseCode();
      Logger.log(`${fileName} → HTTP ${status}`);

      if (status !== 200) {
        summary.push(`${sheetName}: ❌ HTTP ${status}`);
        continue;
      }

      const csv = response.getContentText();
      const rows = Utilities.parseCsv(csv);

      if (!rows || rows.length <= 1) {
        Logger.log(`⚠️ ${sheetName}: CSV empty or invalid.`);
        summary.push(`${sheetName}: ⚠️ Empty or invalid CSV`);
        continue;
      }

      sheet.clearContents();
      sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
      sheet.autoResizeColumns(1, rows[0].length);
      summary.push(`${sheetName}: ✅ ${rows.length - 1} rows imported`);
      successCount++;

    } catch (err) {
      const msg = err && err.toString && err.toString().includes('DNS')
        ? '🌐 DNS error: Remote URL not reachable (verify Nabu Casa URL).'
        : String(err);
      Logger.log(`❌ Error on ${sheetName}: ${msg}`);
      summary.push(`${sheetName}: ❌ ${msg}`);
    }
  }

  const mainSheet = ss.getSheets()[0];
  mainSheet.getRange('A1').setValue('Last Sync: ' + new Date().toLocaleString());

  const msg = successCount > 0
    ? `✅ Imported ${successCount} of ${Object.keys(fileMap).length} sheets.
` + summary.join('
')
    : '⚠️ Import failed: no data imported. Check Logs (View → Logs).
' + summary.join('
');

  ss.toast(msg, 'Home Assistant', 45);
  Logger.log(msg);
}
```

---

## ⚡ Workflow Summary

1. Export registry data via `export_ha_raw_tables.sh`.
2. Upload resulting CSVs to Drive or expose via Nabu Casa.
3. Open spreadsheet → Run **Import All CSVs.**
4. Verify raw sheets update; derived sheet auto-refreshes.
5. Use checkboxes/dropdowns for customization.
6. Copy YAML or automation scripts into Home Assistant.

---

## 🧮 Future Additions

- Merge lookups (VLOOKUP) for auto device and area names.
- Highlight missing or invalid areas.
- Add direct sync via HA REST API.
- Auto-compress CSV exports for Drive uploads.

---

**End-to-end:** This setup provides a reproducible, version-controlled workflow
between Home Assistant registries → Drive/Nabu Casa CSVs → Google Sheets
customizations → YAML/script syncs back into HA.

---

# Home Assistant → Google Sheets Master Integration Guide (with Nabu Casa Integration)

Complete end-to-end integration with Floors included, secure token handling
using Script Properties, and Nabu Casa remote access.

---

## 🔐 Secure Setup Using Script Properties

In your Google Apps Script project:

1. Go to **Project Settings → Script Properties → Add Row**.
2. Add these keys and values:
