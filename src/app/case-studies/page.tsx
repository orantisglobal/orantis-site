import Header from '@/components/Header'
import Footer from '@/components/Footer'

const caseStudies = [
  {
    title: 'AI-Powered Healthcare Transformation',
    industry: 'Healthcare',
    challenge: 'Legacy systems causing inefficiencies and data silos',
    solution: 'Implemented cloud-based AI-driven EHR system with predictive analytics',
    results: [
      '40% reduction in patient wait times',
      '60% improvement in data accessibility',
      '25% cost savings in IT operations'
    ],
    image: '/api/placeholder/600/400'
  },
  {
    title: 'Smart Manufacturing IoT Revolution',
    industry: 'Manufacturing',
    challenge: 'Lack of real-time visibility into production processes',
    solution: 'Deployed AI-powered IoT sensors and predictive analytics platform',
    results: [
      '30% increase in production efficiency',
      '50% reduction in equipment downtime',
      '20% improvement in quality control'
    ],
    image: '/api/placeholder/600/400'
  },
  {
    title: 'Next-Gen Financial Cloud Migration',
    industry: 'Financial Services',
    challenge: 'On-premise infrastructure limiting scalability and security',
    solution: 'Migrated to secure cloud platform with AI-enhanced security',
    results: [
      '99.9% uptime achieved',
      '70% reduction in infrastructure costs',
      'Enhanced security compliance'
    ],
    image: '/api/placeholder/600/400'
  },
  {
    title: 'AI-Driven E-commerce Modernization',
    industry: 'E-commerce',
    challenge: 'Outdated platform affecting customer experience and sales',
    solution: 'Built modern, scalable e-commerce platform with AI recommendations',
    results: [
      '150% increase in online sales',
      '45% improvement in page load times',
      '35% increase in customer satisfaction'
    ],
    image: '/api/placeholder/600/400'
  },
  {
    title: 'Advanced Cybersecurity Framework',
    industry: 'Technology',
    challenge: 'Growing security threats and compliance requirements',
    solution: 'AI-powered security framework with 24/7 monitoring',
    results: [
      'Zero security breaches',
      '100% compliance with industry standards',
      '50% reduction in security incidents'
    ],
    image: '/api/placeholder/600/400'
  },
  {
    title: 'Intelligent Data Analytics Platform',
    industry: 'Retail',
    challenge: 'Limited insights from customer and sales data',
    solution: 'AI-driven analytics platform with real-time dashboards',
    results: [
      '25% increase in revenue',
      '30% improvement in inventory management',
      '40% better customer targeting'
    ],
    image: '/api/placeholder/600/400'
  }
]

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Success <span className="text-primary-600">Stories</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how we&apos;ve helped businesses across industries achieve 
              remarkable results through innovative technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-primary-600 font-semibold">Case Study</p>
                  </div>
                </div>

                <div className="p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide">
                        {study.industry}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {study.title}
                    </h3>
                  </div>

                  {/* Challenge */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {study.solution}
                    </p>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Results</h4>
                    <ul className="space-y-2">
                      {study.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Proven Results Across Industries
            </h2>
            <p className="text-lg text-primary-100 max-w-4xl mx-auto">
              Our track record speaks for itself. Here&apos;s what we&apos;ve achieved for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { title: 'AI-First', label: 'Approach' },
              { title: 'Cloud-Native', label: 'Solutions' },
              { title: 'Future-Ready', label: 'Technology' },
              { title: 'Innovation', label: 'Driven' },
            ].map((item) => (
              <div key={item.title} className="bg-white text-gray-900 rounded-2xl shadow-card p-6 text-center">
                <h3 className="text-xl font-extrabold tracking-tight">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Let&apos;s discuss how we can help you achieve similar results 
            for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Your Project
            </a>
            <a
              href="/services"
              className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              View Our Services
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
