'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLogin() {
  const router = useRouter()
  const [key, setKey] = useState('')
  const [error, setError] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!key) return setError('Enter access key')
    // Middleware will set cookie when key matches; we add it to URL
    router.push(`/admin/careers?key=${encodeURIComponent(key)}`)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <form onSubmit={submit} className="bg-white rounded-2xl shadow-card p-8 w-full max-w-sm border border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Admin Access</h1>
        <p className="text-sm text-gray-600 mb-6">Enter your private access key to manage careers.</p>
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Access key"
          className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500"
        />
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        <button className="mt-6 w-full px-4 py-2.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700">Continue</button>
      </form>
    </main>
  )
}
