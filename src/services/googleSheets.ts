/**
 * Google Sheets Integration Service
 * รองรับการส่งข้อมูลคะแนนสอบ (Sheet 1) และข้อมูลคะแนนใบงาน (Sheet 2: แผ่นงาน "ใบงาน")
 */

export const GOOGLE_SHEETS_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbzpHHR4hN0A1nQaVAIGYytJdqbE0cbw3UVETNTzVgKEZDlvmEKt02gN9kAexRgvt6pGZA/exec';

/**
 * ฟังก์ชันจัดรูปแบบวันเวลาเป็น: วันที่/เดือน/ปี, เวลา (เช่น 19/09/2026, 13:21:10)
 */
export function formatThaiDateTime(date: Date = new Date()): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
}

export interface WorksheetScoresPayload {
  type: 'worksheet_scores';
  name: string;
  scores: number[]; // อาเรย์คะแนนของใบงานที่ 1, 2, 3 ตามลำดับ
  totalScore: number; // คะแนนรวมใบงานทั้งหมด
  timestamp?: string; // รูปแบบ วันที่/เดือน/ปี, เวลา
}

export interface QuizScoresPayload {
  type?: 'quiz';
  name: string;
  preScore: number | null;
  postScore: number | null;
  improvement: number | null;
  quality: string;
  safeTechScore: number;
  worksheetScore: number;
  passwordScore: number;
  answers: (number | string)[];
  timestamp?: string;
}

export interface SatisfactionSurveyPayload {
  type: 'satisfaction_survey';
  name: string;
  ratings: number[]; // อาเรย์คะแนน 1-5 ทั้งหมด 12 ข้อ
  meanContent: number; // ค่าเฉลี่ยด้านเนื้อหา (ข้อ 1-4)
  meanDesign: number; // ค่าเฉลี่ยด้านการออกแบบ (ข้อ 5-8)
  meanActivity: number; // ค่าเฉลี่ยด้านกิจกรรม (ข้อ 9-12)
  totalMean: number; // ค่าเฉลี่ยรวมทั้งหมด (12 ข้อ)
  timestamp?: string; // รูปแบบ วันที่/เดือน/ปี, เวลา
}

export interface SendResult {
  success: boolean;
  message: string;
}

/**
 * ส่งเฉพาะคะแนนของแต่ละใบงานไปยัง Google Apps Script (แผ่นงานที่ 2: "ใบงาน")
 * บันทึกลงคอลัมน์: [วันเวลา, ชื่อ-นามสกุล, ใบงานที่ 1, ใบงานที่ 2, ใบงานที่ 3, ..., คะแนนรวมใบงานทั้งหมด]
 */
export async function sendWorksheetScoresToGoogleSheets(data: {
  name: string;
  scores: number[];
  totalScore?: number;
}): Promise<SendResult> {
  const calculatedTotal =
    data.totalScore !== undefined
      ? data.totalScore
      : data.scores.reduce((sum, s) => sum + (Number(s) || 0), 0);

  const payload: WorksheetScoresPayload = {
    type: 'worksheet_scores',
    name: data.name,
    scores: data.scores,
    totalScore: calculatedTotal,
    timestamp: formatThaiDateTime(),
  };

  try {
    await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      message: `บันทึกคะแนนใบงานเข้า Google Sheets (แผ่นงานที่ 2) เรียบร้อยแล้ว (คะแนนรวม: ${calculatedTotal} คะแนน)`,
    };
  } catch (error) {
    console.error('Error sending worksheet scores to Google Sheets:', error);
    return {
      success: false,
      message: 'เกิดข้อผิดพลาดในการส่งข้อมูลคะแนนใบงาน กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
    };
  }
}

/**
 * ส่งข้อมูลคะแนนแบบทดสอบก่อนเรียน-หลังเรียน และคะแนนสรุป (Sheet 1)
 */
export async function sendQuizScoresToGoogleSheets(
  data: Omit<QuizScoresPayload, 'type'>
): Promise<SendResult> {
  const payload: QuizScoresPayload = {
    type: 'quiz',
    ...data,
    timestamp: data.timestamp || formatThaiDateTime(),
  };

  try {
    await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      message: 'บันทึกข้อมูลคะแนนแบบทดสอบไปยัง Google Sheets เรียบร้อยแล้ว',
    };
  } catch (error) {
    console.error('Error sending quiz scores to Google Sheets:', error);
    return {
      success: false,
      message: 'เกิดข้อผิดพลาดในการส่งข้อมูลคะแนนแบบทดสอบ กรุณาลองใหม่อีกครั้ง',
    };
  }
}

/**
 * ส่งข้อมูลแบบประเมินความพึงพอใจไปยัง Google Apps Script (แผ่นงานที่ 3: "ความพึงพอใจ")
 * บันทึกลงคอลัมน์: [วันเวลา, ชื่อ-นามสกุล, ข้อ 1, ข้อ 2, ..., ข้อ 12, เฉลี่ยด้านเนื้อหา, เฉลี่ยด้านการออกแบบ, เฉลี่ยด้านกิจกรรม, เฉลี่ยรวมทั้งหมด]
 */
export async function sendSatisfactionSurveyToGoogleSheets(data: {
  name: string;
  ratings: number[];
  meanContent: number;
  meanDesign: number;
  meanActivity: number;
  totalMean: number;
}): Promise<SendResult> {
  const payload: SatisfactionSurveyPayload = {
    type: 'satisfaction_survey',
    name: data.name,
    ratings: data.ratings,
    meanContent: Number(data.meanContent.toFixed(2)),
    meanDesign: Number(data.meanDesign.toFixed(2)),
    meanActivity: Number(data.meanActivity.toFixed(2)),
    totalMean: Number(data.totalMean.toFixed(2)),
    timestamp: formatThaiDateTime(),
  };

  try {
    await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      message: `บันทึกแบบประเมินความพึงพอใจเข้า Google Sheets (แผ่นงานที่ 3: "ความพึงพอใจ") เรียบร้อยแล้ว (คะแนนเฉลี่ยรวม: ${payload.totalMean} / 5.00)`,
    };
  } catch (error) {
    console.error('Error sending satisfaction survey to Google Sheets:', error);
    return {
      success: false,
      message: 'เกิดข้อผิดพลาดในการส่งข้อมูลแบบประเมิน กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ตแล้วลองใหม่',
    };
  }
}

