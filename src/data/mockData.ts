import { Job, Tool, Resource, CommunityPost } from '../types';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'تطوير موقع إلكتروني متكامل لشركة تجارية',
    description: 'نحتاج إلى تطوير موقع إلكتروني احترافي لشركة تجارية بتقنيات حديثة، يشمل نظام إدارة المحتوى وربط مع وسائل الدفع الإلكتروني',
    category: 'برمجة وتطوير',
    budget: { min: 5000, max: 10000 },
    duration: '30 يوم',
    skillsRequired: ['React', 'Node.js', 'MongoDB', 'التصميم التفاعلي'],
    clientId: 'client1',
    clientName: 'شركة النجاح للتجارة',
    clientRating: 4.8,
    postedDate: '2024-01-15',
    proposals: 12,
    status: 'open',
    level: 'expert'
  },
  {
    id: '2',
    title: 'تصميم هوية بصرية كاملة لمطعم',
    description: 'تصميم شعار وهوية بصرية متكاملة لمطعم جديد، يشمل الألوان والخطوط وتصميم القوائم والمطبوعات',
    category: 'تصميم جرافيك',
    budget: { min: 2000, max: 4000 },
    duration: '14 يوم',
    skillsRequired: ['Photoshop', 'Illustrator', 'تصميم الهوية البصرية'],
    clientId: 'client2',
    clientName: 'مطعم الذوق الرفيع',
    clientRating: 4.5,
    postedDate: '2024-01-14',
    proposals: 8,
    status: 'open',
    level: 'intermediate'
  },
  {
    id: '3',
    title: 'كتابة محتوى تسويقي لمواقع التواصل الاجتماعي',
    description: 'نحتاج كاتب محتوى محترف لإنشاء محتوى تسويقي جذاب لحسابات السوشيال ميديا لمدة 3 أشهر',
    category: 'كتابة وترجمة',
    budget: { min: 1500, max: 3000 },
    duration: '90 يوم',
    skillsRequired: ['كتابة المحتوى', 'التسويق الرقمي', 'إدارة وسائل التواصل'],
    clientId: 'client3',
    clientName: 'وكالة الإبداع الرقمي',
    clientRating: 4.9,
    postedDate: '2024-01-13',
    proposals: 15,
    status: 'open',
    level: 'intermediate'
  }
];

export const mockTools: Tool[] = [
  {
    id: '1',
    name: 'منشئ السيرة الذاتية',
    description: 'أنشئ سيرة ذاتية احترافية بدقائق',
    icon: 'FileText',
    category: 'أدوات الكتابة',
    isPremium: false
  },
  {
    id: '2',
    name: 'حاسبة الأسعار',
    description: 'احسب سعر مشروعك بدقة',
    icon: 'Calculator',
    category: 'أدوات الأعمال',
    isPremium: false
  },
  {
    id: '3',
    name: 'متتبع الوقت',
    description: 'تتبع وقت عملك بسهولة',
    icon: 'Clock',
    category: 'أدوات الإنتاجية',
    isPremium: true
  },
  {
    id: '4',
    name: 'منشئ خطاب التغطية',
    description: 'اكتب خطاب تغطية مقنع',
    icon: 'Mail',
    category: 'أدوات الكتابة',
    isPremium: false
  }
];

export const mockResources: Resource[] = [
  {
    id: '1',
    title: 'دليل المبتدئين في البرمجة',
    description: 'تعلم أساسيات البرمجة من الصفر',
    type: 'course',
    category: 'برمجة',
    url: '#',
    duration: '40 ساعة',
    level: 'beginner'
  },
  {
    id: '2',
    title: 'كيف تصبح مصمم جرافيك محترف',
    description: 'خطوات عملية لتعلم التصميم الجرافيكي',
    type: 'video',
    category: 'تصميم',
    url: '#',
    duration: '2 ساعة',
    level: 'intermediate'
  },
  {
    id: '3',
    title: 'نماذج سيرة ذاتية احترافية',
    description: 'مجموعة من النماذج الجاهزة للاستخدام',
    type: 'template',
    category: 'أدوات',
    url: '#',
    level: 'beginner'
  }
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: '1',
    title: 'كيف أبدأ كفريلانسر مبتدئ؟',
    content: 'أريد نصائح للبدء في العمل الحر، ما هي أفضل الطرق لبناء ملف شخصي قوي؟',
    author: 'أحمد محمد',
    authorId: 'user1',
    category: 'نصائح',
    replies: 5,
    likes: 12,
    postedDate: '2024-01-15',
    tags: ['مبتدئ', 'نصائح', 'بناء الملف الشخصي']
  },
  {
    id: '2',
    title: 'تجربتي في تحقيق 10,000 جنيه في أول شهر',
    content: 'أشارككم تجربتي في العمل الحر وكيف تمكنت من تحقيق دخل ممتاز في البداية',
    author: 'سارة أحمد',
    authorId: 'user2',
    category: 'قصص نجاح',
    replies: 23,
    likes: 45,
    postedDate: '2024-01-14',
    tags: ['قصة نجاح', 'تحفيز', 'دخل']
  }
];

export const jobCategories = [
  { name: 'برمجة وتطوير', icon: 'Code', count: 245 },
  { name: 'تصميم جرافيك', icon: 'Palette', count: 189 },
  { name: 'كتابة وترجمة', icon: 'PenTool', count: 156 },
  { name: 'التسويق الرقمي', icon: 'TrendingUp', count: 123 },
  { name: 'إدخال البيانات', icon: 'Database', count: 98 },
  { name: 'التصوير والمونتاج', icon: 'Camera', count: 87 },
  { name: 'الصوتيات', icon: 'Mic', count: 65 },
  { name: 'الاستشارات', icon: 'MessageCircle', count: 54 }
];