
import React from 'react';
import { Tool } from './types';

export const TOOLS: Tool[] = [
  {
    id: 'raj-salary',
    name: 'Rajasthan Govt Salary',
    description: 'Professional salary audit for Rajasthan state employees based on 7th CPC Revised Pay Rules 2017.',
    icon: '🏰',
    category: 'Govt',
    path: '/raj-salary',
    isNew: false
  },
  {
    id: 'central-salary',
    name: 'Central Govt Salary',
    description: 'Precision pay finder for Central Government staff featuring DA, HRA, and TPTA calculations for 2025.',
    icon: '🏛️',
    category: 'Govt',
    path: '/central-salary',
    isNew: false
  },
  {
    id: 'devlys-unicode',
    name: 'DevLys to Unicode',
    description: 'Professional Hindi font converter. Transform DevLys 010 legacy text to standard Unicode (Mangal) instantly.',
    icon: '⌨️',
    category: 'Utility',
    path: '/devlys-unicode',
    isNew: false
  },
  {
    id: 'emi-calc',
    name: 'EMI Calculator',
    description: 'Calculate monthly loan repayments, total interest, and view detailed amortization schedules for Home, Car, or Personal loans.',
    icon: '💳',
    category: 'Utility',
    path: '/emi-calc',
    isNew: false
  },
  {
    id: 'nps-calc',
    name: 'NPS Calculator',
    description: 'Estimate your National Pension System corpus and monthly pension with high-precision maturity audit.',
    icon: '🏦',
    category: 'Govt',
    path: '/nps-calc',
    isNew: false
  },
  {
    id: 'pay-matrix-central',
    name: '7th Pay Matrix (Central)',
    description: 'Interactive 7th CPC matrix for Central Govt employees to verify pay levels, cells, and annual increments.',
    icon: '📊',
    category: 'Govt',
    path: '/7th-pay-matrix-central',
    isNew: false
  },
  {
    id: 'pay-matrix-raj',
    name: '7th Pay Matrix (Raj)',
    description: 'Complete L-1 to L-24 pay matrix for Rajasthan Govt employees with official 3% annual increment audit.',
    icon: '📈',
    category: 'Govt',
    path: '/7th-pay-matrix-rajasthan',
    isNew: false
  },
  {
    id: 'age-calc',
    name: 'Age Calculator',
    description: 'Precise chronological age finder for government job applications (SSO/UPSC/SSC) and personal milestones.',
    icon: '🎂',
    category: 'Utility',
    path: '/age-calc',
    isNew: false
  },
  {
    id: 'bmi-calc',
    name: 'BMI Calculator',
    description: 'Instant Body Mass Index assessment with WHO health categories, ideal weight ranges, and status breakdown.',
    icon: '🏃',
    category: 'Health',
    path: '/bmi-calc',
    isNew: false
  },
  {
    id: 'utility-bill',
    name: 'Utility Bill Calculator',
    description: 'Tiered slab calculator for electricity, water, and gas bills with detailed tax and fixed charge audit.',
    icon: '💡',
    category: 'Utility',
    path: '/utility-bill',
    isNew: false
  },
  {
    id: 'qr-gen',
    name: 'QR Code Generator',
    description: 'Secure, tracking-free QR generator for WiFi, URLs, and business contacts with professional PNG export.',
    icon: '📱',
    category: 'Utility',
    path: '/qr-gen',
    isNew: false
  },
  {
    id: 'csv-json',
    name: 'CSV to JSON',
    description: 'Developer-grade bulk CSV to JSON transformer. High-performance, private, and 100% browser-based.',
    icon: '⚙️',
    category: 'Developer',
    path: '/csv-json',
    isNew: true
  },
  {
    id: 'solar-calc',
    name: 'Solar Calculator',
    description: 'Calculate Rooftop Solar ROI, PM Surya Ghar subsidy, and payback period with precision for Indian homes.',
    icon: '☀️',
    category: 'Utility',
    path: '/solar-calc',
    isNew: true
  },
  {
    id: 'img-conv',
    name: 'Image Converter',
    description: 'Batch photo resizer and format converter optimized for govt forms (Passport size) and web performance.',
    icon: '🖼️',
    category: 'Utility',
    path: '/img-conv',
    isNew: false
  },
  {
    id: 'raj-calendar',
    name: 'Rajasthan Govt Calendar',
    description: 'Official Rajasthan state holiday list featuring Gazetted, Restricted, and upcoming Long Weekend planners.',
    icon: '🗓️',
    category: 'Govt',
    path: '/raj-calendar',
    isNew: false
  }
];
