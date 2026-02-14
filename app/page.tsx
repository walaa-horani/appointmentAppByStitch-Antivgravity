import Link from 'next/link'
import NewsletterSection from './components/NewsletterSection'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="lg:col-span-6 mb-12 lg:mb-0 text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 text-[var(--color-primary)] text-sm font-medium mb-6 animate-fade-in-up">
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] mr-2 animate-pulse"></span>
                Accepting New Patients
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Your Health, <br className="hidden lg:block" />
                <span className="text-[var(--color-primary)] relative inline-block">
                  Our Priority
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-[var(--color-primary)]/20 -z-10" preserveAspectRatio="none" viewBox="0 0 100 10">
                    <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8"></path>
                  </svg>
                </span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Compassionate care and advanced medicine closer to home. We combine modern technology with a human touch to ensure your well-being.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/book"
                  className="bg-[var(--color-primary)] hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-[var(--color-primary)]/30 hover:shadow-[var(--color-primary)]/40 transition-all duration-300 transform hover:-translate-y-1 text-center"
                >
                  Book an Appointment
                </Link>
                <Link
                  href="/services"
                  className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span className="material-icons text-[var(--color-primary)]">play_circle_outline</span>
                  Our Services
                </Link>
              </div>
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="material-icons text-green-500 text-lg">check_circle</span>
                  <span>Verified Doctors</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-icons text-green-500 text-lg">check_circle</span>
                  <span>Digital Records</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-[var(--color-primary)]/10 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Friendly smiling doctor holding a tablet in a modern clinic"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYXseEVY2_TCMHt72d2yRTSBjLQGG8tQzO-LeyRUblJv8zU88T5X06vu2sppKBH0SpuZ9EFepPVN3EqojZg5AXhEC4oY7LvI9WmpxkuHuE5JsGgKHlh9n6r9Eoq_kdF1DueAg_zCv1YL2wP4tTrh0V1-dAjeFIITrHI0jBObBDCkk8ZHhNqMESE-Hdj_CGhSp5PsKGPXQoMBcLfH5PecunPnbNc9g7DHEBB_KWIQKxoDNBu3O7wa18tdrKbBVLX0MWMaS_AXBaaxSX"
                />
                {/* Floating Card */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-4 max-w-xs animate-bounce-slow">
                  <div className="bg-green-100 p-2 rounded-full">
                    <span className="material-icons text-green-600">star</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">4.9/5 Rating</p>
                    <p className="text-xs text-slate-500">Based on 2,500+ reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-[var(--color-secondary-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[var(--color-primary)] font-semibold tracking-wide uppercase mb-3">Why Choose Us</h2>
            <p className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Comprehensive Care for Your Family</p>
            <p className="text-slate-600 text-lg">We prioritize patient comfort and safety, offering state-of-the-art medical services in a welcoming environment.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group">
              <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center text-[var(--color-primary)] mb-6 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300">
                <span className="material-icons text-3xl">medical_services</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Expert Physicians</h3>
              <p className="text-slate-600 leading-relaxed">
                Our team of board-certified specialists brings years of experience across various medical disciplines to ensure accurate diagnosis.
              </p>
              <Link href="/services" className="inline-flex items-center text-[var(--color-primary)] font-medium mt-4 group-hover:translate-x-1 transition-transform">
                Learn more <span className="material-icons text-sm ml-1">arrow_forward</span>
              </Link>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group">
              <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center text-[var(--color-primary)] mb-6 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300">
                <span className="material-icons text-3xl">support_agent</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">24/7 Support</h3>
              <p className="text-slate-600 leading-relaxed">
                Health concerns don&apos;t follow a schedule. Our support team and on-call doctors are available around the clock for emergencies.
              </p>
              <span className="inline-flex items-center text-[var(--color-primary)] font-medium mt-4 group-hover:translate-x-1 transition-transform cursor-pointer">
                Contact support <span className="material-icons text-sm ml-1">arrow_forward</span>
              </span>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group">
              <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center text-[var(--color-primary)] mb-6 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300">
                <span className="material-icons text-3xl">biotech</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Modern Facilities</h3>
              <p className="text-slate-600 leading-relaxed">
                Equipped with the latest diagnostic technology and comfortable recovery rooms, we ensure the highest standard of care.
              </p>
              <span className="inline-flex items-center text-[var(--color-primary)] font-medium mt-4 group-hover:translate-x-1 transition-transform cursor-pointer">
                View gallery <span className="material-icons text-sm ml-1">arrow_forward</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Quick View */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Specialized Medical Services</h2>
              <p className="text-slate-600 text-lg">Tailored treatments to meet your specific health needs.</p>
            </div>
            <Link href="/services" className="hidden md:flex items-center text-[var(--color-primary)] font-semibold hover:text-blue-700 transition-colors mt-4 md:mt-0">
              View All Services <span className="material-icons ml-1">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'favorite', title: 'Cardiology', desc: 'Comprehensive heart care & surgery', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT6PqBeeJvRKY4VqyTjNuMIPkAxxsDMpBP8r5F2WLqHTbwreM7NN7-K0wKJr7-6IiHxy1V0yt-1LIji9jl20mMtu5YR4EA3cLb3wGSDdwq09w3v_R0jVJyNvs0FKKPHJEdeU7fqGTiODoLi-d4MCVRwcge0jzTYQ1-tWqROBbPQn3YLol-AhDHDF9SZKRhG04yEzHpgJ9GbaNJTytCRLzwCthXO9o8wQX_0a2bllt2Zr9QTefsQc39pKruJH3eW25STZlb_airt4qI' },
              { icon: 'child_care', title: 'Pediatrics', desc: 'Specialized care for children', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKq9wJwBevjsywEkM5biLm91cH0j7kF6dUABdXZr1PGBn9XHgkfIyS5xpIGgnuxrViqalKdAXUJwYjW4SOKtkkUwVBTSGrW-i4HQ6G2RJ6raG-3sogqoB760rM8bUWmnX6f3biBtQRZzuY6R2l0GOc8t-AQ-jvnKosqZHHxJ1F7xGt6gefdJAVrlfrMFRByLRp5876sJ3pku0yiHLXpUzJXj1FHW58VFAtfLW5hz-7UrhRJ_huHRRG2Cjps9tads6ZUAejWFV4OhXS' },
              { icon: 'face', title: 'Dental Care', desc: 'Advanced dentistry & implants', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNjSFPnhpsbpbN4Rr0no1cSQHkp23lRn7pDeIEbV8eVuhtSgwU2L-qQIQTBdnLfXV9gQoktppGqgZ-HnldX3EQ99Qzr94GM2g5JxezJ9KdKj6K8WI3VYte0DVgRalGzv7FBAv-HpL2TdFhuEM3grUTTohnhbdFfkR_qHEP4GlbBn2IfmdvbGYKqtlrBm8i7R5n7QUkFc57LtRiUI5ZzTMGpzMawp0kejjs4Ha7-HzVLBVa-_gQeEDsWGE3a-US37e14KeNQxlRAvH-' },
              { icon: 'science', title: 'Diagnostics', desc: 'Accurate lab testing & analysis', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBObVhA1YnrbbUd7kHgk1roPgLVoG7lKkbOoyNCy0gzs4G2lU6QEI-yuD021D7RtwJU6YCSTBdXhvKnxjBAkuXSrPnSVenF4X0LI4CNuPrqpE4wAMIzlicS-D0_CGeMsEWK6jmsYUodbFccnc8eKlbs9DIFbdO1ZRbPf97zcIvctTzYB26lGKEqyhO6efJyjHtUfp9NxBUR4j0DdR29EZBaXF_z4D1lUAj6qdTUu20TwGSfNvoCEvKCZgo39_P7_oQlsi50fY2WAUvP' },
            ].map((svc) => (
              <div key={svc.title} className="group relative overflow-hidden rounded-xl h-64 bg-slate-100 cursor-pointer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={svc.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={svc.img} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-white mb-3">
                    <span className="material-icons">{svc.icon}</span>
                  </div>
                  <h4 className="text-white text-xl font-bold mb-1">{svc.title}</h4>
                  <p className="text-slate-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/services" className="inline-flex items-center text-[var(--color-primary)] font-semibold hover:text-blue-700 transition-colors">
              View All Services <span className="material-icons ml-1">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[var(--color-primary)] relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { count: '10k+', label: 'Patients Treated', icon: 'people' },
              { count: '50+', label: 'Specialist Doctors', icon: 'medical_services' },
              { count: '15+', label: 'Years Experience', icon: 'history' },
              { count: '24/7', label: 'Emergency Care', icon: 'local_hospital' },
            ].map((stat, index) => (
              <div key={index} className="p-4 group hover:-translate-y-1 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4 text-white group-hover:bg-white group-hover:text-[var(--color-primary)] transition-colors">
                  <span className="material-icons">{stat.icon}</span>
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.count}</div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Find answers to common questions about our services.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Do you accept health insurance?', a: 'Yes, we accept most major health insurance plans. Please contact our support team for verification.' },
              { q: 'How can I book an appointment?', a: 'You can book online through our website, use our mobile app, or call our 24/7 hotline.' },
              { q: 'What should I bring to my first visit?', a: 'Please bring your ID, insurance card, and any relevant medical records or prescriptions.' },
              { q: 'Do you offer virtual consultations?', a: 'Yes, we offer telemedicine services for select departments. You can choose this option when booking.' },
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-xl shadow-sm border border-slate-200">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-semibold text-slate-900 group-hover:text-[var(--color-primary)] transition-colors">{faq.q}</span>
                  <span className="material-icons text-slate-400 group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--color-primary)] rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-[var(--color-primary)]/30">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Ready to prioritize your health?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto relative z-10">Schedule your appointment today and experience the difference of patient-centered care.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link href="/book" className="bg-white text-[var(--color-primary)] font-bold py-4 px-8 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                Book Appointment Now
              </Link>
              <button className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-colors">
                Call (555) 123-4567
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
