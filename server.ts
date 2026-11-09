import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '15mb' }));

// Server-side Google GenAI initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

interface ChatRequestBody {
  messages: ChatMessage[];
  persona?: string;
  dialect?: string;
}

// Complete, bilingual, grounded knowledge base for offline fallback and prompt injection
const BARAH_KNOWLEDGE = `
معلومات بَراح الرسمية الموثّقة:
1. الهوية والفلسفة:
- الاسم: «بَراح» ويعني باللغة العربية الفضاء المفتوح والمتّسع.
- الشعار والعبارة المعتمدة: «للأرض حكاية» (Every land has a story).
- ألوان الهوية: أخضر الطبيعة (#515638)، أزرق الماء (#6F8286)، ورمل الوادي (#CCB798).
- المقولة الفلسفية: «بَراح لا يصنع الطبيعة؛ بل ينظّم طريقة اكتشافها.»
- الفكرة الأساسية: من المدينة إلى البَراح؛ وجهة سياحة بيئية منخفضة التأثير تحترم خصوصية المكان.

2. طبيعة المشروع وحالة الافتتاح (مهم جداً):
- هل بَراح مفتوح حالياً؟ لا. بَراح هو مشروع تخرج وتصوّر استثماري قيد دراسة الجدوى، وليس وجهة عاملة أو مفتوحة للزيارة أو الحجوزات الفعلية حالياً.
- الصور المعروضة في الموقع تمثل تصورات تصميمية معمارية ورسومية للمشروع، وصورة جوية مرجعية من خرائط Google.
- أي تطوير مستقبلي مشروط بالدراسات البيئية المتخصصة والحصول على الموافقات الرسمية من الجهات المختصة.

3. الموقع والجغرافيا:
- الموقع: وادي البحير، المحافظة الجنوبية، مملكة البحرين (بين الرفاع الشرقي وسند).
- يبعد ١٥ دقيقة فقط بالسيارة عن العاصمة المنامة.
- الإحداثيات على خرائط Google: 26°08'31.2"N 50°33'46.8"E (26.142000, 50.563000).
- رابط خرائط Google: https://www.google.com/maps/search/?api=1&query=26%C2%B008%2731.2%22N+50%C2%B033%2746.8%22E
- المميزات: تضاريس وتلال جيرية رسوبية فريدة تكونت عبر ملايين السنين، ومسطحات مائية وبحيرات دائمة تجذب الطيور.
- التوجيهات الرسمية: صدرت في يوليو 2022 توجيهات رسمية بمملكة البحرين لحماية المناطق البيئية والتلال الصخرية في وادي البحير.

4. المحطات الأربع:
- محطة 01: «بوابة بَراح» — نقطة الوصول والترحيب بالزوار، الإرشاد البيئي، ومتجر الهدايا التذكارية.
- محطة 02: «درب بَراح» — مسار خشبي مرتفع ومستدام يحمي التضاريس الرسوبية مع نقاط استراحة وتأمل.
- محطة 03: «مرصد بَراح» — مقصورة هادئة مظللة تطل على مياه البحيرة مجهزة بمناظير عالية الدقة لرصد الطيور دون إزعاجها.
- محطة 04: «مجلس بَراح» — جلسات مستوحاة من العريش التراثي للراحة وتقديم القهوة البحرينية والتمور والضيافة الأصيلة.

5. الفعاليات العشر المقترحة:
1. «أثرك في بَراح» (Your Trace in BARAH): غرس شتلة من النباتات الفطرية المحلية كالسدر والغاف والغردق.
2. «ليالي بَراح» (BARAH Nights): أمسيات شتوية تحت النجوم، مراقبة الفلك، دفء النار، والضيافة البحرينية.
3. «عدسة بَراح» (BARAH Lens): جلسات تصوير للطبيعة والضوء والتكوينات الصخرية وقت الغروب.
4. «صباح الطيور» (Birdwatching Mornings): جولات صباحية في المرصد لرصد الطيور مع شروق الشمس.
5. «مستكشف بَراح الصغير» (Junior Explorer): أنشطة استكشافية للأطفال وجواز مستكشف بَراح.
6. «خطوات في الطبيعة» (Steps in Nature): جولات مشي إرشادية تعليمية تشرح تضاريس الوادي.
7. «حكايات من البحرين» (Stories from Bahrain): أمسيات تراثية وسرد قصصي في المجلس.
8. «ورش الطبيعة» (Nature Workshops): ورش تطبيقية في استنبات البذور الفطرية والرسم الطبيعي.
9. «غرسة للوادي» (A Seedling for the Valley): مبادرة سنوية في 21 مارس (اليوم الدولي للغابات).
10. «بَراح بلا أثر» (BARAH, Leave No Litter): مبادرة تنظيف وتوعية سنوية في 20 سبتمبر (اليوم العالمي للتنظيف).

6. الخدمات والتجارب والتعاون:
- ٩ خدمات رئيسية: الاستقبال والإرشاد، المشي واستكشاف الوادي، مراقبة الطيور، الجولات الإرشادية، التصوير الطبيعي، الزيارات التعليمية، المجموعات والجولات الخاصة، المجلس والضيافة، متجر ذكرى بَراح.
- ٤ مجالات تعاون: الجهات الحكومية، المؤسسات التعليمية، المشروعات المحلية والحرفية، المرشدون ومنظمو الرحلات.

7. ذكرى بَراح (المتجر والمقتنيات):
- مجموعة من ٢٧ منتجاً تذكارياً مقترحاً عبر ٧ فئات:
  1. أكواب ومستلزمات (Drinkware): كوب سيراميكي (3.5 د.ب)، تمبلر (4.0 د.ب)، مطارة ماء (5.0 د.ب).
  2. مقتنيات يومية (Everyday essentials): حقيبة قماشية (4.5 د.ب)، تيشيرت (7.0 د.ب)، قبعة زيتونية (5.5 د.ب)، مجموعة مصور بَراح (22.0 د.ب).
  3. قرطاسية (Stationery): دفتر بَراح (3.0 د.ب)، دفتر التصوير (4.5 د.ب)، قلم بَراح (2.0 د.ب).
  4. مطبوعات وتذكارات (Prints & keepsakes): بطاقة بريدية (1.5 د.ب)، فاصل كتب (1.0 د.ب)، كتاب بَراح المصور (12.0 د.ب)، ملصقات طبيعية (1.5 د.ب).
  5. تذكارات بَراح (BARAH Souvenirs): ميدالية مفاتيح (2.5 د.ب)، مغناطيس صخري (2.0 د.ب)، دبوس معدني (2.5 د.ب)، مجسم الوادي (8.0 د.ب).
  6. الطيور والاستكشاف (Birdwatching & exploration): بطاقات الطيور (4.0 د.ب)، دفتر رصد الطيور (2.5 د.ب)، لعبة المطابقة (5.0 د.ب)، جواز المستكشف (4.5 د.ب)، مجموعة المستكشف الصغير (14.0 د.ب).
  7. علب الهدايا (Gift boxes): علبة صغيرة (6.0 د.ب)، علبة فاخرة (15.0 د.ب)، صندوق مؤسسي (18.0 د.ب)، إصدار شتوي (19.0 د.ب).
- ملاحظة: المقتنيات مخصصة لمركز الزوار مستقبلاً عند الافتتاح ولا يوجد متجر إلكتروني أو شحن حالياً.

8. خطة الزيارة والتذاكر:
- أداة التخطيط تفاعلية للأغراض الأكاديمية فقط وتستخرج تصريح زيارة رقمي توضيحي.
- الأسعار التقديرية التوضيحية: تذكرة عامة 2.5 د.ب، غرس شتلة 0.5 د.ب، استئجار منظار 1.0 د.ب، ضيافة المجلس 1.5 د.ب.

9. الطيور والحياة الفطرية:
- وادي البحير موطن لأكثر من ٥٠ نوعاً من الطيور، منها طائر الفلامنغو الكبير (النحام)، البلبل البحريني، الوروار، الرفراف الشائع (صياد السمك)، بالإضافة لنباتات السدر والغاف والغردق والقصب.
`;

