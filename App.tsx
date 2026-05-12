
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
import AgeCalculator from './tools/AgeCalculator';
import BMICalculator from './tools/BMICalculator';
import CSVToJson from './tools/CSVToJson';
import QRGenerator from './tools/QRGenerator';
import RajasthanSalary from './tools/RajasthanSalary';
import RajasthanPayMatrix from './tools/RajasthanPayMatrix';
import CentralPayMatrix from './tools/CentralPayMatrix';
import CentralSalary from './tools/CentralSalary';
import NPSCalculator from './tools/NPSCalculator';
import UtilityBillCalculator from './tools/UtilityBillCalculator';
import SolarCalculator from './tools/SolarCalculator';
import ImageConverter from './tools/ImageConverter';
import RajasthanCalendar from './tools/RajasthanCalendar';
import EMICalculator from './tools/EMICalculator';
import DevLysConverter from './tools/DevLysConverter';
import IncomeTaxCalculator from './tools/IncomeTaxCalculator';
import PDFToImage from './tools/PDFToImage';
import ImageToPDF from './tools/ImageToPDF';
import MergePDF from './tools/MergePDF';
import SplitPDF from './tools/SplitPDF';
import CompressPDF from './tools/CompressPDF';
import RemovePDFPages from './tools/RemovePDFPages';
import AddWatermarkPDF from './tools/AddWatermarkPDF';
import PlaceholderTool from './tools/PlaceholderTool';

// Legal, Support & Admin
import PrivacyPolicy from './tools/PrivacyPolicy';
import TermsOfService from './tools/TermsOfService';
import Disclaimer from './tools/Disclaimer';
import ContactUs from './tools/ContactUs';
import HelpCenter from './tools/HelpCenter';
import Sitemap from './tools/Sitemap';
import AdminDashboard from './tools/AdminDashboard';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  const [searchTerm, setSearchTerm] = useState('');
  const [tools, setTools] = useState<Tool[]>(TOOLS);

  useEffect(() => {
    fetch('/api/tools')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setTools(data);
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
                
                <Route path="*" element={<PlaceholderTool />} />
              </Routes>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
