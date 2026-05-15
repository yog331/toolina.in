import React, { useState, useMemo, useEffect } from 'react';
import ShareWidget from '../components/ShareWidget';
import SEO from '../components/SEO';
import StarRatingWidget from '../components/StarRatingWidget';
import { 
  PAY_LEVELS, 
  PAY_MATRIX,
  MAJOR_CITIES,
  DEPARTMENT_DATA,
  MESS_RATE_PRESETS,
  HARD_DUTY_PRESETS,
  getHraRate,
  getCCARate,
  NPA_PERCENT,
  WASH_ALLOWANCE_FIXED,
  RGHS_SLABS as DEFAULT_RGHS, 
  SI_SLABS as DEFAULT_SI, 
  GPF_SLABS as DEFAULT_GPF,
  GRADE_PAY_MAP
} from './constants';
import { SalaryState, CalculatedResult, Slab, SISlab } from './types';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip
} from 'recharts';
import { 
  Landmark, User, ChevronUp, ChevronDown, Banknote, 
  Layers, Utensils, ShieldHalf, Building2, BriefcaseMedical, 
  Shirt, TreePine, FileCheck, Info, ArrowUp, MinusCircle, 
  PlusCircle, CalendarCheck, Coins, Calculator, 
  Table, PieChart as PieChartIcon, Book, BookOpen, ShieldCheck
} from 'lucide-react';

const COLORS = ['#0d9488', '#0f766e', '#14b8a6', '#5eead4', '#2dd4bf', '#99f6e4'];

