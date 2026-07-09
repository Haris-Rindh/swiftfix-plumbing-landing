const nodemailer = require('nodemailer');

let transporter;
let isEthereal = false;

// Create transporter configuration
const initTransporter = async () => {
  if (transporter) return transporter;

  const hasEnvSMTP = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

  if (hasEnvSMTP) {
    console.log('[SMTP Config] Using custom SMTP settings from .env');
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  } else {
    console.log('[SMTP Config] SMTP credentials missing in .env. Generating programmatically free Ethereal test account...');
    try {
      isEthereal = true;
      const testAccount = await nodemailer.createTestAccount();
      
      console.log(`[SMTP Config] Ethereal account generated! \n  User: ${testAccount.user}\n  Pass: ${testAccount.pass}`);
      
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    } catch (error) {
      console.error('[SMTP Config] Failed to generate Ethereal test account: ', error.message);
    }
  }
  return transporter;
};

// Send email alert for new leads
const sendLeadNotification = async (lead) => {
  try {
    const activeTransporter = await initTransporter();
    if (!activeTransporter) {
      console.warn('[Email Alert] Transporter not initialized. Skipping email.');
      return;
    }

    const recipient = process.env.NOTIFY_EMAIL || 'leads@swiftfix.com';
    const sender = isEthereal ? activeTransporter.options.auth.user : (process.env.SMTP_FROM || 'no-reply@swiftfix.com');

    const issueLabels = {
      emergency: '🚨 Emergency (Burst Pipe, etc)',
      clog: 'Blocked Drain / Toilet',
      leak: 'Leak Repair',
      heater: 'Water Heater',
      install: 'Installation Quote'
    };

    // Calculate estimate html row
    const estimateHtml = lead.estimateMax > 0 
      ? `<tr style="background-color: #e0f2fe;">
          <td style="padding: 10px; font-weight: bold; color: #0369a1; border: 1px solid #bae6fd;">Upfront Quote:</td>
          <td style="padding: 10px; color: #0369a1; font-weight: 800; font-size: 16px; border: 1px solid #bae6fd;">$${lead.estimateMin} - $${lead.estimateMax}</td>
         </tr>`
      : '';

    const detailsHtml = lead.details 
      ? `<tr>
          <td style="padding: 10px; font-weight: bold; color: #374151; vertical-align: top;">Leads Details:</td>
          <td style="padding: 10px; color: #4b5563; font-style: italic; line-height: 1.4;">${lead.details.replace(/\n/g, '<br />')}</td>
         </tr>`
      : '';

    const mailOptions = {
      from: `"SwiftFix Plumbing Alerts" <${sender}>`,
      to: recipient,
      subject: `New Lead Inquiry: ${lead.name} (${issueLabels[lead.issue] || lead.issue})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #fcfcfc;">
          <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px; margin-top: 0;">New Service Inquiry</h2>
          <p style="font-size: 15px; color: #4b5563;">A new client has completed the Estimate Wizard from SwiftFix Plumbing:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr style="background-color: #f3f4f6;">
              <td style="padding: 10px; font-weight: bold; width: 130px; color: #374151;">Name:</td>
              <td style="padding: 10px; color: #111827;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #374151;">Phone Number:</td>
              <td style="padding: 10px; color: #111827;">
                <a href="tel:${lead.phone}" style="color: #0284c7; text-decoration: none; font-weight: bold;">${lead.phone}</a>
              </td>
            </tr>
            <tr style="background-color: #f3f4f6;">
              <td style="padding: 10px; font-weight: bold; color: #374151;">Service Issue:</td>
              <td style="padding: 10px; color: #111827; font-weight: bold;">${issueLabels[lead.issue] || lead.issue}</td>
            </tr>
            ${estimateHtml}
            ${detailsHtml}
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #374151;">Received Date:</td>
              <td style="padding: 10px; color: #555555;">${new Date(lead.createdAt).toLocaleString()}</td>
            </tr>
          </table>

          <div style="margin-top: 25px; text-align: center;">
            <a href="http://localhost:5173/admin" style="background-color: #0ea5e9; color: white; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
              View in Admin Dashboard
            </a>
          </div>

          <p style="font-size: 11px; color: #9ca3af; text-align: center; margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 10px;">
            This is an automated notification. SwiftFix MERN Application.
          </p>
        </div>
      `
    };

    const info = await activeTransporter.sendMail(mailOptions);
    console.log(`[Email Alert] Lead notification sent! Message ID: ${info.messageId}`);

    if (isEthereal) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log(`[Email Alert] Ethereal Preview URL: ${previewUrl}`);
    }
  } catch (error) {
    console.error('[Email Alert] Error sending email notification: ', error.message);
  }
};

// Initialize transporter on startup to speed up response times
initTransporter();

module.exports = { sendLeadNotification };
