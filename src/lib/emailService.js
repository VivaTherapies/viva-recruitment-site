import emailjs from "@emailjs/browser";
import { ENV } from "./env";
let emailjsInitialized = false;
export function initEmailJS() {
    if (!emailjsInitialized && ENV.VITE_EMAILJS_PUBLIC_KEY && ENV.VITE_EMAILJS_SERVICE_ID) {
        emailjs.init(ENV.VITE_EMAILJS_PUBLIC_KEY);
        emailjsInitialized = true;
    }
    return emailjsInitialized;
}
export async function sendVerificationEmail(email, verificationCode, portalType) {
    try {
        if (!initEmailJS()) {
            console.error("EmailJS environment variables are not set or initialization failed.");
            return { success: false, message: "Email service not configured." };
        }
        const templateParams = {
            to_email: email, // EmailJS uses this to determine recipient
            to_name: email.split("@")[0], // Extract name from email
            verification_code: verificationCode,
            user_type: portalType === "office" ? "Office Staff" : "Candidate",
            company_name: "Viva Therapies",
            from_name: "Viva Therapies Team",
        };
        console.log('[EmailJS] Attempting to send verification email with params:', templateParams);
        console.log('[EmailJS] Service ID:', ENV.VITE_EMAILJS_SERVICE_ID);
        console.log('[EmailJS] Template ID:', ENV.VITE_EMAILJS_VERIFICATION_TEMPLATE_ID);
        const response = await emailjs.send(ENV.VITE_EMAILJS_SERVICE_ID, ENV.VITE_EMAILJS_VERIFICATION_TEMPLATE_ID, templateParams);
        console.log('[EmailJS] Response status:', response.status);
        console.log('[EmailJS] Response:', response);
        if (response.status === 200) {
            return {
                success: true,
                message: `Verification email sent to ${email}`,
            };
        }
        else {
            return {
                success: false,
                message: "Failed to send verification email",
            };
        }
    }
    catch (error) {
        console.error("[EmailJS] Email sending error:", error);
        console.error("[EmailJS] Error message:", error?.message);
        console.error("[EmailJS] Error details:", error?.response?.data);
        return {
            success: false,
            message: `Error sending verification email: ${error?.message || 'Unknown error'}. Please try again.`,
        };
    }
}
export async function sendCustomEmail(to_name, to_email, subject, message) {
    try {
        if (!initEmailJS()) {
            console.error("EmailJS environment variables are not set or initialization failed.");
            return false;
        }
        const templateParams = {
            to_name,
            to_email,
            subject,
            message,
            from_name: "Viva Therapies Team",
            company_name: "Viva Therapies",
        };
        console.log('[EmailJS] Attempting to send custom email with params:', templateParams);
        console.log('[EmailJS] Service ID:', ENV.VITE_EMAILJS_SERVICE_ID);
        console.log('[EmailJS] Custom Template ID:', ENV.VITE_EMAILJS_CUSTOM_TEMPLATE_ID);
        const response = await emailjs.send(ENV.VITE_EMAILJS_SERVICE_ID, ENV.VITE_EMAILJS_CUSTOM_TEMPLATE_ID, templateParams);
        console.log('[EmailJS] Response status:', response.status);
        console.log('[EmailJS] Response:', response);
        return response.status === 200;
    }
    catch (error) {
        console.error("Error sending custom email:", error);
        return false;
    }
}
