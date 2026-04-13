
import React, { useState, useEffect } from 'react';
import { TOOLS as INITIAL_TOOLS } from '../constants';
import BrandLogo from '../components/BrandLogo';
import { Tool } from '../types';

const ADMIN_CREDENTIAL = "admin"; // Conceptual hardcoded key

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<'Stats' | 'Tools' | 'Feedback'>('Stats');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [toolsState, setToolsState] = useState<Tool[]>(INITIAL_TOOLS);

  useEffect(() => {
    // Check for existing session
    const sessionAuth = sessionStorage.getItem('yogi_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }

    document.title = "Admin Control Panel | Toolina Internal";
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_CREDENTIAL) {
      setIsAuthenticated(true);
      setError(false);
      sessionStorage.setItem('yogi_admin_auth', 'true');
    } else {
      setError(true);
      setPassword('');
      // Shake effect logic would go here
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('yogi_admin_auth');
  };

  const toggleNewBadge = (id: string) => {
    setToolsState(prev => prev.map(tool => 
      tool.id === id ? { ...tool, isNew: !tool.isNew } : tool
    ));
  };

  const stats = [
    { label: "Monthly Sessions", value: "14,282", growth: "+12.5%", color: "text-teal-600" },
    { label: "Total Calculations", value: "894,302", growth: "+4.2%", color: "text-blue-600" },
    { label: "Avg. Latency", value: "42ms", growth: "-15.0%", color: "text-emerald-600" },
    { label: "Conversion Rate", value: "24.8%", growth: "+0.8%", color: "text-orange-600" }
  ];

  const systemHealth = [
    { name: "Gemini AI Engine", status: "Healthy", uptime: "99.98%", load: "12%" },
    { name: "Local Processing Node", status: "Active", uptime: "100%", load: "2%" },
    { name: "Global CDN (Fonts)", status: "Steady", uptime: "99.95%", load: "N/A" },
    { name: "Storage Sync", status: "Healthy", uptime: "99.99%", load: "0.4%" }
  ];

  const recentFeedback = [
    { user: "amit_rajasthan@gov.in", subject: "Salary 7th CPC Logic", date: "2 mins ago", status: "New" },
    { user: "dev.sharma@tech.co", subject: "CSV parsing error", date: "1 hour ago", status: "Assigned" },
    { user: "sunita.v@hospital.org", subject: "BMI range query", date: "5 hours ago", status: "Resolved" },
    { user: "prakash.j@sso.raj.in", subject: "DevLys matra reorder", date: "1 day ago", status: "Resolved" }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md p-8 md:p-12 rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/50 animate-in zoom-in duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-8 -mt-8"></div>
          
          <div className="text-center space-y-6 relative z-10">
            <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl">
              <svg className="w-10 h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            
            <div>
              <h1 className="text-2xl font-display font-black text-slate-900 tracking-tight">Access Restricted</h1>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Toolina Internal Environment</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <input 
                  autoFocus
                  type="password" 
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  placeholder="Administrator Key"
                  className={`w-full px-6 py-4 bg-slate-50 border rounded-2xl outline-none focus:ring-4 transition-all text-center font-bold tracking-widest ${
                    error ? 'border-red-500 ring-red-50 focus:ring-red-100' : 'border-slate-200 focus:ring-teal-50 focus:border-teal-200'
                  }`}
                />
                {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">Invalid Credentials</p>}
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-black transition-all shadow-xl active:scale-95"
              >
                Authenticate System
              </button>
            </form>
            
            <div className="pt-6 border-t border-slate-100">
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Encrypted Session Layer • v4.2.1</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20 px-1">
      {/* Admin Header */}
      <header className="bg-slate-900 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-50 rounded-bl-[20rem] blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-2xl flex items-center justify-center text-3xl shadow-2xl shadow-teal-500/20 text-slate-900 font-black">
              Y
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl md:text-5xl font-display font-black text-white tracking-tight leading-none">
                  Admin <span className="text-teal-400">Control Panel</span>
                </h1>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                  title="Secure Logout"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </button>
              </div>
              <div className="flex items-center gap-3 mt-2">
                 <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest bg-teal-400/10 px-3 py-1 rounded-lg border border-teal-400/20">System Operator v2.5</span>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 py-1 rounded-lg border border-slate-800">{currentTime}</span>
              </div>
            </div>
          </div>

          <nav className="flex bg-slate-800/50 p-1.5 rounded-2xl border border-slate-700 w-full lg:w-auto">
            {(['Stats', 'Tools', 'Feedback'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 lg:px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab ? 'bg-teal-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-teal-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Stats Tab */}
      {activeTab === 'Stats' && (
        <div className="space-y-8 animate-in fade-in duration-500">
           <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {stats.map((s, i) => (
               <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{s.label}</p>
                  <div className={`text-4xl font-black tracking-tight mb-2 ${s.color}`}>{s.value}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">{s.growth}</span>
                    <span className="text-[9px] font-medium text-slate-400 uppercase">vs last month</span>
                  </div>
               </div>
             ))}
           </section>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <section className="lg:col-span-8 bg-white rounded-[3rem] border border-slate-100 p-8 md:p-10 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">System Infrastructure Health</h3>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                       <tr className="border-b border-slate-50">
                         <th className="pb-4 text-[10px] font-black text-slate-400 uppercase">Resource</th>
                         <th className="pb-4 text-[10px] font-black text-slate-400 uppercase">Status</th>
                         <th className="pb-4 text-[10px] font-black text-slate-400 uppercase text-center">Uptime</th>
                         <th className="pb-4 text-[10px] font-black text-slate-400 uppercase text-right">Load</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {systemHealth.map((sys, i) => (
                        <tr key={i} className="group hover:bg-slate-50 transition-colors">
                          <td className="py-5 text-sm font-bold text-slate-700">{sys.name}</td>
                          <td className="py-5">
                            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase">{sys.status}</span>
                          </td>
                          <td className="py-5 text-center text-sm font-mono text-slate-500">{sys.uptime}</td>
                          <td className="py-5 text-right">
                             <div className="flex flex-col items-end gap-1">
                               <span className="text-[10px] font-black text-slate-800">{sys.load}</span>
                               <div className="w-20 h-1 bg-slate-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-teal-500" style={{ width: sys.load === 'N/A' ? '0%' : sys.load }}></div>
                               </div>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <aside className="lg:col-span-4 space-y-6">
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
                   <div className="relative z-10">
                     <h3 className="text-xs font-black uppercase tracking-[0.2em] text-teal-400 mb-6">Internal Announcements</h3>
                     <div className="space-y-6">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                           <p className="text-[10px] font-black text-teal-400 uppercase mb-2">Mar 22, 2025</p>
                           <p className="text-sm font-bold leading-relaxed">Budget 2025-26 logic finalized. Testing phase begins for Income Tax auditor.</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                           <p className="text-[10px] font-black text-orange-400 uppercase mb-2">Mar 20, 2025</p>
                           <p className="text-sm font-bold leading-relaxed">Infrastructure upgrade complete. CDN latency reduced by 15% across South Asia.</p>
                        </div>
                     </div>
                   </div>
                   <button className="mt-10 w-full py-4 bg-teal-500 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-400 transition-all shadow-xl active:scale-95">
                     Post Internal Update
                   </button>
                </div>
              </aside>
           </div>
        </div>
      )}

      {/* Tools Management Tab */}
      {activeTab === 'Tools' && (
        <section className="bg-white rounded-[3rem] border border-slate-100 p-8 md:p-10 shadow-sm animate-in fade-in duration-500">
           <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
             <div>
               <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight">Active Library</h3>
               <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Configure visibility & launch badges for all tools</p>
             </div>
             <button className="bg-slate-900 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-600 transition-all shadow-lg active:scale-95">
                Register New Tool
             </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {toolsState.map((tool) => (
               <div key={tool.id} className="bg-slate-50 border border-slate-200 p-6 rounded-[2rem] flex flex-col gap-4 group hover:bg-white hover:border-teal-200 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="text-4xl grayscale group-hover:grayscale-0 transition-all">{tool.icon}</div>
                    <div className="flex flex-col items-end gap-2">
                       <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${tool.category === 'Govt' ? 'bg-indigo-100 text-indigo-600' : 'bg-teal-100 text-teal-600'}`}>
                         {tool.category}
                       </span>
                       <button 
                        onClick={() => toggleNewBadge(tool.id)}
                        className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all border flex items-center gap-1 ${
                          tool.isNew 
                            ? 'bg-orange-500 text-white border-orange-600 shadow-sm' 
                            : 'bg-white text-slate-400 border-slate-200'
                        }`}
                       >
                         {tool.isNew ? '✨ NEW Badge ON' : 'Badge OFF'}
                       </button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{tool.name}</h4>
                    <p className="text-[10px] text-slate-500 line-clamp-1 mt-1">{tool.description}</p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="flex-1 py-2 text-[9px] font-black uppercase border border-slate-200 rounded-lg text-slate-400 hover:text-teal-600 hover:border-teal-200 transition-all">Edit Meta</button>
                    <button className="flex-1 py-2 text-[9px] font-black uppercase bg-slate-900 text-white rounded-lg hover:bg-red-500 transition-all">Offline</button>
                  </div>
               </div>
             ))}
           </div>
        </section>
      )}

      {/* Feedback Tab */}
      {activeTab === 'Feedback' && (
        <section className="bg-white rounded-[3rem] border border-slate-100 p-8 md:p-10 shadow-sm animate-in fade-in duration-500">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight">Inbox <span className="text-teal-600">&</span> User Queries</h3>
              <div className="flex gap-2">
                 <button className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:text-teal-600 hover:bg-slate-50 transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg></button>
                 <button className="p-2.5 rounded-xl border border-slate-100 text-slate-400 hover:text-teal-600 hover:bg-slate-50 transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg></button>
              </div>
           </div>

           <div className="space-y-3">
             {recentFeedback.map((f, i) => (
               <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:border-teal-200 hover:shadow-xl hover:shadow-teal-100/20 transition-all group">
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs ${f.status === 'New' ? 'bg-orange-100 text-orange-600' : 'bg-slate-200 text-slate-500'}`}>
                      {f.user[0].toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 group-hover:text-teal-600 transition-colors">{f.subject}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">{f.user} • <span className="opacity-60">{f.date}</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mt-4 md:mt-0">
                    <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      f.status === 'New' ? 'bg-orange-50 border-orange-100 text-orange-600' :
                      f.status === 'Assigned' ? 'bg-blue-50 border-blue-100 text-blue-600' :
                      'bg-emerald-50 border-emerald-100 text-emerald-600'
                    }`}>
                      {f.status}
                    </span>
                    <button className="p-3 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg></button>
                  </div>
               </div>
             ))}
           </div>
           
           <div className="mt-8 text-center">
             <button className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-teal-600 transition-colors">Load Archive Queries</button>
           </div>
        </section>
      )}

      {/* Footer Branding for Admin */}
      <footer className="text-center pt-12">
        <div className="inline-flex items-center gap-2 grayscale opacity-30 brightness-50">
           <BrandLogo className="w-6 h-6" />
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Internal System Environment • Toolina 2025</p>
        </div>
      </footer>
    </article>
  );
};

export default AdminDashboard;
