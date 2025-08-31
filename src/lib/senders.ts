// Swap providers by env. Defaults to "noop" (logs only) for dev.
const SMS_PROVIDER = (process.env.SMS_PROVIDER || 'noop').toLowerCase();
const EMAIL_PROVIDER = (process.env.EMAIL_PROVIDER || 'smtp').toLowerCase();

export async function sendSms(to: string, text: string) {
  if (SMS_PROVIDER === 'vonage') {
    const key = process.env.VONAGE_API_KEY!;
    const secret = process.env.VONAGE_API_SECRET!;
    const from = process.env.SMS_FROM || 'Saltify';
    const body = new URLSearchParams({ api_key: key, api_secret: secret, to, from, text });
    const res = await fetch('https://rest.nexmo.com/sms/json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    });
    const j: any = await res.json();
    const m = j?.messages?.[0];
    if (!m || m.status !== '0') throw new Error(m?.error_text || 'SMS failed');
    return;
  }

  if (SMS_PROVIDER === 'twilio') {
    const sid = process.env.TWILIO_ACCOUNT_SID!;
    const token = process.env.TWILIO_AUTH_TOKEN!;
    const from = process.env.TWILIO_FROM!;
    const auth = Buffer.from(`${sid}:${token}`).toString('base64');
    const body = new URLSearchParams({ To: to, From: from, Body: text });
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST',
      headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    });
    if (!res.ok) throw new Error('Twilio send failed');
    return;
  }

  // Dev: log only
  console.log('[SMS:NOOP]', { to, text });
}

export async function sendEmail(to: string, subject: string, text: string, html?: string) {
  if (EMAIL_PROVIDER === 'smtp') {
    const nodemailer = await import('nodemailer').then(m => m.default);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'no-reply@saltifysaas.com',
      to, subject, text, html: html || `<pre>${text}</pre>`
    });
    return;
  }

  // Dev: log only
  console.log('[EMAIL:NOOP]', { to, subject, text });
}
