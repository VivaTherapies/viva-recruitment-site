import { sendCustomEmail, EmailParams } from "./emailService";


/**
 * Notification Service for Recruitment Emails
 * Handles sending various recruitment-related emails to candidates
 * Uses EmailJS for email delivery
 */

/**
 * Send application confirmation email
 */
export async function sendApplicationConfirmation(
  email: string,
  candidateName: string,
  profession: string
): Promise<{ success: boolean; message: string }> {
  try {
    const templateParams: EmailParams = {
      to_email: email,
      to_name: candidateName,
      profession: profession,
      company_name: "Viva Therapies",
      from_name: "Viva Therapies Team",
      subject: "Application Received - Viva Therapies",
      message: `Dear ${candidateName},\n\nThank you for your application for the ${profession} position at Viva Therapies. We have received your application and will review it shortly.\n\nBest regards,\nThe Viva Therapies Team`
    };

    console.log("[Notification] Application Confirmation Email:", templateParams);
    
    const emailSent = await sendCustomEmail(
      templateParams.to_name,
      templateParams.to_email,
      templateParams.subject || "Application Confirmation",
      templateParams.message || "Your application has been received."
    );

    return {
      success: emailSent,
      message: emailSent ? `Application confirmation email sent to ${email}` : `Failed to send application confirmation email to ${email}`,
    };
  } catch (error: any) {
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
export async function sendRejectionEmail(
  email: string,
  candidateName: string,
  profession: string,
  reason?: string
): Promise<{ success: boolean; message: string }> {
  try {
    const templateParams: EmailParams = {
      to_email: email,
      to_name: candidateName,
      profession: profession,
      reason: reason || "Your application did not meet our current requirements",
      company_name: "Viva Therapies",
      from_name: "Viva Therapies Team",
      subject: "Application Update – Viva Therapies- Rejection",
      message: `Dear ${candidateName},\n\nThank you for your interest in Viva Therapies. After careful consideration, we regret to inform you that we will not be moving forward with your application for the ${profession} position at this time. ${reason ? `Reason: ${reason}` : ''}\n\nWe wish you the best in your job search.\n\nSincerely,\nThe Viva Therapies Team`
    };

    console.log("[Notification] Rejection Email:", templateParams);
    
    const emailSent = await sendCustomEmail(
      templateParams.to_name,
      templateParams.to_email,
      templateParams.subject || "Application Rejection",
      templateParams.message || "Your application has been reviewed."
    );

    return {
      success: emailSent,
      message: emailSent ? `Rejection email sent to ${email}` : `Failed to send rejection email to ${email}`,
    };
  } catch (error: any) {
    console.error("[Notification] Error sending rejection email:", error);
    return {
      success: false,
      message: "Failed to send rejection email",
    };
  }
}

