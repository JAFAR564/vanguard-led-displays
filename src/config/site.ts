/**
 * Site Configuration & Content Tokens (site.ts)
 * 
 * Isolates all client-specific details, contact information, service area disclosures,
 * and hardware claims so they can be easily updated once client sign-off is completed.
 * Adheres strictly to Section 17 of the South African LED Website Blueprint.
 */

export interface SiteConfig {
  brand: {
    name: string;
    legalName: string;
    tagline: string;
    establishedYear: number;
    headquarters: string;
    serviceAreaSummary: string;
  };
  contact: {
    phoneDisplay: string;
    phoneDial: string;
    whatsappDisplay: string;
    whatsappNumber: string;
    emailQuote: string;
    emailAdvertise: string;
    operatingHours: string;
    emergencySupport: string;
  };
  coverage: {
    primaryHub: string;
    keyRegions: string[];
    nationalProjectsNotice: string;
  };
  featuredProject: {
    title: string;
    location: string;
    anonymizedEstateLabel: string;
    videoPoster: string;
    videoSrc: string;
    brief: string;
    sightlineExecution: string;
    outcome: string;
    specs: {
      environment: string;
      pixelPitch: string;
      viewingDistance: string;
      controlType: string;
    };
  };
  standards: {
    code: string;
    label: string;
    description: string;
  }[];
  formOptions: {
    buyerRoles: string[];
    propertyTypes: string[];
    displayEnvironments: string[];
  };
}

export const siteConfig: SiteConfig = {
  brand: {
    name: "South African LED Displays",
    legalName: "SA LED Display Systems (Pty) Ltd",
    tagline: "Installed LED Display Screens for Residential Estates and Commercial Properties",
    establishedYear: 2024,
    headquarters: "George, Western Cape, South Africa",
    serviceAreaSummary: "Headquartered in George, Western Cape. Direct on-site feasibility assessments conducted across the Garden Route and Western Cape, with commercial and estate projects undertaken nationwide across South Africa.",
  },

  contact: {
    phoneDisplay: "+27 (0)44 801 9000",
    phoneDial: "+27448019000",
    whatsappDisplay: "+27 (0)82 782 4346",
    whatsappNumber: "27827824346",
    emailQuote: "quotes@leddisplays.co.za",
    emailAdvertise: "advertise@leddisplays.co.za",
    operatingHours: "Monday – Friday: 08:00 – 17:00 SAST",
    emergencySupport: "Rapid technical support & maintenance SLAs for contracted installations",
  },

  coverage: {
    primaryHub: "George & Garden Route, Western Cape",
    keyRegions: [
      "George & Wilderness",
      "Mossel Bay & Dana Bay",
      "Knysna & Sedgefield",
      "Plettenberg Bay",
      "Cape Town & Boland",
      "National Metros (by Project Scope)"
    ],
    nationalProjectsNotice: "We conduct direct on-site physical surveys across the Western Cape and deploy installation teams nationally for qualifying commercial, retail, and estate developments.",
  },

  featuredProject: {
    title: "Flagship Residential Estate Gateway Installation",
    location: "George, Western Cape",
    anonymizedEstateLabel: "Secure Residential Estate · George",
    videoPoster: "/assets/george-estate-poster.jpg",
    videoSrc: "/assets/george-estate-installation.mp4",
    brief: "The estate board required an elegant, high-impact digital replacement for cluttered temporary vinyl banners and static noticeboards at the main security entrance. The display needed to communicate resident notices, access rules, municipal water and load-shedding alerts clearly without causing nighttime light disturbance to perimeter homes.",
    sightlineExecution: "Custom-engineered for outdoor daylight visibility under direct coastal sun, paired with automatic ambient lux-sensor dimming to comply with municipal dark-sky regulations and STSMA PMR 29 nuisance standards. Housed in a salt-air corrosion-resistant IP65 aluminum cabinet.",
    outcome: "Clean, instantaneous communication managed securely from the estate manager's desktop. Zero printing costs, zero temporary banner clutter, and 100% reach of arriving residents, visitors, and delivery drivers.",
    specs: {
      environment: "Outdoor Daylight High-Luminance (Auto-Dimming)",
      pixelPitch: "Optimised for slow-moving gatehouse vehicular traffic (3m – 15m)",
      viewingDistance: "Security Boom Entrance Corridor",
      controlType: "Cloud-Scheduled 4G/Wi-Fi CMS with offline failover",
    },
  },

  standards: [
    {
      code: "SANS 10160",
      label: "Structural Wind-Load",
      description: "Structures engineered to withstand South African coastal and inland wind loadings."
    },
    {
      code: "SANS 10142-1",
      label: "Electrical CoC",
      description: "Dedicated circuit breakers and certified electrical Compliance Certificates."
    },
    {
      code: "STSMA PMR 29",
      label: "Governance Ready",
      description: "Itemised, defensible proposals for Body Corporate PMR 29(2) and HOA approval."
    },
    {
      code: "POPIA Act 4",
      label: "Data Protection",
      description: "Lawful pre-contractual processing with strict personal data governance."
    }
  ],

  formOptions: {
    buyerRoles: [
      "Estate / HOA General Manager",
      "Trustee / Body Corporate Member",
      "Managing Agent / Portfolio Manager",
      "Shopping Centre GM / Asset Manager",
      "Property Developer / Architect",
      "Commercial Facility Manager",
      "Business Owner / Other"
    ],
    propertyTypes: [
      "Residential Estate / HOA",
      "Body Corporate / Complex",
      "Shopping Centre / Mall",
      "Commercial / Mixed-Use"
    ],
    displayEnvironments: [
      "Outdoor Weatherproof",
      "Indoor Video Wall",
      "Both Indoor & Outdoor",
      "Unsure — Advise Me"
    ]
  }
};