// High-fidelity fallback conversational engine covering all 12 domains and natural Gulf dialects
function generateSmartConversationalReply(lastText: string, isAr: boolean): { text: string; suggestions: string[] } {
  const t = lastText.trim().toLowerCase();

  // 1. هل بَراح مفتوح حالياً؟ / الزيارة الآن / الحجز الفعلي
  if (/(مفتوح|تفتحون|متى يفتح|هل مفتوح|زيارة الان|اقدر اجي|اقدر اروح|هل هو مفتوح|حجز حقيقي|متى الافتتاح|فاتحين)/i.test(t)) {
    return {
      text: isAr
        ? 'بَراح حالياً **مشروع تخرج وتصوّر استثماري وبيئي قيد دراسة الجدوى**، وليس وجهة عاملة أو مفتوحة للزيارة أو الحجوزات الفعلية الآن 🌿.\n\nالصور المعروضة في المنصة تمثل تصورات تصميمية معمارية لكيفية استثمار وحماية وادي البحير في مملكة البحرين مستقبلاً، وأداة التخطيط التفاعلية هي نموذج تجريبي توضيحي.'
        : 'BARAH is currently an **academic graduation project and investment feasibility concept**, not an operating destination open for physical visits or bookings 🌿.\n\nThe imagery represents conceptual architectural designs for how Wadi Al Buhair in Bahrain could be responsibly activated in the future.',
      suggestions: isAr
        ? ['شنو فكرة بَراح؟', 'وين موقع المشروع؟', 'شنو المحطات الأربع؟']
        : ['What is the concept of BARAH?', 'Where is it located?', 'What are the 4 stations?'],
    };
  }

  // 2. شنو فكرة بَراح؟ / ما هو بَراح؟ / المعنى والهوية
  if (/(فكرة|وش فكرة|شنو فكرة|ما هو براح|عن براح|وش براح|شنو براح|معنى براح|فلسفة|سالفة براح|قصة براح)/i.test(t)) {
    return {
      text: isAr
        ? '«بَراح» تعني باللغة العربية **الفضاء المفتوح والمتّسع** الخالي من العوائق 🍃.\n\nفكرة المشروع تنبع من وادي البحير نفسه؛ وجهة سياحة بيئية منخفضة التأثير ترفع شعار **«للأرض حكاية»**، وتقوم على فلسفة واضحة:\n**«بَراح لا يصنع الطبيعة؛ بل ينظّم طريقة اكتشافها.»**\n\nتعتمد الوجهة على ٤ محطات وممشى خشبي مرتفع لحماية الصخور والبحيرات دون الإخلال بالمشهد الفطري.'
        : 'The Arabic word “Barah” evokes **open, expansive space** 🍃.\n\nBARAH is a low-impact eco-tourism concept rooted in Wadi Al Buhair under the motto **"Every land has a story"**.\nIts guiding philosophy is:\n**"BARAH does not create nature; it organises how we discover it."**\nIt connects four gentle stations via an elevated boardwalk protecting natural limestone and wetland pools.',
      suggestions: isAr
        ? ['وين موقع المشروع؟', 'شنو المحطات الأربع؟', 'شنو الفعاليات المقترحة؟']
        : ['Where is it located?', 'What are the 4 stations?', 'What are the proposed events?'],
    };
  }

  // 3. وين موقع المشروع؟ / الموقع / وادي البحير / الإحداثيات
  if (/(وين|الموقع|موقع|اين يقع|وين مكان|مكان المشروع|وادي البحير|خريطة|لوكيشن|احداثيات|وين صاير)/i.test(t)) {
    return {
      text: isAr
        ? 'يقع المشروع المقترح في **وادي البحير، بالمحافظة الجنوبية في مملكة البحرين** (بين سند والرفاع الشرقي) 📍.\n\n• **الإحداثيات على خرائط Google**: `26°08\'31.2"N 50°33\'46.8"E` (26.142000, 50.563000).\n• يبعد قرابة **١٥ دقيقة فقط** بالسيارة عن العاصمة المنامة.\n• يتميز بتكوينات صخرية وتلال جيرية فريدة ومسطحات مائية دائمة تجذب أسراب الطيور.\n• في يوليو 2022، صدرت توجيهات رسمية بمملكة البحرين لحماية تضاريس وادي البحير البيئية وصونها.'
        : 'The proposed location is **Wadi Al Buhair in Bahrain’s Southern Governorate** (between Riffa and Sanad) 📍.\n\n• **Google Maps Coordinates**: `26°08\'31.2"N 50°33\'46.8"E` (26.142000, 50.563000).\n• Approximately **15 minutes by road** from Manama.\n• Features ancient limestone ridges, tranquil wetlands, and seasonal migratory routes.\n• In July 2022, official directives were enacted in Bahrain to safeguard this unique geological habitat.',
      suggestions: isAr
        ? ['شنو المحطات الأربع؟', 'هل بَراح مفتوح حاليًا؟', 'شنو الفعاليات المقترحة؟']
        : ['What are the 4 stations?', 'Is BARAH currently open?', 'What are the proposed events?'],
    };
  }

  // 4. المحطات الأربع
  if (/(محطات|المحطات|شنو المحطات|المحطة|بوابة|درب|مرصد|مجلس)/i.test(t)) {
    return {
      text: isAr
        ? 'تتألف وجهة بَراح من **أربع محطات متكاملة** تروي حكاية الوادي 🗺️:\n\n' +
          '1. **بوابة بَراح**: مركز الوصول والترحيب، تقديم الإرشادات البيئية، ومتجر التذكارات المستدامة.\n' +
          '2. **درب بَراح**: ممشى خشبي مرتفع مصمم لحماية طبقات الصخور الرسوبية مع نقاط استراحة وتأمل.\n' +
          '3. **مرصد بَراح**: مقصورة هادئة مظللة تطل على مياه البحيرة لمراقبة الطيور النادرة بمناظير متطورة.\n' +
          '4. **مجلس بَراح**: جلسات مستوحاة من العريش التراثي لتقديم القهوة البحرينية والتمر وحكايات الأرض.'
        : 'BARAH features **four connected stations** along the landscape 🗺️:\n\n' +
          '1. **BARAH Gateway**: Arrival, eco-briefing, and sustainable keepsakes boutique.\n' +
          '2. **BARAH Trail**: Raised timber boardwalk preserving fragile limestone strata.\n' +
          '3. **BARAH Observatory**: Shaded, acoustically buffered hide overlooking wetland pools with high-grade optical binoculars.\n' +
          '4. **BARAH Majlis**: Shaded heritage seating offering traditional Bahraini coffee, dates, and quiet hospitality.',
      suggestions: isAr
        ? ['شنو الفعاليات المقترحة؟', 'شنو أقدر أشتري من ذكرى بَراح؟', 'شلون أخطط لزيارتي؟']
        : ['What are the proposed events?', 'What can I buy from keepsakes?', 'How do I plan a visit?'],
    };
  }

  // 5. الفعاليات والأنشطة
  if (/(فعاليات|فعالية|نشاط|انشطة|اثرك في براح|ليالي براح|عدسة براح|صباح الطيور|مستكشف|غرس)/i.test(t)) {
    return {
      text: isAr
        ? 'يضم بَراح **١٠ فعاليات ومبادرات مقترحة** تلبي مختلف الاهتمامات 🌿:\n\n' +
          '• **أثرك في بَراح** (رئيسية): مشاركة الزوار في غرس شتلات فطرية محلية (كالسدر والغاف).\n' +
          '• **ليالي بَراح** (شتوية): جلسات مراقبة النجوم والفلك ودفء المجلس والضيافة.\n' +
          '• **عدسة بَراح**: ورش تصوير طبيعي في ساعة الغروب الذهبية.\n' +
          '• **صباح الطيور**: رصد مبكر للطيور في المرصد مع بزوغ الضوء الأول.\n' +
          '• **مستكشف بَراح الصغير**: برنامج عائلي تفاعلي للأطفال مع حقيبة وجواز استكشاف.\n' +
          '• **خطوات في الطبيعة**: جولات مشي إرشادية وتفسير لتاريخ التكوين الجيولوجي.\n' +
          '• **حكايات من البحرين**: أمسيات تراثية وسرد قصصي في المجلس.\n' +
          '• **ورش الطبيعة**: ورش تطبيقية لزراعة البذور والرسم البيئي.\n' +
          '• **غرسة للوادي** (21 مارس): احتفاء سنوي باليوم الدولي للغابات.\n' +
          '• **بَراح بلا أثر** (20 سبتمبر): حملة مجتمعية سنوية في اليوم العالمي للتنظيف.'
        : 'BARAH proposes **10 seasonal events and conservation initiatives** 🌿:\n\n' +
          '• **Your Trace in BARAH**: Native planting (Sidr, Ghaf) under ecological guidance.\n' +
          '• **BARAH Nights**: Winter fireside gatherings, astronomy, and hospitality.\n' +
          '• **BARAH Through the Lens**: Golden-hour landscape photography.\n' +
          '• **Birdwatching Mornings**: First-light observation at the hides.\n' +
          '• **Junior Explorer**: Hands-on discovery kit and field passport for youth.\n' +
          '• **Steps in Nature**: Guided educational walks on the raised boardwalk.\n' +
          '• **Stories from Bahrain**: Cultural evenings and fireside dialogues.\n' +
          '• **Nature Workshops**: Native seed propagation and outdoor sketching.\n' +
          '• **A Seedling for the Valley**: Annual observance on 21 March (Forest Day).\n' +
          '• **BARAH, Leave No Litter**: Community cleanup on 20 September (World Cleanup Day).',
      suggestions: isAr
        ? ['شنو أقدر أشتري من ذكرى بَراح؟', 'شلون أخطط لزيارتي؟', 'هل بَراح مفتوح حاليًا؟']
        : ['What can I buy from keepsakes?', 'How do I plan a visit?', 'Is BARAH currently open?'],
    };
  }

  // 6. ذكرى بَراح والمقتنيات والأسعار
  if (/(ذكرى|متجر|منتجات|مقتنيات|شراء|اشتري|تيشيرت|كوب|دفتر|هدايا|اسعار|سعر|بكم|جم)/i.test(t)) {
    return {
      text: isAr
        ? '«ذكرى بَراح» تضم **٢٧ منتجاً ومقتنى تذكارياً مستداماً** موزعة على ٧ فئات 🎁:\n\n' +
          '• **أكواب ومستلزمات**: كوب سيراميكي (3.5 د.ب)، تمبلر (4.0 د.ب)، مطارة ماء (5.0 د.ب).\n' +
          '• **مقتنيات يومية**: حقيبة قماشية (4.5 د.ب)، تيشيرت (7.0 د.ب)، قبعة (5.5 د.ب)، حقيبة المصور (22 د.ب).\n' +
          '• **قرطاسية**: دفاتر توثيق وأقلام (من 2.0 إلى 4.5 د.ب).\n' +
          '• **مطبوعات وتذكارات**: بطاقات بريدية، فواصل كتب، وكتاب مصور (من 1.0 إلى 12.0 د.ب).\n' +
          '• **تذكارات بَراح**: ميداليات، مغناطيس صخري، دبوس معدني، ومجسم الوادي (2.0 - 8.0 د.ب).\n' +
          '• **الطيور والاستكشاف**: بطاقات الطيور، دفتر الرصد، وجواز المستكشف (من 2.5 إلى 14.0 د.ب).\n' +
          '• **علب الهدايا**: علب صغيرة وفاخرة وصناديق مؤسسية (من 6.0 إلى 19.0 د.ب).\n\n' +
          '💡 *ملاحظة*: المقتنيات مخصصة لمتجر مركز الزوار عند افتتاح المشروع مستقبلاً، ولا يوجد طلب أونلاين حالياً.'
        : 'The BARAH Keepsakes collection offers **27 curated design items** across 7 categories 🎁:\n\n' +
          '• **Drinkware**: Ceramic mug (3.5 BHD), tumbler (4.0 BHD), water bottle (5.0 BHD).\n' +
          '• **Everyday Essentials**: Canvas tote (4.5 BHD), cotton T-shirt (7.0 BHD), olive cap (5.5 BHD).\n' +
          '• **Stationery**: Notebooks and metallic signature pen (2.0 to 4.5 BHD).\n' +
          '• **Prints & Keepsakes**: Postcards, bookmarks, and photo book (1.0 to 12.0 BHD).\n' +
          '• **BARAH Souvenirs**: Enamel pin, stone magnet, keychain, miniature (2.0 to 8.0 BHD).\n' +
          '• **Birdwatching & Exploration**: Illustrated bird cards, checklists, explorer kit (2.5 to 14.0 BHD).\n' +
          '• **Gift Boxes**: Curated presentation boxes (6.0 to 19.0 BHD).\n\n' +
          '💡 *Note*: Keepsakes are designed for the on-site arrival centre boutique upon future opening.',
      suggestions: isAr
        ? ['شلون أخطط لزيارتي؟', 'هل بَراح مفتوح حاليًا؟', 'شنو المحطات الأربع؟']
        : ['How do I plan a visit?', 'Is BARAH currently open?', 'What are the 4 stations?'],
    };
  }

  // 7. شلون أخطط لزيارتي؟ / التخطيط والتذاكر
  if (/(اخطط|تخطيط|تذكرة|تذاكر|مسار الزيارة|حجز|تصريح|خطة زيارة|خطوات الزيارة)/i.test(t)) {
    return {
      text: isAr
        ? 'يمكنك تجربة **أداة التخطيط التفاعلية** في صفحة «خطط لزيارتك» 🎫:\n\n' +
          '1. اختيار نوع التجربة (ممشى الدرب، رصد الطيور، زيارة تعليمية، أو مجلس الغروب).\n' +
          '2. تحديد عدد الزوار والأنشطة الإضافية (غرس شتلة، استئجار منظار، ضيافة المجلس).\n' +
          '3. استخراج **تصريح الزيارة الرقمي الرسمي** كنموذج تذكاري توضيحي.\n\n' +
          'تنويه: الأداة تفاعلية لأغراض العرض الأكاديمي لمشروع التخرج ولا تنشئ حجزاً حقيقياً ملزماً.'
        : 'You can test our **interactive itinerary builder** on the Visit page 🎫:\n\n' +
          '1. Select your preferred experience (Boardwalk, Birdwatching, Educational, or Majlis).\n' +
          '2. Choose guest numbers and add-ons (tree planting, spotting binoculars, majlis refreshments).\n' +
          '3. Generate a personalized **official digital boarding pass**.\n\n' +
          'Note: The planner is an interactive demonstration for academic presentation and does not create an active legal reservation.',
      suggestions: isAr
        ? ['هل بَراح مفتوح حاليًا؟', 'شنو المحطات الأربع؟', 'شنو الفعاليات المقترحة؟']
        : ['Is BARAH currently open?', 'What are the 4 stations?', 'What are the proposed events?'],
    };
  }

  // 8. الطيور والحياة الفطرية
  if (/(طيور|طير|فلامنغو|نحام|بلبل|وروار|حياة فطرية|نباتات|اشجار|سدر|غاف)/i.test(t)) {
    return {
      text: isAr
        ? 'وادي البحير واحة طبيعية ومحطة هجرة هامة في البحرين تضم أكثر من **٥٠ نوعاً من الطيور** 🪶:\n\n' +
          '• **طائر الفلامنغو الكبير (النحام)** في مياه البحيرة الهادئة.\n' +
          '• **البلبل البحريني الأصيل** بصوته العذب بين شجيرات السدر.\n' +
          '• **طائر الوروار الأوروبي** وطيور الرفراف المائية.\n' +
          '• نباتات فطرية مقاومة للملوحة مثل السدر، الغاف، الغردق، والقصب المائي.\n\n' +
          'مرصد بَراح مصمم بنوافذ مراقبة وعزل صوتي حتى لا يتأثر استقرار الطيور.'
        : 'Wadi Al Buhair is an essential wetland sanctuary in Bahrain hosting **over 50 bird species** 🪶:\n\n' +
          '• **Greater Flamingo** feeding in tranquil brackish shallows.\n' +
          '• **White-cheeked Bulbul**, the authentic songbird of Bahrain.\n' +
          '• **European Bee-eater** and Common Kingfisher.\n' +
          '• Native flora including Sidr, Ghaf, Nitraria, and marsh reeds.\n\n' +
          'The BARAH Observatory features acoustic dampening and low-angle viewing slits to ensure zero disturbance.',
      suggestions: isAr
        ? ['شنو المحطات الأربع؟', 'وين موقع المشروع؟', 'هل بَراح مفتوح حاليًا؟']
        : ['What are the 4 stations?', 'Where is it located?', 'Is BARAH currently open?'],
    };
  }

  // 9. الاستدامة والبيئة والتصميم
  if (/(استدامة|بيئة|تصميم|حماية|تأثير|خفيف|موائل|مبادئ)/i.test(t)) {
    return {
      text: isAr
        ? 'تقوم استدامة بَراح على **أربعة مبادئ بيئية راسخة** 🛡️:\n\n' +
          '1. **تدخل خفيف**: مرافق مرتفعة على أوتاد خشبية قابلة للفك دون خرسانة ثقيلة.\n' +
          '2. **حماية الموائل**: مسارات محددة تمنع الدوس على النباتات الفطرية أو الاقتراب الجائر من أعشاش الطيور.\n' +
          '3. **إدارة واعية**: إضاءة ليلية شمسية خافتة لا تربك الكائنات الليلية، وسياسة صارمة لمنع المخلفات.\n' +
          '4. **معرفة قبل الزيارة**: إرشادات واضحة للزوار تعزز السلوك المسؤول.\n' +
          'المشروع متوافق مع أهداف التنمية المستدامة للأمم المتحدة (الأهداف 15 و11 و12 و4).'
        : 'BARAH’s environmental framework rests on **four core sustainability pillars** 🛡️:\n\n' +
          '1. **Light-touch Design**: Demountable timber structures elevated on piles without deep concrete footing.\n' +
          '2. **Habitat Protection**: Designated pathways safeguarding wetland fringes and nesting areas.\n' +
          '3. **Thoughtful Operations**: Low-lumen solar guidance and zero-waste ethos.\n' +
          '4. **Learn Before Visiting**: Responsible visitor guidelines.\n' +
          'Directly aligned with UN Sustainable Development Goals (SDGs 15, 11, 12, 4).',
      suggestions: isAr
        ? ['شنو المحطات الأربع؟', 'وين موقع المشروع؟', 'هل بَراح مفتوح حاليًا؟']
        : ['What are the 4 stations?', 'Where is it located?', 'Is BARAH currently open?'],
    };
  }

  // 10. التحيات والسوالف بالبحريني والخليجي
  if (/^(هلا|اهلين|مرحبا|سلام|السلام عليكم|شحالك|شخبارك|شلونك|علومك|يا هلا|حي الله|صبحكم الله|مساكم الله)/i.test(t)) {
    return {
      text: isAr
        ? 'يا هلا والله ومسهلا بك في «بَراح» بوادي البحير! نورتنا وأسفرت وأنورت 🌿. أنا مرشدك الذكي، موجود لأي استفسار عن قصة الوادي، المحطات الأربع، الفعاليات المقترحة، أو حتى لو ودك نسولف عن جمال الطبيعة في البحرين. آمرني وش في خاطرك اليوم؟'
        : 'Welcome to BARAH at Wadi Al Buhair! 🌿 I am your AI Eco-Guide. I am here to share the story of the valley, our four proposed stations, seasonal events, keepsakes, and conservation philosophy. How may I assist you today?',
      suggestions: isAr
        ? ['شنو فكرة بَراح؟', 'وين موقع المشروع؟', 'هل بَراح مفتوح حاليًا؟']
        : ['What is the concept of BARAH?', 'Where is it located?', 'Is BARAH currently open?'],
    };
  }

  // 11. الشكر والثناء
  if (/(شكرا|مشكور|تسلم|يعطيك العافية|ما قصرت|كفو|حبيبي|شكراً)/i.test(t)) {
    return {
      text: isAr
        ? 'الله يسلمك ويعافيك يا غالي! ما سوينا إلا الواجب 🌿. هدفنا نوصل حكاية وادي البحير وجمال بيئة البحرين بكل صدق وأمانة. إذا عندك أي سؤال ثاني عن المحطات أو الفعاليات أو الهدايا أنا حاضر وبخدمتك بأي وقت!'
        : 'You are most welcome! 🌿 It is a pleasure sharing the story of Wadi Al Buhair. Feel free to ask anytime about our stations, events, or keepsakes.',
      suggestions: isAr
        ? ['شنو المحطات الأربع؟', 'شنو الفعاليات المقترحة؟', 'شلون أخطط لزيارتي؟']
        : ['What are the 4 stations?', 'What are the proposed events?', 'How do I plan a visit?'],
    };
  }

  // Default general grounded response
  return {
    text: isAr
      ? `يا مرحب بك في «بَراح» بوادي البحير 🌿.\n\nبَراح مشروع بيئي وسياحي مقترح بمملكة البحرين تحت شعار **«للأرض حكاية»**، يهدف لحماية التكوينات الجيولوجية النادرة عبر ٤ محطات وممشى خشبي مرتفع ومقتنيات مستدامة.\n\nتحب تستفسر عن المحطات، الفعاليات المقترحة، موقع الوادي، أو كيفية التخطيط لزيارتك؟`
      : `Welcome to BARAH at Wadi Al Buhair 🌿.\n\nBARAH is a proposed eco-tourism destination in the Kingdom of Bahrain under the motto **"Every land has a story"**, dedicated to low-impact conservation through 4 stations, elevated boardwalks, and sustainable keepsakes.\n\nWould you like to explore our stations, proposed events, location, or visit planner?`,
    suggestions: isAr
      ? ['شنو فكرة بَراح؟', 'وين موقع المشروع؟', 'هل بَراح مفتوح حاليًا؟']
      : ['What is the concept of BARAH?', 'Where is it located?', 'Is BARAH currently open?'],
  };
}

