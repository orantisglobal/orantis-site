import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, phone, service, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    const toEmail = process.env.APPLICATIONS_TO_EMAIL || 'contact@orantisglobal.com'

    console.log('Sending contact form email:', { toEmail, name, email, company, phone, service })

    const result = await resend.emails.send({
      from: 'Orantis Global <onboarding@resend.dev>',
      to: [toEmail],
      subject: `New Contact Form Submission from ${name}`,
      text: `New contact form submission:

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Phone: ${phone || 'Not provided'}
Service Interest: ${service || 'Not specified'}

Message:
${message}

---
This email was sent from the Orantis Global contact form.
Reply directly to this email to respond to ${name}.`,
      replyTo: email,
    })

    console.log('Contact form email sent successfully:', result)

    return NextResponse.json({ ok: true, result })
  } catch (e) {
    console.error('Contact form email error:', e)
    return NextResponse.json({ 
      error: 'Failed to send email', 
      details: e instanceof Error ? e.message : 'Unknown error' 
    }, { status: 500 })
  }
}

