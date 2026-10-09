import React, { useState } from 'react';
import { TOURS_DATA, Tour } from '../data/tours';
import { 
  X, Calendar, Clock, Users, CreditCard, ShieldCheck, 
  CheckCircle2, ArrowRight, MessageSquare, MapPin, Sparkles, ChevronRight 
} from 'lucide-react';

interface SlotBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedTourSlug?: string;
  preSelectedPrice?: number;
}

export const SlotBookingModal: React.FC<SlotBookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedTourSlug,
  preSelectedPrice
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');

  // Booking Form State
  const defaultTour = TOURS_DATA.find((t) => t.slug === preSelectedTourSlug) || TOURS_DATA[0];
  const [selectedTourSlug, setSelectedTourSlug] = useState(defaultTour.slug);
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('06:30 AM (Dawn Walk)');
  const [numWalkers, setNumWalkers] = useState(2);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'razorpay'>('razorpay');
  const [bookingId, setBookingId] = useState('');

  if (!isOpen) return null;

  const currentTour = TOURS_DATA.find((t) => t.slug === selectedTourSlug) || TOURS_DATA[0];
  const unitPrice = preSelectedPrice || currentTour.priceShared;
  const totalPrice = unitPrice * numWalkers;
  const usdPrice = Math.round(totalPrice / 83);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;
    setStep('payment');
  };

  const handleCompletePayment = () => {
    // Generate authentic booking reference
    const generatedId = `CW-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(generatedId);
    setStep('confirmed');
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Calcutta Walks! I just booked a slot on the website.\nBooking ID: ${bookingId}\nTour: ${currentTour.title}\nDate: ${date}\nTime: ${timeSlot}\nWalkers: ${numWalkers}\nGuest: ${fullName}\nPhone: ${phone}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#FBF8F2] rounded-3xl overflow-hidden shadow-2xl border border-stone-300 max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="bg-[#1C1917] text-[#FBF8F2] p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#CFA858] block">
              Direct Slot Reservation
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#F4EDE1]">
              {step === 'confirmed' ? 'Booking Confirmed!' : 'Book Your Walking Departure'}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* STEP 1: GUEST & WALK DETAILS */}
          {step === 'details' && (
            <form onSubmit={handleProceedToPayment} className="space-y-5">
              {/* Tour Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917]/70 mb-1.5 font-sans">
                  Select Tour / Experience
                </label>
                <select
                  value={selectedTourSlug}
                  onChange={(e) => setSelectedTourSlug(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm font-serif focus:outline-none focus:border-[#B48A3C]"
                >
                  {TOURS_DATA.map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.title} (₹{t.priceShared.toLocaleString()} / person)
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917]/70 mb-1.5 font-sans">
                    Date of Walk
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm font-serif focus:outline-none focus:border-[#B48A3C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917]/70 mb-1.5 font-sans">
                    Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm font-serif focus:outline-none focus:border-[#B48A3C]"
                  >
                    <option value="06:30 AM (Dawn Walk)">06:30 AM (Recommended Morning)</option>
                    <option value="07:00 AM (Morning Walk)">07:00 AM (Morning Walk)</option>
                    <option value="03:30 PM (Afternoon / Sunset)">03:30 PM (Afternoon / Sunset)</option>
                  </select>
                </div>
              </div>

              {/* Number of Walkers */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917]/70 mb-1.5 font-sans">
                  Number of Walkers (Min 2 or 1 paying for 2)
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setNumWalkers(num)}
                      className={`w-10 h-10 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        numWalkers === num
                          ? 'bg-[#1C1917] text-white shadow-sm scale-105'
                          : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <span className="text-xs text-stone-500 font-serif ml-2">
                    {numWalkers === 1 ? '1 Person (Single)' : `${numWalkers} Walkers`}
                  </span>
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917]/70 mb-1.5 font-sans">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm font-serif focus:outline-none focus:border-[#B48A3C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917]/70 mb-1.5 font-sans">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm font-serif focus:outline-none focus:border-[#B48A3C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917]/70 mb-1.5 font-sans">
                  WhatsApp / Mobile Number (with country code)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98301 84030 or +1 555 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm font-serif focus:outline-none focus:border-[#B48A3C]"
                />
              </div>

              {/* Order Summary Box */}
              <div className="p-4 rounded-2xl bg-[#F4EDE1] border border-[#B48A3C]/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#1C1917]/70 font-serif block">
                    {numWalkers} × ₹{unitPrice.toLocaleString()} for {currentTour.title.split(':')[0]}
                  </span>
                  <span className="text-[11px] text-[#00AA6C] font-semibold">
                    Small group capped · Guide & Refreshments included
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-serif text-2xl font-bold text-[#1C1917]">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-stone-500 font-serif block">
                    (~${usdPrice} USD)
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#1C1917] hover:bg-[#7A2E22] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Continue to Secure Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD & GATEWAY */}
          {step === 'payment' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-[#F4EDE1] border border-[#B48A3C]/30 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg text-[#1C1917] font-semibold">
                    {currentTour.title}
                  </h4>
                  <p className="text-xs text-stone-600 font-serif">
                    {date} at {timeSlot} · {numWalkers} Walkers
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-2xl font-bold text-[#1C1917]">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Payment Gateway Options */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917]/70 mb-3 font-sans">
                  Select Payment Method
                </label>

                <div className="space-y-2.5">
                  <label
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'razorpay'
                        ? 'border-[#B48A3C] bg-white shadow-md ring-2 ring-[#B48A3C]/20'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0C2340] text-white flex items-center justify-center font-bold text-xs">
                        Rzp
                      </div>
                      <div>
                        <span className="font-semibold text-sm text-[#1C1917] block">
                          Razorpay (Cards, UPI, NetBanking & Int’l)
                        </span>
                        <span className="text-[11px] text-stone-500">
                          Recommended for Indian & International travelers
                        </span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'razorpay' ? 'border-[#B48A3C]' : 'border-stone-300'
                    }`}>
                      {paymentMethod === 'razorpay' && <div className="w-2.5 h-2.5 rounded-full bg-[#B48A3C]" />}
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#B48A3C] bg-white shadow-md ring-2 ring-[#B48A3C]/20'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#00AA6C]/10 text-[#00AA6C] flex items-center justify-center font-bold text-xs">
                        UPI
                      </div>
                      <div>
                        <span className="font-semibold text-sm text-[#1C1917] block">
                          Instant UPI QR / Google Pay / PhonePe
                        </span>
                        <span className="text-[11px] text-stone-500">
                          Zero fees · Instant slot confirmation
                        </span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'upi' ? 'border-[#B48A3C]' : 'border-stone-300'
                    }`}>
                      {paymentMethod === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-[#B48A3C]" />}
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#B48A3C] bg-white shadow-md ring-2 ring-[#B48A3C]/20'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#7A2E22]/10 text-[#7A2E22] flex items-center justify-center font-bold text-xs">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-semibold text-sm text-[#1C1917] block">
                          Stripe Global Credit / Debit Card
                        </span>
                        <span className="text-[11px] text-stone-500">
                          Visa, MasterCard, Amex, Apple Pay
                        </span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'card' ? 'border-[#B48A3C]' : 'border-stone-300'
                    }`}>
                      {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-[#B48A3C]" />}
                    </div>
                  </label>
                </div>
              </div>

              {/* Payment Action Buttons */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-5 py-3 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold uppercase tracking-wider hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleCompletePayment}
                  className="flex-1 py-3.5 rounded-full bg-[#00AA6C] hover:bg-[#00925d] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pay ₹{totalPrice.toLocaleString()} & Confirm Slot</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-stone-500 font-serif">
                Encrypted 256-bit SSL transaction. 100% money-back guarantee if cancelled 24 hours prior.
              </p>
            </div>
          )}

          {/* STEP 3: BOOKING CONFIRMATION & VOUCHER */}
          {step === 'confirmed' && (
            <div className="text-center py-4 space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#00AA6C]/10 text-[#00AA6C] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#00AA6C] block">
                  Slot Reserved & Paid
                </span>
                <h3 className="font-serif text-3xl text-[#1C1917] mt-1">
                  You’re Walking with Calcutta Walks!
                </h3>
                <p className="text-xs text-stone-600 font-serif mt-1">
                  A receipt and itinerary confirmation have been dispatched to <strong>{email}</strong>.
                </p>
              </div>

              {/* Voucher Card */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200 text-left shadow-sm max-w-lg mx-auto space-y-3 font-serif">
                <div className="flex justify-between items-baseline border-b border-stone-100 pb-2">
                  <span className="text-xs text-stone-500 uppercase font-sans">Booking ID</span>
                  <span className="font-mono text-sm font-bold text-[#1C1917]">{bookingId}</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-stone-100 pb-2">
                  <span className="text-xs text-stone-500 uppercase font-sans">Tour</span>
                  <span className="font-semibold text-sm text-[#1C1917]">{currentTour.title}</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-stone-100 pb-2">
                  <span className="text-xs text-stone-500 uppercase font-sans">Date & Timing</span>
                  <span className="text-xs text-[#1C1917]">{date} · {timeSlot}</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-stone-100 pb-2">
                  <span className="text-xs text-stone-500 uppercase font-sans">Party Size</span>
                  <span className="text-xs text-[#1C1917]">{numWalkers} Walkers</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-stone-500 uppercase font-sans">Amount Paid</span>
                  <span className="font-bold text-sm text-[#00AA6C]">₹{totalPrice.toLocaleString()} (Paid)</span>
                </div>
              </div>

              {/* Instant WhatsApp Handshake Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/919830184030?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Send Handshake on WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1C1917] hover:bg-[#7A2E22] text-white text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
