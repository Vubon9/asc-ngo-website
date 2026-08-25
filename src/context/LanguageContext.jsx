import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Nav & Top Banner
    govReg: "Govt Reg: DSS-Cox-228/03 | Youth Dev: Cox-151/09",
    location: "Chakaria, Cox’s Bazar, Bangladesh",
    aboutUs: "About Us",
    ongoingPrograms: "Ongoing Programs",
    impactAssets: "Impact & Assets",
    leadership: "Leadership",
    gallery: "Field Gallery",
    contact: "Contact",
    joinSupport: "Support / Partner",
    getInTouch: "Get In Touch",
    adminPortal: "Admin Portal",

    // Hero Section
    heroBadge: "Established 1st December 2001 | Registered NGO",
    heroTitlePrefix: "Assistance for",
    heroTitleSuffix: "Safe Community (ASC)",
    heroDescription: "ASC is a committed non-government, non-political, and non-profit organization dedicated to improving the livelihoods of the poorest—especially women, children, and disabled individuals—across Chakaria, Pekua, Kutubdia, Moheskhali & Lama.",
    viewProjects: "View Ongoing Projects",
    partnerVolunteer: "Partner / Donate",
    schoolsCount: "31+ Community Schools",
    voCount: "42+ Village Organizations",
    programsCount: "12 Ongoing Programs",
    shelterCount: "300 Family Shelter Tents",

    // About Section
    aboutTag: "About Our Organization",
    aboutHeading: "Assistance for Safe Community (ASC)",
    ngoType: "Non-Government & Non-Profit NGO",
    aboutDesc1: "Established on 1st December 2001, Assistance for Safe Community (ASC) is committed to uplifting the poorest segments of society, with a primary focus on women, children, and individuals with disabilities.",
    aboutDesc2: "ASC works actively in education, primary healthcare, disaster preparedness, roadside plantation, renewable energy, and rights entitlement for disabled people through self-help groups.",
    govRegHeading: "Government Registrations",
    visionTitle: "Our Vision",
    visionDesc: "ASC is committed to develop a society where the people are free to lead a dignified life by availing the opportunities provided by the state.",
    missionTitle: "Our Mission",
    missionDesc: "Enhance capacity building of service providers and community people by providing need-based support for change through proper local resource utilization.",
    goalTitle: "Our Goal",
    goalDesc: "Strengthening sustainable development for disadvantaged people through an integrated program of Education, Health, Human Rights, and Advocacy.",
    coreObjectives: "Core Objectives",

    // Programs Section
    programsTag: "Project & Program Portfolio",
    programsHeading: "Ongoing Programs & Collaborations",
    programsSub: "ASC implements 12 key community development projects funded by international donors, government agencies, and organizational strength.",
    searchPlaceholder: "Search programs, keywords, or focus areas...",
    filterUpazila: "Filter by Upazila:",
    filterDonor: "Filter by Donor/Partner:",
    allUpazilas: "All Upazilas",
    allDonors: "All Donors",

    // Emergency Response
    emergencyAlertTitle: "🚨 Cyclone & Emergency Disaster Response",
    emergencyAlertText: "Farma-Tent Relief Shelter for 300+ Families active in Cox's Bazar coastal belt.",
    requestRelief: "Request Emergency Shelter",
    hotline: "24/7 Relief Hotline",

    // Donation Modal
    donateTitle: "Make an Impact Support",
    donateSubtitle: "Your contribution directly empowers coastal children, disabled individuals, and disaster victims.",
    pledgeButton: "Submit Pledge / Support",

    // Footer
    footerDesc: "Established in December 2001, Assistance for Safe Community (ASC) is a non-government, non-political, and non-profit organization dedicated to improving the livelihoods of women, children, disabled people, and coastal fishing communities.",
    rights: "All rights reserved."
  },
  bn: {
    // Nav & Top Banner
    govReg: "নিবন্ধন: সোশ্যাল সার্ভিসেস DSS-Cox-228/03 | যুব উন্নয়ন Cox-151/09",
    location: "চকোরিয়া, কক্সবাজার, বাংলাদেশ",
    aboutUs: "আমাদের সম্পর্কে",
    ongoingPrograms: "চলমান প্রকল্পসমূহ",
    impactAssets: "প্রভাব ও সম্পদ",
    leadership: "নেতৃত্ব ও পরিচালনা",
    gallery: "ছবি গ্যালারি",
    contact: "যোগাযোগ",
    joinSupport: "সহযোগিতা / স্বেচ্ছাসেবক",
    getInTouch: "যোগাযোগ করুন",
    adminPortal: "এডমিন পোর্টাল",

    // Hero Section
    heroBadge: "প্রতিষ্ঠিত: ১লা ডিসেম্বর ২০০১ | নিবন্ধিত এনজিও",
    heroTitlePrefix: "অ্যাসিস্ট্যান্স ফর",
    heroTitleSuffix: "সেফ কমিউনিটি (ASC)",
    heroDescription: "অ্যাসিস্ট্যান্স ফর সেফ কমিউনিটি (ASC) একটি অরাজনৈতিক, অলাভজনক বেসরকারি সংস্থা। এটি চকোরিয়া, পেকুয়া, কুতুবদিয়া, মহেশখালী ও লামায় দরিদ্র, নারী, শিশু এবং প্রতিবন্ধীদের আত্মসামাজিক উন্নয়নে নিবেদিত।",
    viewProjects: "চলমান প্রকল্পসমূহ দেখুন",
    partnerVolunteer: "অংশীদার হন / অনুদান দিন",
    schoolsCount: "৩১+ সামাজিক প্রাথমিক বিদ্যালয়",
    voCount: "৪২+ গ্রাম সংগঠন (VO)",
    programsCount: "১২টি চলমান প্রকল্প",
    shelterCount: "৩০০ পরিবারের জরুরি তাবু",

    // About Section
    aboutTag: "সংস্থা সম্পর্কে",
    aboutHeading: "অ্যাসিস্ট্যান্স ফর সেফ কমিউনিটি (ASC)",
    ngoType: "বেসরকারি ও অলাভজনক উন্নয়ন সংস্থা",
    aboutDesc1: "১লা ডিসেম্বর ২০০১ সালে প্রতিষ্ঠিত, অ্যাসিস্ট্যান্স ফর সেফ কমিউনিটি (ASC) সমাজের দরিদ্র ও অনগ্রসর জনগোষ্ঠী, বিশেষ করে নারী, শিশু ও প্রতিবন্ধীদের জীবনযাত্রার মান উন্নয়নে কাজ করে যাচ্ছে।",
    aboutDesc2: "সংস্থাটি শিক্ষা, প্রাথমিক স্বাস্থ্যসেবা, দুর্যোগ প্রস্তুতি, সড়কভিত্তিক বনায়ন, নবায়নযোগ্য শক্তি এবং স্বনির্ভর দলের মাধ্যমে প্রতিবন্ধী ব্যক্তিদের অধিকার সুনিশ্চিত করতে নিরলস কাজ করছে।",
    govRegHeading: "সরকারি নিবন্ধনসমূহ",
    visionTitle: "আমাদের রূপকল্প (Vision)",
    visionDesc: "এমন একটি সমাজ গঠন যেখানে প্রতিটি মানুষ রাষ্ট্রের প্রদত্ত সুযোগ-সুবিধা ভোগ করে মর্যাদাপূর্ণ জীবনযাপন করতে পারে।",
    missionTitle: "আমাদের উদ্দেশ্য (Mission)",
    missionDesc: "স্থানীয় সম্পদের সঠিক ব্যবহারের মাধ্যমে সেবা প্রদানকারী ও স্থানীয় জনগোষ্ঠীর সক্ষমতা বৃদ্ধি করে সমাজে স্থায়ী পরিবর্তন আনা।",
    goalTitle: "আমাদের লক্ষ্য (Goal)",
    goalDesc: "শিক্ষা, স্বাস্থ্য, মানবাধিকার ও অ্যাডভোকেসি সমন্বিত কর্মসূচির মাধ্যমে অনগ্রসর জনগোষ্ঠীর টেকসই উন্নয়ন নিশ্চিত করা।",
    coreObjectives: "মূল উদ্দেশ্যসমূহ",

    // Programs Section
    programsTag: "প্রকল্প পোর্টফোলিও",
    programsHeading: "চলমান কর্মসূচি ও যৌথ উদ্যোগ",
    programsSub: "আন্তর্জাতিক দাতা সংস্থা, সরকারি দপ্তর ও নিজস্ব তহবিলের অর্থায়নে পরিচালিত ১২টি গুরুত্বপূর্ণ উন্নয়ন প্রকল্প।",
    searchPlaceholder: "প্রকল্প, বিষয়বস্তু বা এলাকা দিয়ে খুঁজুন...",
    filterUpazila: "উপজেলা অনুযায়ী ফিল্টার:",
    filterDonor: "দাতা সংস্থা অনুযায়ী ফিল্টার:",
    allUpazilas: "সকল উপজেলা",
    allDonors: "সকল দাতা সংস্থা",

    // Emergency Response
    emergencyAlertTitle: "🚨 ঘূর্ণিঝড় ও জরুরি দুর্যোগ ব্যবস্থাপনা",
    emergencyAlertText: "কক্সবাজার উপকূলীয় এলাকায় ৩০০+ পরিবারের জন্য ফার্মা-টেন্ট জরুরি আশ্রয় তাবু প্রস্তুত।",
    requestRelief: "জরুরি আশ্রয় আবেদন",
    hotline: "২৪/৭ জরুরি হটলাইন",

    // Donation Modal
    donateTitle: "সহযোগিতা ও অনুদান দিন",
    donateSubtitle: "আপনার অনুদান উপকূলীয় শিশু, প্রতিবন্ধী শিক্ষার্থী ও দুর্যোগকবলিত পরিবারের মুখে হাসি ফোটাবে।",
    pledgeButton: "অনুদান নিশ্চিত করুন",

    // Footer
    footerDesc: "২০০১ সালের ডিসেম্বরে প্রতিষ্ঠিত অ্যাসিস্ট্যান্স ফর সেফ কমিউনিটি (ASC) কক্সবাজার ও বান্দরবানে নারী, শিশু ও উপকূলীয় মৎস্যজীবী জনগোষ্ঠীর জীবনমান উন্নয়নে কাজ করছে।",
    rights: "সর্বস্বত্ব সংরক্ষিত।"
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'bn' : 'en'));
  };

  const t = (key) => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
