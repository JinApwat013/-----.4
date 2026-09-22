export const APPS_SCRIPT_CODE = `/**
 * Google Apps Script สำหรับบันทึกข้อมูลบทเรียนคอมพิวเตอร์ช่วยสอน (CAI)
 * - ข้อมูลแบบทดสอบเดิม: บันทึกลงแผ่นงานแรก (Sheet 1)
 * - ข้อมูลคะแนนใบงาน (type === "worksheet_scores"): บันทึกลงแผ่นงานที่ 2 (Sheet 2: ชื่อ "ใบงาน")
 *   คอลัมน์: [วันเวลา, ชื่อ-นามสกุล, ใบงานที่ 1, ใบงานที่ 2, ใบงานที่ 3, ..., คะแนนรวมใบงานทั้งหมด]
 * - ข้อมูลแบบประเมินความพึงพอใจ (type === "satisfaction_survey"): บันทึกลงแผ่นงานที่ 3 (Sheet 3: ชื่อ "ความพึงพอใจ")
 *   คอลัมน์: [วันเวลา, ชื่อ-นามสกุล, ข้อ 1, ข้อ 2, ..., ข้อ 12, เฉลี่ยด้านเนื้อหา, เฉลี่ยด้านการออกแบบ, เฉลี่ยด้านกิจกรรม, เฉลี่ยรวมทั้งหมด]
 *   รูปแบบวันเวลา: วันที่/เดือน/ปี, เวลา (เช่น 22/09/2026, 14:05:10)
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);

    // รูปแบบวันเวลา: วันที่/เดือน/ปี, เวลา
    var timestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Bangkok", "dd/MM/yyyy, HH:mm:ss");

    // =========================================================================
    // 1. บันทึกข้อมูลคะแนนใบงาน (type === "worksheet_scores") ลงแผ่นงานที่ 2
    // =========================================================================
    if (data.type === "worksheet_scores" || data.type === "worksheet") {
      var sheet2 = doc.getSheetByName("ใบงาน");
      
      // หากยังไม่มีแผ่นงานชื่อ "ใบงาน" ให้ใช้แผ่นงานที่ 2 หรือสร้างแผ่นงานใหม่
      if (!sheet2) {
        var sheets = doc.getSheets();
        if (sheets.length >= 2) {
          sheet2 = sheets[1];
        } else {
          sheet2 = doc.insertSheet("ใบงาน");
        }
      }

      // ดึงอาเรย์คะแนนแต่ละใบงาน เช่น [10, 8, 9]
      var scoresList = [];
      if (Array.isArray(data.scores)) {
        scoresList = data.scores;
      } else if (data.score !== undefined) {
        scoresList = [data.score];
      }

      var worksheetCount = scoresList.length > 0 ? scoresList.length : 3;

      // ตรวจสอบว่าถ้าแถว 1 ยังว่างอยู่ ให้สร้างหัวตารางอัตโนมัติ
      // [วันเวลา, ชื่อ-นามสกุล, ใบงานที่ 1, ใบงานที่ 2, ใบงานที่ 3, ..., คะแนนรวมใบงานทั้งหมด]
      if (sheet2.getLastRow() === 0) {
        var headers = ["วันเวลา", "ชื่อ-นามสกุล"];
        for (var i = 1; i <= worksheetCount; i++) {
          headers.push("ใบงานที่ " + i);
        }
        headers.push("คะแนนรวมใบงานทั้งหมด");

        sheet2.appendRow(headers);
        var headerRange = sheet2.getRange(1, 1, 1, headers.length);
        headerRange.setFontWeight("bold");
        headerRange.setBackground("#E8F0FE");
        headerRange.setHorizontalAlignment("center");
      }

      // คำนวณคะแนนรวมใบงานทั้งหมด
      var totalScore = (data.totalScore !== undefined && data.totalScore !== null)
        ? data.totalScore
        : scoresList.reduce(function(acc, val) { return acc + (Number(val) || 0); }, 0);

      // สร้างแถวข้อมูล: [วันเวลา, ชื่อ-นามสกุล, ใบงานที่ 1, ใบงานที่ 2, ใบงานที่ 3, ..., คะแนนรวมใบงานทั้งหมด]
      var rowData = [
        timestamp,
        data.name || "-"
      ];

      for (var k = 0; k < scoresList.length; k++) {
        var sVal = scoresList[k];
        rowData.push(sVal !== undefined && sVal !== null ? sVal : 0);
      }

      rowData.push(totalScore);

      sheet2.appendRow(rowData);

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Worksheet scores saved successfully to Sheet 2"
      })).setMimeType(ContentService.MimeType.JSON);

    } else if (data.type === "satisfaction_survey" || data.type === "survey") {
      // =========================================================================
      // 2. บันทึกแบบประเมินความพึงพอใจ (type === "satisfaction_survey") ลงแผ่นงานที่ 3 ("ความพึงพอใจ")
      // =========================================================================
      var sheet3 = doc.getSheetByName("ความพึงพอใจ");
      
      // หากยังไม่มีแผ่นงานชื่อ "ความพึงพอใจ" ให้ใช้แผ่นงานที่ 3 หรือสร้างใหม่
      if (!sheet3) {
        var sheets = doc.getSheets();
        if (sheets.length >= 3) {
          sheet3 = sheets[2];
        } else {
          sheet3 = doc.insertSheet("ความพึงพอใจ");
        }
      }

      var ratingsList = Array.isArray(data.ratings) ? data.ratings : [];

      // ตรวจสอบว่าถ้าแถว 1 ยังว่างอยู่ ให้สร้างหัวตารางอัตโนมัติ
      // [วันเวลา, ชื่อ-นามสกุล, ข้อ 1, ข้อ 2, ..., ข้อ 12, เฉลี่ยด้านเนื้อหา, เฉลี่ยด้านการออกแบบ, เฉลี่ยด้านกิจกรรม, เฉลี่ยรวมทั้งหมด]
      if (sheet3.getLastRow() === 0) {
        var surveyHeaders = ["วันเวลา", "ชื่อ-นามสกุล"];
        for (var q = 1; q <= 12; q++) {
          surveyHeaders.push("ข้อ " + q);
        }
        surveyHeaders.push("เฉลี่ยด้านเนื้อหา", "เฉลี่ยด้านการออกแบบ", "เฉลี่ยด้านกิจกรรม", "เฉลี่ยรวมทั้งหมด");

        sheet3.appendRow(surveyHeaders);
        var sHeaderRange = sheet3.getRange(1, 1, 1, surveyHeaders.length);
        sHeaderRange.setFontWeight("bold");
        sHeaderRange.setBackground("#E6F4EA"); // soft green
        sHeaderRange.setHorizontalAlignment("center");
      }

      var surveyRowData = [
        timestamp,
        data.name || "-"
      ];

      // คะแนนรายข้อ 12 ข้อ
      for (var r = 0; r < 12; r++) {
        var rVal = ratingsList[r];
        surveyRowData.push(rVal !== undefined && rVal !== null ? Number(rVal) : "-");
      }

      // ค่าเฉลี่ย 3 ด้าน และค่าเฉลี่ยรวมทั้งหมด
      surveyRowData.push(
        data.meanContent !== undefined ? Number(data.meanContent) : "-",
        data.meanDesign !== undefined ? Number(data.meanDesign) : "-",
        data.meanActivity !== undefined ? Number(data.meanActivity) : "-",
        data.totalMean !== undefined ? Number(data.totalMean) : "-"
      );

      sheet3.appendRow(surveyRowData);

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Satisfaction survey saved successfully to Sheet 3"
      })).setMimeType(ContentService.MimeType.JSON);

    } else {
      // =========================================================================
      // 3. บันทึกข้อมูลแบบทดสอบลงแผ่นงานแรก (Sheet 1) ตามระบบเดิม
      // =========================================================================
      var sheet1 = doc.getSheets()[0];

      // สร้างหัวตารางอัตโนมัติหากแผ่นงานยังว่าง
      if (sheet1.getLastRow() === 0) {
        var defaultHeaders = [
          "วันเวลา", "ชื่อ-นามสกุล", "ก่อนเรียน", "หลังเรียน", "พัฒนาการ",
          "ระดับคุณภาพ", "กิจกรรมที่ 1", "กิจกรรมที่ 2", "กิจกรรมที่ 3"
        ];
        for (var q = 1; q <= 20; q++) {
          defaultHeaders.push("ข้อ " + q);
        }
        sheet1.appendRow(defaultHeaders);
        sheet1.getRange(1, 1, 1, defaultHeaders.length).setFontWeight("bold").setBackground("#FFF3C4");
      }

      var rowData = [
        timestamp,
        data.name || "-",
        data.preScore !== undefined ? data.preScore : "-",
        data.postScore !== undefined ? data.postScore : "-",
        data.improvement !== undefined ? data.improvement : "-",
        data.quality || "-",
        data.safeTechScore !== undefined ? data.safeTechScore : "-",
        data.worksheetScore !== undefined ? data.worksheetScore : "-",
        data.passwordScore !== undefined ? data.passwordScore : "-"
      ];

      // แนบคำตอบแบบทดสอบ 20 ข้อ (ถ้ามี)
      if (Array.isArray(data.answers)) {
        for (var j = 0; j < data.answers.length; j++) {
          rowData.push(data.answers[j]);
        }
      }

      sheet1.appendRow(rowData);

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Quiz data saved successfully to Sheet 1"
      })).setMimeType(ContentService.MimeType.JSON);
    }

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}
`;


