'use client'

import { useEffect, useMemo, useState } from 'react'

type Job = {
  id: string
  title: string
  location: string
  type: string
  description: string
  createdAt: string
  active: boolean
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [locationFilter, setLocationFilter] = useState('All')

  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isApplying, setIsApplying] = useState(false)

  useEffect(() => {
    fetch('/api/jobs')
      .then((r) => r.json())
      .then((data) => setJobs(Array.isArray(data) ? data : []))
      .catch(() => setJobs([]))
  }, [])

  const meta = useMemo(() => {
    const locations = Array.from(
      new Set(jobs.map((j) => j.location.trim()).filter(Boolean))
    )
    const types = Array.from(new Set(jobs.map((j) => j.type.trim()).filter(Boolean)))
    return { locations, types }
  }, [jobs])

  const filtered = useMemo(() => {
    return jobs
      .filter((j) => j.active !== false)
      .filter((j) =>
        !query
          ? true
          : [j.title, j.location, j.type, j.description]
              .join(' ')?.toLowerCase()
              .includes(query.toLowerCase())
      )
      .filter((j) => (typeFilter === 'All' ? true : j.type === typeFilter))
      .filter((j) => (locationFilter === 'All' ? true : j.location === locationFilter))
  }, [jobs, query, typeFilter, locationFilter])

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-20 pb-10 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Join Orantis Global</h1>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              We&apos;re building a modern consulting team across strategy, delivery, and enablement.
              Explore roles below and talk to us.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-4 sm:p-5 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, skill or location"
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500"
              />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option>All</option>
                {meta.types.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option>All</option>
                {meta.locations.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Jobs list */}
          {filtered.length === 0 ? (
            <div className="text-center text-gray-500 py-12">No openings match your search.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onView={() => setSelectedJob(job)}
                  onApply={() => {
                    setSelectedJob(job)
                    setIsApplying(true)
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Details modal */}
      {selectedJob && !isApplying && (
        <DetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={() => {
            setIsApplying(true)
          }}
        />
      )}

      {/* Apply modal */}
      {isApplying && selectedJob && (
        <ApplyModal job={selectedJob} onClose={() => setIsApplying(false)} />
      )}
    </main>
  )
}

function JobCard({ job, onView, onApply }: { job: Job; onView: () => void; onApply: () => void }) {
  const posted = new Date(job.createdAt || Date.now()).toLocaleDateString()
  const excerpt = job.description.split('\n').slice(0, 3).join(' ')
  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-200">
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
          <span className="text-xs text-gray-500">Posted {posted}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {job.location}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200">
            {job.type}
          </span>
        </div>
        <p className="text-gray-600 mt-4 line-clamp-3" style={{display:'-webkit-box', WebkitLineClamp:3 as any, WebkitBoxOrient:'vertical' as any, overflow:'hidden'}}>
          {excerpt}
        </p>
      </div>
      <div className="mt-5 flex gap-3">
        <button onClick={onView} className="px-4 py-2 rounded-lg border text-sm">View details</button>
        <button onClick={onApply} className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm hover:bg-primary-700">Apply</button>
      </div>
    </div>
  )
}

function DetailsModal({ job, onClose, onApply }: { job: Job; onClose: () => void; onApply: () => void }) {
  const posted = new Date(job.createdAt || Date.now()).toLocaleDateString()
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">{job.title}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                {job.location}
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200">
                {job.type}
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                Posted {posted}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="mt-6 prose prose-sm max-w-none text-gray-800 whitespace-pre-line">
          {job.description}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border text-sm">Close</button>
          <button onClick={onApply} className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm hover:bg-primary-700">Apply</button>
        </div>
      </div>
    </div>
  )
}

function ApplyModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    data.append('jobTitle', job.title)
    setStatus('submitting')
    try {
      const res = await fetch('/api/apply-email', { method: 'POST', body: data })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Apply for {job.title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        {status === 'success' ? (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">Thank you! We&apos;ll be in touch.</div>
        ) : (
          <form onSubmit={submit} className="space-y-4" encType="multipart/form-data">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Full Name *</label>
                <input name="name" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email *</label>
                <input name="email" type="email" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Message</label>
              <textarea name="message" rows={4} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500" placeholder="Brief note (optional)" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Resume (PDF/DOC) *</label>
              <input name="resume" type="file" accept=".pdf,.doc,.docx" required className="w-full text-sm" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
              <button disabled={status==='submitting'} className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">
                {status==='submitting' ? 'Submitting…' : 'Submit Application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
