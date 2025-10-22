# EmailJS Setup Guide

This guide will help you configure EmailJS to enable email functionality in the Viva Recruitment system.

## Overview

The system is already integrated with EmailJS and ready to send emails. You just need to configure your EmailJS account credentials.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. Log in to your EmailJS dashboard
2. Go to **Email Services** in the left sidebar
3. Click **Add New Service**
4. Choose your email provider (Gmail, Outlook, etc.)
5. Follow the setup instructions for your provider
6. Note down your **Service ID** (e.g., `service_abc123`)

### Recommended: Gmail Setup

For Gmail:
- Select "Gmail" as the service
- Click "Connect Account" and authorize EmailJS
- Your Service ID will be generated automatically

## Step 3: Create Email Templates

The system uses the following templates. Create each one in EmailJS:

### Template 1: Application Confirmation
- **Template Name**: Application Confirmation
- **Template ID**: `template_application`
- **Subject**: `Application Received - Viva Therapies`
- **Content**:
```
Dear {{candidate_name}},

Thank you for applying for the {{position}} position at Viva Therapies. We have received your application and will review it shortly.

We appreciate your interest in joining our team of wellness professionals.

Best regards,
Viva Therapies Recruitment Team
```

### Template 2: Phone Interview
- **Template Name**: Phone Interview Invitation
- **Template ID**: `template_phone`
- **Subject**: `Phone Interview Scheduled - Viva Therapies`
- **Content**:
```
Dear {{candidate_name}},

We would like to invite you for a phone interview for the {{position}} position.

Interview Details:
Date: {{interview_date}}
Time: {{interview_time}}
Duration: 15-20 minutes

Please confirm your availability at your earliest convenience.

Best regards,
Viva Therapies Recruitment Team
```

### Template 3: Skills Assessment
- **Template Name**: Skills Assessment Invitation
- **Template ID**: `template_skills`
- **Subject**: `Skills Assessment - Viva Therapies`
- **Content**:
```
Dear {{candidate_name}},

Congratulations on progressing to the skills assessment stage for the {{position}} position.

Assessment Details:
Date: {{interview_date}}
Time: {{interview_time}}
Duration: 45-60 minutes
Location: {{interview_location}}

Please bring your professional equipment and be prepared to demonstrate your skills.

Best regards,
Viva Therapies Recruitment Team
```

### Template 4: Final Interview
- **Template Name**: Final Interview Invitation
- **Template ID**: `template_final`
- **Subject**: `Final Interview - Viva Therapies`
- **Content**:
```
Dear {{candidate_name}},

We are pleased to invite you to the final interview for the {{position}} position.

Interview Details:
Date: {{interview_date}}
Time: {{interview_time}}
Duration: 30-45 minutes

This will be your opportunity to meet our team and learn more about Viva Therapies.

Best regards,
Viva Therapies Recruitment Team
```

### Template 5: Induction Welcome
- **Template Name**: Induction Welcome
- **Template ID**: `template_induction`
- **Subject**: `Welcome to Viva Therapies - Induction`
- **Content**:
```
Dear {{candidate_name}},

Welcome to Viva Therapies! We are excited to have you join our team.

Your induction will begin on {{interview_date}}. Please ensure you have all required documents and certifications ready.

We look forward to working with you.

Best regards,
Viva Therapies Team
```

### Template 6: Rejection
- **Template Name**: Application Unsuccessful
- **Template ID**: `template_rejection`
- **Subject**: `Application Update - Viva Therapies`
- **Content**:
```
Dear {{candidate_name}},

Thank you for your interest in the {{position}} position at Viva Therapies.

After careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our current needs.

We appreciate the time you invested in the application process and wish you the best in your career.

Best regards,
Viva Therapies Recruitment Team
```

### Template 7: Custom Email
- **Template Name**: Custom Email
- **Template ID**: `template_custom`
- **Subject**: `{{subject}}`
- **Content**:
```
{{message}}

{{additional_info}}
```

## Step 4: Get Your Public Key

1. In EmailJS dashboard, go to **Account** → **General**
2. Find your **Public Key** (e.g., `user_abc123xyz`)
3. Copy this key

## Step 5: Configure Environment Variables

Add the following environment variables to your project:

```env
# EmailJS Configuration
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here

# Template IDs (optional - defaults are already set)
VITE_EMAILJS_TEMPLATE_APPLICATION=template_application
VITE_EMAILJS_TEMPLATE_PHONE=template_phone
VITE_EMAILJS_TEMPLATE_SKILLS=template_skills
VITE_EMAILJS_TEMPLATE_FINAL=template_final
VITE_EMAILJS_TEMPLATE_INDUCTION=template_induction
VITE_EMAILJS_TEMPLATE_REJECTION=template_rejection
VITE_EMAILJS_TEMPLATE_CUSTOM=template_custom
```

### How to Add Environment Variables

1. In the Manus dashboard, go to your project settings
2. Find the "Environment Variables" section
3. Add each variable with its corresponding value
4. Save and restart the development server

## Step 6: Test Email Functionality

1. Navigate to the Office Dashboard
2. Click on any candidate card
3. Click the "Send Email" button
4. Select a template from the dropdown
5. Review the email content
6. Click "Send Email"

The email should be sent successfully and logged in the database.

## Available Placeholders

When creating email templates, you can use these placeholders:

- `{{candidate_name}}` - Candidate's full name
- `{{to_name}}` - Same as candidate_name
- `{{to_email}}` - Candidate's email address
- `{{position}}` - Job position/profession
- `{{interview_date}}` - Interview date
- `{{interview_time}}` - Interview time
- `{{interview_location}}` - Interview location
- `{{subject}}` - Email subject (for custom emails)
- `{{message}}` - Email message (for custom emails)
- `{{additional_info}}` - Additional information (for custom emails)

## Troubleshooting

### Emails not sending?

1. **Check credentials**: Verify your Public Key and Service ID are correct
2. **Check template IDs**: Make sure template IDs match exactly
3. **Check email service**: Ensure your email service is connected and active
4. **Check browser console**: Look for error messages in the developer console
5. **Check EmailJS dashboard**: View your usage and error logs

### Template not found?

Make sure:
- Template ID matches exactly (case-sensitive)
- Template is saved and published in EmailJS
- Environment variables are set correctly

### Rate limits?

EmailJS free tier allows:
- 200 emails per month
- 2 email templates
- 1 email service

Upgrade to a paid plan for higher limits.

## Support

For EmailJS-specific issues, visit:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Support](https://www.emailjs.com/support/)

For system-specific issues, contact your development team.

## Security Notes

- Never commit your Public Key or Service ID to version control
- Use environment variables for all sensitive credentials
- Regularly rotate your API keys
- Monitor your EmailJS usage dashboard for suspicious activity

