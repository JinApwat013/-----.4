export interface SurveyQuestionItem {
  id: number;
  questionNumber: number;
  text: string;
  category: 'content' | 'design' | 'activity';
  categoryTitle: string;
}

export const SURVEY_CATEGORIES = [
  {
    key: 'content' as const,
    title: 'ด้านเนื้อหา',
    description: 'ความเหมาะสม ความชัดเจน และประโยชน์ของเนื้อหาบทเรียน',
    icon: 'BookOpen',
    color: 'amber',
  },
  {
    key: 'design' as const,
    title: 'ด้านการออกแบบและระบบ CAI (Design & Usability)',
    description: 'ความสะดวกในการใช้งาน หน้าจอ สีสัน และการสนับสนุนการเรียนรู้',
    icon: 'Layout',
    color: 'blue',
  },
  {
    key: 'activity' as const,
    title: 'ด้านกิจกรรมและการฝึกปฏิบัติ (Interactive Activities)',
    description: 'ความสนุก ความน่าสนใจ และการส่งเสริมการเรียนรู้ด้วยตนเอง',
    icon: 'Sparkles',
    color: 'emerald',
  },
];

export const SURVEY_QUESTIONS: SurveyQuestionItem[] = [
  // [ด้านเนื้อหา] ข้อ 1-4
  {
    id: 1,
    questionNumber: 1,
    text: 'เนื้อหาบทเรียนเข้าใจง่าย ไม่ยากเกินไปสำหรับนักเรียน ป.4',
    category: 'content',
    categoryTitle: 'ด้านเนื้อหา',
  },
  {
    id: 2,
    questionNumber: 2,
    text: 'หัวข้อบทเรียน (การปกป้องข้อมูล, พลเมืองดิจิทัล, การรู้เท่าทันสื่อ) มีประโยชน์ในชีวิตประจำวัน',
    category: 'content',
    categoryTitle: 'ด้านเนื้อหา',
  },
  {
    id: 3,
    questionNumber: 3,
    text: 'ภาษา ข้อความ และขนาดตัวอักษรอ่านง่าย ชัดเจน',
    category: 'content',
    categoryTitle: 'ด้านเนื้อหา',
  },
  {
    id: 4,
    questionNumber: 4,
    text: 'มีการนำเสนอเนื้อหาในรูปแบบที่น่าสนใจและดึงดูดความสนใจ (ใช้สื่อรูปภาพประกอบ)',
    category: 'content',
    categoryTitle: 'ด้านเนื้อหา',
  },

  // [ด้านการออกแบบและระบบ CAI (Design & Usability)] ข้อ 5-8
  {
    id: 5,
    questionNumber: 5,
    text: 'เนื้อหาในบทเรียนมีลำดับขั้นตอนที่เข้าใจง่ายและไม่ซับซ้อน',
    category: 'design',
    categoryTitle: 'ด้านการออกแบบและระบบ CAI (Design & Usability)',
  },
  {
    id: 6,
    questionNumber: 6,
    text: 'หน้าจอใช้งานง่าย เมนูและปุ่มกดต่าง ๆ สะดวก ไม่ซับซ้อน',
    category: 'design',
    categoryTitle: 'ด้านการออกแบบและระบบ CAI (Design & Usability)',
  },
  {
    id: 7,
    questionNumber: 7,
    text: 'โทนสี ภาพประกอบ และรูปแบบมีความสวยงาม น่าสนใจ',
    category: 'design',
    categoryTitle: 'ด้านการออกแบบและระบบ CAI (Design & Usability)',
  },
  {
    id: 8,
    questionNumber: 8,
    text: 'ครูให้คำแนะนำและสนับสนุนระหว่างการปฏิบัติกิจกรรมได้ดี (Scaffolding)',
    category: 'design',
    categoryTitle: 'ด้านการออกแบบและระบบ CAI (Design & Usability)',
  },

  // [ด้านกิจกรรมและการฝึกปฏิบัติ (Interactive Activities)] ข้อ 9-12
  {
    id: 9,
    questionNumber: 9,
    text: 'ระบบจับเวลาและการแสดงแถบความก้าวหน้าช่วยกระตุ้นการเรียนรู้',
    category: 'activity',
    categoryTitle: 'ด้านกิจกรรมและการฝึกปฏิบัติ (Interactive Activities)',
  },
  {
    id: 10,
    questionNumber: 10,
    text: 'กิจกรรมจำลอง Password Builder สนุกและช่วยให้เข้าใจวิธีตั้งรหัสผ่าน',
    category: 'activity',
    categoryTitle: 'ด้านกิจกรรมและการฝึกปฏิบัติ (Interactive Activities)',
  },
  {
    id: 11,
    questionNumber: 11,
    text: 'ใบงานวิเคราะห์สถานการณ์ ปลอดภัย/ไม่ปลอดภัย มีคำอธิบายเฉลยที่เข้าใจง่าย',
    category: 'activity',
    categoryTitle: 'ด้านกิจกรรมและการฝึกปฏิบัติ (Interactive Activities)',
  },
  {
    id: 12,
    questionNumber: 12,
    text: 'นักเรียนสามารถเรียนรู้และฝึกปฏิบัติได้ด้วยตนเองตามความเข้าใจ',
    category: 'activity',
    categoryTitle: 'ด้านกิจกรรมและการฝึกปฏิบัติ (Interactive Activities)',
  },
];

