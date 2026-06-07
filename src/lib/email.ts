// Email Service for Order Confirmations
// Location: src/lib/email.ts
// Supports Resend and SendGrid providers

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

let emailProvider: 'resend' | 'sendgrid' | null = null;

/**
 * Initialize email provider based on environment variables
 */
function getEmailProvider(): 'resend' | 'sendgrid' | null {
  if (process.env.RESEND_API_KEY) {
    return 'resend';
  }
  if (process.env.SENDGRID_API_KEY) {
    return 'sendgrid';
  }
  return null;
}

/**
 * Send confirmation email after order submission
 */
export async function sendConfirmationEmail(orderData: {
  orderId: string;
  fullName: string;
  email: string;
  package: string;
  title: string;
}): Promise<void> {
  const provider = getEmailProvider();
  
  if (!provider) {
    console.warn('⚠️ No email provider configured. Skipping confirmation email.');
    console.warn('Set RESEND_API_KEY or SENDGRID_API_KEY to enable emails.');
    return;
  }

  const emailOptions: EmailOptions = {
    to: orderData.email,
    subject: `Bestellung bestätigt - Order ${orderData.orderId}`,
    html: generateConfirmationEmail(orderData),
  };

  try {
    if (provider === 'resend') {
      await sendViaResend(emailOptions);
    } else if (provider === 'sendgrid') {
      await sendViaSendGrid(emailOptions);
    }
    
    console.log(`✅ Confirmation email sent to ${orderData.email}`);
  } catch (error) {
    console.error('❌ Failed to send confirmation email:', error);
    // Don't throw - email failure shouldn't break the order flow
  }
}

/**
 * Send email via Resend
 */
async function sendViaResend(options: EmailOptions): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    throw new Error('RESEND_API_KEY not configured');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: 'Jobcoach Hub <onboarding@jobcoach-hub.de>',
      to: [options.to],
      subject: options.subject,
      html: options.html,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Resend API error: ${JSON.stringify(error)}`);
  }
}

/**
 * Send email via SendGrid
 */
async function sendViaSendGrid(options: EmailOptions): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY;
  
  if (!apiKey) {
    throw new Error('SENDGRID_API_KEY not configured');
  }

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email: options.to }],
        subject: options.subject,
      }],
      from: {
        email: 'onboarding@jobcoach-hub.de',
        name: 'Jobcoach Hub',
      },
      content: [{
        type: 'text/html',
        value: options.html,
      }],
    }),
  });

  if (!response.ok && response.status !== 202) {
    const errorText = await response.text();
    throw new Error(`SendGrid API error: ${errorText}`);
  }
}

/**
 * Generate HTML email content
 */
function generateConfirmationEmail(orderData: {
  orderId: string;
  fullName: string;
  email: string;
  package: string;
  title: string;
}): string {
  const packageNames: Record<string, string> = {
    starter: 'Starter (€29/Monat)',
    pro: 'Pro (€49/Monat)',
    premium: 'Premium (€79/Monat)',
  };

  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #3b82f6, #1e40af);
      color: white;
      padding: 30px;
      border-radius: 12px 12px 0 0;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      background: #f8fafc;
      padding: 30px;
      border-radius: 0 0 12px 12px;
    }
    .order-details {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border: 1px solid #e2e8f0;
    }
    .order-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #f1f5f9;
    }
    .order-row:last-child {
      border-bottom: none;
    }
    .label {
      color: #64748b;
      font-weight: 500;
    }
    .value {
      color: #1e293b;
      font-weight: 600;
    }
    .next-steps {
      background: #eff6ff;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .next-steps h3 {
      color: #1e40af;
      margin-top: 0;
    }
    .next-steps ol {
      margin: 10px 0;
      padding-left: 20px;
    }
    .next-steps li {
      margin: 8px 0;
      color: #334155;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #64748b;
      font-size: 14px;
    }
    .btn {
      display: inline-block;
      background: #3b82f6;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎉 Bestellung bestätigt!</h1>
  </div>
  
  <div class="content">
    <p>Hallo ${orderData.fullName},</p>
    
    <p>vielen Dank für deine Bestellung! Wir haben deine Anfrage erhalten und werden uns innerhalb von 24 Stunden bei dir melden.</p>
    
    <div class="order-details">
      <div class="order-row">
        <span class="label">Order ID:</span>
        <span class="value">${orderData.orderId}</span>
      </div>
      <div class="order-row">
        <span class="label">Name:</span>
        <span class="value">${orderData.fullName}</span>
      </div>
      <div class="order-row">
        <span class="label">Titel:</span>
        <span class="value">${orderData.title}</span>
      </div>
      <div class="order-row">
        <span class="label">Paket:</span>
        <span class="value">${packageNames[orderData.package] || orderData.package}</span>
      </div>
      <div class="order-row">
        <span class="label">Email:</span>
        <span class="value">${orderData.email}</span>
      </div>
    </div>
    
    <div class="next-steps">
      <h3>Nächste Schritte:</h3>
      <ol>
        <li>Du erhältst in Kürze diese Bestätigungs-E-Mail</li>
        <li>Unser Team prüft deine Angaben und meldet sich bei Rückfragen</li>
        <li>Du erhältst einen Link zur Zahlung und zum Onboarding-Formular</li>
        <li>Nach Zahlungseingang starten wir mit der Entwicklung deiner Website</li>
      </ol>
    </div>
    
    <p style="text-align: center;">
      <a href="https://jobcoach-hub.de/dashboard" class="btn">Zum Dashboard</a>
    </p>
    
    <p>Falls du Fragen hast, antworte einfach auf diese E-Mail oder kontaktiere uns unter support@jobcoach-hub.de.</p>
    
    <p>Herzliche Grüße,<br>Dein Jobcoach Hub Team</p>
  </div>
  
  <div class="footer">
    <p>Jobcoach Hub GmbH · Musterstraße 1 · 12345 Berlin · Germany</p>
    <p><a href="https://jobcoach-hub.de/impressum">Impressum</a> | <a href="https://jobcoach-hub.de/datenschutz">Datenschutz</a></p>
  </div>
</body>
</html>
  `.trim();
}
