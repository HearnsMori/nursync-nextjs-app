'use client';

import dbStorage from '@/utils/dbstorage';

import React, { useState, useRef, useEffect, useCallback, ChangeEvent } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; // Import motion
import CustomAlert from '@/components/CustomAlert';
import styles from './page.module.css';
import Header from '@/components/AppHeader';
import Footer from '@/components/AppFooter';
import Image from 'next/image';
import ChatAI from '@/components/ChatAI';


// Define the type for a chat message
interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
}

// Define form data type for clear typing
interface FormData {
  firstname: string;
  lastname: string;
  middlename: string;
  university: string;
  studentid: string;
  emailaddress: string;
  username: string;
  password: string;
  confirmpassword: string;
  agree: boolean;
}

// --- Framer Motion Variants ---

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, delay: 0.3 } },
};

const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 + 0.5, duration: 0.5 },
  }),
};

const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.1 }
};

const Signup = () => {
  const router = useRouter();

  // [ ... State Declarations (formData, errors, toggles, chat) remain the same ... ]
  const [formData, setFormData] = useState<FormData>({
    firstname: '', lastname: '', middlename: '', university: '', studentid: '',
    emailaddress: '', username: '', password: '', confirmpassword: '', agree: false,
  });
  const [errors, setErrors] = useState<Record<keyof FormData, string | null>>({
    firstname: null, lastname: null, middlename: null, university: null, studentid: null,
    emailaddress: null, username: null, password: null, confirmpassword: null, agree: null,
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFooterHidden, setIsFooterHidden] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const chatAreaRef = useRef<HTMLDivElement>(null);


  // [ ... Utility Functions (closeAlert, customAlert, toggleChat, toggleFooter, appendMessage, sendMessage) remain the same ... ]
  const closeAlert = useCallback(() => { setIsAlertOpen(false); setAlertMessage(''); }, []);
  const customAlert = useCallback((message: string) => { setAlertMessage(message); setIsAlertOpen(true); }, []);
  const toggleFooter = useCallback(() => { setIsFooterHidden((prev) => !prev); }, []);
  useEffect(() => {
    // run on client only; check token in localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token && token.trim() !== '') {
      // redirect if token
      router.replace('/home');
    }
  }, [router]);
  useEffect(() => { if (chatAreaRef.current) { chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight; } }, [chatMessages, isChatOpen]);
  useEffect(() => { if (typeof window !== 'undefined' && localStorage.getItem('token')) { router.replace('/'); } }, [router]);

  // [ ... Form Handlers and Validation (handleInputChange, validateForm, signup) remain the same ... ]

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [id as keyof FormData]: null }));
  };

  const validateForm = () => {
    const newErrors: Record<keyof FormData, string | null> = { ...errors };
    let isValid = true;

    const validateField = (key: keyof FormData, name: string, minLength: number = 2, allowSpaces: boolean = false) => {
      const value = formData[key] as string;
      if (!value.trim()) { newErrors[key] = `${name} must not be empty.`; isValid = false; }
      else if (!allowSpaces && value.includes(' ')) { newErrors[key] = `${name} must not have white space.`; isValid = false; }
      else if (value.length < minLength) { newErrors[key] = `${name} must be at least ${minLength + 1} characters long.`; isValid = false; }
      else { newErrors[key] = null; }
    };

    validateField('firstname', 'First Name');
    validateField('lastname', 'Last Name');
    validateField('university', 'University', 2, true);
    validateField('studentid', 'Student ID', 2);
    validateField('emailaddress', 'Email Address');
    validateField('username', 'Username');
    validateField('password', 'Password');
    newErrors['middlename'] = null;

    if (!formData.confirmpassword) { newErrors.confirmpassword = 'Confirm Password must not be empty.'; isValid = false; }
    else if (formData.password !== formData.confirmpassword) { newErrors.confirmpassword = 'Confirm Password does not match the password.'; isValid = false; }
    else { newErrors.confirmpassword = null; }

    if (!formData.agree) { newErrors.agree = 'To start user must agree to the terms, policy, and privacy of the application.'; isValid = false; }
    else { newErrors.agree = null; }

    setErrors(newErrors);
    return isValid;
  };

  const signup = async () => {

    if (!validateForm()) { return; }
    const newErrors: Record<keyof FormData, string | null> = { ...errors };
    const { firstname, lastname, middlename, university, studentid, emailaddress, username, password } = formData;
    localStorage.setItem("firstname", firstname);
    localStorage.setItem("lastname", lastname);
    localStorage.setItem("middlename", middlename);
    localStorage.setItem("university", university);
    localStorage.setItem("studentid", studentid);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("emailaddress", emailaddress);
    try {
      const signup = await dbStorage.signup(username, password,  [{name: "email", value: emailaddress}], [["nursync", null, null, ["get", "set", "remove"]]]);
      if (signup) {
        customAlert(signup.message);
        router.push("/login");
      }
    } catch (error) {
      customAlert(error instanceof Error ? error.message : String(error));
    }
  };


  return (
    <>
      <Head>
        <title>NurSYNC</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/signupforeground.png" />
      </Head>

      <CustomAlert message={alertMessage} isOpen={isAlertOpen} onClose={closeAlert} />

      <div id="ratio16_9" className={styles.pageContainer}>
        {/* SIGNUP CARD with Framer Motion Entrance */}
        <motion.div
          initial="hidden"
          animate="visible"
          className={`${styles.flexR} ${styles.signupCard}`}
        >
          <div className={styles.divOnCenter}>
            <img style={{ opacity: 1, height: '11w', width: '25vw' }} src="/greenlettering.png" alt="NurSYNC Logo" />
          </div>

          <div className={styles.formContainer}>
            {/* Title with Animation */}
            <motion.div
              custom={1} variants={textVariants}
              className={`${styles.txtsemilarge} ${styles.bold}`}
              style={{ marginTop: '2vw', textAlign: 'center', fontSize: '2.2vw' }}
            >
              Create an Account
            </motion.div>
            <motion.div
              custom={2} variants={textVariants}
              className={`${styles.txtsemimedium} ${styles.semibold}`}
              style={{ marginTop: '0.8vw', textAlign: 'center', fontSize: '1.4vw', color: '#444' }}
            >
              Already have an Account? <a href="/login" style={{ color: '#008040', textDecoration: 'underline', }}>Log-in</a>
            </motion.div>

            {/* Form Fields (Grouped for simplicity, individual fields can also be animated) */}
            <motion.div custom={3} variants={textVariants} style={{ textAlign: 'center', width: '37vw' }}>
              {/* Form Row 1: Name Fields */}
              <div className={styles.formRow}>
                <div className={styles.formInputWrapper}>
                  <input id="firstname" className={styles.formInput} type="text" placeholder="First Name" value={formData.firstname} onChange={handleInputChange} style={{ fontSize: '1.2vw' }} />
                  <small className={styles.errorText} style={{ display: errors.firstname ? 'block' : 'none' }}>{errors.firstname}</small>
                </div>
                {/* ... other name fields ... */}
                <div className={styles.formInputWrapper}>
                  <input id="lastname" className={styles.formInput} type="text" placeholder="Last Name" value={formData.lastname} onChange={handleInputChange} style={{ fontSize: '1.2vw' }} />
                  <small className={styles.errorText} style={{ display: errors.lastname ? 'block' : 'none' }}>{errors.lastname}</small>
                </div>
                <div className={styles.formInputWrapper}>
                  <input id="middlename" className={styles.formInput} type="text" placeholder="Middle Name" value={formData.middlename} onChange={handleInputChange} style={{ fontSize: '1.2vw' }} />
                  <small className={styles.errorText} style={{ display: errors.middlename ? 'block' : 'none' }}>{errors.middlename}</small>
                </div>
              </div>

              {/* Form Row 2: University/ID Fields */}
              <div className={styles.formRow} style={{ marginTop: '1vw' }}>
                <div className={styles.formInputWrapper}>
                  <input id="university" className={styles.formInput} type="text" placeholder="University" value={formData.university} onChange={handleInputChange} style={{ fontSize: '1.1vw' }} />
                  <small className={styles.errorText} style={{ display: errors.university ? 'block' : 'none' }}>{errors.university}</small>
                </div>
                <div className={styles.formInputWrapper}>
                  <input id="studentid" className={styles.formInput} type="number" placeholder="Student ID" value={formData.studentid} onChange={handleInputChange} style={{ fontSize: '1.1vw' }} />
                  <small className={styles.errorText} style={{ display: errors.studentid ? 'block' : 'none' }}>{errors.studentid}</small>
                </div>
              </div>

              {/* Full Width Fields */}
              <div className={styles.fullWidthInputWrapper}>
                <input id="emailaddress" className={styles.formInput} type="text" placeholder="Email Address" value={formData.emailaddress} onChange={handleInputChange} style={{ fontSize: '1.1vw' }} />
                <small className={styles.errorText} style={{ display: errors.emailaddress ? 'block' : 'none' }}>{errors.emailaddress}</small>
              </div>
              <div className={styles.fullWidthInputWrapper}>
                <input id="username" className={styles.formInput} type="text" placeholder="Username" value={formData.username} onChange={handleInputChange} style={{ fontSize: '1.1vw' }} />
                <small className={styles.errorText} style={{ display: errors.username ? 'block' : 'none' }}>{errors.username}</small>
              </div>
              <div className={styles.fullWidthInputWrapper}>
                <input id="password" className={styles.formInput} type="password" placeholder="Password" value={formData.password} onChange={handleInputChange} style={{ fontSize: '1.1vw' }} />
                <small className={styles.errorText} style={{ display: errors.password ? 'block' : 'none' }}>{errors.password}</small>
              </div>
              <div className={styles.fullWidthInputWrapper}>
                <input id="confirmpassword" className={styles.formInput} type="password" placeholder="Confirm Password" value={formData.confirmpassword} onChange={handleInputChange} style={{ fontSize: '1.1vw' }} />
                <small className={styles.errorText} style={{ display: errors.confirmpassword ? 'block' : 'none' }}>{errors.confirmpassword}</small>
              </div>

              {/* Agreement Checkbox */}
              <div className={styles.agreeTextContainer} style={{ justifyContent: 'center', gap: '0.6rem' }}>
                <input id="agree" type="checkbox" className={styles.agreementCheckbox} checked={formData.agree} onChange={handleInputChange} />
                <div className={styles.txtmedium} style={{ fontSize: '1.1vw' }}>Agree to terms, policy, and privacy</div>
              </div>
              <small className={styles.errorText} style={{ padding: '0 1vw', display: errors.agree ? 'block' : 'none' }}>{errors.agree}</small>
            </motion.div>

            {/* Register Button with Framer Motion Hover */}
            <div className={styles.divOnCenter} style={{ width: '100%', margin: '2vw 0' }}>
              <motion.button
                type="button"
                onClick={signup}
                className={`${styles.registerButton} ${styles.txtmedium}`}
                whileHover={buttonHover}
                whileTap={{ scale: 0.95 }}
                custom={4} variants={textVariants} // Added for entrance animation
              >
                Register
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* FOOTER - Remains standard for better accessibility */}
        <div id="footerContainer" className={isFooterHidden ? styles.footerHidden : styles.footerVisible}>
          <Footer isLoggedIn={false} />
        </div>
      </div>

      {/* Footer Toggle Button with Framer Motion Hover */}
      <motion.div id="showFooterButton" onClick={toggleFooter} className={styles.showFooterButton} whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
        {isFooterHidden ? 'Show Footer' : 'Hide Footer'}
      </motion.div>
      <ChatAI />
    </>
  );
};

export default Signup;