import React from 'react';
import { Compass, FileCheck, ArrowRight, ArrowLeft, Users, Landmark, BookOpen, Search, Briefcase } from 'lucide-react';
import { MOCK_JOBS } from '../data';
import { Job } from '../types';

interface BackgroundOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface CareerPathfinderProps {
  reduceMotion: boolean;
  onSelectJob: (job: Job) => void;
}

export default function CareerPathfinder({ reduceMotion, onSelectJob }: CareerPathfinderProps) {
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [selectedBackground, setSelectedBackground] = React.useState<string>('outdoor');
  const [experienceLevel, setExperienceLevel] = React.useState<string>('entry');
  
  const backgrounds: BackgroundOption[] = [
    {
      id: 'outdoor',
      name: 'Outdoor Labor',
      description: 'Landscaping, farm operations, construction, heavy rigging, or plumbing lines.',
      icon: '🪵'
    },
    {
      id: 'military',
      name: 'Military / Mechanical',
      description: 'Heavy machinery mechanics, pneumatic systems, vessel repair, or veterans.',
      icon: '⚙️'
    },
    {
      id: 'lab',
      name: 'Lab / Chemistry',
      description: 'Microbiology grads, environmental quality testing, or chemical research assistants.',
      icon: '🧪'
    },
    {
      id: 'grad',
      name: 'High-School Grad',
      description: 'Eager for structural apprenticeships with paid learning and zero college debt.',
      icon: '🎓'
    }
  ];

  const experienceLevels = [
    { id: 'entry', name: 'Entry Level (OIT)', description: '0 to 1 year of formal water process handling.' },
    { id: 'mid', name: 'Semi-Experienced', description: '1 to 3 years of mechanical, farm, or process piping.' },
    { id: 'senior', name: 'Highly Technical / Certified', description: '3+ years of chemical control, lab auditing, or leadership.' }
  ];

  // Map background + experience to Colorado Certification Progression (Class D -> A)
  const calculatePathwayAndJobMatch = () => {
    let certTitle = '';
    let certCode = '';
    let certQuote = '';
    let matchedJobIds: string[] = [];
    let pathSteps: string[] = [];

    if (selectedBackground === 'outdoor') {
      if (experienceLevel === 'entry' || experienceLevel === 'mid') {
        certTitle = 'Colorado Class D Operator / Operator-in-Training (OIT)';
        certCode = 'Class D / C';
        certQuote = 'Your outdoor labor experience fits mechanical biosolids handling, aeration tank cleaning, or pump servicing!';
        matchedJobIds = ['job-4']; // Land application link
        pathSteps = [
          'Step 1: Secure an Operator-in-Training (OIT) placement with SPR (Entry Level).',
          'Step 2: Log 1 year of hands-on physical process filtration coordinates under Englewood-Littleton mentors.',
          'Step 3: Sit state-administered CDPHE Class D licensing exam (SPR pays 100% of study & fee costs).',
          'Step 4: Specialize in biosolids land lease coordinates (Class B certification progression).'
        ];
      } else {
        certTitle = 'Colorado Class B Wastewater Operator';
        certCode = 'Class B';
        certQuote = 'Your extensive labor foundation and plumbing knowledge qualify you for high-capacity sludge dewatering, centrifuge operations, or heavy mechanical coordination.';
        matchedJobIds = ['job-4', 'job-1']; 
        pathSteps = [
          'Step 1: Credit up to 1.5 years of structural labor as mechanical equivalence.',
          'Step 2: Log 2 years of active process hours in secondary settling or digester towers.',
          'Step 3: Pass Colorado state Class B municipal licensing exam.',
          'Step 4: Transition into supervisory Biosolids and Agricultural Lease Coordinator roles.'
        ];
      }
    } else if (selectedBackground === 'military') {
      if (experienceLevel === 'entry' || experienceLevel === 'mid') {
        certTitle = 'Colorado Class C Municipal Wastewater Operator';
        certCode = 'Class C / D';
        certQuote = 'Your mechanical troubleshooting skills translate directly into industrial centrifuge operation, pneumatic valve repairs, and SCADA system tuning.';
        matchedJobIds = ['job-4']; 
        pathSteps = [
          'Step 1: OIT status with mechanical waiver (enables taking Class C exam immediately).',
          'Step 2: Perform 1 year of active secondary tank or dewatering centrifuge service.',
          'Step 3: Verify Colorado Class C license credentials.',
          'Step 4: Progress to Lead mechanical roles or advanced SCADA operator pools.'
        ];
      } else {
        certTitle = 'Colorado Class A Lead Wastewater Operations Specialist';
        certCode = 'Class A';
        certQuote = 'Military engineering and mechanical leads hit the ground running. You can combine leadership experience to quickly manage high-capacity SCADA operations.';
        matchedJobIds = ['job-1']; 
        pathSteps = [
          'Step 1: File for military process equivalence with CDPHE licensing division.',
          'Step 2: Audit advanced primary, secondary biological, and UV disinfection loops.',
          'Step 3: Pass Colorado state Class A master-level wastewater licensing examination.',
          'Step 4: Step into Senior Operations Specialist roles directing joint Littleton-Englewood shifts.'
        ];
      }
    } else if (selectedBackground === 'lab') {
      certTitle = 'Environmental Water Quality Laboratory Analyst';
      certCode = 'Specialist / Analyst';
      certQuote = 'Chemistry and science backgrounds bypass normal physical pipe levels. Your analytical training integrates directly into daily EPA testing and research-level PILOT operations.';
      matchedJobIds = ['job-3'];
      pathSteps = [
        'Step 1: Enter SPR environmental team as standard Water Quality Lab Specialist.',
        'Step 2: Master spectrophotometry on daily effluent and South Platte River coordinate controls.',
        'Step 3: Certify as an EPA-authorized discharge reporter.',
        'Step 4: Lead future academic research partnerships in our PARC Pilot center.'
      ];
    } else { // High-School Grad
      certTitle = 'Paid Apprentice OIT / Class D Operator';
      certCode = 'OIT to Class D';
      certQuote = 'Start from scratch with pay! We supply exhaustive books, paid training coordinates, and pair you with Class A operators to build a lifetime environmental license.';
      matchedJobIds = ['job-4']; // can start in dewatering
      pathSteps = [
        'Step 1: Join Littleton-Englewood team under paid Operator-in-Training apprentice tier.',
        'Step 2: Log 12 months (2,000 hours) of physical operations (SPR pays 100% of study hours!).',
        'Step 3: Pass foundational Colorado Class D state certification exam.',
        'Step 4: Secure automatic $3-$5 / hr compensation bump and select permanent process specialization.'
      ];
    }

    return { certTitle, certCode, certQuote, matchedJobIds, pathSteps };
  };

  const { certTitle, certCode, certQuote, matchedJobIds, pathSteps } = calculatePathwayAndJobMatch();

  // Highlight matched open jobs block from Career database
  const matchedJobsInCatalog = MOCK_JOBS.filter(j => matchedJobIds.includes(j.id));

  const announceStepChange = (nextStep: number) => {
    setCurrentStep(nextStep);
    // Announce step progression to help screen Readers
    const announcer = document.getElementById('accessibility-announcement');
    if (announcer) {
      if (nextStep === 1) {
        announcer.textContent = "Career Planner. Step 1 of 3: Select your background. Currently selecting " + selectedBackground + ".";
      } else if (nextStep === 2) {
        announcer.textContent = "Step 2 of 3: Specify experience focus. Currently selecting Experience level " + experienceLevel + ".";
      } else {
        announcer.textContent = "Step 3 of 3: Analysis complete. Displaying Colorado " + certTitle + " certification route and matching jobs.";
      }
    }
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      announceStepChange(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      announceStepChange(currentStep - 1);
    }
  };

  const selectBackgroundAndAdvance = (bgId: string) => {
    setSelectedBackground(bgId);
    // If user picks Lab / Chemistry, bypass experience level directly to Step 3 (Lab analysts don't use standard operator progression)
    if (bgId === 'lab') {
      setExperienceLevel('senior');
      announceStepChange(3);
    } else {
      announceStepChange(2);
    }
  };

  return (
    <section 
      className="bg-white border border-gray-250 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
      id="operator-career-pathfinder"
      aria-label="Colorado Operator Career guided planner"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-150 pb-4">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-brand-primary block">
            Guided Resource Planner
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold font-display text-neutral-ink uppercase">
            Colorado Operator Career Pathfinder
          </h2>
          <p className="text-xs text-slate-500 font-sans max-w-2xl leading-relaxed">
            Colorado wastewater certifications are gold standard credentials. Use our 3-step planner to map physical labor, military, or science background coordinates directly into state licensing tracks (Class D &rarr; A) and active roles.
          </p>
        </div>
        
        {/* Step indicator bubbles */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold shrink-0">
          <span className={`h-6 w-6 rounded-full flex items-center justify-center border ${currentStep >= 1 ? 'bg-brand-primary text-white border-brand-primary' : 'bg-slate-50 text-slate-400 border-slate-250'}`}>1</span>
          <span className="h-0.5 w-4 bg-slate-300" />
          <span className={`h-6 w-6 rounded-full flex items-center justify-center border ${currentStep >= 2 ? 'bg-brand-primary text-white border-brand-primary' : 'bg-slate-50 text-slate-400 border-slate-250'}`}>2</span>
          <span className="h-0.5 w-4 bg-slate-300" />
          <span className={`h-6 w-6 rounded-full flex items-center justify-center border ${currentStep >= 3 ? 'bg-brand-primary text-white border-brand-primary' : 'bg-slate-50 text-slate-400 border-slate-250'}`}>3</span>
        </div>
      </div>

      {/* Guided steps frames container */}
      <div className="relative overflow-hidden min-h-[340px]" id="career-pathfinder-slider">
        
        {/* STEP 1: BACKGROUND SELECT */}
        {currentStep === 1 && (
          <fieldset className={`space-y-4 ${reduceMotion ? '' : 'animate-stagger-fade'}`}>
            <legend className="text-sm font-extrabold text-neutral-ink uppercase tracking-wide block mb-2 font-display">
              Step 1: Select Your Current Background Base
            </legend>
            <p className="text-xs text-slate-500 font-sans">
              Choose the work profile that best matching your active skills and physical coordinates.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {backgrounds.map((bg) => {
                const isSelected = selectedBackground === bg.id;
                return (
                  <button
                    key={bg.id}
                    onClick={() => selectBackgroundAndAdvance(bg.id)}
                    className={`text-left p-4 rounded-2xl border transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2 flex items-start gap-4 cursor-pointer hover:-translate-y-0.5 ${
                      isSelected 
                        ? 'bg-brand-primary/5 border-brand-primary ring-1 ring-brand-primary shadow-sm' 
                        : 'bg-white border-gray-250 hover:border-brand-primary'
                    }`}
                    id={`pathfinder-bg-${bg.id}`}
                    aria-label={`Option: ${bg.name}. ${bg.description}`}
                  >
                    <span className="text-2xl shrink-0 block p-2 bg-slate-50 border border-gray-100 rounded-xl" aria-hidden="true">
                      {bg.icon}
                    </span>
                    <div className="space-y-1">
                      <span className="block font-bold text-neutral-ink text-sm font-display group-hover:text-brand-primary transition-colors">
                        {bg.name}
                      </span>
                      <p className="text-xs text-slate-500 leading-normal font-sans">
                        {bg.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {/* STEP 2: EXPERIENCE SELECT */}
        {currentStep === 2 && (
          <fieldset className={`space-y-4 ${reduceMotion ? '' : 'animate-stagger-fade'}`}>
            <legend className="text-sm font-extrabold text-neutral-ink uppercase tracking-wide block mb-2 font-display">
              Step 2: Define Experience Level &amp; Time Coordinates
            </legend>
            <p className="text-xs text-slate-500 font-sans">
              Colorado permits combining structural mechanical, plumbing, or laboratory work hours towards state licensing.
            </p>

            <div className="space-y-3">
              {experienceLevels.map((exp) => {
                const isSelected = experienceLevel === exp.id;
                return (
                  <button
                    key={exp.id}
                    onClick={() => {
                      setExperienceLevel(exp.id);
                      announceStepChange(3);
                    }}
                    className={`w-full text-left p-4 rounded-xl border cursor-pointer flex items-center justify-between gap-4 outline-none transition-colors ${
                      isSelected 
                        ? 'bg-brand-teal/5 border-brand-teal ring-1 ring-brand-teal shadow-xs' 
                        : 'bg-white border-gray-250 hover:border-brand-teal'
                    }`}
                    id={`pathfinder-exp-${exp.id}`}
                    aria-label={`Option experience: ${exp.name}. ${exp.description}`}
                  >
                    <div className="font-sans">
                      <span className="block font-bold text-neutral-ink text-xs">{exp.name}</span>
                      <span className="block text-xxs text-slate-500 mt-0.5">{exp.description}</span>
                    </div>
                    <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-brand-teal bg-brand-teal text-white' : 'border-gray-300 bg-white'
                    }`}>
                      {isSelected && <span className="h-2 w-2 rounded-full bg-white block" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={handlePrevStep}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-gray-250 rounded-lg cursor-pointer transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            </div>
          </fieldset>
        )}

        {/* STEP 3: SUMMARY RECOMMENDATION & JOB MATCH */}
        {currentStep === 3 && (
          <div className={`space-y-6 ${reduceMotion ? '' : 'animate-scale-up'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Recommended Route Details Card (Lg: 7cols) */}
              <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-5 md:p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-start justify-between border-b border-gray-100 pb-3 gap-2">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-widest font-bold text-slate-500 uppercase block leading-none">
                        RECOMMENDED COLORADO TIER
                      </span>
                      <h3 className="text-base font-bold font-display text-neutral-ink">
                        {certTitle}
                      </h3>
                    </div>
                    <span className="shrink-0 font-mono text-xs font-bold uppercase tracking-wider bg-emerald-50 text-brand-green border border-brand-green/20 px-3 py-1 rounded">
                      Route Certified
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed italic font-sans border-l-4 border-brand-teal pl-3">
                    &ldquo;{certQuote}&rdquo;
                  </p>

                  <div className="space-y-2">
                    <span className="block text-xxs font-extrabold uppercase tracking-widest text-slate-500 font-mono">
                      State Licensing Milestones
                    </span>
                    <ul className="space-y-1.5 font-sans text-xs text-slate-700">
                      {pathSteps.map((step, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-brand-teal shrink-0 font-bold font-mono text-xxs">{idx + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-50 border border-gray-150 p-3.5 rounded-xl flex items-center gap-3 mt-4">
                  <BookOpen className="h-5 w-5 text-brand-primary shrink-0" />
                  <div className="text-[10px] font-sans text-slate-500 leading-relaxed">
                    <span className="block font-bold text-neutral-ink text-xs mb-0.5">100% Paid Educational Materials</span>
                    SPR is Littleton-Englewood ratepayer supported. We fund ALL manuals, licensing fees, state certification prep courses, and offer automatic cash bonuses upon passing each exam coordinate.
                  </div>
                </div>
              </div>

              {/* Matched Open Jobs Box (Lg: 5cols) */}
              <div className="lg:col-span-5 bg-neutral-soft border border-gray-150 rounded-2xl p-5 md:p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="block text-[10px] font-mono tracking-wider font-bold text-slate-500 uppercase border-b border-gray-200 pb-1.5">
                    Direct matched Openings ({matchedJobsInCatalog.length})
                  </span>

                  <div className="space-y-3">
                    {matchedJobsInCatalog.length > 0 ? (
                      matchedJobsInCatalog.map(job => (
                        <div key={job.id} className="bg-white border border-gray-150 p-4 rounded-xl space-y-3 hover:border-brand-teal transition-all">
                          <div className="space-y-1 font-sans">
                            <h4 className="text-xs font-bold text-neutral-ink font-display leading-snug line-clamp-2">
                              {job.title}
                            </h4>
                            <span className="block text-[10px] text-slate-500 font-semibold">{job.salary}</span>
                            <span className="block text-[9px] text-brand-primary font-mono font-bold uppercase">{job.department} Division</span>
                          </div>

                          <button
                            onClick={() => onSelectJob(job)}
                            className="inline-flex items-center gap-1.5 text-xs text-brand-teal hover:text-brand-depth font-bold hover:underline cursor-pointer"
                            aria-label={`Apply or learn more about ${job.title}`}
                          >
                            <span>Jump to role details</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-slate-500 py-6 text-xs font-sans space-y-1">
                        <p className="font-semibold">No direct active role open.</p>
                        <p className="text-[10px]">But apprentice slots open monthly! Submit your resume directly below.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      // Reset to custom background stage but preserve choices
                      announceStepChange(1);
                    }}
                    className="w-full py-2.5 bg-white text-slate-700 text-xs font-bold border border-gray-250 rounded-xl hover:bg-slate-50 cursor-pointer text-center"
                    aria-label="Restart career pathfinder session"
                  >
                    Start Over
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
