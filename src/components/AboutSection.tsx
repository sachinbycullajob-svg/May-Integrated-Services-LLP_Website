import React from 'react';
import { ThemeMode } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { 
  Building2, 
  Award, 
  Globe2, 
  Users, 
  Sparkles,
  Target,
  Compass,
  Heart
} from 'lucide-react';

interface AboutSectionProps {
  themeMode: ThemeMode;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ themeMode }) => {
  return (
    <section id="about" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold mb-4 ${
            themeMode === 'dark' ? 'bg-maroon-900 border-maroon-800 text-beige-200' : 'bg-beige-100 border-beige-300 text-maroon-800'
          }`}>
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate Heritage & Foundation</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            themeMode === 'dark' ? 'text-white' : 'text-maroon-950'
          }`}>
            About <span className="text-maroon-600 dark:text-maroon-500">May Integrated Services LLP</span>
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${
            themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Founded with a vision to redefine global e-commerce management and cross-border trade, combining over 6 years of deep marketplace experience with modern technology and operational precision.
          </p>
        </div>

        {/* Vision, Mission & Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-md border transition-all duration-300 ${
            themeMode === 'dark' ? 'bg-maroon-900 border-maroon-800' : 'bg-beige-50 border-beige-300 shadow-sm'
          }`}>
            <div className={`p-3 w-12 h-12 rounded-md mb-4 flex items-center justify-center ${
              themeMode === 'dark' ? 'bg-maroon-800 text-maroon-500' : 'bg-beige-200 text-maroon-600'
            }`}>
              <Target className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${themeMode === 'dark' ? 'text-white' : 'text-maroon-950'}`}>
              Our Corporate Vision
            </h3>
            <p className={`text-xs leading-relaxed ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              To be the world’s most trusted multi-marketplace e-commerce enterprise, bridging global manufacturers with consumers across North America, Europe, Asia, and the Middle East through seamless technology and logistics.
            </p>
          </div>

          <div className={`p-6 rounded-md border transition-all duration-300 ${
            themeMode === 'dark' ? 'bg-maroon-900 border-maroon-800' : 'bg-beige-50 border-beige-300 shadow-sm'
          }`}>
            <div className={`p-3 w-12 h-12 rounded-md mb-4 flex items-center justify-center ${
              themeMode === 'dark' ? 'bg-maroon-800 text-maroon-500' : 'bg-beige-200 text-maroon-600'
            }`}>
              <Compass className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${themeMode === 'dark' ? 'text-white' : 'text-maroon-950'}`}>
              Our Strategic Mission
            </h3>
            <p className={`text-xs leading-relaxed ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              To build, scale, and optimize high-performing brand channels across Amazon, Flipkart, and international dropshipping platforms using data analytics, AI listing optimization, and exceptional customer service.
            </p>
          </div>

          <div className={`p-6 rounded-md border transition-all duration-300 ${
            themeMode === 'dark' ? 'bg-maroon-900 border-maroon-800' : 'bg-beige-50 border-beige-300 shadow-sm'
          }`}>
            <div className={`p-3 w-12 h-12 rounded-md mb-4 flex items-center justify-center ${
              themeMode === 'dark' ? 'bg-maroon-800 text-maroon-500' : 'bg-beige-200 text-maroon-600'
            }`}>
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${themeMode === 'dark' ? 'text-white' : 'text-maroon-950'}`}>
              Core Values & Culture
            </h3>
            <p className={`text-xs leading-relaxed ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Operational speed, 100% regulatory compliance, customer-centric care, and continuous innovation through modern technology and technical workflow automation.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
