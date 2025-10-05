'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const ADMIN_TOKEN = 'ORANTIS_ADMIN_6f29c1e4a7b34f6b9d3a2'

export default function CareersAdminPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  useEffect(() => {
    // Check authentication
    const key = searchParams.get('key')
    const cookie = document.cookie.includes('og_admin=1')
    
    if (key === ADMIN_TOKEN) {
      // Set cookie for future visits
      document.cookie = 'og_admin=1; path=/; max-age=604800' // 7 days
      setIsAuthenticated(true)
    } else if (cookie) {
      setIsAuthenticated(true)
    } else {
      // Redirect to login
      router.push('/admin/login')
      return
    }
    
    setIsLoading(false)
  }, [searchParams, router])

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </main>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('saving')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('saved')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const fillSample = (form: HTMLFormElement | null) => {
    if (!form) return
    ;(form.elements.namedItem('title') as HTMLInputElement).value = 'HR Operations Manager'
    ;(form.elements.namedItem('location') as HTMLInputElement).value = 'Hyderabad, India / Michigan, USA'
    ;(form.elements.namedItem('type') as HTMLSelectElement).value = 'Full-time'
    ;(form.elements.namedItem('description') as HTMLTextAreaElement).value = `About the role\nWe are seeking an HR Operations Manager to support our new IT consulting business. You will build and run core HR operations and hiring processes, partner with delivery leads, and keep candidates and clients informed.\n\nRequirements\n- 2+ years experience in US IT recruiting/operations\n- Excellent spoken and written communication with US clients\n- Comfortable multitasking in a fast-paced, early-stage environment\n- Ability to manage end-to-end hiring operations (sourcing to onboarding)\n- Hands-on with tools (ATS/spreadsheets), documentation, and follow-ups\n\nNice to have\n- Experience coordinating with onsite/offshore teams\n- Familiarity with basic compliance and HR documentation\n\nLocations\n- Hyderabad, India / Michigan, USA (hybrid/flexible)`
  }

  return (
    <main className="min-h-screen">
      <section className="pt-20 pb-10 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Careers Admin</h1>
          <p className="text-gray-600 mb-6">Tip: click “Load Sample” to insert a ready job description for HR Operations Manager.</p>
          {status==='saved' && (
            <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-800">Job posted.</div>
          )}
          {status==='error' && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800">Failed to save job.</div>
          )}
          <form onSubmit={submit} className="space-y-5" ref={(el) => fillSample as any}>
            <div className="flex justify-end mb-2">
              <button type="button" onClick={() => fillSample(document.querySelector('form'))} className="px-3 py-2 rounded border text-sm">Load Sample</button>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Title *</label>
              <input name="title" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Location *</label>
                <input name="location" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Type *</label>
                <select name="type" required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500">
                  <option value="Full-time">Full-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Description *</label>
              <textarea name="description" rows={12} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500" placeholder={`About the role\nResponsibilities\nRequirements`} />
            </div>
            <div className="flex justify-end">
              <button disabled={status==='saving'} className="px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700">
                {status==='saving' ? 'Posting…' : 'Post Job'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
