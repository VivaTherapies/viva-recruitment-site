import emailjs from '@emailjs/browser';

// EmailJS Configuration
// To use EmailJS, you need to:
// 1. Create an account at https://www.emailjs.com/
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create email templates
// 4. Get your Public Key, Service ID, and Template IDs
// 5. Set these values in the environment variables or update them here

export const EMAILJS_CONFIG = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'jVRB8s_bOS7f6400d',
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_xldh2bq',
  templates: {
    applicationConfirmation: import.meta.env.VITE_EMAILJS_TEMPLATE_APPLICATION || 'template_5akxjb8',
    phoneInterview: import.meta.env.VITE_EMAILJS_TEMPLATE_PHONE || 'template_5akxjb8',
    skillsAssessment: import.meta.env.VITE_EMAILJS_TEMPLATE_SKILLS || 'template_5akxjb8',
    finalInterview: import.meta.env.VITE_EMAILJS_TEMPLATE_FINAL || 'template_5akxjb8',
    induction: import.meta.env.VITE_EMAILJS_TEMPLATE_INDUCTION || 'template_dc3u7sl',
    rejection: import.meta.env.VITE_EMAILJS_TEMPLATE_REJECTION || 'template_fy1t84b',
    custom: import.meta.env.VITE_EMAILJS_TEMPLATE_CUSTOM || 'template_5akxjb8',
  }
};

// Initialize EmailJS
export function initEmailJS() {
  if (EMAILJS_CONFIG.publicKey && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    return true;
  }
  console.warn('EmailJS not configured. Please set VITE_EMAILJS_PUBLIC_KEY in environment variables.');
  return false;
}

// Send email using EmailJS
export interface SendEmailParams {
  templateId: string;
  toEmail: string;
  toName: string;
  subject?: string;
  message?: string;
  candidateName?: string;
  position?: string;
  interviewDate?: string;
  interviewTime?: string;
  interviewLocation?: string;
  additionalInfo?: string;
}

export async function sendEmail(params: SendEmailParams): Promise<boolean> {
  try {
    const templateParams = {
      to_email: params.toEmail,
      to_name: params.toName,
      subject: params.subject || 'Viva Therapies - Recruitment Update',
      message: params.message || '',
      candidate_name: params.candidateName || params.toName,
      position: params.position || '',
      interview_date: params.interviewDate || '',
      interview_time: params.interviewTime || '',
      interview_location: params.interviewLocation || '',
      additional_info: params.additionalInfo || '',
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      params.templateId,
      templateParams
    );

    if (response.status === 200) {
      console.log('Email sent successfully:', response);
      return true;
    }
    
    console.error('Email send failed:', response);
    return false;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Quick send functions for common email types
export async function sendApplicationConfirmation(
  candidateName: string,
  candidateEmail: string,
  position: string
): Promise<boolean> {
  return sendEmail({
    templateId: EMAILJS_CONFIG.templates.applicationConfirmation,
    toEmail: candidateEmail,
    toName: candidateName,
    candidateName,
    position,
    subject: 'Application Received - Viva Therapies',
    message: `Thank you for applying for the ${position} position at Viva Therapies. We have received your application and will review it shortly.`,
  });
}

export async function sendPhoneInterviewInvite(
  candidateName: string,
  candidateEmail: string,
  position: string,
  interviewDate: string,
  interviewTime: string
): Promise<boolean> {
  return sendEmail({
    templateId: EMAILJS_CONFIG.templates.phoneInterview,
    toEmail: candidateEmail,
    toName: candidateName,
    candidateName,
    position,
    interviewDate,
    interviewTime,
    subject: 'Phone Interview Scheduled - Viva Therapies',
    message: `We would like to invite you for a phone interview for the ${position} position.`,
  });
}

export async function sendRejection(
  candidateName: string,
  candidateEmail: string,
  position: string
): Promise<boolean> {
  return sendEmail({
    templateId: EMAILJS_CONFIG.templates.rejection,
    toEmail: candidateEmail,
    toName: candidateName,
    candidateName,
    position,
    subject: 'Application Update - Viva Therapies',
    message: `Thank you for your interest in the ${position} position at Viva Therapies. After careful consideration, we have decided to move forward with other candidates.`,
  });
}

export async function sendCustomEmail(
  candidateName: string,
  candidateEmail: string,
  subject: string,
  message: string,
  additionalInfo?: string
): Promise<boolean> {
  return sendEmail({
    templateId: EMAILJS_CONFIG.templates.custom,
    toEmail: candidateEmail,
    toName: candidateName,
    candidateName,
    subject,
    message,
    additionalInfo,
  });
}

