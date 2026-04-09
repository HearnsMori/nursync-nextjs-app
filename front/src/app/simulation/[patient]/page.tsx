'use client';

import React, { useState, CSSProperties, useRef, useEffect } from 'react';
import { 
  Stethoscope, Activity, ClipboardList, MessageSquare, 
  FileText, Syringe, HeartPulse, Send, X, User
} from 'lucide-react';

// --- Data Types & Constants ---

type TabId = string | null;

const LEFT_TABS = [
  { id: 'assessment', label: 'Assessment\n(History and Physical)', icon: Stethoscope },
  { id: 'diagnosis', label: 'Nursing\nDiagnosis', icon: ClipboardList },
  { id: 'planning', label: 'Planning\n(Goal Setting)', icon: FileText },
  { id: 'differential', label: 'Differential', icon: Activity },
];

const RIGHT_TABS = [
  { id: 'monitor', label: 'Monitor\n(Triage & Trends)', icon: HeartPulse },
  { id: 'implementation', label: 'Implementation\n(Meds, Procedure, Airway)', icon: Syringe },
  { id: 'communicate', label: 'Communicate\n(SBAR)', icon: MessageSquare },
  { id: 'documentation', label: 'Documentation\n(FDAR, Shift Notes, Patient ID)', icon: FileText },
];

