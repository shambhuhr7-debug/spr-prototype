import { PARCProject, Job } from './types';

export const SYSTEM_STATS = {
  residentsServed: "300,000+",
  connectingCommunities: 19,
  serviceAreaSqMi: 75,
  biosolidsAcres: "7,530.6",
  dailyFlowMGD: "~20 MGD",
  ratedCapacityMGD: "50 MGD",
  permitCompliance: "100%",
  permitComplianceDetail: "Meets CDPHE Discharge Permit"
};

export const CONNECTING_COMMUNITIES = [
  "City of Englewood",
  "City of Littleton",
  "Columbine Water & Sanitation District",
  "Valley Sanitation District",
  "South Suburban Park & Recreation District",
  "Cherry Hills Village",
  "Sheridan Sanitation District",
  "Platte Canyon Water & Sanitation District",
  "Southwest Metropolitan Water & Sanitation District",
  "Ken-Caryl Ranch Water & Sanitation District"
];

export const PARC_PROJECTS: PARCProject[] = [
  {
    id: "parc-1",
    name: "Bio-Methane Gas Scrubbing Innovation",
    status: "Active",
    blurb: "Converting biological organic waste methane into pipeline-grade renewable natural gas to provide clean heating.",
    description: "This pilot implements innovative dual-membrane filtration to selectively remove carbon dioxide, hydrogen sulfide, and silicon compounds from anaerobic digester biogas. The output meets commercial pipeline heating safety standards, directly offsetting local municipal natural gas consumption and supplying carbon-neutral municipal fuel.",
    coords: { x: 26, y: 38 },
    location: "Anaerobic Digestion Gallery",
    leadResearcher: "Dr. Helena Vance, Senior Bio-Energy Engineer",
    investment: "$1,200,000 (joint Co-funding)"
  },
  {
    id: "parc-2",
    name: "Post-Aeration Nitrogen Mitigation (PANM)",
    status: "Active",
    blurb: "Optimizing ammonia-oxidizing bacterial cultivation to sharply decrease effluence nitrogen without chemicals.",
    description: "Utilizing advanced automated aeration cycling in the biological secondary basins, this pilot optimizes the natural life cycle of Ammonia-Oxidizing Bacteria (AOB). The resulting low-oxygen denitrification processes achieve an 85% drop in discharged nitrogen. This provides a cheap, chemical-free path to safeguard the South Platte River's native aquatic habitat from toxic algal blooms.",
    coords: { x: 48, y: 22 },
    location: "Biological Aeration Basins",
    leadResearcher: "Marcus Thorne, PE, Liquid Processes Director",
    investment: "$850,000 Special District Allocation"
  },
  {
    id: "parc-3",
    name: "Advanced Micro-Plastics Acoustic Filtration",
    status: "In Testing",
    blurb: "Testing acoustic wave chambers to physically aggregate and skim microscopic synthetic fibers prior to disinfection.",
    description: "In collaboration with the Colorado School of Mines, this project places high-frequency ultrasonic resonance tubes in tertiary clarifiers. The sound waves push microscopic plastic particles and synthetic clothing fibers into centralized channels, where automatic mechanical skimmers easily extract them. This eliminates critical trace pollutants from the final pristine river discharge.",
    coords: { x: 72, y: 48 },
    location: "Secondary Clarification Tank 4",
    leadResearcher: "Sophia Chen, Env. Research Specialist",
    investment: "EPA Innovation Subgrant"
  },
  {
    id: "parc-4",
    name: "Thermal Hydrolysis & Soil Hydro-Char Loop",
    status: "Upcoming",
    blurb: "Recycling clean, pathogen-free biosolids into dry, nutrient-dense hydro-char to fertilize regional agricultural farm leases.",
    description: "This process treats wet centrifuge-cake biosolids with high-pressure steam at 160°C. The sterilized, carbonized product makes an outstanding, non-odorous slow-release fertilizer. This is a critical development for managing our 7,530.6 acres of active agricultural dryland farm leases near Byers and Bennett, ensuring absolute safety for dryland wheat crops.",
    coords: { x: 38, y: 74 },
    location: "Dewatering Centrifuge Center",
    leadResearcher: "Greg K., Biosolids Coordinator",
    investment: "$2,400,000 (joint Capital Request)"
  },
  {
    id: "parc-5",
    name: "Dynamic Oxygen Micro-Bubble Infusion",
    status: "Completed",
    blurb: "Injecting micro-fine oxygen bubbles into settling galleries to accelerate breakdown and destroy odors on contact.",
    description: "This odor mitigation system injects 150-micron oxygen bubbles into active primary treatment channels. By sustaining high dissolved oxygen levels, it completely prevents anaerobic bacteria from producing hydrogen sulfide gas (the source of rotten-egg smells). This successfully reduced plant fence-line emissions by 94% during peak summer operations.",
    coords: { x: 14, y: 58 },
    location: "Primary Settlement Tank 3",
    leadResearcher: "Ronald Boyd, Plant Superintendent",
    investment: "Englewood Infrastructure Bond"
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: "job-1",
    title: "Senior Wastewater Operations Specialist (Class A)",
    department: "Operations",
    type: "Full-Time",
    salary: "$38.50 - $48.20 / hour",
    location: "Main Plant Site (Englewood, CO)",
    postedDate: "2026-06-01",
    description: "Oversees primary and secondary liquid biological process controls, anaerobic digesters, and centrifuge dewatering systems. This is a lead compliance role responsible for ensuring daily operations maintain strict compliance with Colorado DPHE wastewater discharge regulations.",
    requirements: [
      "Colorado Class A Wastewater Operator certification required at time of application.",
      "Minimum 5 years of experience in a high-capacity municipal wastewater treatment environment.",
      "Demonstrated experience operating and diagnosing complex SCADA control loops.",
      "Strong leadership skills, including mentoring lower-grade operators and leading emergency safety drills."
    ]
  },
  {
    id: "job-2",
    title: "Water Resource Recovery Design Engineer (PE)",
    department: "Engineering",
    type: "Full-Time",
    salary: "$92,000 - $115,000 / year",
    location: "SPR Headquarters (Hybrid option)",
    postedDate: "2026-06-08",
    description: "Manages capital improvement planning, reviews contractor plans, and oversees the design and integration of PILOT breakthroughs (such as our carbonization reactors) into permanent field service. This engineer coordinates directly with Englewood and Littleton engineering departments on capacity allocations.",
    requirements: [
      "B.S. in Civil, Environmental, or Chemical Engineering from an accredited university.",
      "Active license as a Professional Engineer (PE) in the State of Colorado.",
      "3+ years of experience in chemical process design or hydraulic engineering.",
      "Experience with municipal RFP preparation, contractor bidding supervision, and field inspections."
    ]
  },
  {
    id: "job-3",
    title: "Environmental Quality Laboratory Analyst",
    department: "Science",
    type: "Full-Time",
    salary: "$78,000 - $94,000 / year",
    location: "South Platte Quality Testing Lab",
    postedDate: "2026-06-11",
    description: "Conducts biological, physical, and chemical analysis on daily process effluent and downstream South Platte River control coordinates. Ensures precision measurements of biochemical oxygen demand, nitrogen, phosphorus, and micro-particles.",
    requirements: [
      "Bachelor's degree in Chemistry, Microbiology, or Environmental Science.",
      "2+ years of experience operating gas chromatography and spectrophotometric laboratory systems.",
      "Familiarity with NELAP accreditation standards and State regulatory data submission portals.",
      "Excellent technical writing skills for composing scientific data summaries and research audits."
    ]
  },
  {
    id: "job-4",
    title: "Lead Biosolids Specialist & Agricultural Liaison",
    department: "Operations",
    type: "Full-Time",
    salary: "$34.00 - $42.50 / hour",
    location: "Main Plant & Byers Dryland Farmland",
    postedDate: "2026-06-05",
    description: "Coordinates centrifuge dewatering processing, chemical stabilization, and regional bulk transport for our sustainable land application program, directly overseeing agricultural tenant operations across our 7,530.6 acres of dryland wheat farmland leases near Byers and Bennett.",
    requirements: [
      "Colorado Class B Wastewater Operator or Class B Biosolids Management certification.",
      "Familiarity with EPA Part 503 biosolids regulations and dryland agriculture nutrient requirements.",
      "Exceptional communication skills for coordinating with active lease operators and state agricultural inspectors.",
      "Ability to travel weekly to Eastern Colorado agricultural properties as needed."
    ]
  },
  {
    id: "job-5",
    title: "Bilingual Public Communications Coordinator",
    department: "Administration",
    type: "Part-Time",
    salary: "$28.00 - $35.00 / hour",
    location: "Main Plant Site (Englewood, CO)",
    postedDate: "2026-06-10",
    description: "Manages public information bulletins, drafts neighborhood odor advisories, builds bilingual community handouts, and organizes local public tours. This role is crucial to maintaining immediate public accountability and educational liaison between Littleton, Englewood, and the 19 connecting communities.",
    requirements: [
      "Bachelor's degree in Communications, Public Relations, or Spanish/English Translation Studies.",
      "Absolute fluency in English and Spanish (written and oral) with technical translation experience.",
      "Experience executing community relations campaigns, public health disclosures, or environmental education programs.",
      "Familiarity with digital publishing tools, social media, and municipal government communications."
    ]
  }
];
