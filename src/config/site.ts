/**
 * Site configuration: brand, contact, coverage and every piece of published copy.
 *
 * Components render from this file. Do not hard-code marketing claims inside a
 * component: if a sentence makes a promise about the business, a standard or a
 * piece of hardware, it belongs here where it can be reviewed and changed once.
 */

export interface Application {
  index: string;
  title: string;
  body: string;
}

export interface InventoryItem {
  num: string;
  title: string;
  body: string;
  note: string;
}

export interface BookingStep {
  num: string;
  title: string;
  body: string;
}

export interface Stage {
  num: string;
  title: string;
  duration: string;
  body: string;
  deliverable: string;
  certificate: string;
}

export interface PlateCaption {
  label: string;
  note: string;
}

export interface NavItem {
  label: string;
  href: string;
  /**
   * The plate number this destination lands on, copied from the section's own
   * `index`. Omitted for destinations that are separate pages rather than plates
   * on the home register, so the menu never numbers something the page does not.
   */
  plate?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface SpecificationGroup {
  id: string;
  label: string;
  caption: string;
  rows: { label: string; value: string }[];
}

export const siteConfig = {
  brand: {
    name: 'Vanguard Architectural Displays',
    shortName: 'Vanguard',
    legalName: 'Vanguard Display Systems (Pty) Ltd',
    tagline: 'Turnkey LED display infrastructure for estates and commercial precincts',
    establishedYear: 2024,
    headquarters: 'George, Western Cape, South Africa',
  },

  site: {
    url: 'https://leddisplays.co.za',
    title: 'Vanguard Architectural Displays — LED display infrastructure, Western Cape',
    description:
      'Turnkey LED display infrastructure for residential estates, body corporates and commercial precincts. Survey, structural mounting, SANS-compliant electrical work and CMS handover from George, Western Cape.',
    ogImage: '/assets/og-image.jpg',
    locale: 'en_ZA',
    themeColor: '#F7F7F5',
  },

  contact: {
    phoneDisplay: '+27 (0)44 801 9000',
    phoneDial: '+27448019000',
    whatsappDisplay: '+27 (0)82 782 4346',
    whatsappNumber: '27827824346',
    emailQuote: 'quotes@leddisplays.co.za',
    emailAdvertise: 'advertise@leddisplays.co.za',
    operatingHours: 'Monday – Friday, 08:00 – 17:00 SAST',
    responseCommitment: 'Site assessments scheduled within five working days',
    informationOfficer: 'The Information Officer, Vanguard Display Systems (Pty) Ltd',
  },

  navigation: [
    { label: 'Applications', href: '/#applications', plate: '02' },
    { label: 'Case study', href: '/#case-study', plate: '03' },
    { label: 'Method', href: '/#method', plate: '04' },
    { label: 'Specifications', href: '/#specifications', plate: '05' },
    { label: 'Studio', href: '/about' },
    { label: 'Advertise', href: '/advertise' },
  ] satisfies NavItem[],

  coverage: {
    primaryHub: 'George & the Garden Route, Western Cape',
    regions: [
      'George & Wilderness',
      'Mossel Bay & Dana Bay',
      'Knysna & Sedgefield',
      'Plettenberg Bay',
      'Cape Town & the Boland',
      'National metros, by project scope',
    ],
    notice:
      'Direct on-site surveys are conducted across the Western Cape. Installation teams are deployed nationally for qualifying commercial, retail and estate developments.',
  },

  hero: {
    eyebrow: 'Survey plate 01 — Western Cape',
    heading: 'Displays that belong to the building.',
    standfirst:
      'We survey, engineer, install and certify LED display infrastructure for your residential estate, body corporate or commercial precinct. You deal with one contractor from sightline study to electrical certificate.',
    primaryCta: { label: 'Commission a site survey', href: '#commission' },
    secondaryCta: { label: 'Read the case study', href: '#case-study' },
    register: [
      { label: 'Hub', value: 'George, Western Cape' },
      { label: 'Coverage', value: 'Western Cape & national projects' },
      { label: 'Practice', value: 'Survey · engineer · install · certify' },
    ],
    plate: {
      caption: {
        label: 'Estate approach, Garden Route',
        note: 'Sized to the boom geometry, so it reads from the road.',
      },
      alt: 'Outdoor LED display mounted at a residential estate entrance on a landscaped approach, photographed in daylight.',
    },
  },

  /*
     Hardware summary, read before section 02. Every figure here is repeated
     verbatim in the specification tables — nothing new is claimed, it is the
     same four facts moved within reach of the first scroll.
  */
  stats: [
    { value: '10,000 nits', label: 'Peak exterior output' },
    { value: 'IP65', label: 'Exterior ingress rating' },
    { value: 'P0.9–P10', label: 'Pitch, set by viewing distance' },
    { value: 'SANS 10142-1', label: 'Certificate of compliance at handover' },
  ] satisfies Stat[],

  applications: {
    index: '02',
    eyebrow: 'Applications',
    heading: 'Where a display earns its place.',
    lede: 'A display is only worth installing when it replaces temporary banners with something permanent, legible and maintained.',
    thesis:
      'Three property types, one engineering standard. The difference between them is sightline and governance, not hardware grade.',
    items: [
      {
        index: 'A',
        title: 'Residential estates & HOAs',
        body: 'Gatehouse and clubhouse displays for access rules, municipal outages, AGM notices and emergency alerts. Sized for slow-moving vehicles and pedestrians, with automatic dimming so perimeter homes are not lit at night.',
      },
      {
        index: 'B',
        title: 'Body corporates & complexes',
        body: 'A single, defensible channel for scheme communications, replacing noticeboards that are rewritten by hand. Scoped for PMR 29 approval, with itemised costs that trustees can put to a vote without redrafting.',
      },
      {
        index: 'C',
        title: 'Commercial precincts',
        body: 'Atrium, façade and forecourt displays for centres, showrooms and mixed-use developments. Engineered for daylight legibility, tenant messaging and — where approved — third-party advertising that offsets the capital cost.',
      },
    ] satisfies Application[],
    plates: {
      rigging: {
        caption: {
          label: 'Cabinet rigging, on site',
          note: 'Cabinets hang on engineered steel, not on the cladding.',
        },
        alt: 'A technician on a ladder fixing LED display cabinets to a wall mounting frame, with cabling coiled on the ground below.',
      },
      commercial: {
        caption: {
          label: 'Forecourt elevation, commercial precinct',
          note: 'Readable in direct sun, dimmed automatically at night.',
        },
        alt: 'Commercial LED display mounted on a building forecourt, photographed from the approach.',
      },
    },
  },

  caseStudy: {
    index: '03',
    eyebrow: 'Field record',
    heading: 'A gatehouse display that replaced the noticeboard.',
    lede: 'A secure residential estate in George needed one channel for resident notices, access rules, water interruptions and load-shedding alerts — without lighting up the perimeter homes at night.',
    brief:
      'The board was maintaining a stack of temporary vinyl banners and laminated A3 notices at the main security entrance. Messaging changed weekly; printing did not scale, and the clutter read as unfinished to arriving visitors.',
    execution:
      'The display was engineered for direct coastal daylight, then paired with an ambient lux sensor that dims output after dusk. The cabinet is salt-air corrosion resistant and sealed to IP65, mounted on structural steel calculated to SANS 10160 wind loading.',
    outcome:
      'Notices now publish from the estate manager’s desktop in under two minutes. There are no printing costs, no temporary banners, and every arriving resident, visitor and delivery driver sees the same message.',
    facts: {
      location: 'George, Western Cape',
      compliance: 'SANS 10160 · SANS 10142-1',
    },
    specs: [
      { label: 'Environment', value: 'Exterior, IP65, salt-air resistant' },
      { label: 'Brightness', value: 'Daylight-rated, auto lux dimming' },
      { label: 'Viewing corridor', value: '3 – 15 m, boom approach' },
      { label: 'Control', value: 'Scheduled CMS with local failover' },
    ],
    video: {
      src: '/assets/george-estate-installation.mp4',
      type: 'video/mp4',
      caption: 'Field record 03 — gatehouse display in operation, George.',
      durationNote: '1:03',
    },
  },

  method: {
    index: '04',
    eyebrow: 'Method & compliance',
    heading: 'Four stages, four paper trails.',
    lede: 'Compliance is not a paragraph in the proposal — it is the sequence of documents that closes the project.',
    stages: [
      {
        num: '01',
        title: 'Feasibility survey',
        duration: 'Week 1',
        body: 'A physical on-site survey of sightline geometry, midday solar load, mounting substrate and power-circuit proximity. No display is specified before the site has been measured.',
        deliverable: 'Measured survey and sightline report',
        certificate: 'Survey record',
      },
      {
        num: '02',
        title: 'Engineering & proposal',
        duration: 'Weeks 2 – 3',
        body: 'Scaled mounting drawings and SANS 10160 wind-load calculations, priced as an itemised proposal structured for PMR 29(2) or landlord sign-off rather than a single lump sum.',
        deliverable: 'Structural drawings and itemised scope',
        certificate: 'SANS 10160 calculation',
      },
      {
        num: '03',
        title: 'Installation & certification',
        duration: 'Weeks 4 – 6',
        body: 'Certified structural steel, concealed weather-sealed cabling and a dedicated breaker. The electrical installation is issued with a CoC by a registered person before handover.',
        deliverable: 'Installed display and electrical CoC',
        certificate: 'SANS 10142-1 CoC',
      },
      {
        num: '04',
        title: 'CMS handover & support',
        duration: 'Week 6 onward',
        body: 'Cloud scheduling configured with pre-formatted notice templates, one-to-one operator training, and a documented maintenance route with a contracted response window.',
        deliverable: 'Configured CMS and trained operator',
        certificate: 'Handover & maintenance record',
      },
    ] satisfies Stage[],
    standards: [
      {
        code: 'SANS 10160',
        label: 'Structural wind load',
        body: 'Mounting structures are calculated for South African coastal and inland wind loading, not site-guessed.',
      },
      {
        code: 'SANS 10142-1',
        label: 'Electrical CoC',
        body: 'Dedicated circuit protection and a Certificate of Compliance issued by a registered electrical contractor.',
      },
      {
        code: 'STSMA PMR 29',
        label: 'Governance ready',
        body: 'Itemised proposals drafted for body corporate and HOA approval under PMR 29(2), not a lump-sum quote.',
      },
      {
        code: 'POPIA, Act 4 of 2013',
        label: 'Data protection',
        body: 'Enquiry data is processed for pre-contractual purposes only, with defined retention and a named information officer.',
      },
    ],
  },

  specifications: {
    index: '05',
    eyebrow: 'Specifications',
    heading: 'Hardware, stated plainly.',
    lede: 'Final specification is fixed by the survey; these two families cover every project on this site.',
    groups: [
      {
        id: 'exterior',
        label: 'Architectural exterior',
        caption: 'Gatehouses, forecourts, façade and pylon installations.',
        rows: [
          { label: 'Brightness', value: 'Up to 10,000 nits, auto-calibrating ambient sensor' },
          { label: 'Cabinet', value: 'Die-cast thermal-conductive aluminium' },
          { label: 'Ingress', value: 'IP65 front and rear' },
          { label: 'Pixel pitch', value: 'P2.5 · P3.0 · P4.0 · P6.0 · P8.0 · P10.0' },
          { label: 'Thermal', value: 'Fanless convective dissipation' },
          { label: 'Service', value: 'Front and rear fast-latch modules' },
        ],
      },
      {
        id: 'interior',
        label: 'Commercial interior',
        caption: 'Atria, reception walls, showrooms and clubhouses.',
        rows: [
          { label: 'Brightness', value: '600 – 1,000 nits, anti-glare matte' },
          { label: 'Cabinet', value: 'CNC magnesium / aluminium, 16:9' },
          { label: 'Technology', value: 'Micro-COB and fine-pitch SMD' },
          { label: 'Pixel pitch', value: 'P0.9 · P1.2 · P1.5 · P1.8 · P2.5' },
          { label: 'Refresh', value: '≥ 3,840 Hz, 16-bit greyscale' },
          { label: 'Service', value: '100% front vacuum-magnetic modules' },
        ],
      },
    ] satisfies SpecificationGroup[],
    note: 'Hardware is supplied under our own specification. Brand and panel-level supplier details are disclosed to the client in the engineering pack, not published here.',
  },

  commercial: {
    index: '06',
    eyebrow: 'Commercial models',
    heading: 'Two ways to fund the screen.',
    lede: 'Either the property owns the asset, or approved advertising carries part of the cost. Both are quoted from the same engineering pack.',
    models: [
      {
        num: '01',
        title: 'Capital installation',
        body: 'The estate, body corporate or landlord owns the display and the content. We deliver the full scope — survey, structure, electrical work, commissioning and CMS — as one contract with one handover pack.',
        bestFor: 'Estates, schemes and precincts buying for their own communications.',
      },
      {
        num: '02',
        title: 'Advertising partnership',
        body: 'Where trustees or the asset manager approve it, vetted third-party advertising runs in defined slots and contributes to the capital cost. Content, dimming and by-law compliance remain under property control.',
        bestFor: 'Shopping centres, mixed-use precincts and forecourt frontages.',
      },
    ],
    note: 'Advertising is subject to municipal outdoor advertising by-laws and, for schemes, PMR 29 approval. No revenue is promised before those approvals are in hand.',
  },

  faqs: [
    {
      question: 'How is the screen size and pixel pitch decided?',
      answer:
        'Pitch follows viewing distance: a P3 display is crisp from about three metres. Size follows your boom geometry or atrium height. The survey fixes both, so you never pay for density your approach cannot resolve.',
    },
    {
      question: 'Does an outdoor display comply with municipal advertising by-laws?',
      answer:
        'Municipal rules separate on-premises estate messaging from third-party advertising. Our displays dim automatically at dusk, and we confirm the by-law position for your site in the survey, before installation.',
    },
    {
      question: 'How does an installation satisfy PMR 29 and HOA procedure?',
      answer:
        'A display is a common-property improvement. Dedicated to scheme utility — security alerts, outages, AGMs — we present it to your trustees under PMR 29(2) as reasonably necessary, with itemised costs and a 30-day notice rather than unanimous consent.',
    },
    {
      question: 'Who carries structural and electrical compliance?',
      answer:
        'We do, as one contractor. We engineer the steel to SANS 10160, conceal and weather-seal the cabling, and hand you a SANS 10142-1 CoC issued by a registered person.',
    },
    {
      question: 'How difficult is daily scheduling for non-technical staff?',
      answer:
        'None required. You run the CMS in a browser, with notice templates and dayparted playlists. You publish a notice in under two minutes, and we train your operator at handover.',
    },
    {
      question: 'Can advertising slots offset the capital cost?',
      answer:
        'Where you and your trustees approve it. Precincts usually run defined advertising slots; estates more often approve vetted community sponsors. You keep a content veto.',
    },
  ],

  commission: {
    index: '08',
    eyebrow: 'Commission',
    heading: 'Start with a survey.',
    lede: 'Tell us where the display would go and who it serves. We will confirm whether a site visit is warranted, and come back with a measured assessment rather than a brochure. There is no obligation to proceed.',
    responseNote: 'Enquiries are answered within one working day, Monday to Friday.',
  },

  /*
     Second door. This page is for the brand or agency buying a slot, not for the
     property buying a screen, so it carries no audience figures. Nobody has counted
     the cars at these gates, and an out-of-home media pack that estimates footfall
     is the one claim we would have to invent. Everything below is a process fact.
  */
  advertising: {
    index: '02',
    eyebrow: 'Advertiser brief — Western Cape',
    heading: 'Your message, at the gate.',
    standfirst:
      'We sell time on LED displays we built, installed and maintain ourselves: estate entrances, precinct forecourts and shared common areas. You book a screen and a time band, and the property keeps the right to refuse the creative.',
    primaryCta: { label: 'Check availability', href: '#availability' },
    secondaryCta: { label: 'See the inventory', href: '#inventory' },
    assurances: [
      { value: 'Play log', label: 'A report at the end of every flight' },
      { value: 'Dayparted', label: 'Booked in time bands, not blind loops' },
      { value: 'Approved', label: 'Creative cleared by the property first' },
      { value: 'By-law first', label: 'No booking on an unapproved site' },
    ],
    inventoryHeading: 'What is actually available.',
    inventoryLede:
      'We build for the property, so there is no speculative network to buy into. One estate wall is installed in George today. The other two categories are built to order, and a booking there begins with an installation.',
    inventory: [
      {
        num: '01',
        title: 'Estate entrances',
        body: 'Gatehouse displays on the approach road, seen by residents and their visitors every day at walking or idling speed.',
        note: 'Installed · George, Western Cape',
      },
      {
        num: '02',
        title: 'Precinct forecourts',
        body: 'Freestanding or façade-mounted displays at the entrance to commercial and mixed-use precincts, readable from the approach and the parking apron.',
        note: 'Built to order · survey first',
      },
      {
        num: '03',
        title: 'Shared common areas',
        body: 'Indoor walls in clubhouses, receptions and atria, where people stop rather than pass.',
        note: 'Built to order · survey first',
      },
    ] satisfies InventoryItem[],
    inventoryNote:
      'Rates are quoted per screen and per time band, after the site pack is issued. Nothing on this page estimates an audience: where we have measured a screen, the measurement is in the pack, and where we have not, the pack says so.',
    sitePack: {
      heading: 'What a site pack contains',
      lede: 'One document per screen, issued before any rate is quoted.',
      items: [
        { label: 'Panel', value: 'Size, pitch and peak output' },
        { label: 'Structure', value: 'Mounting type and design loads' },
        { label: 'Electrical', value: 'Supply capacity and certificate of compliance' },
        { label: 'Sightlines', value: 'Approach distances and the measured viewing corridor' },
        { label: 'Evidence', value: 'Photographs from the road, taken at the screen' },
        { label: 'Permissions', value: 'The approvals that site already holds' },
      ],
    },
    stepsHeading: 'From brief to booking.',
    stepsLede:
      'Four steps. You do not need finished artwork to start, and you do not need an agency to read the site pack.',
    steps: [
      {
        num: '01',
        title: 'Send a brief',
        body: 'The market, the period and roughly what you want to spend. A rough idea of the creative is enough to begin.',
      },
      {
        num: '02',
        title: 'Receive a site pack',
        body: 'For each screen we can offer: panel size, pitch, mounting, the measured viewing corridor and a photograph from the approach.',
      },
      {
        num: '03',
        title: 'Clear the creative',
        body: 'The property approves every execution before booking. Alcohol, gambling, political and competing-trade categories are usually excluded — we tell you that up front.',
      },
      {
        num: '04',
        title: 'Run and report',
        body: 'Slots run in scheduled time bands. At the end of the flight you receive a play report listing every scheduled play against the dates the screen was live.',
      },
    ] satisfies BookingStep[],
    limitsHeading: 'What we will not tell you.',
    limitsLede:
      'Most out-of-home packs are built on traffic multipliers. We do not publish audience figures for our sites, because nobody has counted the cars and we are not going to estimate them to win a booking.',
    limits: [
      {
        title: 'No invented reach',
        body: 'If a site has been surveyed, you get the measured viewing corridor and the panel dimensions. If it has not, we say so rather than multiplying a road count.',
      },
      {
        title: 'No approval shortcuts',
        body: 'Outdoor advertising is subject to municipal by-laws, and on schemes to trustee approval. We do not take a booking that depends on a permission we do not already hold.',
      },
      {
        title: 'No silent edits',
        body: 'Approved creative is not altered after sign-off. If a file will not read well at the panel size you chose, you hear it from us before the flight, not after.',
      },
    ],
    enquiryHeading: 'Check availability.',
    enquiryLede:
      'Send the market, the period and the format you have in mind. We will reply with the screens that could carry it, or tell you plainly that none of ours will.',
    enquiryNote:
      'Availability is confirmed per screen. Nothing is held until a booking is countersigned.',
  },

  formOptions: {
    buyerRoles: [
      'Estate / HOA general manager',
      'Trustee / body corporate member',
      'Managing agent / portfolio manager',
      'Shopping centre GM / asset manager',
      'Property developer / architect',
      'Commercial facility manager',
      'Business owner / other',
    ],
    propertyTypes: [
      'Residential estate / HOA',
      'Body corporate / complex',
      'Shopping centre / mall',
      'Commercial / mixed-use',
    ],
    environments: [
      'Outdoor, weatherproof',
      'Indoor video wall',
      'Both indoor and outdoor',
      'Unsure — advise me',
    ],
  },

  footer: {
    legal: [
      'Vanguard Display Systems (Pty) Ltd',
      'George, Western Cape, South Africa',
      `Established ${2024}`,
    ],
    columns: [
      {
        title: 'Site',
        links: [
          // Five rows here against five in Company: an odd column beside an even
          // one leaves a visible notch at the foot of the grid on a phone.
          { label: 'Overview', href: '/#hero' },
          { label: 'Applications', href: '/#applications' },
          { label: 'Case study', href: '/#case-study' },
          { label: 'Method', href: '/#method' },
          { label: 'Specifications', href: '/#specifications' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'Studio & coverage', href: '/about' },
          { label: 'Commercial models', href: '/#commercial' },
          { label: 'Advertise with us', href: '/advertise' },
          { label: 'Questions', href: '/#questions' },
          { label: 'Commission a survey', href: '/#commission' },
        ],
      },
    ],
    privacy: {
      title: 'Privacy notice',
      summary: 'How enquiry data is collected, used and retained.',
      body: [
        'When you submit an enquiry, we collect the name, role, property, contact number, email address and notes you provide. The data is used to respond to that enquiry and to prepare a site assessment. It is not sold, and it is not used for unrelated marketing.',
        'Enquiry records are retained for 24 months, then deleted. You may request access to, correction of, or deletion of your record at any time by writing to the address below. The Information Officer is named in the footer.',
        'The site sets no advertising cookies and loads no third-party analytics. Form submissions are rate limited and logged with the source page for security purposes.',
      ],
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