const RajasthanSalary: React.FC = () => {
  const [ratingInfo, setRatingInfo] = useState<{rating: number, count: number}>({ rating: 4.6, count: 137 });

    // SEO Optimization
  useEffect(() => {
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", "Calculate Rajasthan State Government Employee Salary as per 7th Pay Commission. Includes DA, HRA, Arrears, GPF/NPS deductions, and detailed pay breakdown for all departments.");

    // Structured Data (JSON-LD)
    const scriptId = "rajasthan-salary-json-ld";
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Rajasthan Govt Salary Calculator",
      "description": "Salary calculation tool for Rajasthan government employees based on the 7th Pay Commission rules.",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "All",
      "author": {
        "@type": "Organization",
        "name": "Toolina"
      }
    });

    return () => { script?.remove(); };
  }, []);

  const [showOptional, setShowOptional] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  
  const [rghsSlabs] = useState<Slab[]>(DEFAULT_RGHS);
  const [siSlabs] = useState<SISlab[]>(DEFAULT_SI);
  const [gpfSlabs] = useState<Slab[]>(DEFAULT_GPF);

  const [salary, setSalary] = useState<SalaryState>({
    department: 'None',
    post: 'None',
    basicPay: 33800,
    level: 'L-10',
    daRate: 58,
    hraCategory: 'Z',
    cityName: 'Other Cities',
    hasCca: true,
    hasNpa: false,
    hasWash: false,
    hasMess: false,
    hasRural: false,
    hasHardDuty: false,
    manualMessRate: 0,
    manualHardDutyRate: 0,
    manualRuralRate: 1000,
    otherAllowances: 0,
    arrears: 0,
    pensionType: 'GPF',
    siDeduction: 2200,
    gpfDeduction: 0,
    rghsDeduction: 0,
    incomeTax: 0,
    otherDeductions: 0
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.da_rate) {
          setSalary(prev => ({ ...prev, daRate: data.da_rate }));
        }
      })
      .catch(err => console.error("Failed to fetch DA rate:", err));
  }, []);

  const currentDepartment = useMemo(() => 
    DEPARTMENT_DATA.find(d => d.name === salary.department) || null
  , [salary.department]);

  const eligibleSiRates = useMemo(() => {
    const basic = Number(salary.basicPay) || 0;
    const baseIndex = siSlabs.findIndex(s => basic >= s.minPay && basic <= s.maxPay);
    if (baseIndex === -1) return [siSlabs[siSlabs.length - 1]?.rate || 0];
    
    const rates = [];
    for (let i = 0; i < 3; i++) {
      if (siSlabs[baseIndex + i]) {
        rates.push(siSlabs[baseIndex + i].rate);
      }
    }
    return rates.length > 0 ? rates : [0];
  }, [salary.basicPay, siSlabs]);

  const results = useMemo((): CalculatedResult => {
    const basic = Number(salary.basicPay) || 0;
    const daRate = Number(salary.daRate) || 0;
    
    // NPA is treated as pay for DA and HRA calculation in Rajasthan
    const npaAmount = salary.hasNpa ? Math.round(basic * NPA_PERCENT) : 0;
    const payForAllowances = basic + npaAmount;
    
    const daAmount = Math.round((payForAllowances * daRate) / 100);
    const hraRate = getHraRate(salary.hraCategory, daRate);
    const hraAmount = Math.round((payForAllowances * hraRate) / 100);
    
    const ccaAmount = salary.hasCca ? getCCARate(basic, salary.cityName) : 0;
    const washAmount = salary.hasWash ? WASH_ALLOWANCE_FIXED : 0;
    const messAmount = salary.hasMess ? (Number(salary.manualMessRate) || 0) : 0;
    const hardDutyAmount = salary.hasHardDuty ? (Number(salary.manualHardDutyRate) || 0) : 0; 
    const ruralAmount = salary.hasRural ? (Number(salary.manualRuralRate) || 0) : 0;
    const arrearsAmount = Number(salary.arrears) || 0;

    const optionalTotal = ccaAmount + npaAmount + washAmount + messAmount + hardDutyAmount + ruralAmount + (Number(salary.otherAllowances) || 0);
    const totalAllowances = daAmount + hraAmount + optionalTotal;
    const grossPay = basic + totalAllowances + arrearsAmount;
    const totalDeductions = (Number(salary.siDeduction) || 0) + (Number(salary.gpfDeduction) || 0) + (Number(salary.rghsDeduction) || 0) + (Number(salary.incomeTax) || 0) + (Number(salary.otherDeductions) || 0);
    
    return { 
      grossPay, totalDeductions, netPay: Math.max(0, grossPay - totalDeductions), 
      arrearsAmount,
      daAmount, hraAmount, hraRate, optionalTotal, totalAllowances,
      ccaAmount, npaAmount, washAmount, messAmount, ruralAmount, hardDutyAmount
    };
  }, [salary]);

  const handleDepartmentChange = (deptName: string) => {
    const dept = DEPARTMENT_DATA.find(d => d.name === deptName);
    if (dept) {
      const post = dept.posts[0];
      setSalary(prev => ({ 
        ...prev, 
        department: deptName, 
        post: post.title, 
        level: post.level,
        basicPay: post.initialPay,
        manualMessRate: post.messRate || 0,
        manualHardDutyRate: post.hardDutyRate || 0,
        manualRuralRate: post.ruralRate || 1000,
        hasMess: (post.messRate || 0) > 0,
        hasHardDuty: (post.hardDutyRate || 0) > 0,
        hasRural: (post.ruralRate || 0) > 0
      }));
    } else {
      setSalary(prev => ({ ...prev, department: deptName, post: 'None' }));
    }
  };

  const handlePostChange = (postTitle: string) => {
    if (currentDepartment) {
      const post = currentDepartment.posts.find(p => p.title === postTitle);
      if (post) {
        setSalary(prev => ({ 
          ...prev, 
          post: postTitle, 
          level: post.level,
          basicPay: post.initialPay,
          manualMessRate: post.messRate || 0,
          manualHardDutyRate: post.hardDutyRate || 0,
          manualRuralRate: post.ruralRate || 1000,
          hasMess: (post.messRate || 0) > 0,
          hasHardDuty: (post.hardDutyRate || 0) > 0,
          hasRural: (post.ruralRate || 0) > 0
        }));
      }
    }
  };

  const handleLevelChange = (newLevel: string) => {
    const availableSteps = PAY_MATRIX[newLevel] || [0];
    setSalary(prev => ({ ...prev, level: newLevel, basicPay: availableSteps[0] }));
  };

  const handleCityChange = (cityName: string) => {
    const city = MAJOR_CITIES.find(c => c.name === cityName);
    if (city) setSalary(prev => ({ ...prev, cityName, hraCategory: city.category as 'Y' | 'Z' }));
  };

  useEffect(() => {
    const basic = Number(salary.basicPay) || 0;
    const rghs = rghsSlabs.find(s => basic <= s.maxPay)?.rate || rghsSlabs[rghsSlabs.length - 1].rate;
    const baseSiRate = eligibleSiRates[0] || 0;
    const isCurrentSiValid = eligibleSiRates.includes(salary.siDeduction);
    
    let pensionDed = 0;
    if (salary.pensionType === 'NPS') {
      const daAmount = Math.round((basic * (Number(salary.daRate) || 0)) / 100);
      pensionDed = Math.round((basic + daAmount) * 0.10);
    } else {
      pensionDed = gpfSlabs.find(s => basic <= s.maxPay)?.rate || gpfSlabs[gpfSlabs.length - 1].rate;
    }

    setSalary(prev => ({
      ...prev,
      rghsDeduction: rghs,
      siDeduction: isCurrentSiValid ? prev.siDeduction : baseSiRate,
      gpfDeduction: pensionDed
    }));
  }, [salary.basicPay, salary.daRate, salary.pensionType, rghsSlabs, eligibleSiRates, gpfSlabs]);

  const chartData = [
    { name: 'Basic', value: Number(salary.basicPay) || 0 },
    { name: 'DA', value: results.daAmount },
    { name: 'HRA', value: results.hraAmount },
    { name: 'Allowances', value: results.optionalTotal },
    ...(results.arrearsAmount > 0 ? [{ name: 'Arrears', value: results.arrearsAmount }] : []),
  ];

  const takeHomeRatio = results.grossPay > 0 ? Math.round((results.netPay / results.grossPay) * 100) : 0;

  const colorMap: Record<string, { text: string, bg: string }> = {
    teal: { text: 'text-teal-500', bg: 'bg-teal-50' },
    emerald: { text: 'text-emerald-500', bg: 'bg-emerald-50' },
    amber: { text: 'text-amber-500', bg: 'bg-amber-50' },
    pink: { text: 'text-pink-500', bg: 'bg-pink-50' },
    rose: { text: 'text-rose-500', bg: 'bg-rose-50' }
  };

  return (
    <article className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <SEO title="Rajasthan Govt Salary Calculator - 7th Pay Commission | Toolina" description="Free professional calculator and internal tool by Toolina. Accurate, fast, and easy to use." 
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Rajasthan Govt Salary Calculator - 7th Pay Commission",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "All",
          "aggregateRating": {
             "@type": "AggregateRating",
             "ratingValue": ratingInfo.rating.toString(),
             "ratingCount": ratingInfo.count.toString()
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }}
      />
      <header className="bg-white p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-100/50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-50 rounded-bl-[15rem] -mr-20 -mt-20 opacity-50 blur-3xl"></div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-teal-600 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center text-3xl md:text-4xl shadow-xl shadow-teal-100 text-white shrink-0">
              <Landmark className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight leading-none">
                Rajasthan Govt <span className="text-teal-600">Salary Calculator</span>
              </h1>
              <p className="text-slate-500 font-medium text-xs md:text-lg mt-1 italic">7th Pay Commission Salary Calculator</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="bg-slate-100 px-4 py-2 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-200">
              Rule Compliance: Rajasthan RSR
            </div>
            <div className="flex items-center gap-2 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-100">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
              <span className="text-[10px] font-black text-teal-700 uppercase tracking-widest">Live Calculation</span>
            </div>
          </div>
        </div>
      </header>

      <main className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Employee Profile & Core Pay */}
            <section className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-100">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Employee Profile</h3>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                  <ShieldCheck className="w-3 h-3" />
                  Verified RSR 2025
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Department</label>
                  <div className="relative">
                    <select 
                      value={salary.department} 
                      onChange={(e) => handleDepartmentChange(e.target.value)} 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-800 outline-none focus:ring-4 ring-teal-50 transition-all cursor-pointer appearance-none"
                    >
                      <option value="None">None (Manual Entry)</option>
                      {[...DEPARTMENT_DATA].sort((a, b) => a.name.localeCompare(b.name)).map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Designation</label>
                  <div className="relative">
                    <select 
                      value={salary.post} 
                      onChange={(e) => handlePostChange(e.target.value)} 
                      disabled={salary.department === 'None'}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-800 outline-none focus:ring-4 ring-teal-50 transition-all disabled:opacity-50 cursor-pointer appearance-none"
                    >
                      {currentDepartment ? (
                        [...currentDepartment.posts].sort((a, b) => a.title.localeCompare(b.title)).map(p => (
                          <option key={p.title} value={p.title}>{p.title}</option>
                        ))
                      ) : (
                        <option value="None">Select Department First</option>
                      )}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pay Level</label>
                  <div className="relative">
                    <select 
                      value={salary.level} 
                      onChange={(e) => handleLevelChange(e.target.value)} 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-800 outline-none focus:ring-4 ring-teal-50 transition-all cursor-pointer appearance-none"
                    >
                      {PAY_LEVELS.map(level => (
                        <option key={level} value={level}>{level} (GP: {GRADE_PAY_MAP[level]})</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Basic Pay</label>
                  <div className="relative">
                    <select 
                      value={salary.basicPay} 
                      onChange={(e) => setSalary({...salary, basicPay: parseInt(e.target.value) || 0})} 
                      className="w-full bg-teal-50 border border-teal-100 rounded-2xl p-4 text-sm font-black text-teal-700 outline-none focus:ring-4 ring-teal-50 transition-all cursor-pointer appearance-none"
                    >
                      {(PAY_MATRIX[salary.level] || []).map(pay => (
                        <option key={pay} value={pay}>₹{pay.toLocaleString('en-IN')}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-600 pointer-events-none" />
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Allowances & Perks */}
            <section className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-100">
                    <Coins className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Allowances & Perks</h3>
                </div>
                <div className="bg-amber-50 px-4 py-1.5 rounded-full border border-amber-100">
                  <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Total: ₹{results.totalAllowances.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* DA Card */}
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dearness Allowance (DA)</label>
                      <div className="text-2xl font-black text-slate-800">
                        ₹{results.daAmount.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                      <input 
                        type="number" 
                        value={salary.daRate} 
                        onChange={(e) => setSalary({...salary, daRate: parseFloat(e.target.value) || 0})}
                        className="w-12 bg-transparent text-lg font-black text-teal-600 text-center outline-none"
                      />
                      <span className="text-sm font-black text-slate-400">%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <input 
                      type="range" min="0" max="100" step="1" 
                      value={salary.daRate} 
                      onChange={(e) => setSalary({...salary, daRate: parseFloat(e.target.value) || 0})} 
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600" 
                    />
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {[50, 54, 58].map(rate => (
                      <button
                        key={rate}
                        onClick={() => setSalary({...salary, daRate: rate})}
                        className={`flex-1 py-2 rounded-xl text-[10px] font-black transition-all border ${salary.daRate === rate ? 'bg-teal-600 text-white border-teal-600 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:border-teal-200 hover:text-teal-600'}`}
                      >
                        {rate}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* City Category / HRA Card */}
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">City Category (HRA)</label>
                      <div className="text-2xl font-black text-slate-800">
                        ₹{results.hraAmount.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-black text-emerald-600 uppercase bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                        HRA Rate: {results.hraRate}%
                      </span>
                      {salary.hasCca && results.ccaAmount > 0 && (
                        <span className="text-[9px] font-bold text-slate-500">
                          + ₹{results.ccaAmount} CCA
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">Category Y (Higher HRA)</div>
                    <div className="grid grid-cols-3 gap-2">
                      {MAJOR_CITIES.filter(c => c.category === 'Y').map(city => (
                        <button 
                          key={city.name} 
                          onClick={() => handleCityChange(city.name)} 
                          className={`py-2 rounded-xl text-[10px] font-black uppercase transition-all border ${salary.cityName === city.name ? 'bg-teal-600 text-white border-teal-600 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:border-teal-200 hover:text-teal-600'}`}
                        >
                          {city.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">Category Z (Standard HRA)</div>
                    <div className="grid grid-cols-1 gap-2">
                      {MAJOR_CITIES.filter(c => c.category === 'Z').map(city => (
                        <button 
                          key={city.name} 
                          onClick={() => handleCityChange(city.name)} 
                          className={`py-2.5 rounded-xl text-[10px] font-black uppercase transition-all border ${salary.cityName === city.name ? 'bg-teal-600 text-white border-teal-600 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:border-teal-200 hover:text-teal-600'}`}
                        >
                          {city.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Toggleable Allowances Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  { label: 'CCA', field: 'hasCca', icon: Building2, amount: getCCARate(Number(salary.basicPay) || 0, salary.cityName) },
                  { label: 'NPA', field: 'hasNpa', icon: BriefcaseMedical, amount: Math.round((Number(salary.basicPay) || 0) * NPA_PERCENT) },
                  { label: 'Wash', field: 'hasWash', icon: Shirt, amount: WASH_ALLOWANCE_FIXED },
                  { label: 'Rural', field: 'hasRural', icon: TreePine, amount: Number(salary.manualRuralRate) || 0 },
                  { label: 'Mess', field: 'hasMess', icon: Utensils, amount: Number(salary.manualMessRate) || 0 },
                  { label: 'Hard Duty', field: 'hasHardDuty', icon: ShieldHalf, amount: Number(salary.manualHardDutyRate) || 0 }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = (salary as any)[item.field];
                  return (
                    <button 
                      key={item.field} 
                      onClick={() => setSalary(prev => ({ ...prev, [item.field]: !isActive }))} 
                      className={`group p-4 rounded-[1.5rem] border transition-all flex flex-col items-center gap-2 ${isActive ? 'bg-teal-600 border-teal-600 shadow-lg scale-105' : 'bg-slate-50 border-slate-100 hover:border-teal-200'}`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-teal-500'}`} />
                      <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-slate-500'}`}>{item.label}</span>
                      {isActive && item.amount > 0 && (
                        <span className="text-[10px] font-bold text-teal-100 bg-teal-700/50 px-2 py-0.5 rounded-full">₹{item.amount.toLocaleString('en-IN')}</span>
                      )}
                      {!isActive && item.amount > 0 && (
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">₹{item.amount.toLocaleString('en-IN')}</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {(salary.hasRural || salary.hasMess || salary.hasHardDuty) && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  {salary.hasRural && (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Rural Allowance Rate</label>
                      <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-teal-600 transition-colors">₹</span>
                        <input 
                          type="number" 
                          value={salary.manualRuralRate} 
                          onChange={(e) => setSalary({...salary, manualRuralRate: parseInt(e.target.value) || 0})}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pl-8 text-sm font-bold text-slate-800 outline-none focus:ring-4 ring-teal-50 transition-all"
                        />
                      </div>
                    </div>
                  )}
                  {salary.hasMess && (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mess Allowance Rate</label>
                      <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-teal-600 transition-colors">₹</span>
                        <input 
                          type="number" 
                          value={salary.manualMessRate} 
                          onChange={(e) => setSalary({...salary, manualMessRate: parseInt(e.target.value) || 0})}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pl-8 text-sm font-bold text-slate-800 outline-none focus:ring-4 ring-teal-50 transition-all"
                        />
                      </div>
                    </div>
                  )}
                  {salary.hasHardDuty && (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hard Duty Rate</label>
                      <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-teal-600 transition-colors">₹</span>
                        <input 
                          type="number" 
                          value={salary.manualHardDutyRate} 
                          onChange={(e) => setSalary({...salary, manualHardDutyRate: parseInt(e.target.value) || 0})}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pl-8 text-sm font-bold text-slate-800 outline-none focus:ring-4 ring-teal-50 transition-all"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Other Allowances</label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-teal-600 transition-colors">₹</span>
                    <input 
                      type="number" 
                      value={salary.otherAllowances} 
                      onChange={(e) => setSalary({...salary, otherAllowances: parseInt(e.target.value) || 0})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pl-8 text-sm font-bold text-slate-800 outline-none focus:ring-4 ring-teal-50 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Arrears (One-time)</label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-blue-600 transition-colors">₹</span>
                    <input 
                      type="number" 
                      value={salary.arrears} 
                      onChange={(e) => setSalary({...salary, arrears: parseInt(e.target.value) || 0})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pl-8 text-sm font-bold text-slate-800 outline-none focus:ring-4 ring-blue-50 transition-all"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Deductions & Savings */}
            <section className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-50 rounded-full -ml-16 -mb-16 opacity-50"></div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-500 flex items-center justify-center shadow-lg shadow-rose-100">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Deductions & Savings</h3>
                </div>
                <div className="bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100">
                  <span className="text-[10px] font-black text-rose-700 uppercase tracking-widest">Total: ₹{results.totalDeductions.toLocaleString()}</span>
                </div>
              </div>

              {/* Pension Type Toggle */}
              <div className="p-1.5 bg-slate-100 rounded-2xl flex relative h-12 z-10">
                <button 
                  onClick={() => setSalary({...salary, pensionType: 'GPF'})} 
                  className={`flex-1 z-10 text-[10px] font-black uppercase transition-all duration-300 ${salary.pensionType === 'GPF' ? 'text-teal-700' : 'text-slate-400'}`}
                >
                  GPF (Old Scheme)
                </button>
                <button 
                  onClick={() => setSalary({...salary, pensionType: 'NPS'})} 
                  className={`flex-1 z-10 text-[10px] font-black uppercase transition-all duration-300 ${salary.pensionType === 'NPS' ? 'text-teal-700' : 'text-slate-400'}`}
                >
                  NPS (New Scheme)
                </button>
                <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-sm transition-all duration-300 ease-out ${salary.pensionType === 'NPS' ? 'translate-x-[calc(100%+6px)]' : 'translate-x-0'}`}></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {/* SI Selection */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">State Insurance (SI)</label>
                  <div className="flex gap-2">
                    {eligibleSiRates.map((rate, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setSalary({...salary, siDeduction: rate})}
                        className={`flex-1 py-3 rounded-2xl border text-[10px] font-black uppercase transition-all ${salary.siDeduction === rate ? 'bg-teal-600 border-teal-600 text-white shadow-md scale-105' : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-teal-200'}`}
                      >
                        <span className="block opacity-60 mb-1">{idx === 0 ? 'Base' : `Step ${idx}`}</span>
                        ₹{rate.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* RGHS Display */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">RGHS Health Scheme</label>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between h-[4.5rem]">
                    <div className="flex items-center gap-2">
                      <BriefcaseMedical className="w-4 h-4 text-rose-400" />
                      <span className="text-xs font-bold text-slate-600">Auto-calculated</span>
                    </div>
                    <span className="text-lg font-black text-rose-600">₹{salary.rghsDeduction.toLocaleString()}</span>
                  </div>
                </div>

                {/* Income Tax */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Income Tax (Monthly)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400 font-bold">₹</span>
                    <input 
                      type="number" 
                      value={salary.incomeTax} 
                      onChange={(e) => setSalary({...salary, incomeTax: parseInt(e.target.value) || 0})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pl-8 text-sm font-bold text-rose-600 outline-none focus:ring-4 ring-rose-50 transition-all"
                    />
                  </div>
                </div>

                {/* Other Deductions */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Other Deductions</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400 font-bold">₹</span>
                    <input 
                      type="number" 
                      value={salary.otherDeductions} 
                      onChange={(e) => setSalary({...salary, otherDeductions: parseInt(e.target.value) || 0})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pl-8 text-sm font-bold text-rose-600 outline-none focus:ring-4 ring-rose-50 transition-all"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Results Panel */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-8">
            <section className="bg-slate-900 rounded-[3rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              
              <div className="relative z-10 space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-400 mb-2">Net Take-Home</p>
                    <div className="text-5xl md:text-6xl font-black tracking-tighter">₹{results.netPay.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-4">
                    <span className="text-slate-400">Earnings Breakdown</span>
                    <span className="text-teal-400">Monthly</span>
                  </div>

                  <div className="space-y-5">
                    {[
                      { label: 'Basic Pay', value: salary.basicPay, color: 'bg-teal-500' },
                      { label: `DA (${salary.daRate}%)`, value: results.daAmount, color: 'bg-teal-400' },
                      { label: `HRA (${results.hraRate}%)`, value: results.hraAmount, color: 'bg-teal-300' },
                      ...(results.optionalTotal > 0 ? [{ label: 'Allowances', value: results.optionalTotal, color: 'bg-amber-400' }] : []),
                      ...(results.arrearsAmount > 0 ? [{ label: 'Arrears', value: results.arrearsAmount, color: 'bg-blue-400' }] : [])
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400 font-medium">{item.label}</span>
                          <span className="font-bold">₹{item.value.toLocaleString()}</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${item.color} rounded-full transition-all duration-1000`} 
                            style={{ width: `${(item.value / results.grossPay) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-teal-400">Gross Earnings</span>
                      <span className="text-xl font-black">₹{results.grossPay.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-4">
                    <span className="text-slate-400">Deductions Breakdown</span>
                    <span className="text-rose-400">Monthly</span>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: salary.pensionType, value: salary.pensionType === 'NPS' ? results.totalDeductions - (salary.siDeduction + salary.rghsDeduction + salary.incomeTax + salary.otherDeductions) : salary.gpfDeduction, color: 'bg-rose-400' },
                      { label: 'State Insurance', value: salary.siDeduction, color: 'bg-rose-500' },
                      { label: 'RGHS', value: salary.rghsDeduction, color: 'bg-rose-600' },
                      ...(salary.incomeTax > 0 ? [{ label: 'Income Tax', value: salary.incomeTax, color: 'bg-rose-700' }] : []),
                      ...(salary.otherDeductions > 0 ? [{ label: 'Other', value: salary.otherDeductions, color: 'bg-rose-800' }] : [])
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${item.color}`}></div>
                          <span className="text-slate-400 font-medium">{item.label}</span>
                        </div>
                        <span className="font-bold text-rose-300">₹{item.value.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">Total Deductions</span>
                      <span className="text-lg font-black text-rose-300">₹{results.totalDeductions.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-3xl p-6 border border-white/10 flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Efficiency</p>
                    <div className="text-2xl font-black text-teal-400">{takeHomeRatio}%</div>
                    <p className="text-[8px] font-bold text-slate-500 uppercase mt-1">Take-home ratio</p>
                  </div>
                  <div className="w-20 h-20 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={[{value: takeHomeRatio}, {value: 100-takeHomeRatio}]} 
                          cx="50%" cy="50%" innerRadius={25} outerRadius={35} 
                          stroke="none" dataKey="value" startAngle={90} endAngle={-270}
                        >
                          <Cell fill="#2dd4bf" />
                          <Cell fill="rgba(255,255,255,0.1)" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PieChartIcon className="w-4 h-4 text-teal-400 opacity-50" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Tips / Info */}
            <div className="bg-teal-50 rounded-[2rem] p-6 border border-teal-100 space-y-4">
              <div className="flex items-center gap-2 text-teal-800">
                <Info className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Quick Tip</span>
              </div>
              <p className="text-xs text-teal-700 leading-relaxed font-medium">
                DA is usually revised twice a year (Jan & July). Ensure you have the latest rate for accurate results. HRA categories are based on population census.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 rounded-[3.5rem] p-8 md:p-16 text-white space-y-16 overflow-hidden relative mt-12">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.05),transparent)] pointer-events-none"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight leading-tight">
              Rajasthan <span className="text-teal-400">Govt Pay Guidance</span>
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              The <strong>Rajasthan 7th Pay Commission</strong> restructured the salary of state government employees to provide a fair and competitive pay structure. Our tool includes calculation for <strong>X, Y, Z city categories</strong> for HRA, <strong>State Insurance (SI)</strong>, <strong>GPF/NPS</strong>, and <strong>RGHS</strong> deductions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <h4 className="text-teal-400 font-bold text-sm mb-2 uppercase tracking-widest">How to Use</h4>
                <ul className="text-[10px] text-slate-500 list-disc list-inside space-y-1">
                  <li>Select Department & Post</li>
                  <li>Enter Basic Pay or Pay Level</li>
                  <li>Adjust DA & HRA Category</li>
                  <li>Review Deductions (SI, GPF, RGHS)</li>
                </ul>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <h4 className="text-teal-400 font-bold text-sm mb-2 uppercase tracking-widest">Key Rules</h4>
                <p className="text-[10px] text-slate-500">Calculations follow Rajasthan RSR 2025 and latest 7th CPC notifications for state employees.</p>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
              <h3 className="text-lg font-black uppercase tracking-widest text-slate-300 mb-6">Rajasthan Employee FAQ</h3>
              <ul className="space-y-6">
                {[
                  { q: "How is Rajasthan Govt Salary calculated?", a: "It is based on the 7th Pay Commission pay matrix, including Basic Pay, DA, HRA, and other allowances minus SI, GPF/NPS, and RGHS." },
                  { q: "What is the current DA rate in Rajasthan?", a: "DA is updated periodically. Our tool allows you to input the latest rate for accurate projections." },
                  { q: "What are the common deductions?", a: "Common deductions include State Insurance (SI), GPF or NPS, RGHS contribution, and Income Tax." },
                  { q: "How is HRA calculated?", a: "HRA is a percentage of Basic Pay (X: 30%, Y: 20%, Z: 10% when DA > 50%) based on city category." }
                ].map((item, i) => (
                  <li key={i} className="space-y-1">
                    <h4 className="text-sm font-bold text-teal-400">{item.q}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.a}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    
      
      <div className="max-w-3xl mx-auto my-8">
        <StarRatingWidget 
          toolId="rajasthansalary" 
          defaultRating={4.6} 
          defaultCount={137} 
          onRatingChange={(rating, count) => setRatingInfo({ rating, count })} 
        />
      </div>
      <ShareWidget title="Rajasthan Govt Salary Calculator" />
      </article>
  );
};

export default RajasthanSalary;
