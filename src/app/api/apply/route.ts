import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const APPS_FILE = path.join(process.cwd(), 'uploads', 'applications.json')
const RESUME_DIR = path.join(process.cwd(), 'uploads', 'resumes')

async function readApps() {
  try {
    const buf = await fs.readFile(APPS_FILE, 'utf8')
    return JSON.parse(buf)
  } catch {
    return []
  }
}

async function writeApps(apps: any[]) {
  await fs.mkdir(path.dirname(APPS_FILE), { recursive: true })
  await fs.writeFile(APPS_FILE, JSON.stringify(apps, null, 2))
}

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const name = String(formData.get('name') || '')
  const email = String(formData.get('email') || '')
  const jobId = String(formData.get('jobId') || '')
  const message = String(formData.get('message') || '')
  const file = formData.get('resume') as File | null

  if (!name || !email || !file) {
    return NextResponse.json({ error: 'name, email and resume are required' }, { status: 400 })
  }

  await fs.mkdir(RESUME_DIR, { recursive: true })
  const arrayBuffer = await file.arrayBuffer()
  const ext = path.extname(file.name) || '.pdf'
  const resumeFileName = `${Date.now()}_${name.replace(/\s+/g, '_')}${ext}`
  const dest = path.join(RESUME_DIR, resumeFileName)
  await fs.writeFile(dest, Buffer.from(arrayBuffer))

  const apps = await readApps()
  const app = {
    id: Date.now().toString(),
    jobId,
    name,
    email,
    message,
    resumePath: `/uploads/resumes/${resumeFileName}`,
    createdAt: new Date().toISOString(),
  }
  apps.unshift(app)
  await writeApps(apps)
  return NextResponse.json({ ok: true })
}
