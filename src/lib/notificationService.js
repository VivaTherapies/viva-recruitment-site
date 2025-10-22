/**
 * Notification Service for Recruitment Emails
 * Handles sending various recruitment-related emails to candidates
 * Uses EmailJS for email delivery
 */
// EmailJS Configuration
const EMAILJS_SERVICE_ID = "service_xldh2bq";
const EMAILJS_PUBLIC_KEY = "jVRB8s_bOS7f64o0d";
const EMAILJS_PRIVATE_KEY = "W1XPbCgARMpa8nKgyNPvi";
// Template IDs for different email types
const EMAIL_TEMPLATES = {
    VERIFICATION: "template_dc3u7sl", // OTP for your Viva Therapies authentication
    APPLICATION_CONFIRMATION: "template_5akxjb8", // Application received
    REJECTION: "template_fy1t84b", // Application Update – Viva Therapies- Rejection
};
/**
 * Send application confirmation email
 */
export async function sendApplicationConfirmation(email, candidateName, profession) {
    try {
        const templateParams = {
            to_email: email,
            to_name: candidateName,
            profession: profession,
            company_name: "Viva Therapies",
            from_name: "Viva Therapies Team",
        };
        console.log("[Notification] Application Confirmation Email:", templateParams);
        // Email sending would be implemented here
        // For now, just log the parameters
        return {
            success: true,
            message: `Application confirmation email would be sent to ${email}`,
        };
    }
    catch (error) {
        console.error("[Notification] Error sending application confirmation:", error);
        return {
            success: false,
            message: "Failed to send application confirmation email",
        };
    }
}
/**
 * Send rejection email
 */
export async function sendRejectionEmail(email, candidateName, profession, reason) {
    try {
        const templateParams = {
            to_email: email,
            to_name: candidateName,
            profession: profession,
            reason: reason || "Your application did not meet our current requirements",
            company_name: "Viva Therapies",
            from_name: "Viva Therapies Team",
        };
        console.log("[Notification] Rejection Email:", templateParams);
        // Email sending would be implemented here
        return {
            success: true,
            message: `Rejection email would be sent to ${email}`,
        };
    }
    catch (error) {
        console.error("[Notification] Error sending rejection email:", error);
        return {
            success: false,
            message: "Failed to send rejection email",
        };
    }
}
/**
 * Get template ID for a notification type
 */
export function getTemplateId(type) {
    switch (type) {
        case "confirmation":
            return EMAIL_TEMPLATES.APPLICATION_CONFIRMATION;
        case "rejection":
            return EMAIL_TEMPLATES.REJECTION;
        default:
            return EMAIL_TEMPLATES.APPLICATION_CONFIRMATION;
    }
}
/**
 * Get service configuration
 */
export function getEmailJSConfig() {
    return {
        serviceId: EMAILJS_SERVICE_ID,
        publicKey: EMAILJS_PUBLIC_KEY,
        privateKey: EMAILJS_PRIVATE_KEY,
    };
}
