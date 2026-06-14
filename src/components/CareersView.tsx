import React from 'react';
import { MOCK_JOBS } from '../data';
import { Job } from '../types';
import { 
  Search, Briefcase, Clock, DollarSign, MapPin, 
  ChevronRight, ArrowLeft, Upload, FileText, CheckCircle,
  HelpCircle, Eye, AlertCircle, X
} from 'lucide-react';
import CareerPathfinder from './CareerPathfinder';

interface CareersViewProps {
  highContrast: boolean;
  reduceMotion: boolean;
}

export default function CareersView({ highContrast, reduceMotion }: CareersViewProps) {
  // Filters state
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedDept, setSelectedDept] = React.useState<string>('All');
  const [selectedType, setSelectedType] = React.useState<string>('All');

  // Active Job detail Modal state
  const [activeJobForForm, setActiveJobForForm] = React.useState<Job | null>(null);

  // Application Form state
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [coverLetter, setCoverLetter] = React.useState('');
  const [fileName, setFileName] = React.useState('');
  const [isDragging, setIsDragging] = React.useState(false);
  const [formError, setFormError] = React.useState('');
  const [submitSuccess, setSubmitSuccess] = React.useState('');

  // Accessibility Refs for Keyboard Focus Management
  const lastActiveElement = React.useRef<HTMLElement | null>(null);
  const modalRef = React.useRef<HTMLDivElement | null>(null);

  // Focus tracking and keyboard navigation management inside the applying modal
  React.useEffect(() => {
    if (activeJobForForm) {
      // Store the element that currently has focus to return it back on close
      lastActiveElement.current = document.activeElement as HTMLElement;
      
      const timer = setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus();
        }
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setActiveJobForForm(null);
          return;
        }

        if (e.key === 'Tab') {
          if (!modalRef.current) return;
          
          // Selector for all focusable controls inside the dialog
          const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
          const focusableElements = Array.from(
            modalRef.current.querySelectorAll(focusableSelectors)
          ) as HTMLElement[];
          const visibleElements = focusableElements.filter(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.width > 0 && rect.height > 0;
            const isNotDisabled = !(el as any).disabled;
            return isVisible && isNotDisabled;
          });

          if (visibleElements.length === 0) {
            e.preventDefault();
            return;
          }

          const firstElement = visibleElements[0];
          const lastElement = visibleElements[visibleElements.length - 1];

          if (e.shiftKey) {
            // Shift + Tab: reverse cycle
            if (document.activeElement === firstElement || document.activeElement === modalRef.current) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            // Tab: normal cycle
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
        // Direct focus back to original trigger on close
        if (lastActiveElement.current) {
          lastActiveElement.current.focus();
        }
      };
    }
  }, [activeJobForForm]);

  // Handle Drag & Drop File Events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setFileName(file.name);
      } else {
        setFormError('Please upload a PDF file containing your professional resume.');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setFileName(file.name);
        setFormError('');
      } else {
        setFormError('Please upload a PDF file containing your professional resume.');
      }
    }
  };

  // Submit trigger
  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!firstName.trim() || !lastName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !phone.trim()) {
      setFormError('Contact coordinates (email & phone) are mandatory.');
      return;
    }
    if (!fileName) {
      setFormError('Please upload your PDF resume so plant hiring supervisors can verify certifications.');
      return;
    }

    // Generate Applicant tracking sequence
    const appTrackingCode = `APP-${new Date().getFullYear()}-${Math.floor(20000 + Math.random() * 70000)}`;
    setSubmitSuccess(appTrackingCode);

    // Announce to screen-readers
    const announcer = document.getElementById('accessibility-announcement');
    if (announcer) {
      announcer.textContent = `Application submitted successfully. Your tracking code is ${appTrackingCode}.`;
    }
  };

  const handleApplyClick = (job: Job) => {
    setActiveJobForForm(job);
    setSubmitSuccess('');
    setFormError('');
    setIsDragging(false);
    setFileName('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setCoverLetter('');
  };

  // Filter Logic
  const filteredJobs = MOCK_JOBS.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.requirements.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesType = selectedType === 'All' || job.type === selectedType;
    return matchesSearch && matchesDept && matchesType;
  });

  return (
    <div className="space-y-8">
      {/* Page Editorial Header */}
      <div className="border-b border-gray-200 pb-5 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 rounded-full text-xs font-bold text-brand-primary uppercase">
          <Briefcase className="h-3.5 w-3.5" />
          <span>Security &amp; Operations recruitment</span>
        </div>
        <h1 className="text-3xl font-extrabold font-display tracking-tight text-neutral-ink uppercase">
          South Platte Renew Careers
        </h1>
        <p className="text-xs text-slate-500 max-w-3xl leading-relaxed font-sans">
          Unlike legacy platforms that redirect applicants to complex, external portals, our redesigned Careers page keeps operational recruitment 100% in-domain. Wastewater operations are critical to civil environmental protection. Discover active roles, track local certification training, and apply directly using our secure form below.
        </p>
      </div>

      {/* Operator Career Guidance Pathfinder Tool */}
      <CareerPathfinder reduceMotion={reduceMotion} onSelectJob={handleApplyClick} />

      {/* Filter / Search Bar Panel */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Keyword Search */}
        <div className="md:col-span-5 space-y-1.5">
          <label htmlFor="job-search-input" className="block text-xs font-extrabold text-neutral-ink uppercase tracking-wide">
            Search Openings (Keyword)
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              id="job-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g. SCADA, Operator, Class A, Analyst..."
              className="w-full pl-10 pr-3 py-2.5 text-xs border border-gray-300 rounded-lg focus:border-brand-primary outline-hidden font-sans text-neutral-ink"
            />
          </div>
        </div>

        {/* Department Filter */}
        <div className="md:col-span-3 space-y-1.5">
          <label htmlFor="dept-filter" className="block text-xs font-extrabold text-neutral-ink uppercase tracking-wide">
            Filter Department
          </label>
          <select
            id="dept-filter"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full p-2.5 text-xs border border-gray-300 rounded-lg focus:border-brand-primary outline-hidden font-sans"
          >
            <option value="All">All Departments</option>
            <option value="Operations">Operations Division</option>
            <option value="Engineering">Engineering Division</option>
            <option value="Science">Water Quality Science</option>
            <option value="Administration">Administration &amp; Comms</option>
          </select>
        </div>

        {/* Commitment Type Filter */}
        <div className="md:col-span-3 space-y-1.5">
          <label htmlFor="type-filter" className="block text-xs font-extrabold text-neutral-ink uppercase tracking-wide">
            Job Type
          </label>
          <select
            id="type-filter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-2.5 text-xs border border-gray-300 rounded-lg focus:border-brand-primary outline-hidden font-sans"
          >
            <option value="All">All Commitments</option>
            <option value="Full-Time">Full-Time (40 Hours)</option>
            <option value="Part-Time">Part-Time (Hourly)</option>
          </select>
        </div>

        {/* Reset Filter Action */}
        <div className="md:col-span-1">
          <button
            onClick={() => { setSearchTerm(''); setSelectedDept('All'); setSelectedType('All'); }}
            className="w-full py-2.5 text-xs text-brand-primary hover:text-brand-depth font-bold border border-gray-200 rounded-lg hover:bg-neutral-soft cursor-pointer transition-colors"
            aria-label="Reset job filters"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Results Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Filtered Openings Lists (Lg: 7cols) */}
        <div key={`${selectedDept}-${selectedType}-${searchTerm}`} className="lg:col-span-7 space-y-4" id="job-postings-list">
          {filteredJobs.length === 0 ? (
            <div className="bg-slate-50 border border-gray-200 rounded-2xl p-10 text-center space-y-3">
              <HelpCircle className="h-10 w-10 text-slate-400 mx-auto" />
              <h2 className="text-base font-bold text-neutral-ink">No Open Positions Match Your Search</h2>
              <p className="text-xs text-slate-500 font-sans max-w-md mx-auto">
                No active wastewater engineering, operations, or laboratory roles match your filters at this time. Please expand your keyword criteria.
              </p>
            </div>
          ) : (
            filteredJobs.map((job, idx) => (
              <div 
                key={job.id} 
                tabIndex={0}
                className={`bg-white border border-gray-200 hover:border-brand-teal focus-within:border-brand-teal transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md focus-within:-translate-y-1 focus-within:shadow-md focus-within:ring-2 focus-within:ring-brand-teal/40 outline-hidden rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group ${
                  reduceMotion ? '' : 'opacity-0 animate-stagger-fade'
                }`}
                style={reduceMotion ? {} : { animationDelay: `${idx * 30}ms` }}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-brand-primary/10 rounded text-[10px] font-bold text-brand-primary uppercase">
                      {job.department}
                    </span>
                    <span className="text-xxs text-slate-500 font-mono">Posted {job.postedDate}</span>
                  </div>
                  <h2 className="text-base font-bold text-neutral-ink font-display leading-snug group-hover:text-brand-primary transition-colors">
                    {job.title}
                  </h2>
                  
                  {/* Metadata coordinates tag row */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xxs text-slate-500 font-sans">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-brand-teal" /> {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5 text-brand-teal" /> {job.salary}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-brand-teal" /> {job.location}
                    </span>
                  </div>
                </div>

                <button
                  id={`apply-trigger-${job.id}`}
                  onClick={() => handleApplyClick(job)}
                  className="px-4 py-2.5 bg-neutral-soft text-brand-primary border border-brand-primary/20 hover:bg-brand-primary hover:text-white rounded-lg font-bold text-xs shrink-0 cursor-pointer transition-colors flex items-center gap-1 w-full sm:w-auto justify-center"
                  aria-label={`View description and apply for ${job.title}`}
                >
                  <span>Apply Now</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Right Side: Quick FAQ / Joint-Oversight Policy Guidance (Lg: 5cols) */}
        <div className="lg:col-span-5 bg-slate-50 border border-gray-200 rounded-2xl p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-600 uppercase tracking-widest font-mono">
              Recruitment Guidelines
            </h2>
            <h3 className="text-base font-bold text-neutral-ink font-display">
              Littleton-Englewood Civil Benefits
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Every wastewater operator position at South Platte Renew features incredible public health benefits, pension scaling, paid training, and Class A operator licensing assistance under Colorado DPHE guidelines. We co-sponsor regional community trade development.
            </p>
          </div>

          <div className="space-y-4 border-t border-gray-200 pt-4">
            <div className="flex items-start gap-3">
              <span className="h-5 w-5 rounded-full bg-blue-50 text-brand-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div className="space-y-1">
                <span className="block text-xs font-bold text-neutral-ink">Pension Security matching</span>
                <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                  Dual-City co-sponsored municipal pension match up to 8% total compensation value.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="h-5 w-5 rounded-full bg-teal-50 text-brand-teal text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div className="space-y-1">
                <span className="block text-xs font-bold text-neutral-ink">Trade Certification support</span>
                <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                  We cover 100% of study courses, training labor, travel, and registration costs for State certified liquid/solids operations testing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* APPLY PORTAL DRAWER / DIALOG MODAL LAYOUT */}
      {activeJobForForm && (
        <div 
          ref={modalRef}
          tabIndex={-1}
          className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 overflow-y-auto outline-none"
          role="dialog"
          aria-labelledby="modal-apply-title"
          aria-modal="true"
          id="careers-apply-modal"
        >
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            
            {/* Close trigger top-right */}
            <button
              onClick={() => setActiveJobForForm(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-neutral-soft cursor-pointer transition-colors"
              aria-label="Close Careers Apply application form"
              id="careers-close-modal-x"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Title Banner */}
            <div className="border-b border-gray-100 pb-4">
              <span className="block text-xxs font-bold text-slate-500 uppercase tracking-widest font-mono mb-1">
                IN-DOMAIN Direct application
              </span>
              <h2 id="modal-apply-title" className="text-xl font-bold font-display text-neutral-ink">
                Applying For: <span className="text-brand-primary">{activeJobForForm.title}</span>
              </h2>
              <div className="flex flex-wrap gap-4 text-xxs text-slate-500 font-sans mt-2">
                <span><span className="font-bold text-slate-700">Dept:</span> {activeJobForForm.department} Division</span>
                <span>&bull;</span>
                <span><span className="font-bold text-slate-700">Salary:</span> {activeJobForForm.salary}</span>
              </div>
            </div>

            {submitSuccess ? (
              // SUBMIT COMPLETED SCREEN
              <div className={`bg-emerald-500/10 border border-brand-green/30 rounded-2xl p-6 space-y-4 text-center ${
                reduceMotion ? '' : 'animate-scale-up'
              }`} role="alert" id="careers-apply-success">
                <CheckCircle className="h-12 w-12 text-brand-green mx-auto shrink-0" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-brand-green">Application Received Successfully</h3>
                  <p className="text-xs text-slate-600 font-sans max-w-md mx-auto">
                    Your application has been filed in-domain under the Littleton-Englewood civil service registry. Our plant HR supervisors will trace qualifications.
                  </p>
                </div>
                <div className="max-w-xs mx-auto bg-white border border-gray-200 p-3.5 rounded-xl font-mono text-xs text-neutral-ink space-y-1.5 shadow-sm">
                  <div><span className="font-bold text-slate-500 uppercase">Tracking ID:</span></div>
                  <div className="text-sm font-extrabold text-brand-primary">{submitSuccess}</div>
                  <div className="text-[10px] text-slate-400">Log saved: Just now</div>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveJobForForm(null)}
                    className="px-6 py-2 bg-brand-primary hover:bg-brand-depth text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-sm"
                  >
                    Return to Listings
                  </button>
                </div>
              </div>
            ) : (
              // DYNAMIC APPLICATION INPUTS FORM
              <form onSubmit={handleApplicationSubmit} className="space-y-4 text-xs font-sans">
                {formError && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-3 text-red-700 font-semibold rounded-r-md flex items-center gap-2" role="alert" id="form-error-callout">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Name fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="applicant-first" className="block font-bold text-slate-700 mb-1">First Name</label>
                    <input
                      type="text"
                      id="applicant-first"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Samuel"
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:border-brand-primary outline-hidden"
                    />
                  </div>
                  <div>
                    <label htmlFor="applicant-last" className="block font-bold text-slate-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="applicant-last"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Ramirez"
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:border-brand-primary outline-hidden"
                    />
                  </div>
                </div>

                {/* Contact coords */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="applicant-email" className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="applicant-email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. samuel.ramirez@gmail.com"
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:border-brand-primary outline-hidden"
                    />
                  </div>
                  <div>
                    <label htmlFor="applicant-phone" className="block font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="applicant-phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. (303) 555-0198"
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:border-brand-primary outline-hidden"
                    />
                  </div>
                </div>

                {/* USABILITY REQUIREMENT COMPONENT: Manual/Drag File drop zone */}
                <div className="space-y-1.5 focus-within:ring-2 focus-within:ring-brand-primary rounded-xl">
                  <span className="block font-bold text-slate-700">
                    Professional Resume (PDF File Only)
                  </span>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('resume-file-picker')?.click()}
                    className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                      isDragging 
                        ? 'border-brand-primary bg-blue-50/40 text-brand-primary' 
                        : fileName
                          ? 'border-brand-green bg-emerald-50/10 text-neutral-ink'
                          : 'border-gray-300 hover:border-brand-teal text-slate-500'
                    }`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        document.getElementById('resume-file-picker')?.click();
                      }
                    }}
                    aria-label="Upload Resume button. Click or drag-and-drop a PDF file to upload."
                  >
                    <input
                      type="file"
                      id="resume-file-picker"
                      accept=".pdf,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      aria-hidden="true"
                    />
                    {fileName ? (
                      <div className="flex flex-col items-center gap-1">
                        <FileText className="h-8 w-8 text-brand-green" />
                        <span className="text-xs font-bold text-neutral-ink">{fileName}</span>
                        <span className="text-[10px] text-brand-green font-semibold">File Uploaded Successfully - Click to change</span>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <Upload className="h-8 w-8 text-slate-400 mx-auto" />
                        <span className="block font-bold text-neutral-ink text-xs">Drag &amp; Drop PDF Resume Here</span>
                        <span className="block text-[10px] text-slate-400">or click to browse local computer folder</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Short cover letter field */}
                <div>
                  <label htmlFor="applicant-letter" className="block font-bold text-slate-700 mb-1 font-sans">
                    Statement of Interest &amp; Active Operator Certificates (Optional)
                  </label>
                  <textarea
                    id="applicant-letter"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="e.g. I hold a Colorado Class B Wastewater treatment certificate and would like to obtain my Class A licensing via SPR co-sponsored training program..."
                    rows={3}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:border-brand-primary outline-hidden"
                  />
                </div>

                {/* Actions row */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setActiveJobForForm(null)}
                    className="px-4 py-2 border border-gray-200 text-slate-600 rounded-lg hover:bg-neutral-soft cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-brand-primary hover:bg-brand-depth text-white font-bold rounded-lg cursor-pointer transition-colors"
                    id="careers-submit-application-btn"
                  >
                    Submit Secure Application
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
