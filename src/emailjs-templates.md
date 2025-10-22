# EmailJS Email Templates for Viva Therapies Recruitment System

## 1. Application Confirmation Email
**Template ID:** `template_application_confirmation`
**Subject:** Welcome to Viva Therapies - Application Received

```
Dear {{to_name}},

Thank you for submitting your application for the {{profession}} position at Viva Therapies!

We have successfully received your application and it is now under review. Our recruitment team will carefully evaluate your qualifications and experience.

What to Expect Next:
- Application Review: 1-2 weeks
- If shortlisted, we will contact you for a phone interview
- Skills assessment and final interview will follow
- Onboarding and induction upon successful completion

You can track your application status anytime by visiting our Candidate Portal at:
https://viva-recruitment.manus.space/track

We appreciate your interest in joining the {{company_name}} team!

Best regards,
{{from_name}}
Viva Therapies
```

---

## 2. Rejection Email
**Template ID:** `template_rejection`
**Subject:** Application Status Update

```
Dear {{to_name}},

Thank you for your interest in the {{profession}} position at Viva Therapies.

After careful consideration of your application, we regret to inform you that we have decided to move forward with other candidates at this time.

Reason: {{reason}}

We appreciate the time and effort you invested in your application. Your qualifications are valuable, and we encourage you to apply for future positions that match your profile.

You can always check our available positions at:
https://viva-recruitment.manus.space/positions

Best regards,
{{from_name}}
Viva Therapies
```

---

## 3. Interview Invitation Email
**Template ID:** `template_interview_invitation`
**Subject:** Interview Invitation - {{profession}} Position

```
Dear {{to_name}},

Congratulations! We are pleased to invite you to interview for the {{profession}} position at Viva Therapies.

Interview Details:
- Position: {{profession}}
- Date: {{interview_date}}
- Time: {{interview_time}} (GMT/UTC)
- Type: {{interview_type}}

Please confirm your attendance by replying to this email or logging into your Candidate Portal:
https://viva-recruitment.manus.space/track

What to Prepare:
- Bring copies of your CV and certifications
- Be ready to discuss your experience and skills
- Have a quiet, well-lit space for the interview
- Test your internet connection if it's a video interview

If you need to reschedule, please let us know as soon as possible.

We look forward to speaking with you!

Best regards,
{{from_name}}
Viva Therapies
```

---

## 4. Offer Letter Email
**Template ID:** `template_offer_letter`
**Subject:** Job Offer - {{profession}} Position at Viva Therapies

```
Dear {{to_name}},

We are delighted to offer you the position of {{profession}} at Viva Therapies!

Offer Details:
- Position: {{profession}}
- Start Date: {{start_date}}
- Salary/Commission: {{salary}}

This offer is contingent upon:
- Successful background check
- Verification of qualifications and certifications
- Completion of onboarding requirements

Next Steps:
1. Please confirm your acceptance by replying to this email
2. We will send you onboarding instructions and required documents
3. Our HR team will contact you to finalize employment details

Welcome to the Viva Therapies family! We are excited to have you join our team.

Best regards,
{{from_name}}
Viva Therapies
```

---

## 5. Onboarding Email
**Template ID:** `template_onboarding`
**Subject:** Welcome to Viva Therapies - Onboarding Instructions

```
Dear {{to_name}},

Welcome to Viva Therapies! We are excited to have you join our team as a {{profession}}.

Your Start Date: {{start_date}}

Onboarding Checklist:
1. Complete your profile setup
2. Review company policies and procedures
3. Set up your equipment and workspace
4. Attend orientation session
5. Meet your team members

Access Your Onboarding Portal:
{{onboarding_link}}

What You'll Need:
- Valid ID and certifications
- Professional liability insurance (if applicable)
- Equipment as per your role requirements
- Availability schedule

Our HR team will contact you shortly with additional details and to answer any questions you may have.

We look forward to working with you!

Best regards,
{{from_name}}
Viva Therapies
```

---

## 6. Interview Reminder Email
**Template ID:** `template_interview_reminder`
**Subject:** Reminder: Your Interview with Viva Therapies

```
Dear {{to_name}},

This is a friendly reminder about your upcoming interview with Viva Therapies!

Interview Details:
- Date: {{interview_date}}
- Time: {{interview_time}} (GMT/UTC)

Please make sure to:
- Test your internet connection (if video interview)
- Have your CV and relevant documents ready
- Find a quiet location for the interview
- Log in 5 minutes early

If you need to reschedule or have any questions, please reply to this email immediately.

Looking forward to speaking with you!

Best regards,
{{from_name}}
Viva Therapies
```

---

## Setup Instructions for EmailJS

1. Go to your EmailJS dashboard
2. Navigate to "Email Templates"
3. Create a new template for each email type above
4. Copy the template content and paste it into the "Content" tab
5. Set the "To Email" field to `{{to_email}}`
6. Set the "From Name" to `{{from_name}}`
7. Use the "Use Default Email Address" option for the From Email
8. Save each template with the corresponding Template ID

Once all templates are created, the recruitment notification system will be fully functional!