// POST /api/chat
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, dialect = 'saudi' }: ChatRequestBody = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'الرسائل مطلوبة للدردشة' });
    }

    const lastMessage = messages[messages.length - 1]?.text || '';
    const isAr = dialect !== 'english';

    // Check if GEMINI_API_KEY is available and valid
    if (
      process.env.GEMINI_API_KEY &&
      process.env.GEMINI_API_KEY.trim() !== '' &&
      process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'
    ) {
      try {
        const systemInstruction = `أنت "مرشد بَراح البيئي الذكي"، الرفيق والمرشد السياحي والبيئي لمشروع «بَراح» بوادي البحير في مملكة البحرين.
شخصيتك وأسلوبك:
- ترحب بالزوار بحرارة وكرم بحريني وخليجي أصيل ("يا هلا ومسهلا في بَراح", "حياك الله يا غالي", "نورت وادي البحير").
- تفهم اللهجة البحرينية والخليجية ومفرداتها الطبيعية (مثل: شنو، وين، شلون، جم، وايد، عساك بخير، قدوع، كشته، روقان).
- تجيب بدقة باللغتين العربية والإنجليزية استناداً حصرياً إلى المعطيات الرسمية للمشروع.
- تميز بوضوح تام بين الواقع والمقترح: عند السؤال عن مواعيد الافتتاح أو إمكانية الزيارة أو الحجز الفعلي، توضح بأمانة وشفافية أن «بَراح» مشروع تخرج وتصوّر استثماري قيد دراسة الجدوى، وليس وجهة مفتوحة للحجوزات أو الزيارة الفعلية حالياً، وأن الصور المعروضة تمثل تصورات تصميمية لمرافق المشروع المقترحة بوادي البحير.
- لا تختلق أي حقائق غير موجودة في قاعدة بيانات المشروع.

قاعدة بيانات بَراح الموثقة:
${BARAH_KNOWLEDGE}

قواعد الإجابة:
1. قدّم إجابات مباشرة، مركزة، أنيقة وسهلة القراءة.
2. نسق النص بفقرات قصيرة ومريحة.
3. في نهاية كل رد، اكتب دائماً السطر التالي بدقة:
---SUGGESTIONS---
متبوعاً بـ 3 مقترحات سريعة تفاعلية يضغط عليها المستخدم لمتابعة الحديث، سطر لكل مقترح.`;

        const contents = messages.map((m) => ({
          role: m.role === 'model' ? 'model' : 'user',
          parts: [{ text: m.text }],
        }));

        const apiCall = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: contents as any,
          config: {
            systemInstruction,
          },
        });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout')), 4500)
        );

        const response = await Promise.race([apiCall, timeoutPromise]);

        const fullText = response.text || '';
        if (fullText.trim()) {
          let reply = fullText;
          let suggestions: string[] = [];

          if (fullText.includes('---SUGGESTIONS---')) {
            const parts = fullText.split('---SUGGESTIONS---');
            reply = parts[0].trim();
            if (parts[1]) {
              suggestions = parts[1]
                .split('\n')
                .map((s) => s.trim().replace(/^[-*•\d.]+\s*/, ''))
                .filter((s) => s.length > 0 && s.length < 60)
                .slice(0, 3);
            }
          }

          if (suggestions.length === 0) {
            suggestions = isAr
              ? ['شنو فكرة بَراح؟', 'وين موقع المشروع؟', 'هل بَراح مفتوح حاليًا؟']
              : ['What is the concept of BARAH?', 'Where is it located?', 'Is BARAH currently open?'];
          }

          return res.json({
            text: reply,
            suggestions,
          });
        }
      } catch (geminiError: any) {
        console.warn('Gemini direct call failed, activating smart grounded knowledge engine:', geminiError?.message);
      }
    }

    // High-fidelity fallback conversational engine
    const smartResponse = generateSmartConversationalReply(lastMessage, isAr);
    return res.json(smartResponse);
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    const smartResponse = generateSmartConversationalReply(req.body?.messages?.slice(-1)[0]?.text || '', true);
    return res.json(smartResponse);
  }
});