export const RATING_LEVELS = [
  {
    value: 5,
    label: 'มากที่สุด',
    shortLabel: 'มากที่สุด',
    emoji: '😍',
    stars: '★★★★★',
    color: 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600',
    selectedBg: 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  {
    value: 4,
    label: 'มาก',
    shortLabel: 'มาก',
    emoji: '😊',
    stars: '★★★★',
    color: 'bg-teal-500 hover:bg-teal-600 text-white border-teal-600',
    selectedBg: 'bg-teal-500 text-white border-teal-600 shadow-md ring-2 ring-teal-300',
    badgeClass: 'bg-teal-100 text-teal-800 border-teal-300',
  },
  {
    value: 3,
    label: 'ปานกลาง',
    shortLabel: 'ปานกลาง',
    emoji: '🙂',
    stars: '★★★',
    color: 'bg-amber-400 hover:bg-amber-500 text-slate-900 border-amber-500',
    selectedBg: 'bg-amber-400 text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-300',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  {
    value: 2,
    label: 'น้อย',
    shortLabel: 'น้อย',
    emoji: '🙁',
    stars: '★★',
    color: 'bg-orange-400 hover:bg-orange-500 text-white border-orange-500',
    selectedBg: 'bg-orange-400 text-white border-orange-500 shadow-md ring-2 ring-orange-300',
    badgeClass: 'bg-orange-100 text-orange-900 border-orange-300',
  },
  {
    value: 1,
    label: 'น้อยที่สุด',
    shortLabel: 'น้อยที่สุด',
    emoji: '😞',
    stars: '★',
    color: 'bg-rose-500 hover:bg-rose-600 text-white border-rose-600',
    selectedBg: 'bg-rose-500 text-white border-rose-600 shadow-md ring-2 ring-rose-300',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
  },
];

export function getInterpretation(mean: number): { label: string; emoji: string; color: string } {
  if (mean >= 4.51) return { label: 'มากที่สุด', emoji: '🌟', color: 'text-emerald-700' };
  if (mean >= 3.51) return { label: 'มาก', emoji: '🟢', color: 'text-teal-700' };
  if (mean >= 2.51) return { label: 'ปานกลาง', emoji: '🟡', color: 'text-amber-700' };
  if (mean >= 1.51) return { label: 'น้อย', emoji: '🟠', color: 'text-orange-700' };
  return { label: 'น้อยที่สุด', emoji: '🔴', color: 'text-rose-700' };
}
