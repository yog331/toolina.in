import fs from 'fs';
import path from 'path';

const filePath = path.resolve(process.cwd(), 'tools/RajasthanCalendar.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update HolidayType
content = content.replace(
  "type HolidayType = 'Gazetted' | 'Restricted';",
  "type HolidayType = 'Gazetted' | 'Restricted' | 'Bank';"
);

// 2. Add employeeType state
content = content.replace(
  "const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);",
  "const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);\n  const [employeeType, setEmployeeType] = useState<'Govt' | 'Bank'>('Govt');"
);

// 3. Inject Extended Holidays Logic
const oldCurrentHolidays = "const currentHolidays = HOLIDAY_DATA[selectedYear] || {};";
const newCurrentHolidays = `const extendedHolidays = React.useMemo(() => {
    const base = JSON.parse(JSON.stringify(HOLIDAY_DATA[selectedYear] || {}));
    if (employeeType === 'Bank') {
      const WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      MONTHS.forEach(month => {
        if (!base[month]) base[month] = [];
        const monthIndex = MONTHS.indexOf(month);
        const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();
        const saturdays = [];
        for (let d = 1; d <= daysInMonth; d++) {
          if (new Date(selectedYear, monthIndex, d).getDay() === 6) saturdays.push(d);
        }
        if (saturdays[1]) base[month].push({ date: saturdays[1], name: '2nd Saturday', day: 'Sat', type: 'Bank' });
        if (saturdays[3]) base[month].push({ date: saturdays[3], name: '4th Saturday', day: 'Sat', type: 'Bank' });
        
        if (month === 'April' && !base[month].find((h: any) => h.date === 1)) {
          const april1Day = WEEK[new Date(selectedYear, monthIndex, 1).getDay()];
          base[month].push({ date: 1, name: 'Bank Annual Closing', day: april1Day, type: 'Bank' });
        }
        base[month] = base[month].sort((a: any, b: any) => a.date - b.date);
      });
    }
    return base;
  }, [selectedYear, employeeType]);

  const currentHolidays = extendedHolidays;`;
content = content.replace(oldCurrentHolidays, newCurrentHolidays);

// 4. Update Print & add Export ICS
const printRegex = /const handlePrint = \(\) => \{\s*window\.print\(\);\s*\};/m;
const exportICSLogic = `const handlePrint = () => {
    window.print();
  };

  const handleExportICS = () => {
    let icsContent = "BEGIN:VCALENDAR\\nVERSION:2.0\\nPRODID:-//Toolina//Rajasthan Calendar//EN\\n";
    
    Object.entries(currentHolidays).forEach(([monthName, days]: [string, any]) => {
      days.forEach((holiday: any) => {
        const monthIndex = MONTHS.indexOf(monthName);
        const dStr = (n: number) => String(n).padStart(2, '0');
        
        const startDateStr = \`\${selectedYear}\${dStr(monthIndex + 1)}\${dStr(holiday.date)}\`;
        
        // Date end is exclusive
        const endDate = new Date(selectedYear, monthIndex, holiday.date + 1);
        const endDateStr = \`\${endDate.getFullYear()}\${dStr(endDate.getMonth() + 1)}\${dStr(endDate.getDate())}\`;

        icsContent += "BEGIN:VEVENT\\n";
        icsContent += \`DTSTART;VALUE=DATE:\${startDateStr}\\n\`;
        icsContent += \`DTEND;VALUE=DATE:\${endDateStr}\\n\`;
        icsContent += \`SUMMARY:\${holiday.name}\\n\`;
        icsContent += \`DESCRIPTION:\${holiday.type} Holiday\\n\`;
        icsContent += "END:VEVENT\\n";
      });
    });
    
    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = \`Rajasthan_Holidays_\${selectedYear}_\${employeeType}.ics\`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };`;
content = content.replace(printRegex, exportICSLogic);

// 5. Add Govt/Bank UI Toggle
const toggleHTML = `<div className="flex bg-slate-100 p-1 rounded-xl sm:rounded-2xl border border-slate-200">
              <button 
                onClick={() => { setEmployeeType('Govt'); setFilter('All'); }} 
                className={\`flex-1 lg:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all \${employeeType === 'Govt' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}\`}
              >
                Govt
              </button>
              <button 
                onClick={() => setEmployeeType('Bank')} 
                className={\`flex-1 lg:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all \${employeeType === 'Bank' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}\`}
              >
                Bank
              </button>
            </div>`;

content = content.replace(/(<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">)/, `$1\n            ${toggleHTML}`);

// 6. Add Export ICS button to header Actions
const ptBtnParams = `<button \n              onClick={handlePrint}`;
const icsBtnParams = `<button \n              onClick={handleExportICS}\n              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all shadow-md shadow-indigo-200"\n            >\n              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>\n              .ICS\n            </button>\n            <button \n              onClick={handlePrint}`;
content = content.replace(ptBtnParams, icsBtnParams);

// 7. Update Box color assignments
const colorBlock = `if (holiday) {
             if (holiday.type === 'Gazetted') {
                 bgClass = "bg-teal-500 border-teal-600 shadow-md";
                 textClass = "text-white";
             } else if (holiday.type === 'Restricted') {
                 bgClass = "bg-amber-400 border-amber-500 shadow-md";
                 textClass = "text-slate-900";
             } else if (holiday.type === 'Bank') {
                 bgClass = "bg-indigo-500 border-indigo-600 shadow-md";
                 textClass = "text-white";
             }
          }`;
content = content.replace(/if \(holiday\) \{\s*if \(holiday\.type === 'Gazetted'\) \{\s*bgClass = "bg-teal-500 border-teal-600 shadow-md";\s*textClass = "text-white";\s*\} else \{\s*bgClass = "bg-amber-400 border-amber-500 shadow-md";\s*textClass = "text-slate-900";\s*\}\s*\}/, colorBlock);

// 8. Add Bank Legend
const legendBankStr = `{employeeType === 'Bank' && <div className="flex items-center gap-2"><div className="w-2 h-2 bg-indigo-500 rounded-full"></div><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bank</span></div>}`;
content = content.replace(/(<span className="text-\[10px\] font-black text-slate-400 uppercase tracking-widest">Restricted<\/span><\/div>)/, `$1\n                 ${legendBankStr}`);


// 9. Fix Filters Map
content = content.replace(
  `{(['All', 'Gazetted', 'Restricted'] as const).map(type => (`,
  `{(['All', 'Gazetted', 'Restricted', 'Bank'] as const).map(type => (employeeType === 'Govt' && type === 'Bank' ? null : `
);
content = content.replace(
  `{type}\n                  </button>\n                ))}`,
  `{type}\n                  </button>\n                )))}`
);

// 10. Update side panel list view colors
content = content.replace(
  /className=\{`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-lg \$\{h\.type === 'Gazetted' \? 'bg-teal-600 text-white' : 'bg-amber-500 text-slate-900'\}`\}/,
  "className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-lg ${h.type === 'Gazetted' ? 'bg-teal-600 text-white' : h.type === 'Restricted' ? 'bg-amber-500 text-slate-900' : 'bg-indigo-500 text-white'}`}"
);

// 11. Update main list view large boxes
content = content.replace(
  /holiday\.type === 'Gazetted' \s*\? 'bg-teal-600 border-teal-700 text-white' \s*: 'bg-amber-500 border-amber-600 text-slate-900'/m,
  "holiday.type === 'Gazetted' ? 'bg-teal-600 border-teal-700 text-white' : holiday.type === 'Bank' ? 'bg-indigo-500 border-indigo-600 text-white' : 'bg-amber-500 border-amber-600 text-slate-900'"
);

// 12. Update main list view pills
content = content.replace(
  /holiday\.type === 'Gazetted' \? 'bg-teal-50 text-teal-600 border-teal-100' : 'bg-amber-50 text-amber-600 border-amber-100'/m,
  "holiday.type === 'Gazetted' ? 'bg-teal-50 text-teal-600 border-teal-100' : holiday.type === 'Bank' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-amber-50 text-amber-600 border-amber-100'"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('ICS and Bank holidays patched successfully!');
