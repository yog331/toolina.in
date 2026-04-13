
import React, { useState, useEffect, useRef } from 'react';

type HolidayType = 'Gazetted' | 'Restricted';
type ViewMode = 'List' | 'Calendar';

interface Holiday {
  date: number; // Day of the month
  name: string;
  day: string;
  type: HolidayType;
}

const HOLIDAY_DATA: Record<number, Record<string, Holiday[]>> = {
  2025: {
    "January": [
      { date: 1, name: "New Year's Day", day: "Wednesday", type: "Restricted" },
      { date: 6, name: "Guru Gobind Singh Jayanti", day: "Monday", type: "Gazetted" },
      { date: 14, name: "Makar Sankranti", day: "Tuesday", type: "Restricted" },
      { date: 26, name: "Republic Day", day: "Sunday", type: "Gazetted" },
    ],
    "March": [
      { date: 14, name: "Holi (Dhulandi)", day: "Friday", type: "Gazetted" },
      { date: 30, name: "Rajasthan Day", day: "Sunday", type: "Restricted" },
      { date: 31, name: "Eid-ul-Fitr", day: "Monday", type: "Gazetted" },
    ],
    "August": [
      { date: 9, name: "World Tribal Day", day: "Saturday", type: "Gazetted" },
      { date: 15, name: "Independence Day", day: "Friday", type: "Gazetted" },
      { date: 16, name: "Janmashtami", day: "Saturday", type: "Gazetted" },
    ],
    "October": [
      { date: 2, name: "Gandhi Jayanti", day: "Thursday", type: "Gazetted" },
      { date: 20, name: "Diwali", day: "Monday", type: "Gazetted" },
      { date: 21, name: "Govardhan Puja", day: "Tuesday", type: "Gazetted" },
    ]
  },
  2026: {
    "January": [
      { date: 1, name: "New Year's Day", day: "Thursday", type: "Restricted" },
      { date: 13, name: "Guru Gobind Singh Jayanti", day: "Tuesday", type: "Gazetted" },
      { date: 14, name: "Makar Sankranti", day: "Wednesday", type: "Restricted" },
      { date: 26, name: "Republic Day", day: "Monday", type: "Gazetted" },
    ],
    "February": [
      { date: 1, name: "Guru Ravidas Jayanti", day: "Sunday", type: "Restricted" },
      { date: 14, name: "Devnarayan Jayanti", day: "Saturday", type: "Gazetted" },
      { date: 15, name: "Maha Shivaratri", day: "Sunday", type: "Gazetted" },
    ],
    "March": [
      { date: 4, name: "Holi (Dhulandi)", day: "Wednesday", type: "Gazetted" },
      { date: 20, name: "Eid-ul-Fitr", day: "Friday", type: "Gazetted" },
      { date: 21, name: "Gudi Padwa", day: "Saturday", type: "Restricted" },
      { date: 27, name: "Ram Navami", day: "Friday", type: "Gazetted" },
      { date: 30, name: "Rajasthan Day", day: "Monday", type: "Restricted" },
      { date: 31, name: "Mahavir Jayanti", day: "Tuesday", type: "Gazetted" },
    ],
    "April": [
      { date: 3, name: "Good Friday", day: "Friday", type: "Gazetted" },
      { date: 14, name: "Ambedkar Jayanti", day: "Tuesday", type: "Gazetted" },
      { date: 18, name: "Parshuram Jayanti", day: "Saturday", type: "Gazetted" },
    ],
    "May": [
      { date: 1, name: "Buddha Purnima", day: "Friday", type: "Restricted" },
      { date: 19, name: "Maharana Pratap Jayanti", day: "Tuesday", type: "Gazetted" },
      { date: 27, name: "Eid-ul-Zuha (Bakrid)", day: "Wednesday", type: "Gazetted" },
    ],
    "July": [
      { date: 26, name: "Muharram", day: "Sunday", type: "Gazetted" },
    ],
    "August": [
      { date: 9, name: "World Tribal Day", day: "Sunday", type: "Gazetted" },
      { date: 15, name: "Independence Day", day: "Saturday", type: "Gazetted" },
      { date: 28, name: "Raksha Bandhan", day: "Friday", type: "Restricted" },
    ],
    "September": [
      { date: 1, name: "Janmashtami", day: "Tuesday", type: "Gazetted" },
      { date: 11, name: "Ramdev Jayanti / Teja Dashmi", day: "Friday", type: "Gazetted" },
      { date: 16, name: "Barawafat", day: "Wednesday", type: "Gazetted" },
    ],
    "October": [
      { date: 2, name: "Gandhi Jayanti", day: "Friday", type: "Gazetted" },
      { date: 21, name: "Dussehra (Vijayadashami)", day: "Wednesday", type: "Gazetted" },
    ],
    "November": [
      { date: 8, name: "Diwali", day: "Sunday", type: "Gazetted" },
      { date: 9, name: "Govardhan Puja", day: "Monday", type: "Gazetted" },
      { date: 10, name: "Bhai Dooj", day: "Tuesday", type: "Gazetted" },
      { date: 24, name: "Guru Nanak Jayanti", day: "Tuesday", type: "Gazetted" },
    ],
    "December": [
      { date: 25, name: "Christmas Day", day: "Friday", type: "Gazetted" },
    ]
  },
  2027: {
    "January": [
      { date: 1, name: "New Year's Day", day: "Friday", type: "Restricted" },
      { date: 26, name: "Republic Day", day: "Tuesday", type: "Gazetted" },
    ],
    "March": [
      { date: 10, name: "Eid-ul-Fitr", day: "Wednesday", type: "Gazetted" },
      { date: 24, name: "Holi (Dhulandi)", day: "Wednesday", type: "Gazetted" },
    ],
    "August": [
      { date: 15, name: "Independence Day", day: "Sunday", type: "Gazetted" },
    ]
  }
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAYS_SHORT = ["S", "M", "T", "W", "T", "F", "S"];

const RajasthanCalendar: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [viewMode, setViewMode] = useState<ViewMode>('Calendar');
  const [activeMonth, setActiveMonth] = useState<string>(MONTHS[new Date().getMonth()]);
  const [filter, setFilter] = useState<HolidayType | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  
  const monthScrollRef = useRef<HTMLDivElement>(null);

  const availableYears = [2025, 2026, 2027];

  useEffect(() => {
    document.title = `Rajasthan Govt Holiday Calendar ${selectedYear} - Official List | Toolina`;
    setSelectedHoliday(null);
  }, [selectedYear, activeMonth]);

  const currentHolidays = HOLIDAY_DATA[selectedYear] || {};

  const getMonthData = (year: number, monthName: string) => {
    const monthIndex = MONTHS.indexOf(monthName);
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const filteredHolidays = Object.entries(currentHolidays).reduce((acc, [month, days]) => {
    const matchedDays = days.filter(d => 
      (filter === 'All' || d.type === filter) &&
      (d.name.toLowerCase().includes(searchTerm.toLowerCase()) || month.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    if (matchedDays.length > 0) acc[month] = matchedDays;
    return acc;
  }, {} as Record<string, Holiday[]>);

  const renderCalendarGrid = (year: number, monthName: string) => {
    const { firstDay, daysInMonth } = getMonthData(year, monthName);
    const blanks = Array(firstDay).fill(null);
    const monthHolidays = currentHolidays[monthName] || [];
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-3">
        {WEEKDAYS.map((d, i) => (
          <div key={d} className={`text-[9px] sm:text-[10px] font-black uppercase text-center py-2 sm:py-3 ${d === 'Sun' || d === 'Sat' ? 'text-red-500' : 'text-slate-400'}`}>
            <span className="hidden sm:inline">{d}</span>
            <span className="sm:hidden">{WEEKDAYS_SHORT[i]}</span>
          </div>
        ))}
        {blanks.map((_, i) => <div key={`blank-${i}`} className="aspect-square"></div>)}
        {daysArray.map(day => {
          const holiday = monthHolidays.find(h => h.date === day);
          const dayOfWeek = new Date(year, MONTHS.indexOf(monthName), day).getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; 
          const isSelected = selectedHoliday?.date === day;

          // Tooltip Position Logic for Edges
          let tooltipPosClass = "left-1/2 -translate-x-1/2";
          let arrowPosClass = "left-1/2 -translate-x-1/2";

          if (dayOfWeek === 0) { // Sunday (Left Edge)
            tooltipPosClass = "left-0 translate-x-0";
            arrowPosClass = "left-4 translate-x-0";
          } else if (dayOfWeek === 6) { // Saturday (Right Edge)
            tooltipPosClass = "right-0 translate-x-0 left-auto";
            arrowPosClass = "right-4 translate-x-0 left-auto";
          }
          
          return (
            <button 
              key={day} 
              onClick={() => holiday && setSelectedHoliday(isSelected ? null : holiday)}
              className={`aspect-square relative rounded-xl sm:rounded-2xl border flex flex-col items-center justify-center transition-all group ${
                isWeekend ? 'bg-red-50/50 border-red-100' : 'bg-white border-slate-100'
              } ${holiday ? 'cursor-pointer active:scale-90 z-20' : 'cursor-default pointer-events-none'} ${
                isSelected ? 'ring-2 ring-teal-500 ring-offset-2 z-[40]' : ''
              }`}
            >
              <span className={`text-xs sm:text-sm md:text-base font-black ${isWeekend ? 'text-red-600' : 'text-slate-700'}`}>
                {day}
              </span>
              {holiday && (
                <div className={`mt-1 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full ${holiday.type === 'Gazetted' ? 'bg-teal-500' : 'bg-amber-400'}`}></div>
              )}
              
              {/* Desktop Hover Info - Fast Look */}
              {holiday && !isSelected && (
                <div className="absolute inset-0 bg-slate-900/90 text-white opacity-0 md:group-hover:opacity-100 flex items-center justify-center p-2 text-center transition-opacity z-10 pointer-events-none rounded-xl sm:rounded-2xl">
                  <span className="text-[9px] md:text-[10px] font-bold leading-tight">{holiday.name}</span>
                </div>
              )}

              {/* Click-based Tooltip - Optimized for Mobile & Precision */}
              {isSelected && holiday && (
                <div className={`absolute bottom-full mb-3 w-40 sm:w-48 md:w-56 z-[100] animate-in fade-in zoom-in slide-in-from-bottom-2 duration-200 pointer-events-none ${tooltipPosClass}`}>
                  <div className="bg-slate-900 text-white p-3 rounded-xl shadow-2xl border border-white/10 text-center md:text-left">
                    <p className="font-black text-[10px] sm:text-[11px] leading-tight mb-1">{holiday.name}</p>
                    <p className="text-[8px] sm:text-[9px] font-black text-teal-400 uppercase tracking-widest">
                      {holiday.day} • {holiday.type}
                    </p>
                  </div>
                  <div className={`w-3 h-3 bg-slate-900 rotate-45 absolute -bottom-1.5 border-r border-b border-white/10 ${arrowPosClass}`}></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  const getUpcomingLongWeekends = (year: number) => {
    if (year === 2026) {
      return [
        { range: "Jan 24 - Jan 26", reason: "Republic Day (Mon)", type: "Gazetted" },
        { range: "Mar 20 - Mar 22", reason: "Eid & Weekend", type: "Gazetted" },
        { range: "Oct 2 - Oct 4", reason: "Gandhi Jayanti (Fri)", type: "Gazetted" }
      ];
    }
    if (year === 2025) {
      return [
        { range: "Mar 14 - Mar 16", reason: "Holi (Fri) Weekend", type: "Gazetted" },
        { range: "Aug 15 - Aug 17", reason: "Independence Day (Fri)", type: "Gazetted" },
        { range: "Oct 18 - Oct 20", reason: "Diwali Weekend", type: "Gazetted" }
      ];
    }
    return [{ range: "Dec 25 - Dec 27", reason: "Christmas Weekend", type: "Gazetted" }];
  };

  return (
    <article className="max-w-6xl mx-auto space-y-4 md:space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20 sm:px-4">
      {/* Header Section */}
      <header className="bg-white p-4 sm:p-8 md:p-12 rounded-none sm:rounded-[2.5rem] md:rounded-[3.5rem] border-b sm:border border-slate-200 shadow-2xl shadow-slate-100/50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-teal-50 rounded-bl-[15rem] -mr-20 -mt-20 opacity-50 blur-3xl"></div>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-teal-600 rounded-xl sm:rounded-[1.5rem] flex items-center justify-center text-xl sm:text-3xl md:text-4xl shadow-xl shadow-teal-100 text-white shrink-0">🗓️</div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
                Rajasthan Govt <span className="text-teal-600">Calendar</span>
              </h1>
              <p className="text-slate-500 font-medium text-[9px] sm:text-xs md:text-lg mt-0.5 italic">Official Holiday List {selectedYear}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
            <div className="flex bg-slate-100 p-1 rounded-xl sm:rounded-2xl border border-slate-200">
              {availableYears.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${selectedYear === year ? 'bg-white shadow-sm text-teal-600' : 'text-slate-500'}`}
                >
                  {year}
                </button>
              ))}
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl sm:rounded-2xl border border-slate-200">
              <button 
                onClick={() => setViewMode('Calendar')} 
                className={`flex-1 lg:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'Calendar' ? 'bg-white shadow-sm text-teal-600' : 'text-slate-500'}`}
              >
                Calendar
              </button>
              <button 
                onClick={() => setViewMode('List')} 
                className={`flex-1 lg:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'List' ? 'bg-white shadow-sm text-teal-600' : 'text-slate-500'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Month Selector Bar */}
        <div className="mt-4 md:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 relative z-10">
          {viewMode === 'Calendar' ? (
            <div ref={monthScrollRef} className="lg:col-span-12 flex overflow-x-auto scroll-smooth scrollbar-hide gap-2 pb-1 snap-x snap-mandatory">
              {MONTHS.map(m => (
                <button 
                  key={m} 
                  onClick={() => setActiveMonth(m)}
                  className={`px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-[10px] sm:text-[11px] font-black uppercase tracking-widest border transition-all shrink-0 snap-start min-w-[100px] text-center ${
                    activeMonth === m ? 'bg-teal-600 border-teal-600 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  {m.substring(0, 3)}
                  <span className="hidden sm:inline">{m.substring(3)}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="lg:col-span-12 flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative group">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Filter holidays..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl outline-none focus:ring-4 ring-teal-50 focus:bg-white transition-all text-sm font-medium"
                />
              </div>
              <div className="flex gap-2">
                {(['All', 'Gazetted', 'Restricted'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`flex-1 md:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all border ${
                      filter === type 
                        ? 'bg-teal-600 text-white border-teal-600 shadow-lg' 
                        : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main View Area */}
      {viewMode === 'Calendar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          <section className="lg:col-span-8 bg-white p-4 sm:p-10 rounded-2xl sm:rounded-[3.5rem] border border-slate-200 shadow-sm animate-in zoom-in duration-500 overflow-visible">
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-10">
               <div>
                 <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">{activeMonth}</h2>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Rajasthan Official {selectedYear}</p>
               </div>
               <div className="flex gap-4">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 bg-teal-500 rounded-full"></div><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gazetted</span></div>
                 <div className="flex items-center gap-2"><div className="w-2 h-2 bg-amber-400 rounded-full"></div><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Restricted</span></div>
               </div>
             </div>
             {renderCalendarGrid(selectedYear, activeMonth)}
          </section>

          <aside className="lg:col-span-4 space-y-6">
            {/* Holiday List Card - Corrected Styles */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-400 mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full"></span> This Month's List
               </h3>
               <div className="space-y-4">
                 {(currentHolidays[activeMonth] || []).map((h, i) => (
                   <button 
                    key={i} 
                    onClick={() => setSelectedHoliday(selectedHoliday?.date === h.date ? null : h)}
                    className={`w-full text-left flex items-start gap-4 p-4 rounded-2xl border transition-all ${selectedHoliday?.date === h.date ? 'bg-white/10 border-teal-500/50 shadow-lg' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                   >
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-lg ${h.type === 'Gazetted' ? 'bg-teal-600 text-white' : 'bg-amber-500 text-slate-900'}`}>
                       {h.date}
                     </div>
                     <div className="min-w-0">
                       <p className={`font-black text-xs sm:text-sm tracking-tight truncate ${selectedHoliday?.date === h.date ? 'text-teal-400' : 'text-white'}`}>{h.name}</p>
                       <p className="text-[9px] font-black opacity-60 uppercase tracking-widest mt-1">{h.day} • {h.type}</p>
                     </div>
                   </button>
                 ))}
                 {(!currentHolidays[activeMonth] || currentHolidays[activeMonth].length === 0) && (
                   <div className="text-center py-6">
                      <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest italic">No public holidays</p>
                   </div>
                 )}
               </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Long Weekend Guide
               </h3>
               <div className="space-y-4">
                 {getUpcomingLongWeekends(selectedYear).map((w, i) => (
                   <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-teal-200 transition-all">
                     <div className="min-w-0">
                       <p className="text-[11px] font-black text-slate-800 tracking-tight truncate">{w.range}</p>
                       <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter truncate">{w.reason}</p>
                     </div>
                     <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl flex flex-col items-center shrink-0">
                        <span className="text-[10px] font-black text-teal-600 leading-none">3</span>
                        <span className="text-[7px] font-black text-slate-400 uppercase">Days</span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </aside>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {Object.entries(filteredHolidays).map(([month, days]) => (
            <section key={month} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-teal-100/30 transition-all group border-b-4 border-b-transparent hover:border-b-teal-500">
              <div className="bg-slate-50 px-8 py-5 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-display font-black text-slate-800 tracking-tight">{month}</h2>
                <span className="text-[9px] font-black text-teal-600 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100">{days.length} Events</span>
              </div>
              <div className="divide-y divide-slate-50">
                {days.map((holiday, idx) => (
                  <div key={idx} className="p-5 hover:bg-slate-50/50 transition-colors flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl shrink-0 flex flex-col items-center justify-center border shadow-sm ${
                      holiday.type === 'Gazetted' 
                        ? 'bg-teal-600 border-teal-700 text-white' 
                        : 'bg-amber-500 border-amber-600 text-slate-900'
                    }`}>
                      <span className="text-sm font-black leading-none mb-1">{holiday.date}</span>
                      <span className={`text-[8px] font-black uppercase tracking-tighter opacity-70`}>{holiday.day.substring(0, 3)}</span>
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <h3 className="text-[13px] font-black text-slate-900 leading-tight mb-2 truncate group-hover:text-teal-700 transition-colors">{holiday.name}</h3>
                      <span className={`text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest border ${
                        holiday.type === 'Gazetted' ? 'bg-teal-50 text-teal-600 border-teal-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {holiday.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
          {Object.keys(filteredHolidays).length === 0 && (
            <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
               <div className="text-6xl opacity-10 mb-6 grayscale">🧘‍♂️</div>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Nothing found for your filters</p>
               <button onClick={() => { setSearchTerm(''); setFilter('All'); }} className="mt-4 text-teal-600 font-bold text-xs hover:underline uppercase tracking-widest">Reset View</button>
            </div>
          )}
        </div>
      )}

      {/* Footer Info */}
      <footer className="bg-slate-900 rounded-none sm:rounded-[3rem] p-8 md:p-16 text-white space-y-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.1),transparent)] pointer-events-none"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight leading-tight">Official <span className="text-teal-400">Rajasthan GAD</span> Calendar Data</h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              Authorized holiday schedule as released by the General Administration Department of Rajasthan. Essential for planning official leave, government office visits, and coordinating state-wide activities across 33+ districts.
            </p>
            <div className="flex flex-wrap gap-4 opacity-50 grayscale transition-all hover:grayscale-0">
               <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20 text-[10px] font-black uppercase tracking-widest">2026 Ready</div>
               <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20 text-[10px] font-black uppercase tracking-widest">Gazetted List</div>
               <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20 text-[10px] font-black uppercase tracking-widest">RH Options</div>
            </div>
          </div>
          <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 backdrop-blur-sm">
            <h3 className="text-xl font-black mb-8 flex items-center gap-3">
              <span className="text-3xl">🗓️</span> Leave Planning
            </h3>
            <ul className="space-y-6">
              {[
                "Confirm 'Restricted Holidays' with your DDO or Department Head.",
                "Public Gazetted holidays apply to all state corporations.",
                "Bank holidays are separately managed by RBI Rajasthan circle.",
                "Court vacations may follow separate High Court calendars."
              ].map((tip, i) => (
                <li key={i} className="flex gap-4 text-xs sm:text-sm text-slate-400 leading-relaxed group">
                  <span className="text-teal-500 font-black group-hover:scale-150 transition-transform">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-white/10 relative z-10 text-center">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">PRECISION SCHEDULING BY YOGICALCULATOR AUDIT SYSTEMS</p>
        </div>
      </footer>
    </article>
  );
};

export default RajasthanCalendar;
