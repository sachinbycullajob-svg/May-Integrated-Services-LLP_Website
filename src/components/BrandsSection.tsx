import React, { useState } from 'react';
import { ThemeMode, Brand } from '../types';
import { BRANDS, AUTHORIZED_BRANDS } from '../data/companyData';
import { Card3DTilt } from './Card3DTilt';
import { 
  HeartHandshake, 
  Sparkles, 
  Crown, 
  Globe2, 
  Building2, 
  ShoppingCart, 
  ShieldCheck,
  Store,
  Check
} from 'lucide-react';

interface BrandsSectionProps {
  themeMode: ThemeMode;
  onSelectBrand?: (brand: Brand) => void;
}

type FilterType = 'All' | 'In-house Brand' | 'Global Dropshipping' | 'Enterprise Venture' | 'Authorized Products';

export const BrandsSection: React.FC<BrandsSectionProps> = ({ themeMode, onSelectBrand }) => {
  const [filter, setFilter] = useState<FilterType>('All');

  const showLegalEntities = filter === 'All' || filter === 'In-house Brand' || filter === 'Global Dropshipping' || filter === 'Enterprise Venture';
  const showAuthorizedProducts = filter === 'All' || filter === 'Authorized Products';

  const filteredBrands = filter === 'All' 
    ? BRANDS 
    : BRANDS.filter((b) => b.type === filter);

  const getBrandIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-rose-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-pink-400" />;
      case 'Crown': return <Crown className="w-6 h-6 text-indigo-400" />;
      case 'Globe2': return <Globe2 className="w-6 h-6 text-pink-400" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-blue-400" />;
      case 'ShoppingCart': return <ShoppingCart className="w-6 h-6 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-amber-400" />;
      default: return <Sparkles className="w-6 h-6 text-maroon-400" />;
    }
  };

  return (
    <section id="brands" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-maroon-500/10 border border-maroon-500/30 text-maroon-400 text-xs font-semibold mb-4">
            <Crown className="w-3.5 h-3.5" />
            <span>Brand Portfolio & Dropshipping Division</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            themeMode === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Our Portfolio of <span className="text-maroon-400">Global Brands</span>
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${
            themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Consolidated under May Integrated Services LLP, each brand serves targeted global demographics across healthcare, beauty, lifestyle, and cross-border consumer essentials.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {(['All', 'In-house Brand', 'Global Dropshipping', 'Enterprise Venture', 'Authorized Products'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center space-x-1.5 ${
                filter === tab
                  ? 'bg-gradient-to-r from-maroon-500 to-blue-600 text-white shadow-lg shadow-maroon-500/25 scale-105'
                  : themeMode === 'dark'
                    ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    : 'bg-beige-50 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <span>{tab === 'Authorized Products' ? 'Authorized Products / Brands' : tab}</span>
            </button>
          ))}
        </div>

        {/* Section 1: Brand Accounts / Legal Entities */}
        {showLegalEntities && (
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800/80">
              <div>
                <div className="flex items-center space-x-2.5">
                  <span className="p-1.5 rounded-xl bg-maroon-500/10 text-maroon-400 border border-maroon-500/20">
                    <Building2 className="w-4 h-4" />
                  </span>
                  <h3 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                    themeMode === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    Brand Accounts / Legal Entities
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-maroon-500/10 text-maroon-400 border border-maroon-500/30">
                    {filteredBrands.length} {filteredBrands.length === 1 ? 'Entity' : 'Entities'}
                  </span>
                </div>
                <p className={`mt-1 text-xs sm:text-sm ${
                  themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Registered corporate operating accounts and direct marketplace storefronts under May Integrated Services LLP.
                </p>
              </div>
            </div>

            {/* Brands 3D Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBrands.map((brand) => (
                <Card3DTilt key={brand.id} glowColor="rgba(56, 189, 248, 0.2)">
                  <div className={`h-full p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                    themeMode === 'dark'
                      ? 'bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950 border-slate-800 hover:border-maroon-500/40'
                      : 'bg-beige-50 border-slate-200 shadow-xl hover:border-maroon-400'
                  }`}>
                    
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-inner">
                          {getBrandIcon(brand.iconName)}
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] font-mono uppercase font-bold text-slate-400">ESTABLISHED</span>
                          <span className="text-sm font-extrabold text-maroon-400">{brand.year}</span>
                        </div>
                      </div>

                      {/* Brand Name & Category */}
                      <div className="mb-3">
                        <div className="flex items-center space-x-2">
                          <h3 className={`text-xl font-extrabold ${
                            themeMode === 'dark' ? 'text-white' : 'text-slate-900'
                          }`}>
                            {brand.name}
                          </h3>
                          {brand.isDropshipping && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">
                              Global Dropshipping
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-maroon-400">{brand.category}</p>
                      </div>

                      <p className={`text-xs leading-relaxed mb-6 ${
                        themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {brand.description}
                      </p>
                    </div>

                    <div>
                      {/* Marketplaces Tags */}
                      <div className="mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                          Marketplace Channels
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {brand.marketplaces.map((m, idx) => (
                            <span
                              key={idx}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border ${
                                themeMode === 'dark'
                                  ? 'bg-slate-800/80 text-slate-300 border-slate-700/50'
                                  : 'bg-slate-100 text-slate-700 border-slate-200'
                              }`}
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Stats Bar */}
                      <div className={`pt-4 border-t grid grid-cols-2 gap-2 text-xs ${
                        themeMode === 'dark' ? 'border-slate-800' : 'border-slate-200'
                      }`}>
                        {brand.keyStats.map((stat, i) => (
                          <div key={i} className={`p-2 rounded-xl border ${
                            themeMode === 'dark'
                              ? 'bg-slate-800/40 border-slate-700/40'
                              : 'bg-slate-50 border-slate-200'
                          }`}>
                            <span className={`text-[10px] block ${
                              themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'
                            }`}>{stat.label}</span>
                            <span className="font-bold text-maroon-500">{stat.value}</span>
                          </div>
                        ))}
                      </div>

                    </div>

                  </div>
                </Card3DTilt>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Authorized Products / Brands */}
        {showAuthorizedProducts && (
          <div className={filter === 'All' ? 'pt-8 border-t border-slate-200 dark:border-slate-800/80' : ''}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800/80">
              <div>
                <div className="flex items-center space-x-2.5">
                  <span className="p-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <h3 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                    themeMode === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    Authorized Products / Brands
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    Authorized Retail
                  </span>
                </div>
                <p className={`mt-1 text-xs sm:text-sm ${
                  themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Officially authorized products and global brands sold under our existing legal-entity brand accounts (not separate legal-entity company accounts).
                </p>
              </div>
            </div>

            {/* Authorized Products / Brands Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-8">
              {AUTHORIZED_BRANDS.map((brand) => (
                <Card3DTilt key={brand.id} glowColor="rgba(245, 158, 11, 0.25)">
                  <div className={`h-full p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                    themeMode === 'dark'
                      ? 'bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950 border-amber-500/30 hover:border-amber-500/60'
                      : 'bg-beige-50 border-amber-500/30 shadow-xl hover:border-amber-500/60'
                  }`}>
                    
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-inner">
                          {getBrandIcon(brand.iconName)}
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] font-mono uppercase font-bold text-amber-400/90">CLASSIFICATION</span>
                          <span className="text-xs font-extrabold text-amber-500 flex items-center space-x-1">
                            <ShieldCheck className="w-3.5 h-3.5 inline mr-1" />
                            Authorized Brand
                          </span>
                        </div>
                      </div>

                      {/* Brand Name & Category */}
                      <div className="mb-3">
                        <div className="flex items-center space-x-2">
                          <h3 className={`text-xl font-extrabold ${
                            themeMode === 'dark' ? 'text-white' : 'text-slate-900'
                          }`}>
                            {brand.name}
                          </h3>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center space-x-1">
                            <Check className="w-3 h-3 inline mr-0.5" />
                            Authorized Product
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-maroon-400 mt-0.5">{brand.category}</p>
                      </div>

                      {/* Sold Under Legal Entities Attribution Badge */}
                      <div className={`p-2.5 rounded-2xl border mb-4 flex items-start space-x-2 ${
                        themeMode === 'dark'
                          ? 'bg-slate-800/50 border-slate-700/60 text-slate-300'
                          : 'bg-maroon-50/70 border-maroon-200/80 text-slate-700'
                      }`}>
                        <Store className="w-4 h-4 text-maroon-400 shrink-0 mt-0.5" />
                        <div className="text-xs leading-snug">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Sold Under Legal-Entity Accounts:
                          </span>
                          <span className="font-bold text-maroon-400">
                            {brand.soldUnder.join(' & ')}
                          </span>
                        </div>
                      </div>

                      <p className={`text-xs leading-relaxed mb-6 ${
                        themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {brand.description}
                      </p>
                    </div>

                    <div>
                      {/* Marketplaces Tags */}
                      <div className="mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                          Marketplace Channels
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {brand.marketplaces.map((m, idx) => (
                            <span
                              key={idx}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border ${
                                themeMode === 'dark'
                                  ? 'bg-slate-800/80 text-slate-300 border-slate-700/50'
                                  : 'bg-slate-100 text-slate-700 border-slate-200'
                              }`}
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Stats Bar */}
                      <div className={`pt-4 border-t grid grid-cols-2 gap-2 text-xs ${
                        themeMode === 'dark' ? 'border-slate-800' : 'border-slate-200'
                      }`}>
                        {brand.keyStats.map((stat, i) => (
                          <div key={i} className={`p-2 rounded-xl border ${
                            themeMode === 'dark'
                              ? 'bg-slate-800/40 border-slate-700/40'
                              : 'bg-slate-50 border-slate-200'
                          }`}>
                            <span className={`text-[10px] block ${
                              themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'
                            }`}>{stat.label}</span>
                            <span className="font-bold text-amber-500">{stat.value}</span>
                          </div>
                        ))}
                      </div>

                    </div>

                  </div>
                </Card3DTilt>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
