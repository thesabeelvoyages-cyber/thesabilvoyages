import React, { useState, useEffect } from 'react';
import { TourPackage, GalleryPhoto } from '../types';
import { 
  Lock, 
  Key, 
  HelpCircle, 
  Compass, 
  Save, 
  RefreshCw, 
  Plus, 
  Trash2, 
  DollarSign, 
  TrendingUp, 
  Phone, 
  User, 
  BellRing, 
  Info,
  Calendar,
  Layers,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Mail,
  ShieldAlert,
  Send,
  Clock,
  Check,
  Camera
} from 'lucide-react';

interface AdminViewProps {
  packages: TourPackage[];
  onChangePackages: (newPkgs: TourPackage[]) => void;
  whatsappConfig: {
    phoneNumber: string;
    agentName: string;
    status: string;
  };
  onChangeWhatsappConfig: (newConfig: { phoneNumber: string; agentName: string; status: string }) => void;
  galleryPhotos: GalleryPhoto[];
  onChangeGalleryPhotos: (newPhotos: GalleryPhoto[]) => void;
  onGoHome: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  packages,
  onChangePackages,
  whatsappConfig,
  onChangeWhatsappConfig,
  galleryPhotos,
  onChangeGalleryPhotos,
  onGoHome
}) => {
  // Login section state
  const [activeTab, setActiveTab] = useState<'login' | 'forgot'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('thesabil_admin_logged') === 'true';
  });
  const [loginError, setLoginError] = useState('');

  // OTP reset states
  const [emailInput, setEmailInput] = useState('ssammerhussain@gmail.com');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpSuccessMessage, setOtpSuccessMessage] = useState('');
  const [otpErrorMessage, setOtpErrorMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordResetMode, setIsPasswordResetMode] = useState(false);

  // Selected package to edit
  const [selectedPkgId, setSelectedPkgId] = useState<string>(packages[0]?.id || '');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');

  // Guest photo gallery state
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [newPhotoTraveler, setNewPhotoTraveler] = useState('');
  const [newPhotoDate, setNewPhotoDate] = useState('');
  const [newPhotoLocation, setNewPhotoLocation] = useState('');

  // Sabil Inquiries Desk state & sync
  const [itineraries, setItineraries] = useState<any[]>(() => {
    return JSON.parse(localStorage.getItem('thesabil_itineraries_v1') || '[]');
  });
  const [inboxFilter, setInboxFilter] = useState<'all' | 'unread' | 'replied'>('all');

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl.trim() || !newPhotoCaption.trim() || !newPhotoTraveler.trim()) {
      alert('Please fill out Name, Caption, and Photo URL Link correctly!');
      return;
    }
    const newPhoto: GalleryPhoto = {
      id: 'g-' + Date.now(),
      url: newPhotoUrl.trim(),
      caption: newPhotoCaption.trim(),
      travelerName: newPhotoTraveler.trim(),
      date: newPhotoDate.trim() || 'June 2026',
      location: newPhotoLocation.trim() || 'Kashmir Safaris'
    };
    onChangeGalleryPhotos([newPhoto, ...galleryPhotos]);
    setNewPhotoUrl('');
    setNewPhotoCaption('');
    setNewPhotoTraveler('');
    setNewPhotoDate('');
    setNewPhotoLocation('');
    triggerSuccess('📸 Dynamic traveler photo appended successfully!');
  };

  const handleDeletePhoto = (id: string) => {
    if (confirm('Are you sure you want to delete this traveler photo?')) {
      const updated = galleryPhotos.filter(p => p.id !== id);
      onChangeGalleryPhotos(updated);
      triggerSuccess('Photo memory deleted from gallery.');
    }
  };

  const handleResetPhotos = () => {
    if (confirm('Warning: This will restore the factory-default guest photo records. Proceed?')) {
      localStorage.removeItem('thesabil_gallery_v1');
      window.location.reload();
    }
  };

  useEffect(() => {
    const handleUpdate = () => {
      setItineraries(JSON.parse(localStorage.getItem('thesabil_itineraries_v1') || '[]'));
    };
    window.addEventListener('sabil_itineraries_updated', handleUpdate);
    return () => window.removeEventListener('sabil_itineraries_updated', handleUpdate);
  }, []);

  const toggleItineraryStatus = (id: string) => {
    const updated = itineraries.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'replied' ? 'unread' : 'replied';
        return { ...item, status: nextStatus };
      }
      return item;
    });
    localStorage.setItem('thesabil_itineraries_v1', JSON.stringify(updated));
    setItineraries(updated);
    triggerSuccess('Inquiry security status updated!');
  };

  const deleteItinerary = (id: string) => {
    const filtered = itineraries.filter(item => item.id !== id);
    localStorage.setItem('thesabil_itineraries_v1', JSON.stringify(filtered));
    setItineraries(filtered);
    triggerSuccess('Submission archive deleted.');
  };

  const seedMockInquiry = () => {
    const mockNames = ['Rohit Sharma', 'Pooja Hegde', 'Kabir Malhotra', 'Arjun Kapoor', 'Meera Nair'];
    const mockPhones = ['+91 9906012345', '+91 9149098765', '+91 9419123456', '+91 7006112233', '+91 8803124567'];
    const mockEmails = ['rohit@gmail.com', 'pooja.safaris@outlook.com', 'kabir@yahoo.com', 'arjun.k@travelers.in', 'meera.resort@gmail.com'];
    const mockMonths = ['Mid June', 'First week of August', 'September Safaris', 'Early Winter (December)', 'Gulmarg Snow Phase'];
    const mockGuests = ['2', '4', '1', '12', '4'];
    const mockTiers = ['3-Star Cozy Boutique', '4-Star Premium Resorts', '5-Star Luxury Palace'];
    const mockComments = [
      'Want to experience houseboat sunset shikara ride, Gulmarg gondola ride tickets (both phases) and Pahalgam valley. Please schedule this.',
      'We are on our honeymoon and require premium double suites, private Innova Crysta, and early check-ins in Srinagar.',
      'Solo trekking expedition. Prefer private guides, offbeat trail visits to Lidderwat/Doodhpathri and traditional Kashmiri meals.',
      'Family tour with senior citizens. Need customized pacing, wheel-chair accessible hotels if possible and low altitude stays.',
      'We require private photography coverage, candle dinner setups, and traditional Wazwan grand dinner. Let us know the additional pricing.'
    ];

    const idx = Math.floor(Math.random() * mockNames.length);
    const generatedId = `SVV-MOCK-${Math.floor(1000 + Math.random() * 8999)}`;
    const mockObj = {
      id: generatedId,
      name: mockNames[idx],
      phone: mockPhones[idx],
      email: mockEmails[idx],
      guests: mockGuests[idx],
      month: mockMonths[idx],
      tier: mockTiers[Math.floor(Math.random() * mockTiers.length)],
      notes: mockComments[idx],
      timestamp: new Date().toISOString(),
      status: 'unread',
      source: 'External Inquiry Form'
    };

    try {
      const stored = localStorage.getItem('thesabil_itineraries_v1');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(mockObj);
      localStorage.setItem('thesabil_itineraries_v1', JSON.stringify(list));
      setItineraries(list);
      triggerSuccess('Seeded a new live test inquiry!');
    } catch (_) {
      // fallback
    }
  };

  // Handle countdown timer for OTP
  useEffect(() => {
    let interval: any;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  // Login action handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Secure simple verification
    const currentPass = localStorage.getItem('thesabil_admin_password') || 'sabil2026';
    if (username.trim().toLowerCase() === 'admin' && password === currentPass) {
      setIsAuthenticated(true);
      sessionStorage.setItem('thesabil_admin_logged', 'true');
    } else {
      setLoginError('Invalid Username or Security Key. Please verify Sabil credentials.');
    }
  };

  // OTP sender simulation
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.includes('@')) {
      setOtpErrorMessage('Please insert a valid administrative email address.');
      return;
    }

    setIsSendingOtp(true);
    setOtpErrorMessage('');
    setOtpSuccessMessage('');

    // Simulate network delay
    setTimeout(() => {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);
      setIsOtpSent(true);
      setIsSendingOtp(false);
      setOtpTimer(60);
      setOtpSuccessMessage(`A 6-digit verification security OTP has been dispatched to ${emailInput}.`);
    }, 1500);
  };

  // Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpErrorMessage('');

    if (otpInput === generatedOtp) {
      setIsPasswordResetMode(true);
      setOtpSuccessMessage('Email verified successfully! Please define your new security pass key below.');
    } else {
      setOtpErrorMessage('Incorrect OTP. Please check your verification code and retry.');
    }
  };

  // Submit Password Change
  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      setOtpErrorMessage('Security key must contain at least 4 characters for security safety.');
      return;
    }

    localStorage.setItem('thesabil_admin_password', newPassword);
    
    // Auto login
    setIsAuthenticated(true);
    sessionStorage.setItem('thesabil_admin_logged', 'true');
    
    // Clean states
    setIsPasswordResetMode(false);
    setIsOtpSent(false);
    setOtpInput('');
    setGeneratedOtp('');
    triggerSuccess('Administrative security key successfully re-configured and logged in!');
  };

  // Logout action handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('thesabil_admin_logged');
  };

  // Find currently editting package
  const editingPkg = packages.find(p => p.id === selectedPkgId) || packages[0];


  // Handler to update package details
  const updatePackageField = (field: keyof TourPackage, value: any) => {
    if (!editingPkg) return;
    const updated = packages.map((p) => {
      if (p.id === editingPkg.id) {
        return { ...p, [field]: value };
      }
      return p;
    });
    onChangePackages(updated);
  };

  // Highlights updates handler (newline separated)
  const handleHighlightsChange = (text: string) => {
    const highlightsArray = text.split('\n').filter(line => line.trim() !== '');
    updatePackageField('highlights', highlightsArray);
  };

  // Add new blank package
  const handleAddNewPackage = () => {
    const newId = `custom-package-${Date.now()}`;
    const newPkg: TourPackage = {
      id: newId,
      title: 'New Luxury Custom Safari Tour',
      location: 'Srinagar',
      category: 'FAMILY / COMFORT',
      badge: 'Bespoke Curated',
      duration: '6 Days / 5 Nights',
      description: 'Fill in your tailored package description here to let guests see the custom details on the inquiry forms.',
      highlights: [
        'Premium houseboats accommodation',
        'Official Phase 1 and 2 Gondola tickets guaranteed',
        'Private chauffeur-driven SUV'
      ],
      price: 15000,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDrss5Sm7tLzJm_JQs-0PxUPEHxPmhlEAyL06aJ7j9rrbZu_-6Avnm2mbejKWPUQCA_M5N1WfKb-4LAC6UMjykgee7Brn5Eoyxlj2C0M5qCPgvOks6jhTQelrFfd99UjEf0C8wqoOhEegmIeiIy1TJ5E6u5IhOr3Lhs_UwhnFONEyh59n3x4aEasXtLv0nkUWpCyVkiDozhJAele42Cwl-nBhiWUFa5zMV0Wvf99TlFBzseYASp0KSi-CI3AFDb28zXGcPbA_1fDo'
    };

    onChangePackages([...packages, newPkg]);
    setSelectedPkgId(newId);
    triggerSuccess('New custom package added to your catalog!');
  };

  // Delete package
  const handleDeletePackage = (idToDelete: string) => {
    if (packages.length <= 1) {
      alert('You must maintain at least one active package catalog in the live database!');
      return;
    }
    if (confirm('Are you absolutely sure you want to delete this package from the live catalog? This cannot be undone.')) {
      const filtered = packages.filter(p => p.id !== idToDelete);
      onChangePackages(filtered);
      setSelectedPkgId(filtered[0]?.id || '');
      triggerSuccess('Package successfully catalog-removed.');
    }
  };

  // Reset default packages configuration
  const handleResetDefaults = () => {
    if (confirm('Warning: This will clear all manual custom rates and restore the factory-default Sabil tour catalog. Proceed?')) {
      localStorage.removeItem('thesabil_packages_v1');
      localStorage.removeItem('thesabil_whatsapp_config');
      sessionStorage.removeItem('thesabil_admin_logged');
      window.location.reload();
    }
  };

  // Help show success message
  const triggerSuccess = (msg: string) => {
    setSaveSuccessMessage(msg);
    setTimeout(() => {
      setSaveSuccessMessage('');
    }, 4000);
  };

  // Render Login page if not verified
  if (!isAuthenticated) {
    return (
      <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in text-left">
        <div className="max-w-md mx-auto bg-white border border-brand-border rounded-2xl shadow-2xl overflow-hidden mt-6 flex flex-col">
          
          {/* Visual Header Banner - stacked on top */}
          <div className="bg-brand-sage text-brand-cream-light p-6 text-center relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
              <Compass className="h-28 w-28 text-white animate-spin-slow" />
            </div>
            <div className="space-y-2 relative z-10">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#EBDCC5] font-bold bg-white/10 px-2 py-0.5 rounded inline-block">
                Sabil Curation Desk
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-white leading-tight">
                Administration Desk
              </h2>
              <p className="text-[10px] text-[#EAE6DF]/90 font-light max-w-xs mx-auto leading-relaxed">
                Provide administrative credentials below to update the live safari rates, helpline configurations, and guest photographs.
              </p>
            </div>
          </div>

          {/* Interactive Dual Tab Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-center bg-white">
            
            {/* Tab Selector */}
            <div className="flex border-b border-brand-border/60 pb-4 mb-6">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  setOtpErrorMessage('');
                  setLoginError('');
                }}
                className={`flex-1 text-center pb-3 text-xs uppercase tracking-wider font-mono font-bold border-b-2 transition-all ${
                  activeTab === 'login'
                    ? 'border-brand-rust text-brand-onyx'
                    : 'border-transparent text-brand-onyx/40 hover:text-brand-onyx/75'
                }`}
              >
                🔒 Security Sign-In
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('forgot');
                  setOtpErrorMessage('');
                  setLoginError('');
                }}
                className={`flex-1 text-center pb-3 text-xs uppercase tracking-wider font-mono font-bold border-b-2 transition-all ${
                  activeTab === 'forgot'
                    ? 'border-brand-rust text-brand-onyx'
                    : 'border-transparent text-brand-onyx/40 hover:text-brand-onyx/75'
                }`}
              >
                🔑 Forgot Passkey / OTP
              </button>
            </div>

            {/* TAB 1: Credentials Login */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-semibold text-brand-onyx">Administrative Entrance</h3>
                  <p className="text-xs font-light text-brand-onyx/60">Provide username credentials to configure details.</p>
                </div>

                {loginError && (
                  <div className="p-3.5 rounded bg-brand-rust/10 text-xs text-brand-rust flex items-start gap-1.5 border border-brand-rust/20">
                    <AlertCircle className="h-4.5 w-4.5 text-brand-rust shrink-0 mt-0.5" />
                    <span className="font-light">{loginError}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">Username</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-onyx/40">
                      <User className="h-4 w-4" />
                    </span>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. admin" 
                      required
                      className="w-full rounded border border-brand-border bg-brand-cream-light pl-9 pr-3.5 py-2.5 text-xs text-brand-onyx focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20 focus:border-brand-rust"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">Security Pass Key</label>
                    <button 
                      type="button" 
                      onClick={() => setActiveTab('forgot')}
                      className="text-[10px] font-mono hover:underline text-brand-rust font-semibold"
                    >
                      OTP Request
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-onyx/40">
                      <Key className="h-4 w-4" />
                    </span>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      required
                      className="w-full rounded border border-brand-border bg-brand-cream-light pl-9 pr-3.5 py-2.5 text-xs text-brand-onyx focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20 focus:border-brand-rust"
                    />
                  </div>
                  <p className="font-sans text-[10px] text-brand-onyx/40 font-light mt-1">
                    Default key is <code className="bg-brand-cream-dark px-1 py-0.5 rounded font-mono text-[9px] font-bold text-brand-rust">sabil2026</code>
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded bg-brand-onyx text-white font-bold py-3 hover:bg-brand-rust transition-colors uppercase tracking-widest text-xs shadow-md"
                  >
                    <Lock className="h-3.5 w-3.5 text-brand-rust" />
                    <span>Verify & Open Panel</span>
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button 
                    type="button"
                    onClick={onGoHome}
                    className="text-[10px] font-mono uppercase tracking-widest text-[#B5A18C] hover:text-brand-onyx transition-colors underline"
                  >
                    ← Back to Kashmir Safaris Tour catalog
                  </button>
                </div>

              </form>
            )}

            {/* TAB 2: Forgot Password / OTP Recovery */}
            {activeTab === 'forgot' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-semibold text-brand-onyx">Administrative OTP Recovery</h3>
                  <p className="text-xs font-light text-brand-onyx/60">Generate and verify a security OTP sent to your registered travel managers inbox.</p>
                </div>

                {otpSuccessMessage && (
                  <div className="p-3.5 rounded-lg bg-green-50 text-xs text-green-900 border border-green-200 flex flex-col gap-1 shadow-xs">
                    <div className="flex items-start gap-1.5">
                      <Check className="h-4.5 w-4.5 text-green-600 shrink-0 mt-0.5" />
                      <span className="font-medium text-green-800">{otpSuccessMessage}</span>
                    </div>
                    {generatedOtp && (
                      <div className="mt-2 bg-[#E1EDD5] border border-green-300 p-2.5 text-center rounded">
                        <p className="font-semibold text-[10px] text-green-800 uppercase tracking-wider font-mono">Simulated Email Transfer Complete</p>
                        <p className="text-sm font-bold font-mono text-brand-rust mt-1">Verification OTP Code: {generatedOtp}</p>
                        <p className="text-[9px] text-[#556942] font-serif italic mt-0.5">(We displayed the code clearly here for immediate ease-of-testing in this build environment)</p>
                      </div>
                    )}
                  </div>
                )}

                {otpErrorMessage && (
                  <div className="p-3.5 rounded bg-brand-rust/10 text-xs text-brand-rust flex items-start gap-1.5 border border-brand-rust/20">
                    <AlertCircle className="h-4.5 w-4.5 text-brand-rust shrink-0 mt-0.5" />
                    <span className="font-light">{otpErrorMessage}</span>
                  </div>
                )}

                {!isOtpSent && (
                  <form onSubmit={handleRequestOtp} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">Sabil Associated Email Link</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-onyx/40">
                          <Mail className="h-4 w-4" />
                        </span>
                        <input 
                          type="email" 
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="ssammerhussain@gmail.com" 
                          required
                          className="w-full rounded border border-brand-border bg-brand-cream-light pl-9 pr-3.5 py-2.5 text-xs text-brand-onyx focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20 focus:border-brand-rust font-mono"
                        />
                      </div>
                      <p className="text-[10px] text-brand-onyx/40 font-light font-sans">
                        OTP verification is pre-configured with owner&apos;s email: <strong className="font-mono font-bold text-brand-onyx/75">ssammerhussain@gmail.com</strong>
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSendingOtp}
                      className="w-full flex items-center justify-center gap-2 rounded bg-brand-onyx text-white font-bold py-3 hover:bg-brand-rust transition-colors uppercase tracking-widest text-xs shadow-md disabled:opacity-55"
                    >
                      {isSendingOtp ? (
                        <>
                          <RefreshCw className="h-4 w-4 text-brand-rust animate-spin" />
                          <span>Generating Secure Link...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 text-brand-rust" />
                          <span>Request Verification OTP Link</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {isOtpSent && !isPasswordResetMode && (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">Enter Code OTP Received</label>
                        <span className="font-mono text-xs text-brand-rust font-bold flex items-center gap-1">
                          <Clock className="h-3 w-3 animate-pulse" />
                          {otpTimer > 0 ? `${otpTimer}s remaining` : 'Code Expired'}
                        </span>
                      </div>
                      <input 
                        type="text" 
                        maxLength={6}
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="e.g. 123456" 
                        required
                        className="w-full text-center tracking-[0.5em] rounded border border-brand-border bg-brand-cream-light py-3 text-base font-mono font-extrabold text-brand-onyx focus:outline-hidden"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsOtpSent(false);
                          setOtpSuccessMessage('');
                        }}
                        className="flex-1 rounded border border-brand-border text-brand-onyx font-semibold text-xs py-2.5 hover:bg-brand-cream-dark transition-colors uppercase tracking-widest"
                      >
                        Change Email
                      </button>
                      <button
                        type="submit"
                        className="flex-1 rounded bg-brand-onyx text-white font-bold text-xs py-2.5 hover:bg-brand-rust transition-colors uppercase tracking-wider"
                      >
                        Confirm Match
                      </button>
                    </div>

                    <p className="text-center pt-2">
                      <button
                        type="button"
                        disabled={otpTimer > 0}
                        onClick={handleRequestOtp}
                        className="text-[10px] font-mono uppercase tracking-widest text-brand-rust hover:underline font-bold disabled:opacity-40"
                      >
                        Resend Code OTP
                      </button>
                    </p>
                  </form>
                )}

                {isPasswordResetMode && (
                  <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest font-mono text-[#D4AF37] font-bold block">Setup New Security Pass Key</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-onyx/40">
                          <Key className="h-4 w-4" />
                        </span>
                        <input 
                          type="password" 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Define custom new key" 
                          required
                          className="w-full rounded border border-brand-border bg-brand-cream-light pl-9 pr-3.5 py-2.5 text-xs text-brand-onyx focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20 focus:border-brand-rust"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded bg-brand-rust text-white font-bold py-3 hover:bg-brand-onyx transition-colors uppercase tracking-widest text-xs shadow-md"
                    >
                      <Check className="h-4 w-4 text-white" />
                      <span>Apply New Passkey & Log In</span>
                    </button>
                  </form>
                )}

                <div className="text-center pt-2">
                  <button 
                    type="button"
                    onClick={onGoHome}
                    className="text-[10px] font-mono uppercase tracking-widest text-[#B5A18C] hover:text-brand-onyx transition-colors underline"
                  >
                    ← Back to Kashmir Safaris Tour catalog
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    );
  }

  // authenticated admin dashboard columns
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in text-left">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-border pb-6 gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-brand-rust font-bold bg-brand-rust/5 px-2.5 py-1 rounded inline-block mb-2">Live App Curation Panel</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-brand-onyx block">
            Welcome, Sammer Hussain Bhat
          </h1>
          <p className="text-xs sm:text-sm text-brand-onyx/65 font-light leading-relaxed mt-1">
            Configure package metadata, update price structures, change direct contact details manually, or add safari offers instantly.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border bg-brand-cream-light font-mono text-[10px] text-brand-onyx/75 px-3 py-2 hover:bg-brand-rust/10 hover:text-brand-rust transition-colors"
            title="Restore default database layout parameters"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Factory Reset</span>
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#E0DBCF] font-mono text-[10px] text-brand-onyx px-3 py-2 hover:bg-brand-rust hover:text-white transition-colors"
          >
            <span>Lock Panel</span>
          </button>
        </div>
      </div>

      {saveSuccessMessage && (
        <div className="p-4 rounded-lg bg-green-50 text-green-900 border border-green-200 flex items-center justify-between shadow-xs animate-bounce-subtle">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <p className="text-xs font-semibold">{saveSuccessMessage}</p>
          </div>
          <p className="font-mono text-[9px] uppercase text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded">Auto Snyced</p>
        </div>
      )}

      {/* Main 2-Column Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMN 1: Profile & Desk Control (4 Columns span) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Agency Settings Card */}
          <div className="bg-brand-cream-light border border-brand-border rounded shadow-md p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-brand-border/60">
              <Phone className="h-5 w-5 text-brand-rust" />
              <h3 className="font-serif text-base font-semibold text-brand-onyx uppercase tracking-wider text-xs">WhatsApp Desk Agency Profile</h3>
            </div>

            <div className="text-xs text-brand-onyx/70 bg-brand-cream-dark/40 rounded p-3 font-light mb-2">
              All inquiries from the website route directly to this active WhatsApp configure manager.
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">Travel Representative Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-onyx/40">
                  <User className="h-3.5 w-3.5" />
                </span>
                <input 
                  type="text"
                  value={whatsappConfig.agentName}
                  onChange={(e) => {
                    onChangeWhatsappConfig({ ...whatsappConfig, agentName: e.target.value });
                    triggerSuccess('WhatsApp Manager Name synced!');
                  }}
                  className="w-full rounded border border-brand-border bg-brand-cream-light pl-9 pr-3 py-2 text-xs text-brand-onyx focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">Helpline Phone (with Country Code)*</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-onyx/40">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                <input 
                  type="text"
                  value={whatsappConfig.phoneNumber}
                  onChange={(e) => {
                    onChangeWhatsappConfig({ ...whatsappConfig, phoneNumber: e.target.value.replace(/[^0-9]/g, '') });
                    triggerSuccess('Helpline phone synced!');
                  }}
                  className="w-full rounded border border-brand-border bg-brand-cream-light pl-9 pr-3 py-2 text-xs text-brand-onyx focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20"
                />
              </div>
              <p className="text-[9px] text-brand-onyx/40 font-light font-mono mt-0.5">Numeric only, e.g. 919906164699 (No spaces, no plus)</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">Online Live Status</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-onyx/40">
                  <span className="h-2 w-2 rounded-full bg-green-500 block animate-pulse" />
                </span>
                <input 
                  type="text"
                  value={whatsappConfig.status}
                  onChange={(e) => {
                    onChangeWhatsappConfig({ ...whatsappConfig, status: e.target.value });
                    triggerSuccess('Online Status Text updated!');
                  }}
                  className="w-full rounded border border-brand-border bg-brand-cream-light pl-9 pr-3 py-2 text-xs text-brand-onyx focus:outline-hidden focus:ring-1 focus:ring-brand-rust/20"
                />
              </div>
            </div>
            
            <div className="pt-2 bg-brand-onyx/5 p-3 rounded border border-brand-border/40 flex items-start gap-2.5">
              <Info className="h-4 w-4 text-brand-rust shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold text-brand-onyx uppercase tracking-wider">Direct live-routing</p>
                <p className="text-[10px] text-brand-onyx/75 font-light leading-normal mt-0.5">
                  Customers who click customization boxes on our website immediately open a direct WhatsApp chat pre-filled with the request specifying you as the primary travel manager.
                </p>
              </div>
            </div>

          </div>

          {/* Quick tips card */}
          <div className="bg-brand-cream-light border border-brand-border rounded shadow-md p-5 text-xs text-brand-onyx/75 font-light space-y-2 leading-relaxed">
            <h4 className="font-serif font-bold text-brand-onyx text-xs">Curation Instructions</h4>
            <ul className="list-disc pl-4 space-y-1">
              <li>Prices are numeric values representing INR (₹) rates.</li>
              <li>You can modify package highlights. Provide one highlight item per line.</li>
              <li>New packages appear in real-time under the &ldquo;Explore Safaris&rdquo; view catalog.</li>
              <li>Ensure the image link is valid so that preview frames display properly.</li>
            </ul>
          </div>

        </div>

        {/* COLUMN 2: Packages Curation & Editor (8 Columns span) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-brand-cream-light border border-brand-border rounded shadow-md p-5 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border/60">
              <div className="flex items-center gap-2">
                <Compass className="h-5 w-5 text-brand-rust animate-spin-slow" />
                <h3 className="font-serif text-base font-semibold text-brand-onyx uppercase tracking-wider text-xs">Tour Package Price & Information Manager</h3>
              </div>
              <button
                type="button"
                onClick={handleAddNewPackage}
                className="inline-flex items-center gap-1 rounded bg-brand-rust hover:bg-brand-rust-hover text-white text-[10px] font-mono uppercase tracking-widest font-bold py-1.5 px-3 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Tour</span>
              </button>
            </div>

            {/* Quick horizontal dropdown selector of current package catalogs */}
            <div className="space-y-1.5 text-left">
              <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">Select Safari Package to Configure</label>
              <div className="flex flex-wrap gap-1.5">
                {packages.map((pkg) => {
                  const isCurEditing = pkg.id === selectedPkgId;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPkgId(pkg.id)}
                      className={`px-3 py-2 rounded text-xs transition-all font-serif font-medium border flex items-center gap-2 ${
                        isCurEditing
                          ? 'bg-brand-sage text-white border-brand-sage font-bold'
                          : 'bg-brand-cream-dark/60 text-brand-onyx hover:bg-brand-cream-dark/95 border-brand-border'
                      }`}
                    >
                      <span className="truncate max-w-[150px]">{pkg.title}</span>
                      <span className="text-[10px] opacity-75">₹{pkg.price.toLocaleString('en-IN')}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {editingPkg ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                
                {/* Inputs Left side */}
                <div className="space-y-4">
                  
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">Package Title</label>
                    <input 
                      type="text"
                      value={editingPkg.title}
                      onChange={(e) => updatePackageField('title', e.target.value)}
                      className="w-full rounded border border-brand-border bg-brand-cream-light px-3 py-2.5 text-xs text-brand-onyx focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">Package Price (INR ₹)</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-onyx/45 font-mono text-xs">
                          ₹
                        </span>
                        <input 
                          type="number"
                          value={editingPkg.price}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            updatePackageField('price', isNaN(val) ? 0 : val);
                          }}
                          className="w-full rounded border border-brand-border bg-brand-cream-light pl-7 pr-3 py-2.5 text-xs font-mono font-bold text-brand-onyx focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">Duration</label>
                      <input 
                        type="text"
                        value={editingPkg.duration}
                        onChange={(e) => updatePackageField('duration', e.target.value)}
                        placeholder="e.g. 5 Days / 4 Nights"
                        className="w-full rounded border border-brand-border bg-brand-cream-light px-3 py-2.5 text-xs text-brand-onyx focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">Location (Destination)</label>
                      <select 
                        value={editingPkg.location}
                        onChange={(e) => updatePackageField('location', e.target.value)}
                        className="w-full rounded border border-brand-border bg-brand-cream-light px-3 py-2.5 text-xs text-brand-onyx focus:outline-hidden"
                      >
                        <option value="Srinagar">Srinagar</option>
                        <option value="Gulmarg">Gulmarg</option>
                        <option value="Pahalgam">Pahalgam</option>
                        <option value="Sonamarg">Sonamarg</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">Badge Label</label>
                      <input 
                        type="text"
                        value={editingPkg.badge}
                        onChange={(e) => updatePackageField('badge', e.target.value)}
                        placeholder="e.g. Dynamic Deal • Skiing"
                        className="w-full rounded border border-brand-border bg-brand-cream-light px-3 py-2.5 text-xs text-brand-onyx focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">Category Tag</label>
                    <select 
                      value={editingPkg.category}
                      onChange={(e) => updatePackageField('category', e.target.value)}
                      className="w-full rounded border border-brand-border bg-brand-cream-light px-3 py-2.5 text-xs text-brand-onyx focus:outline-hidden"
                    >
                      <option value="WINTER SPECIAL">WINTER SPECIAL</option>
                      <option value="HONEYMOON">HONEYMOON</option>
                      <option value="THRILL / ADVENTURE">THRILL / ADVENTURE</option>
                      <option value="FAMILY / COMFORT">FAMILY / COMFORT</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">Image URL link</label>
                    <input 
                      type="url"
                      value={editingPkg.image}
                      onChange={(e) => updatePackageField('image', e.target.value)}
                      className="w-full rounded border border-brand-border bg-brand-cream-light px-3 py-2 text-xs text-brand-onyx focus:outline-hidden text-brand-onyx/70 font-mono"
                    />
                  </div>

                </div>

                {/* Right side Detailed metadata */}
                <div className="space-y-4">
                  
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">Description Text</label>
                    <textarea 
                      rows={4}
                      value={editingPkg.description}
                      onChange={(e) => updatePackageField('description', e.target.value)}
                      className="w-full rounded border border-brand-border bg-brand-cream-light px-3 py-2 text-xs text-brand-onyx focus:outline-hidden leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">Highlights Specs (One per line)</label>
                    <textarea 
                      rows={5.5}
                      value={editingPkg.highlights.join('\n')}
                      onChange={(e) => handleHighlightsChange(e.target.value)}
                      placeholder="Insert customized tour specialties..."
                      className="w-full rounded border border-brand-border bg-brand-cream-light px-3 py-2 text-xs text-brand-onyx focus:outline-hidden font-sans font-light leading-relaxed"
                    />
                  </div>

                  {/* Curative Live preview card */}
                  <div className="bg-brand-cream-dark p-4 rounded border border-brand-border text-xs flex justify-between items-center bg-[#E5DFD4]">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-brand-rust font-bold">Catalog Preview Card</p>
                      <p className="font-serif font-bold text-brand-onyx text-sm mt-1 leading-tight">{editingPkg.title}</p>
                      <p className="text-brand-onyx/70 text-[10px] mt-0.5">{editingPkg.location} • {editingPkg.duration}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] font-light text-brand-onyx/55 font-mono">Current Custom Rate</p>
                      <p className="font-bold text-brand-onyx text-base font-serif">₹{editingPkg.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleDeletePackage(editingPkg.id)}
                      className="inline-flex items-center gap-1.5 rounded bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors border border-red-200"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Remove Tour</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        // Persist immediately
                        triggerSuccess(`Catalog for "${editingPkg.title}" saved & updated instantly!`);
                      }}
                      className="inline-flex items-center gap-1.5 rounded bg-brand-onyx hover:bg-brand-rust text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors shadow-sm"
                    >
                      <Save className="h-4 w-4 text-brand-rust" />
                      <span>Sync Live catalog</span>
                    </button>
                  </div>

                </div>

              </div>
            ) : (
              <div className="text-center py-12 text-brand-onyx/50 font-light text-xs">
                No active packages in draft catalogs. Click &ldquo;Add Tour&rdquo; to populate!
              </div>
            )}

          </div>

        </div>

      </div>

      {/* 📸 GUEST PHOTO GALLERY MANAGER: MANUALLY ADD PHOTOS */}
      <div className="bg-brand-cream-light border border-brand-border rounded shadow-lg p-6 space-y-6 mt-12 text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-brand-border/60 pb-5 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-brand-rust" />
              <h3 className="font-serif text-lg font-bold text-brand-onyx uppercase tracking-wider">
                📸 Happy Travelers Guest Photo Gallery Manager
              </h3>
              <span className="rounded-full bg-brand-rust/10 text-brand-rust px-2.5 py-0.5 text-[10px] font-mono font-bold">
                {galleryPhotos.length} Photos Active
              </span>
            </div>
            <p className="text-xs text-brand-onyx/65 font-light leading-relaxed">
              Manually add, view, or remove client photograph diaries displayed live on the Sabil homepage. Provide high-quality image URLs.
            </p>
          </div>

          <div>
            <button
              onClick={handleResetPhotos}
              className="inline-flex items-center gap-1 bg-[#F4EFE6] hover:bg-brand-rust hover:text-white text-brand-onyx/75 font-mono text-[10px] px-3.5 py-2 rounded transition-colors uppercase tracking-wider font-bold"
              title="Reset gallery photos to default curated set"
            >
              <span>Reset Default Photos</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: ACTIVE PHOTOS LIST (Span 7) */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest font-mono text-brand-onyx/50 font-bold block mb-1">
              Currently Live Photos ({galleryPhotos.length})
            </h4>

            {galleryPhotos.length === 0 ? (
              <div className="text-center py-12 bg-brand-cream-dark/20 rounded border border-dashed border-brand-border/40">
                <p className="text-xs text-brand-onyx/50">No guest photos active in your gallery catalog.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[460px] overflow-y-auto pr-1">
                {galleryPhotos.map((photo) => (
                  <div 
                    key={photo.id}
                    className="p-3 bg-white border border-brand-border rounded flex flex-col justify-between hover:shadow-sm transition-all"
                  >
                    <div>
                      {/* Thumbnail Frame */}
                      <div className="aspect-[16/10] w-full rounded overflow-hidden bg-brand-cream-dark/30 relative">
                        <img 
                          src={photo.url} 
                          alt={photo.caption}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors shadow-md"
                          title="Delete photo memory immediately"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <p className="font-serif text-[12px] text-brand-onyx mt-2 font-medium leading-relaxed italic line-clamp-2">
                        &ldquo;{photo.caption}&rdquo;
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-brand-border/40 flex items-center justify-between text-[10px] font-mono">
                      <span className="font-bold text-brand-rust truncate max-w-[100px]" title={photo.travelerName}>{photo.travelerName}</span>
                      <span className="text-brand-onyx/45">{photo.date} • {photo.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: MANUAL NEW PHOTO ATTACHMENT FORM (Span 5) */}
          <div className="lg:col-span-5 bg-white border border-brand-border p-5 rounded shadow-xs space-y-4 text-left">
            <h4 className="text-[10px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block pb-2 border-b border-brand-border/50">
              ➕ Append New Traveler Memory
            </h4>

            <form onSubmit={handleAddPhoto} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">
                  Traveler Name / Group
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Anand & Roshni (Honeymooners)"
                  value={newPhotoTraveler}
                  onChange={(e) => setNewPhotoTraveler(e.target.value)}
                  className="w-full rounded border border-brand-border bg-brand-cream-light px-3 py-2 text-xs text-brand-onyx focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">
                  Memory Caption Words
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Gorgeous snow trekking trails near Pahalgam valleys"
                  value={newPhotoCaption}
                  onChange={(e) => setNewPhotoCaption(e.target.value)}
                  className="w-full rounded border border-brand-border bg-brand-cream-light px-3 py-2 text-xs text-brand-onyx focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">
                    Tour Date / Month
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. June 2026"
                    value={newPhotoDate}
                    onChange={(e) => setNewPhotoDate(e.target.value)}
                    className="w-full rounded border border-brand-border bg-brand-cream-light px-3 py-2 text-xs text-brand-onyx focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">
                    Kashmir Destination
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Pahalgam Woods"
                    value={newPhotoLocation}
                    onChange={(e) => setNewPhotoLocation(e.target.value)}
                    className="w-full rounded border border-brand-border bg-brand-cream-light px-3 py-2 text-xs text-brand-onyx focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/65 font-bold block">
                    Image URL link
                  </label>
                  <span className="text-[8px] font-mono text-brand-onyx/40 font-bold">Standard web URL</span>
                </div>
                <input 
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="w-full rounded border border-brand-border bg-brand-cream-light px-3 py-2 text-xs text-brand-onyx focus:outline-hidden font-mono text-[10px]"
                />
              </div>

              {/* Quick image shortcuts to let testing user click to prefill real beautiful Kashmiri tourist photos */}
              <div className="bg-brand-cream-dark/30 p-2.5 rounded text-[10px] space-y-1.5">
                <span className="font-bold text-brand-onyx/60 block uppercase text-[8px] font-mono text-left">
                  💡 Curated Presets (Click to prefill):
                </span>
                <div className="flex flex-col gap-1 text-left font-mono text-[9px]">
                  <button 
                    type="button"
                    onClick={() => {
                      setNewPhotoUrl('https://images.unsplash.com/photo-1598305374801-44755f1f7276?auto=format&fit=crop&w=800&q=80');
                      setNewPhotoTraveler('Mehta Family (4 Pax)');
                      setNewPhotoCaption('Traditional Kashmiri dress experience during Srinagar houseboats stay.');
                      setNewPhotoLocation('Srinagar Lakes');
                      setNewPhotoDate('May 2026');
                    }}
                    className="text-left text-brand-rust hover:underline truncate"
                  >
                    👘 Kashmiri Attire Experience (Unsplash)
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setNewPhotoUrl('https://images.unsplash.com/photo-1626218151523-937b8d4cf7af?auto=format&fit=crop&w=800&q=80');
                      setNewPhotoTraveler('Rishi & Pragya Bose');
                      setNewPhotoCaption('Sitting on green meadow lawns viewing the flowing Lidder streams.');
                      setNewPhotoLocation('Pahalgam Valleys');
                      setNewPhotoDate('April 2026');
                    }}
                    className="text-left text-brand-rust hover:underline truncate"
                  >
                    ⛰️ Stream Meadow Serenity (Unsplash)
                  </button>
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded bg-brand-onyx hover:bg-brand-rust text-white font-bold py-2.5 transition-colors uppercase tracking-widest text-[10px] shadow-sm cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Memory to live Gallery</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* SECURE FULL-WIDTH BOARD: Travel Enquiries Inbox & Mailroom Desk */}
      <div className="bg-brand-cream-light border border-brand-border rounded shadow-lg p-6 space-y-6 mt-12 text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-brand-border/60 pb-5 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-brand-rust animate-pulse" />
              <h3 className="font-serif text-lg font-bold text-brand-onyx uppercase tracking-wider">
                📬 Travel Enquiries Inbox & Mailroom Desk
              </h3>
              <span className="rounded-full bg-brand-rust/10 text-brand-rust px-2.5 py-0.5 text-[10px] font-mono font-bold">
                {itineraries.filter(x => x.status === 'unread').length} Unread
              </span>
            </div>
            <p className="text-xs text-brand-onyx/65 font-light leading-relaxed">
              Real-time synchronization with customer customizers. Submissions are dispatched to <strong className="text-brand-rust font-normal">ssammerhussain@gmail.com</strong> administrative routes and logged below.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={seedMockInquiry}
              className="inline-flex items-center gap-1.5 rounded border border-dashed border-brand-rust bg-brand-rust/5 font-mono text-[10px] text-brand-rust px-3.5 py-2 hover:bg-brand-rust hover:text-white transition-all font-bold uppercase tracking-wider"
              title="Generate a realistic travel spec and email trigger submission to check panel"
            >
              <span>🧪 Seed Test Inquiry</span>
            </button>

            <button
              onClick={() => {
                localStorage.setItem('thesabil_itineraries_v1', '[]');
                setItineraries([]);
                triggerSuccess('All inbox archives cleared.');
              }}
              className="inline-flex items-center gap-1 bg-[#F4EFE6] hover:bg-brand-rust hover:text-white text-brand-onyx/75 font-mono text-[10px] px-3 py-2 rounded transition-colors"
              title="Delete all item copies in your local browser sandbox logs"
            >
              <span>Clear Inbox</span>
            </button>
          </div>
        </div>

        {/* Inbox Filters bar */}
        <div className="flex items-center gap-2 border-b border-brand-border/30 pb-3">
          <span className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/40 font-bold mr-2">Filter Inbox:</span>
          {(['all', 'unread', 'replied'] as const).map(tab => {
            const count = tab === 'all' 
              ? itineraries.length 
              : tab === 'unread' 
                ? itineraries.filter(x => x.status === 'unread').length 
                : itineraries.filter(x => x.status === 'replied').length;
            
            return (
              <button
                key={tab}
                onClick={() => setInboxFilter(tab)}
                className={`px-3 py-1.5 rounded text-[11px] font-mono font-bold uppercase transition-all ${
                  inboxFilter === tab 
                    ? 'bg-brand-onyx text-white' 
                    : 'bg-brand-cream-dark/40 text-brand-onyx/60 hover:bg-brand-cream-dark/80'
                }`}
              >
                {tab} ({count})
              </button>
            );
          })}
        </div>

        {/* INBOX CONTENT PANEL */}
        {itineraries.length === 0 ? (
          <div className="text-center py-16 bg-brand-cream-dark/10 rounded border border-dashed border-brand-border/60">
            <Mail className="mx-auto h-8 w-8 text-brand-onyx/30 mb-3" />
            <h4 className="font-serif text-sm font-semibold text-brand-onyx">No received itineraries logged yet</h4>
            <p className="text-xs text-brand-onyx/50 font-light max-w-sm mx-auto mt-1 leading-relaxed">
              When travelers fill in the customized safari form on the homepage, or book standard catalog rates, those entries instantly populate in this mailroom dashboard!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {itineraries
              .filter(item => {
                if (inboxFilter === 'unread') return item.status === 'unread';
                if (inboxFilter === 'replied') return item.status === 'replied';
                return true;
              })
              .map(item => {
                const isUnread = item.status === 'unread';
                const formattedDate = new Date(item.timestamp).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                // prefill link to direct customer wa
                const getWhatsAppReplyHref = () => {
                  const rawPhone = item.phone && item.phone.includes('+') ? item.phone : item.phone.replace(/[^0-9]/g, '');
                  const clientPhone = rawPhone.startsWith('91') || rawPhone.startsWith('+') ? rawPhone.replace(/\+/g, '') : whatsappConfig.phoneNumber;
                  const replyMsg = `Assalamu Alaikum ${item.name}! This is Sammer Hussain Bhat from The Sabil Voyages. I received your custom itinerary tour request (Ref Ticket: ${item.id}) for ${item.guests} in the month of ${item.month}. We would love to customize this trip to perfection for you. Let us know if you would like me to share a premium pdf draft!`;
                  return `https://wa.me/${clientPhone}?text=${encodeURIComponent(replyMsg)}`;
                };

                return (
                  <div 
                    key={item.id}
                    className={`p-4 border rounded relative transition-all flex flex-col justify-between ${
                      isUnread 
                        ? 'bg-white border-brand-rust/35 shadow-md ring-1 ring-brand-rust/5' 
                        : 'bg-brand-cream-dark/25 border-brand-border/65'
                    }`}
                  >
                    {/* Header line with Voucher ID and source */}
                    <div className="flex items-center justify-between gap-1 border-b border-brand-border/40 pb-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[9px] font-bold bg-brand-onyx text-white px-2 py-0.5 rounded">
                          {item.id}
                        </span>
                        <span className="font-mono text-[8px] bg-brand-rust/10 text-brand-rust px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                          {item.source || 'Bespoke Request'}
                        </span>
                      </div>
                      
                      {/* Live notification simulated labels */}
                      <span className="text-[8px] font-mono text-brand-onyx/40 flex items-center gap-1 font-bold">
                        <Clock className="h-3 w-3 text-brand-rust" /> 
                        {formattedDate}
                      </span>
                    </div>

                    {/* Customer Main coordinates info */}
                    <div className="space-y-2 text-xs">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/40 font-bold leading-none">Traveler Name</p>
                        <p className="font-serif text-sm font-semibold text-brand-onyx mt-0.5">{item.name}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/40 font-bold leading-none">WhatsApp Contact</p>
                          <a 
                            href={`tel:${item.phone}`}
                            className="font-mono text-[11px] text-brand-rust hover:underline mt-0.5 inline-block"
                          >
                            {item.phone}
                          </a>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase tracking-widest font-mono text-brand-onyx/40 font-bold leading-none">Email Address</p>
                          <a 
                            href={`mailto:${item.email}`}
                            className="font-mono text-[10px] text-brand-onyx/70 hover:underline mt-0.5 inline-block truncate max-w-full"
                          >
                            {item.email}
                          </a>
                        </div>
                      </div>

                      {/* Configured criteria */}
                      <div className="grid grid-cols-3 gap-1 bg-brand-cream-dark/50 p-2 rounded text-[10px] text-brand-onyx/85">
                        <div>
                          <span className="block text-[8px] font-mono text-brand-onyx/50 uppercase leading-none">Guests Count</span>
                          <span className="font-bold">{item.guests}</span>
                        </div>
                        <div>
                          <span className="block text-[8px] font-mono text-brand-onyx/50 uppercase leading-none">Target Month</span>
                          <span className="font-bold">{item.month}</span>
                        </div>
                        <div>
                          <span className="block text-[8px] font-mono text-brand-onyx/50 uppercase leading-none">Hotel Standard</span>
                          <span className="font-bold text-brand-rust truncate block">{item.tier}</span>
                        </div>
                      </div>

                      {/* Travel Notes Wishes block */}
                      <div className="bg-white border border-brand-border/50 rounded p-2.5 mt-2">
                        <span className="block text-[8px] font-mono text-brand-onyx/40 uppercase tracking-widest font-bold leading-none mb-1">Tailored wishes & notes</span>
                        <p className="font-serif italic text-[11px] text-brand-onyx/85 font-light leading-relaxed">
                          &ldquo;{item.notes}&rdquo;
                        </p>
                      </div>

                      {/* Dispatch indicator logs */}
                      <div className="pt-2 flex flex-col gap-1 border-t border-brand-border/30">
                        <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-green-700">
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                          <span>Simulation: Mail copies dispatched (ssammerhussain & customer)</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-green-700">
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                          <span>Simulation: Outgoing WhatsApp specs route active</span>
                        </div>
                      </div>

                    </div>

                    {/* Operational Actions footer tools inside the card */}
                    <div className="pt-3 border-t border-brand-border/40 mt-3 flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleItineraryStatus(item.id)}
                          className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded border transition-all ${
                            isUnread 
                              ? 'bg-brand-rust/20 text-brand-rust border-brand-rust/35 hover:bg-brand-rust hover:text-white' 
                              : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                          }`}
                          title="Toggle actioned replied tag"
                        >
                          {isUnread ? 'Mark Actioned / Replied' : '✓ Replied / Unmark'}
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 ml-auto">
                        <button
                          onClick={() => deleteItinerary(item.id)}
                          className="p-1 rounded text-brand-onyx/40 hover:text-red-700 hover:bg-red-50 transition-colors"
                          title="Delete submission record"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>

                        <a
                          href={getWhatsAppReplyHref()}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded bg-green-700 hover:bg-green-800 text-white px-2.5 py-1 text-[10px] font-mono font-bold uppercase transition-all"
                          title="Create prefilled live custom reply text to client"
                        >
                          <Send className="h-3 w-3" />
                          <span>WhatsApp Reply</span>
                        </a>
                      </div>
                    </div>

                  </div>
                );
              })}
          </div>
        )}
      </div>

    </div>
  );
};
