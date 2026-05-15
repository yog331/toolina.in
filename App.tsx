
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { TOOLS } from './constants';
import { Tool } from './types';

// Tool Components
const AgeCalculator = React.lazy(() => import('./tools/AgeCalculator'));
const BMICalculator = React.lazy(() => import('./tools/BMICalculator'));
const CSVToJson = React.lazy(() => import('./tools/CSVToJson'));
const QRGenerator = React.lazy(() => import('./tools/QRGenerator'));
const RajasthanSalary = React.lazy(() => import('./tools/RajasthanSalary'));
const RajasthanPayMatrix = React.lazy(() => import('./tools/RajasthanPayMatrix'));
const CentralPayMatrix = React.lazy(() => import('./tools/CentralPayMatrix'));
const CentralSalary = React.lazy(() => import('./tools/CentralSalary'));
const NPSCalculator = React.lazy(() => import('./tools/NPSCalculator'));
const UtilityBillCalculator = React.lazy(() => import('./tools/UtilityBillCalculator'));
const SolarCalculator = React.lazy(() => import('./tools/SolarCalculator'));
const ImageConverter = React.lazy(() => import('./tools/ImageConverter'));
const RajasthanCalendar = React.lazy(() => import('./tools/RajasthanCalendar'));
const EMICalculator = React.lazy(() => import('./tools/EMICalculator'));
const DevLysConverter = React.lazy(() => import('./tools/DevLysConverter'));
const IncomeTaxCalculator = React.lazy(() => import('./tools/IncomeTaxCalculator'));
const PDFToImage = React.lazy(() => import('./tools/PDFToImage'));
const ImageToPDF = React.lazy(() => import('./tools/ImageToPDF'));
const MergePDF = React.lazy(() => import('./tools/MergePDF'));
const SplitPDF = React.lazy(() => import('./tools/SplitPDF'));
const CompressPDF = React.lazy(() => import('./tools/CompressPDF'));
const RemovePDFPages = React.lazy(() => import('./tools/RemovePDFPages'));
const AddWatermarkPDF = React.lazy(() => import('./tools/AddWatermarkPDF'));
const PlaceholderTool = React.lazy(() => import('./tools/PlaceholderTool'));

// Legal, Support & Admin
const PrivacyPolicy = React.lazy(() => import('./tools/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./tools/TermsOfService'));
const Disclaimer = React.lazy(() => import('./tools/Disclaimer'));
const ContactUs = React.lazy(() => import('./tools/ContactUs'));
const HelpCenter = React.lazy(() => import('./tools/HelpCenter'));
const Sitemap = React.lazy(() => import('./tools/Sitemap'));
const AdminDashboard = React.lazy(() => import('./tools/AdminDashboard'));
const UrlIndexingTool = React.lazy(() => import('./tools/UrlIndexingTool'));

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  const [searchTerm, setSearchTerm] = useState('');
  const [tools, setTools] = useState<Tool[]>(TOOLS);

  useEffect(() => {
    fetch('/api/tools')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          // Merge API status into initial tools
          const mergedTools = TOOLS.map(initialTool => {
            const dbTool = data.find((t: Tool) => t.id === initialTool.id);
            return dbTool ? { ...initialTool, isNew: dbTool.isNew, isOffline: dbTool.isOffline } : initialTool;
          });
          setTools(mergedTools);
        }
      })
      .catch(err => console.error("Failed to load tools", err));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeSidebarOnMobile = () => {
    if (window.innerWidth <= 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-teal-100 selection:text-teal-900 font-sans">
        <div 
          className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[45] transition-opacity duration-300 lg:hidden ${
            sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        <Sidebar 
          isOpen={sidebarOpen} 
          toggle={() => setSidebarOpen(!sidebarOpen)} 
          onItemClick={closeSidebarOnMobile}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          tools={tools}
        />

        <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'} w-full`}>
          <Header 
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
            isSidebarOpen={sidebarOpen}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          
          <main className="flex-1 flex flex-col w-full max-w-[100vw]">
            <div className="flex-1 p-4 md:p-6 lg:p-10">
              <React.Suspense fallback={<div className="flex items-center justify-center h-[50vh]"><div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div></div>}>
                <Routes>
                <Route path="/" element={<Dashboard searchTerm={searchTerm} tools={tools} />} />
                <Route path="/age-calc" element={<AgeCalculator />} />
                <Route path="/bmi-calc" element={<BMICalculator />} />
                <Route path="/csv-json" element={<CSVToJson />} />
                <Route path="/qr-gen" element={<QRGenerator />} />
                <Route path="/raj-salary" element={<RajasthanSalary />} />
                <Route path="/central-salary" element={<CentralSalary />} />
                <Route path="/nps-calc" element={<NPSCalculator />} />
                <Route path="/utility-bill" element={<UtilityBillCalculator />} />
                <Route path="/solar-calc" element={<SolarCalculator />} />
                <Route path="/img-conv" element={<ImageConverter />} />
                <Route path="/raj-calendar" element={<RajasthanCalendar />} />
                <Route path="/emi-calc" element={<EMICalculator />} />
                <Route path="/devlys-unicode" element={<DevLysConverter />} />
                <Route path="/income-tax-calc" element={<IncomeTaxCalculator />} />
                <Route path="/7th-pay-matrix-rajasthan" element={<RajasthanPayMatrix />} />
                <Route path="/7th-pay-matrix-central" element={<CentralPayMatrix />} />
                <Route path="/pdf-to-image" element={<PDFToImage />} />
                <Route path="/image-to-pdf" element={<ImageToPDF />} />
                <Route path="/merge-pdf" element={<MergePDF />} />
                <Route path="/split-pdf" element={<SplitPDF />} />
                <Route path="/compress-pdf" element={<CompressPDF />} />
                <Route path="/remove-pdf-pages" element={<RemovePDFPages />} />
                <Route path="/add-pdf-watermark" element={<AddWatermarkPDF />} />
                
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/url-indexing" element={<UrlIndexingTool />} />
                
                <Route path="*" element={<PlaceholderTool />} />
              </Routes>
              </React.Suspense>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
