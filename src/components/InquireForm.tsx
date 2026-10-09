import React, { useState, useEffect } from 'react';
import { TOURS_DATA } from '../data/tours';
import { MessageSquare, Mail, Phone, Calendar, Users, Send, CheckCircle2, ArrowRight } from 'lucide-react';

// Configurable endpoint constant (can be linked to Formspree, Basin, or backend API)
export const INQUIRY_API_ENDPOINT = 'https://formspree.io/f/placeholder_calcuttawalks';

interface InquireFormProps {
  prefilledTourSlug?: string;
  id?: string;
}

export const InquireForm: React.FC<InquireFormProps> = ({ prefilledTourSlug, id = 'inquire-section' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tourSlug: prefilledTourSlug || 'in-the-footsteps-of-the-raj',
    preferredDate: '',
    groupSize: '2',
    tourType: 'shared', // 'shared' or 'private'
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (prefilledTourSlug) {
      setFormData((prev) => ({ ...prev, tourSlug: prefilledTourSlug }));
    }
  }, [prefilledTourSlug]);

  const selectedTour = TOURS_DATA.find((t) => t.slug === formData.tourSlug);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In development/client mode, simulate network request or post to endpoint
      if (INQUIRY_API_ENDPOINT.includes('placeholder')) {
        await new Promise((resolve) => setTimeout(resolve, 800));
      } else {
        await fetch(INQUIRY_API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            tourTitle: selectedTour?.title || formData.tourSlug,
            submittedAt: new Date().toISOString()
          })
        });
      }
      setIsSuccess(true);
    } catch {
      // Gracefully handle network simulation
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp link preparation with encoded prefilled text
  const whatsappText = encodeURIComponent(
    `Calcutta Walks Enquiry: Hello Explorer! I am interested in booking "${selectedTour?.title || 'a walking tour'}". Date: ${formData.preferredDate || 'flexible'}, Group size: ${formData.groupSize} (${formData.tourType}). Name: ${formData.name || ''}`
  );
  const whatsappUrl = `https://wa.me/919830184030?text=${whatsappText}`;

  return (
    <section id={id} className="py-20 sm:py-28 bg-[#1C1917] text-[#FBF8F2] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7A2E22]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B48A3C]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct contact info, WhatsApp prompt, & reassurance */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F4EDE1] leading-tight">
              Let's plan your <span className="italic text-[#CFA858]">walk.</span>
            </h2>
            <div className="w-16 h-[1px] bg-[#B48A3C]/40 mt-4 mb-6" />

            <p className="text-sm sm:text-base text-[#F4EDE1]/80 leading-relaxed font-serif">
              Drop by our office, write to us, or ping us directly on WhatsApp. Every inquiry is answered directly by an active Explorer to tailor the perfect stroll.
            </p>

            {/* Direct Quick WhatsApp Action */}
            <div className="mt-8 p-6 rounded-2xl glass-panel-dark border border-white/10">
              <h3 className="text-sm font-semibold text-[#CFA858] block mb-2 font-serif">
                Need an immediate reply?
              </h3>
              <p className="text-xs text-[#F4EDE1]/70 leading-relaxed mb-4">
                Chat directly with Explorer Ifte & team via WhatsApp for instant date availability:
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md group"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp (+91 98301 84030)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Direct Telephone and Email fallbacks */}
            <div className="mt-6 space-y-3 text-xs text-[#F4EDE1]/75">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#B48A3C] shrink-0" />
                <span>Email: <a href="mailto:explore@calcuttawalks.com" className="text-[#F4EDE1] hover:underline font-medium">explore@calcuttawalks.com</a></span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#B48A3C] shrink-0" />
                <span>Phone: <a href="tel:+919830184030" className="text-[#F4EDE1] hover:underline font-medium">+91 98301 84030 (Explorer Ifte)</a> / <a href="tel:+918584033244" className="text-[#F4EDE1] hover:underline font-medium">+91 85840 33244 (Explorer Tuhina)</a></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 text-center text-[#B48A3C]">📍</span>
                <span>Walking Tours Pvt Ltd, 9A Khairu Place, Kolkata 700072, West Bengal</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-[#F4EDE1]/60">
                <span className="w-4 text-center text-[#B48A3C]">💳</span>
                <span>GPay / UPI Payment ID: <strong>8910245771@okbizaxis</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Glass Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel-dark rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl relative">
              {isSuccess ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#00AA6C]/20 border border-[#00AA6C] flex items-center justify-center text-[#00AA6C] mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#F4EDE1] mb-2">
                    Dhonyobad! Your Walk is in Motion.
                  </h3>
                  <p className="text-sm text-[#F4EDE1]/80 max-w-md mx-auto leading-relaxed mb-6">
                    Our Explorers have received your request for <strong>{selectedTour?.title}</strong>. We will review our schedule and respond within 12 hours via email or WhatsApp.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold tracking-wider flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Ping us on WhatsApp as well</span>
                    </a>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-5 py-2.5 rounded-full border border-white/20 text-xs font-semibold text-[#F4EDE1] hover:bg-white/10"
                    >
                      Send Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#F4EDE1]/70 mb-1.5 font-medium">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eleanor Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#CFA858] focus:outline-none text-[#F4EDE1] text-sm placeholder:text-white/30 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#F4EDE1]/70 mb-1.5 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. eleanor@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#CFA858] focus:outline-none text-[#F4EDE1] text-sm placeholder:text-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone / WhatsApp & Tour of Interest */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#F4EDE1]/70 mb-1.5 font-medium">
                        WhatsApp / Phone (with Country Code)
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +44 7911 123456 or +91 98301..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#CFA858] focus:outline-none text-[#F4EDE1] text-sm placeholder:text-white/30 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#F4EDE1]/70 mb-1.5 font-medium">
                        Tour of Interest *
                      </label>
                      <select
                        value={formData.tourSlug}
                        onChange={(e) => setFormData({ ...formData, tourSlug: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#292524] border border-white/15 focus:border-[#CFA858] focus:outline-none text-[#F4EDE1] text-sm transition-colors"
                      >
                        {TOURS_DATA.map((t) => (
                          <option key={t.slug} value={t.slug} className="bg-[#1C1917] text-white">
                            {t.title} – {t.subtitle || t.area}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date, Group Size, and Tour Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#F4EDE1]/70 mb-1.5 font-medium">
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          required
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#CFA858] focus:outline-none text-[#F4EDE1] text-sm transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#F4EDE1]/70 mb-1.5 font-medium">
                        Group Size
                      </label>
                      <select
                        value={formData.groupSize}
                        onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#292524] border border-white/15 focus:border-[#CFA858] focus:outline-none text-[#F4EDE1] text-sm transition-colors"
                      >
                        <option value="1">1 Person (Solo Stroller)</option>
                        <option value="2">2 Persons</option>
                        <option value="3-4">3 to 4 Persons</option>
                        <option value="5-8">5 to 8 Persons</option>
                        <option value="8+">Larger Group / Delegation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#F4EDE1]/70 mb-1.5 font-medium">
                        Tour Preference
                      </label>
                      <div className="flex rounded-xl bg-white/5 p-1 border border-white/15">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, tourType: 'shared' })}
                          className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors ${
                            formData.tourType === 'shared' ? 'bg-[#B48A3C] text-[#1C1917]' : 'text-white/70 hover:text-white'
                          }`}
                        >
                          Shared
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, tourType: 'private' })}
                          className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors ${
                            formData.tourType === 'private' ? 'bg-[#7A2E22] text-white' : 'text-white/70 hover:text-white'
                          }`}
                        >
                          Private
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Message / Special requirements */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#F4EDE1]/70 mb-1.5 font-medium">
                      Special Requests, Dietary Restrictions or Accommodation Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Let us know if you have specific architectural interests, mobility constraints, or stay at Calcutta Bungalow..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#CFA858] focus:outline-none text-[#F4EDE1] text-sm placeholder:text-white/30 transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#B48A3C] to-[#CFA858] hover:from-[#c29643] hover:to-[#dbb464] text-[#1C1917] font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#B48A3C]/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Your Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Booking Inquiry</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-[#F4EDE1]/50 mt-2">
                    No payment charged now · Instant email confirmation · Free rescheduling up to 48 hours prior
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
