import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">ش</span>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-bold">شُغلي</h3>
                <p className="text-sm text-gray-400">Shoghlly</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              منصة الفريلانسر الرائدة في مصر والوطن العربي. شُغلك يبدأ من شُغلي
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/jobs" className="text-gray-400 hover:text-white transition-colors">الوظائف</Link></li>
              <li><Link to="/guide" className="text-gray-400 hover:text-white transition-colors">دليل البداية</Link></li>
              <li><Link to="/tools" className="text-gray-400 hover:text-white transition-colors">الأدوات</Link></li>
              <li><Link to="/community" className="text-gray-400 hover:text-white transition-colors">المجتمع</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">من نحن</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">خدماتنا</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">العمل الحر</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">التدريب</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">الاستشارات</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">الأدوات المجانية</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">الدعم الفني</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">info@shoghlly.com</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">+20 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">القاهرة، مصر</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 شُغلي - جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;