export default function ClinicalSimulationPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [activeLeftTab, setActiveLeftTab] = useState<TabId>(null);
  const [activeRightTab, setActiveRightTab] = useState<TabId>(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'system', text: 'You have entered the room. The patient is unresponsive.' }
  ]);

  // --- Handlers ---
  const handleBegin = () => setHasStarted(true);
  
  const toggleLeftTab = (id: string) => {
    setActiveLeftTab(prev => prev === id ? null : id);
    setActiveRightTab(null); // Optional: close right tab when opening left
  };

  const toggleRightTab = (id: string) => {
    setActiveRightTab(prev => prev === id ? null : id);
    setActiveLeftTab(null); // Optional: close left tab when opening right
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: chatInput }]);
    setChatInput('');
    // Simulate a delayed response
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'patient', text: '(No verbal response...)' }]);
    }, 1000);
  };

  // --- Styles ---
  const colors = {
    primary: '#0A5C36', // Dark green from the image
    primaryLight: 'rgba(10, 92, 54, 0.85)',
    overlay: 'rgba(10, 92, 54, 0.4)',
    bg: '#E2E8F0',
    white: '#FFFFFF',
    text: '#333333',
    lightGray: '#F7FAFC',
    border: '#E2E8F0',
  };

  const styles: any = {
    container: {
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: colors.bg,
      // Simulated background image with green tint overlay
      backgroundImage: `linear-gradient(${colors.overlay}, ${colors.overlay}), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    header: {
      height: '50px',
      backgroundColor: colors.primary,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      color: colors.white,
      zIndex: 50,
      position: 'relative',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    headerButtons: {
      display: 'flex',
      gap: '10px',
    },
    btnWhite: {
      backgroundColor: colors.white,
      color: colors.text,
      border: 'none',
      padding: '6px 16px',
      borderRadius: '20px',
      fontSize: '13px',
      fontWeight: 600,
      cursor: 'pointer',
    },
    sideNav: {
      position: 'absolute',
      top: '60px',
      bottom: '20px',
      width: '60px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      zIndex: 40,
    },
    navTab: ((side: 'left' | 'right', isActive: boolean): CSSProperties => ({
      backgroundColor: colors.white,
      color: isActive ? colors.primary : colors.text,
      padding: '15px 5px',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '120px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      border: isActive ? `2px solid ${colors.primary}` : '2px solid transparent',
      borderLeftWidth: side === 'right' ? 0 : 2,
      borderRightWidth: side === 'left' ? 0 : 2,
      borderRadius: side === 'left' ? '0 8px 8px 0' : '8px 0 0 8px',
      transition: 'all 0.2s',
      writingMode: 'vertical-rl',
      textOrientation: 'mixed',
      transform: side === 'left' ? 'rotate(180deg)' : 'none', // fixes text direction for left tabs
      fontSize: '12px',
      fontWeight: 600,
      textAlign: 'center',
      whiteSpace: 'pre-line',
      lineHeight: 1.2,
    })) as any,
    iconWrapper: {
      transform: 'rotate(90deg)', // counter the vertical-rl rotation for icons
      marginBottom: '8px',
      display: 'flex',
      justifyContent: 'center',
    },
    flyout: ((side: 'left' | 'right', isOpen: boolean): CSSProperties => ({
      position: 'absolute',
      top: '60px',
      bottom: '20px',
      width: '400px',
      backgroundColor: colors.white,
      boxShadow: '0 0 15px rgba(0,0,0,0.3)',
      zIndex: 30,
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '8px',
      ...(side === 'left' 
        ? { left: '70px', transform: isOpen ? 'translateX(0)' : 'translateX(-120%)' } 
        : { right: '70px', transform: isOpen ? 'translateX(0)' : 'translateX(120%)' }
      ),
    })) as any,
    flyoutHeader: {
      backgroundColor: colors.primary,
      color: colors.white,
      padding: '15px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: '8px 8px 0 0',
      fontWeight: 'bold',
    },
    flyoutBody: {
      padding: '20px',
      overflowY: 'auto',
      flex: 1,
      backgroundColor: colors.lightGray,
    },
    centerArea: {
      position: 'absolute',
      top: '60px',
      left: '80px',
      right: '80px',
      bottom: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    // Modal Styles
    modal: {
      width: '600px',
      backgroundColor: colors.white,
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
    },
    modalHeader: {
      backgroundColor: colors.primary,
      color: colors.white,
      padding: '20px',
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
    },
    modalBody: {
      padding: '30px',
    },
    modalSection: {
      marginBottom: '20px',
    },
    modalLabel: {
      color: '#A0AEC0',
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '8px',
      borderBottom: '1px solid #E2E8F0',
      paddingBottom: '4px',
    },
    modalText: {
      fontSize: '14px',
      lineHeight: 1.6,
      color: colors.text,
    },
    modalFooter: {
      padding: '0 30px 30px',
      display: 'flex',
      justifyContent: 'center',
    },
    btnBegin: {
      backgroundColor: colors.primary,
      color: colors.white,
      border: 'none',
      padding: '12px 40px',
      borderRadius: '25px',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(10, 92, 54, 0.3)',
      transition: 'transform 0.1s',
    },
    // Patient View Styles
    patientView: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: '20px',
      maxWidth: '900px',
    },
    patientHeader: {
      backgroundColor: colors.white,
      padding: '20px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    patientAvatar: {
      width: '60px',
      height: '60px',
      backgroundColor: '#E2E8F0',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    vitalsGrid: {
      display: 'flex',
      gap: '20px',
      flex: 1,
      justifyContent: 'space-around',
      borderLeft: '1px solid #E2E8F0',
      paddingLeft: '20px',
    },
    vitalBlock: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    vitalLabel: { fontSize: '12px', color: '#718096', fontWeight: 'bold' },
    vitalValue: { fontSize: '20px', color: colors.primary, fontWeight: 'bold' },
    vitalDanger: { color: '#E53E3E' },
    chatContainer: {
      flex: 1,
      backgroundColor: colors.white,
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      overflow: 'hidden',
    },
    chatMessages: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      backgroundColor: '#F7FAFC',
    },
    messageBubble: ((sender: string): CSSProperties => ({
      maxWidth: '75%',
      padding: '12px 16px',
      borderRadius: '16px',
      lineHeight: 1.5,
      alignSelf: sender === 'user' ? 'flex-end' : sender === 'system' ? 'center' : 'flex-start',
      backgroundColor: sender === 'user' ? colors.primary : sender === 'system' ? '#E2E8F0' : colors.white,
      color: sender === 'user' ? colors.white : colors.text,
      border: sender === 'patient' ? '1px solid #E2E8F0' : 'none',
      boxShadow: sender === 'system' ? 'none' : '0 2px 4px rgba(0,0,0,0.05)',
      fontStyle: sender === 'system' ? 'italic' : 'normal',
      fontSize: sender === 'system' ? '12px' : '14px',
    })) as any,
    chatInputArea: {
      padding: '15px',
      backgroundColor: colors.white,
      borderTop: '1px solid #E2E8F0',
      display: 'flex',
      gap: '10px',
    },
    chatInput: {
      flex: 1,
      padding: '12px 16px',
      border: '1px solid #CBD5E0',
      borderRadius: '24px',
      outline: 'none',
      fontSize: '14px',
    },
    sendBtn: {
      backgroundColor: colors.primary,
      color: colors.white,
      border: 'none',
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
    },
    // Template Forms
    formGroup: { marginBottom: '15px' },
    label: { display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#4A5568' },
    textarea: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E0', minHeight: '80px', resize: 'vertical' as const, fontFamily: 'inherit' },
    input: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E0', fontFamily: 'inherit' },
  };

  // --- Sub-Components ---
  
  const FlyoutContent = ({ tabId }: { tabId: string }) => {
    // Render different templates based on the tool selected
    switch (tabId) {
      case 'assessment':
        return (
          <div>
            <div style={styles.formGroup}>
              <label style={styles.label}>History of Present Illness (HPI)</label>
              <textarea style={styles.textarea} placeholder="Enter HPI details..." />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Physical Exam Findings</label>
              <textarea style={styles.textarea} placeholder="Neuro, Resp, Cardio..." />
            </div>
          </div>
        );
      case 'monitor':
        return (
          <div>
            <h4 style={{ marginTop: 0, color: colors.primary }}>Current Vitals Trend</h4>
            <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={styles.label}>Heart Rate</span> <span style={styles.vitalDanger}>48 bpm ↓</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={styles.label}>Respirations</span> <span style={styles.vitalDanger}>6 bpm ↓</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={styles.label}>SpO2</span> <span style={styles.vitalDanger}>82% ↓</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={styles.label}>Blood Pressure</span> <span>90/60 mmHg</span></div>
            </div>
            <button style={{...styles.btnBegin, width: '100%', padding: '10px', fontSize: '14px'}}>Order ECG</button>
          </div>
        );
      case 'implementation':
        return (
           <div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Airway Management</label>
              <select style={styles.input}>
                <option>Select intervention...</option>
                <option>Bag-Valve-Mask (BVM) Ventilation</option>
                <option>Endotracheal Intubation</option>
                <option>Non-Rebreather Mask</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Medications (Administer)</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input style={styles.input} placeholder="Drug Name (e.g. Naloxone)" />
                <input style={{...styles.input, width: '80px'}} placeholder="Dose" />
              </div>
              <button style={{...styles.btnBegin, width: '100%', padding: '10px', fontSize: '14px', marginTop: '10px'}}>Administer Med</button>
            </div>
          </div>
        )
      default:
        return (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#A0AEC0' }}>
            <FileText size={48} style={{ margin: '0 auto 15px' }} />
            <p>Template module for <b>{tabId}</b> is ready to be configured.</p>
          </div>
        );
    }
  };

  // --- Main Render ---
  return (
    <div style={styles.container}>
      
      {/* Header */}
      <header style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
          <Activity size={24} />
          Clinical Sim
        </div>
        <div style={styles.headerButtons}>
          <button style={styles.btnWhite}>Back</button>
          <button style={styles.btnWhite}>Log-out</button>
        </div>
      </header>

      {/* Left Navigation */}
      <nav style={{ ...styles.sideNav, left: 0 }}>
        {LEFT_TABS.map((tab) => (
          <div 
            key={tab.id} 
            style={styles.navTab('left', activeLeftTab === tab.id)}
            onClick={() => toggleLeftTab(tab.id)}
          >
            <span style={styles.iconWrapper}>
              <tab.icon size={20} />
            </span>
            {tab.label}
          </div>
        ))}
      </nav>

      {/* Right Navigation */}
      <nav style={{ ...styles.sideNav, right: 0 }}>
        {RIGHT_TABS.map((tab) => (
          <div 
            key={tab.id} 
            style={styles.navTab('right', activeRightTab === tab.id)}
            onClick={() => toggleRightTab(tab.id)}
          >
            <span style={styles.iconWrapper}>
              <tab.icon size={20} />
            </span>
            {tab.label}
          </div>
        ))}
      </nav>

      {/* Left Flyout */}
      <div style={styles.flyout('left', activeLeftTab !== null)}>
        <div style={styles.flyoutHeader}>
          {LEFT_TABS.find(t => t.id === activeLeftTab)?.label.replace('\n', ' ')}
          <X size={20} style={{ cursor: 'pointer' }} onClick={() => setActiveLeftTab(null)} />
        </div>
        <div style={styles.flyoutBody}>
          {activeLeftTab && <FlyoutContent tabId={activeLeftTab} />}
        </div>
      </div>

      {/* Right Flyout */}
      <div style={styles.flyout('right', activeRightTab !== null)}>
        <div style={styles.flyoutHeader}>
          {RIGHT_TABS.find(t => t.id === activeRightTab)?.label.replace('\n', ' ')}
          <X size={20} style={{ cursor: 'pointer' }} onClick={() => setActiveRightTab(null)} />
        </div>
        <div style={styles.flyoutBody}>
          {activeRightTab && <FlyoutContent tabId={activeRightTab} />}
        </div>
      </div>

      {/* Center Main Content Area */}
      <div style={styles.centerArea}>
        {!hasStarted ? (
          /* Emergency Department Initial Modal */
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              Emergency Department
            </div>
            <div style={styles.modalBody}>
              <div style={styles.modalSection}>
                <div style={styles.modalLabel}>EMS Report</div>
                <div style={styles.modalText}>
                  Found 67-year-old male unresponsive in bed with empty bottles of Oxycodone and Alprazolam nearby; initial vitals showed RR 6 and GCS 6, with minimal response to 0.4 mg IV Naloxone.
                </div>
              </div>
              <div style={styles.modalSection}>
                <div style={styles.modalLabel}>Triage Nurse</div>
                <div style={styles.modalText}>
                  Patient is ESI Level 1 with pinpoint pupils, cyanosis, and shallow respirations at 8 bpm; immediate transfer to Resuscitation Bay for airway management and cardiac monitoring due to suspected poly-substance overdose.
                </div>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button 
                style={styles.btnBegin}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onClick={handleBegin}
              >
                BEGIN
              </button>
            </div>
          </div>
        ) : (
          /* Patient Interaction & Chat View */
          <div style={styles.patientView}>
            {/* Patient Header / Info */}
            <div style={styles.patientHeader}>
              <div style={styles.patientAvatar}>
                <User size={32} color="#A0AEC0" />
              </div>
              <div>
                <h2 style={{ margin: 0, color: colors.text, fontSize: '18px' }}>John Doe (67M)</h2>
                <p style={{ margin: '4px 0 0', color: '#718096', fontSize: '13px' }}>Suspected Poly-Substance Overdose</p>
              </div>
              
              <div style={styles.vitalsGrid}>
                <div style={styles.vitalBlock}>
                  <span style={styles.vitalLabel}>HR</span>
                  <span style={{...styles.vitalValue, ...styles.vitalDanger}}>48</span>
                </div>
                <div style={styles.vitalBlock}>
                  <span style={styles.vitalLabel}>RR</span>
                  <span style={{...styles.vitalValue, ...styles.vitalDanger}}>6</span>
                </div>
                <div style={styles.vitalBlock}>
                  <span style={styles.vitalLabel}>SpO2</span>
                  <span style={{...styles.vitalValue, ...styles.vitalDanger}}>82%</span>
                </div>
                <div style={styles.vitalBlock}>
                  <span style={styles.vitalLabel}>BP</span>
                  <span style={styles.vitalValue}>90/60</span>
                </div>
              </div>
            </div>

            {/* Chat Interface */}
            <div style={styles.chatContainer}>
              <div style={styles.chatMessages}>
                {messages.map((msg, i) => (
                  <div key={i} style={styles.messageBubble(msg.sender)}>
                    {msg.sender === 'system' && <span>Notice: </span>}
                    {msg.sender === 'user' && <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px', fontSize:'12px', opacity: 0.8 }}>You</span>}
                    {msg.sender === 'patient' && <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px', fontSize:'12px', color: colors.primary }}>Patient</span>}
                    {msg.text}
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSendMessage} style={styles.chatInputArea}>
                <input 
                  style={styles.chatInput}
                  placeholder="Ask the patient a question or perform verbal stimulation..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
                <button type="submit" style={styles.sendBtn}>
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}