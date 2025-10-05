import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const name = String(form.get('name') || '')
    const email = String(form.get('email') || '')
    const jobTitle = String(form.get('jobTitle') || 'General Application')
    const message = String(form.get('message') || '')
    const file = form.get('resume') as File | null

    if (!name || !email || !file) {
      return NextResponse.json({ error: 'name, email and resume are required' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')

    const toEmail = process.env.APPLICATIONS_TO_EMAIL || 'contact@orantisglobal.com'

    await resend.emails.send({
      from: 'Orantis Global Careers <careers@orantisglobal.com>',
      to: [toEmail],
      subject: `New Application: ${jobTitle} — ${name}`,
      text: `Job: ${jobTitle}\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      attachments: [
        {
          filename: file.name || 'resume.pdf',
          content: base64,
        },
      ],
      replyTo: email,
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
