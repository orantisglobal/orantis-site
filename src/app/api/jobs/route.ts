import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'uploads', 'jobs.json')

async function readJobs() {
  try {
    const buf = await fs.readFile(DATA_PATH, 'utf8')
    return JSON.parse(buf)
  } catch {
    return []
  }
}

async function writeJobs(jobs: any[]) {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true })
  await fs.writeFile(DATA_PATH, JSON.stringify(jobs, null, 2))
}

export async function GET() {
  const jobs = await readJobs()
  return NextResponse.json(jobs)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const required = ['title', 'location', 'type', 'description']
  for (const k of required) {
    if (!body[k]) return NextResponse.json({ error: `${k} is required` }, { status: 400 })
  }
  const jobs = await readJobs()
  const newJob = {
    id: Date.now().toString(),
    title: body.title,
    location: body.location,
    type: body.type,
    description: body.description,
    createdAt: new Date().toISOString(),
    active: true,
  }
  jobs.unshift(newJob)
  await writeJobs(jobs)
  return NextResponse.json(newJob, { status: 201 })
}