// POST /api/tts - Text to Speech using Gemini 3.8 flash-lite-tts
app.post('/api/tts', async (req: Request, res: Response) => {
  try {
    const { text, voice = 'Puck' }: { text: string; voice?: string } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'النص مطلوب لتحويله لصوت' });
    }

    const cleanText = text
      .replace(/[*#_~`]/g, '')
      .replace(/---SUGGESTIONS---[\s\S]*/, '')
      .trim()
      .slice(0, 450);

    if (process.env.GEMINI_API_KEY) {
      const validVoices = ['Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'];
      const chosenVoice = validVoices.includes(voice) ? voice : 'Puck';

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: cleanText,
                speechMetadata: {
                  style: 'Natural, cheerful, expressive friendly Arabic conversational tone',
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: chosenVoice },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        return res.json({
          audioUrl: `data:audio/wav;base64,${base64Audio}`,
        });
      }
    }

    return res.status(200).json({
      fallbackToWebSpeech: true,
      text: cleanText,
    });
  } catch (error: any) {
    console.error('TTS API Error:', error);
    return res.status(200).json({
      fallbackToWebSpeech: true,
      text: req.body?.text || '',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 خادم بَراح وادي البحير يعمل على http://0.0.0.0:${PORT}`);
  });
}

startServer();
