// components/CustomAlert.tsx
import React, { FC } from 'react';

interface CustomAlertProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const alertStyles = {
  customAlert: {
    display: 'none', // Controlled by isOpen prop, set via inline style
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
    zIndex: 9999,
  } as React.CSSProperties,
  contentBox: {
    borderLeft: '8px solid #16a34a',
    padding: '20px',
  } as React.CSSProperties,
  title: {
    fontSize: '18px',
    color: '#15803d',
    fontWeight: '600',
  } as React.CSSProperties,
  message: {
    fontSize: '14px',
    color: '#1f2937',
    marginTop: '8px',
  } as React.CSSProperties,
  buttonContainer: {
    marginTop: '16px',
    textAlign: 'right',
  } as React.CSSProperties,
  button: {
    padding: '8px 16px',
    border: 'none',
    background: '#16a34a',
    color: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
  } as React.CSSProperties,
};

const CustomAlert: FC<CustomAlertProps> = ({ message, isOpen, onClose }) => {
  return (
    <div
      id="customAlert"
      style={{
        ...alertStyles.customAlert,
        display: isOpen ? 'block' : 'none',
      }}
    >
      <div style={alertStyles.contentBox}>
        <div style={alertStyles.title}>Message</div>
        <div id="alertMessage" style={alertStyles.message}>
          {message}
        </div>
        <div style={alertStyles.buttonContainer}>
          <button onClick={onClose} style={alertStyles.button}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;