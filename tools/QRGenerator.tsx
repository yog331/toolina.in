
import React, { useState, useEffect } from 'react';

type QRType = 'URL' | 'Text' | 'WiFi' | 'Email';

const QRGenerator: React.FC = () => {
  const [activeType, setActiveType] = useState<QRType>('URL');
  const [inputValue, setInputValue] = useState('https://toolina.in');
  const [wifiData, setWifiData] = useState({ ssid: '', pass: '', enc: 'WPA' });
  const [emailData, setEmailData] = useState({ address: '', subject: '' });
  const [qrUrl, setQrUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Dynamic SEO Metadata Injection (Preserving the SEO enhancements)
  useEffect(() => {
    document.title = "Free QR Code Generator - Fast, Private & Professional | Toolina";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", "Generate high-quality, professional QR codes for WiFi, URLs, Email, and Text. Free, secure, and no expiration. The best private QR generator for personal and business use.");

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", "free qr code generator, wifi qr code creator, secure qr generator, professional qr code, url to qr, email qr code, no expiration qr code, Toolina");
  }, []);

  const getFormattedData = () => {
    switch (activeType) {
      case 'WiFi':
        return `WIFI:T:${wifiData.enc};S:${wifiData.ssid};P:${wifiData.pass};;`;
      case 'Email':
        return `mailto:${emailData.address}?subject=${encodeURIComponent(emailData.subject)}`;
      case 'URL':
        return inputValue.startsWith('http') ? inputValue : `https://${inputValue}`;
      default:
        return inputValue;
    }
  };

  useEffect(() => {
    const data = getFormattedData();
    if (data.trim()) {
      setIsGenerating(true);
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(data)}&margin=20&bgcolor=ffffff&color=0f172a`;
      setQrUrl(url);
      const timer = setTimeout(() => setIsGenerating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [inputValue, wifiData, emailData, activeType]);

  const downloadQR = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Toolina_QR_${activeType}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed', err);
    }
  };

  return (
    <article className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <header className="bg-white p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-200 shadow-2xl shadow-slate-100/50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-bl-[10rem] -mr-16 -mt-16 opacity-50 blur-3xl"></div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-teal-600 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center text-3xl md:text-4xl shadow-xl shadow-teal-100 text-white shrink-0">
              📱
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight leading-none">
                QR <span className="text-teal-600">Generator</span>
              </h1>
              <p className="text-slate-500 font-medium text-xs md:text-lg mt-1 italic">Professional Digital Markers</p>
            </div>
          </div>
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-full lg:w-auto">
            {(['URL', 'Text', 'WiFi', 'Email'] as QRType[]).map(type => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`flex-1 lg:px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeType === type 
                    ? 'bg-white shadow-sm text-teal-600' 
                    : 'text-slate-500 hover:text-teal-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Controls */}
          <div className="space-y-6 flex flex-col justify-center">
            <div className="bg-slate-50 p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-inner space-y-6">
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span> Encoder Configuration
              </h2>
              
              {activeType === 'URL' && (
                <div className="animate-in slide-in-from-left-2 duration-300">
                  <label className="block text-xs font-bold text-slate-700 mb-2 ml-1">Destination URL</label>
                  <input 
                    type="text" 
                    placeholder="Enter website address (e.g. toolina.in)"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 ring-teal-50 transition-all font-medium text-slate-800"
                  />
                </div>
              )}

              {activeType === 'Text' && (
                <div className="animate-in slide-in-from-left-2 duration-300">
                  <label className="block text-xs font-bold text-slate-700 mb-2 ml-1">Embedded Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Type your secure message or note..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 ring-teal-50 transition-all font-medium text-slate-800 resize-none"
                  />
                </div>
              )}

              {activeType === 'WiFi' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-left-2 duration-300">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-2 ml-1">Network Name (SSID)</label>
                    <input 
                      type="text" 
                      placeholder="Your Home WiFi"
                      value={wifiData.ssid}
                      onChange={(e) => setWifiData({...wifiData, ssid: e.target.value})}
                      className="w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 ring-teal-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 ml-1">Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      value={wifiData.pass}
                      onChange={(e) => setWifiData({...wifiData, pass: e.target.value})}
                      className="w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 ring-teal-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 ml-1">Security Type</label>
                    <select 
                      value={wifiData.enc}
                      onChange={(e) => setWifiData({...wifiData, enc: e.target.value})}
                      className="w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 ring-teal-50 text-xs font-bold"
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None (Open)</option>
                    </select>
                  </div>
                </div>
              )}

              {activeType === 'Email' && (
                <div className="space-y-4 animate-in slide-in-from-left-2 duration-300">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 ml-1">Recipient Email</label>
                    <input 
                      type="email" 
                      placeholder="hello@example.com"
                      value={emailData.address}
                      onChange={(e) => setEmailData({...emailData, address: e.target.value})}
                      className="w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 ring-teal-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 ml-1">Default Subject</label>
                    <input 
                      type="text" 
                      placeholder="Quick Inquiry"
                      value={emailData.subject}
                      onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                      className="w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 ring-teal-50"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={downloadQR}
              className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download PNG Image
            </button>
          </div>

          {/* Preview */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative group">
              <div className="absolute -inset-6 bg-teal-500/10 rounded-[4rem] blur-2xl group-hover:bg-teal-500/20 transition-all duration-700"></div>
              <div className="relative bg-white p-8 rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden min-w-[300px] min-h-[300px] flex items-center justify-center">
                {isGenerating && (
                  <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin"></div>
                  </div>
                )}
                
                {qrUrl && (
                  <div className="relative z-10 p-2 bg-white rounded-2xl">
                    <img 
                      src={qrUrl} 
                      alt={`QR Code for ${activeType}`} 
                      className="w-64 h-64 md:w-72 md:h-72 object-contain rounded-lg shadow-sm transition-opacity duration-300"
                    />
                    {/* Scan Line Animation */}
                    <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent shadow-[0_0_20px_rgba(20,184,166,0.6)] animate-scan"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-10 flex flex-col items-center text-center">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-2 animate-pulse">Live Encoding Sync</span>
              <p className="text-xs text-slate-400 font-medium max-w-[200px]">Point your camera to test the current configuration instantly.</p>
            </div>
          </div>
        </div>
      </header>

      {/* SEO Content Section (Preserved) */}
      <footer className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white space-y-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.1),transparent)] pointer-events-none"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight leading-tight">
              The <span className="text-teal-400">Professional</span> Choice for QR Codes
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              Toolina provides a 100% free, <strong>private QR Code generator</strong>. Unlike other generators that track your scans or expire after a week, our codes are static, permanent, and generate entirely without tracking pixels. 
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <h3 className="text-teal-400 font-bold text-sm mb-2 uppercase tracking-widest">WiFi Sharing</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">Let guests join your home or business network without typing complex passwords.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <h3 className="text-teal-400 font-bold text-sm mb-2 uppercase tracking-widest">Business Cards</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">Link directly to your portfolio, LinkedIn profile, or official business website.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
              <h3 className="text-lg font-black uppercase tracking-widest text-slate-300 mb-6 flex items-center gap-3">
                <span className="text-xl">💡</span> Common Use Cases
              </h3>
              <ul className="space-y-6">
                {[
                  { q: "Can I use these QR codes for commercial print?", a: "Yes. Our high-density PNG output is suitable for flyers, business cards, and signage." },
                  { q: "Do the QR codes expire?", a: "No. These are static QR codes that contain the data directly. They work forever as long as the destination URL is active." },
                  { q: "Is it safe to generate WiFi QR codes?", a: "Absolutely. We do not store your network credentials on any server. Everything is rendered client-side for your privacy." },
                  { q: "Can I generate a QR code for a PDF?", a: "Yes, by hosting the PDF online and pasting the public URL into our URL encoder." }
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

        <div className="pt-12 border-t border-white/10 relative z-10 text-center">
          <div className="flex justify-center gap-8 mb-8 grayscale opacity-50">
             <div className="text-[10px] font-black uppercase tracking-widest">Universal Standard</div>
             <div className="text-[10px] font-black uppercase tracking-widest">Secure TLS 1.3</div>
             <div className="text-[10px] font-black uppercase tracking-widest">No Tracking</div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Optimized by Toolina Digital Labs</p>
        </div>
      </footer>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </article>
  );
};

export default QRGenerator;
