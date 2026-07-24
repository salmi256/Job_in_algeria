import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

const jobs = [
  {
    title: "مطور ويب Full-Stack",
    company: "Yassir",
    description:
      "نبحث عن مطور ويب متمكن في React و Node.js للانضمام إلى فريقنا التقني في الجزائر العاصمة.\n\nالمتطلبات:\n- خبرة سنتين على الأقل\n- إتقان JavaScript/TypeScript\n- معرفة بقواعد البيانات",
    wilaya: "الجزائر",
    category: "تكنولوجيا المعلومات",
    jobType: "full-time",
    salary: "120,000 دج",
  },
  {
    title: "ممرض/ممرضة",
    company: "عيادة الشفاء",
    description:
      "مطلوب ممرضون وممرضات للعمل في عيادة خاصة بوهران. يشترط شهادة دولة في التمريض وخبرة سنة على الأقل.",
    wilaya: "وهران",
    category: "الصحة والطب",
    jobType: "full-time",
    salary: "55,000 دج",
  },
  {
    title: "أستاذ لغة إنجليزية",
    company: "مدرسة النجاح الخاصة",
    description:
      "مدرسة خاصة بقسنطينة تبحث عن أستاذ لغة إنجليزية لتدريس المستويات المتوسطة والثانوية. دوام جزئي مسائي.",
    wilaya: "قسنطينة",
    category: "التعليم والتدريس",
    jobType: "part-time",
    salary: "40,000 دج",
  },
  {
    title: "مهندس مدني",
    company: "Cosider",
    description:
      "مطلوب مهندس مدني لمتابعة مشاريع البناء الكبرى. خبرة 3 سنوات في تسيير الورشات. رخصة سياقة إلزامية.",
    wilaya: "سطيف",
    category: "الهندسة",
    jobType: "full-time",
    salary: "150,000 دج",
  },
  {
    title: "محاسب رئيسي",
    company: "Cevital",
    description:
      "شركة كبرى بالجزائر تبحث عن محاسب رئيسي متحكم في PC Compta و التصريحات الجبائية. خبرة 5 سنوات.",
    wilaya: "بجاية",
    category: "المالية والمحاسبة",
    jobType: "full-time",
    salary: "130,000 دج",
  },
  {
    title: "سائق شاحنة",
    company: "Numilog",
    description: "مطلوب سائقون لشاحنات النقل الثقيل، رخصة صنف C. خطوط بين الولايات.",
    wilaya: "البليدة",
    category: "النقل واللوجستيك",
    jobType: "full-time",
    salary: "70,000 دج",
  },
  {
    title: "مسؤول تسويق رقمي",
    company: "Jumia Algérie",
    description:
      "نبحث عن مسؤول تسويق رقمي متمكن من إدارة الحملات الإعلانية على فيسبوك وإنستغرام وجوجل. إمكانية العمل عن بعد.",
    wilaya: "الجزائر",
    category: "التجارة والمبيعات",
    jobType: "remote",
    salary: "90,000 دج",
  },
  {
    title: "موظف استقبال فندقي",
    company: "فندق الأوراسي",
    description:
      "فندق 5 نجوم يبحث عن موظفي استقبال يتقنون العربية والفرنسية والإنجليزية. مظهر لائق وروح خدمة العملاء.",
    wilaya: "الجزائر",
    category: "السياحة والفندقة",
    jobType: "full-time",
    salary: "60,000 دج",
  },
  {
    title: "تقني في الإعلام الآلي",
    company: "Condor Electronics",
    description:
      "مطلوب تقني سامي في الإعلام الآلي للصيانة والدعم التقني بمصنع برج بوعريريج.",
    wilaya: "برج بوعريريج",
    category: "تكنولوجيا المعلومات",
    jobType: "full-time",
    salary: "65,000 دج",
  },
  {
    title: "مهندس فلاحي",
    company: "مزرعة الواحات",
    description:
      "مستثمرة فلاحية كبرى ببسكرة تبحث عن مهندس فلاحي متخصص في الري والزراعات الصحراوية.",
    wilaya: "بسكرة",
    category: "الفلاحة",
    jobType: "full-time",
    salary: "85,000 دج",
  },
  {
    title: "سكرتيرة إدارية",
    company: "مكتب المحاماة بن عمر",
    description:
      "مكتب محاماة بتلمسان يبحث عن سكرتيرة إدارية متحكمة في الإعلام الآلي وتحرير المراسلات بالعربية والفرنسية.",
    wilaya: "تلمسان",
    category: "الإدارة والسكرتارية",
    jobType: "full-time",
    salary: "45,000 دج",
  },
  {
    title: "متربص في تطوير تطبيقات الموبايل",
    company: "Djezzy",
    description:
      "فرصة تربص مدفوع الأجر لمدة 6 أشهر في تطوير تطبيقات Android/iOS مع إمكانية التوظيف الدائم.",
    wilaya: "الجزائر",
    category: "تكنولوجيا المعلومات",
    jobType: "internship",
    salary: "30,000 دج",
  },
];

async function main() {
  const count = await prisma.job.count();
  if (count > 0) {
    console.log("Database already seeded, skipping.");
    return;
  }
  await prisma.job.createMany({ data: jobs });
  console.log(`Seeded ${jobs.length} jobs.`);
}

main().finally(() => prisma.$disconnect());
