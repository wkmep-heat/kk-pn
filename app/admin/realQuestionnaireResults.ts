// Actual tabulated results of "แบบสอบถามประชาชน" (ภาคผนวก ก ข้อ 1), n = 300.
// Source: ข้อมูลสำหรับทำกราฟ_แบบสอบถาม.xlsx (10 sheets, one per breakdown).
// Each array is index-aligned with the matching question's option/statement
// list in QuestionnaireCharts.tsx (same order as the live questionnaire form).

export const REAL_RESPONSE_COUNT = 300;

// ตอนที่ 1 — ข้อมูลทั่วไป (นับจำนวนคน, เรียงตาม part1Questions[i].options)
export const genderCounts = [90, 106, 104];
export const ageCounts = [41, 40, 45, 47, 36, 48, 43];
export const statusCounts = [44, 48, 45, 45, 59, 59];
export const usageFrequencyCounts = [63, 74, 58, 61, 44];
export const regularAreaCounts = [32, 32, 49, 30, 43, 32, 48, 34];

// ตอนที่ 2 — ค่าเฉลี่ยระดับความคิดเห็น เต็ม 5 (เรียงตาม part2Statements)
export const heatPerceptionAverages = [3.7, 3.7, 3.87, 3.85, 3.8, 3.73, 3.7, 3.83];

// ตอนที่ 3 — จุดร้อน/จุดเสี่ยง (นับจำนวนคน)
export const hotspotCharacterCounts = [84, 69, 59, 86, 60, 58, 57, 68, 45]; // part3CharacterOptions
export const hotspotTimeCounts = [60, 66, 57, 54, 63]; // part3TimeOptions
export const hotspotImpactCounts = [137, 102, 81, 90, 82, 91]; // part3ImpactOptions

// ตอนที่ 4 — ค่าเฉลี่ยความคิดเห็นต่อ Smart Map / LINE OA เต็ม 5 (เรียงตาม part4Statements)
export const smartMapLineOaAverages = [3.71, 3.84, 3.75, 3.69, 3.73];
