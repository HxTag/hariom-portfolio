import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.sendForm(
        'service_katca0e',
        'template_owljpqd',
        form.current,
        {
          publicKey: 'HDEZniB1KVple2bD8',
        }
      );

      setStatus('success');
      form.current.reset();

      setTimeout(() => {
        setStatus('');
      }, 5000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#050505] text-white py-24 px-6 md:px-12 overflow-hidden"
    >

      {/* Ambient Green Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[500px] h-[500px]
        bg-[#0FBF3E]/10
        rounded-full
        blur-[150px]
        pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1
            bg-[#0FBF3E]/10
            border border-[#0FBF3E]/30
            rounded
            text-[11px]
            font-mono
            uppercase
            tracking-widest
            text-[#0FBF3E]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0FBF3E] animate-pulse" />
            LET'S CONNECT
          </span>

          <h2 className="mt-5 text-4xl md:text-6xl font-black tracking-tight">
            HAVE A PROJECT
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0FBF3E] via-[#087A28] to-[#0FBF3E]">
              IN MIND?
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-white/60 text-sm md:text-base leading-relaxed">
            Have an idea, opportunity, or project you'd like to discuss?
            Send me a message and I'll get back to you.
          </p>
        </div>

        {/* Contact Form */}
        <form
          ref={form}
          onSubmit={sendEmail}
          className="relative p-6 md:p-10 rounded-2xl
            bg-[#0b0b0b]/90
            border border-white/10
            backdrop-blur-xl
            shadow-[0_25px_80px_rgba(0,0,0,0.7)]"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
            <div>
              <label className="block mb-2 text-xs font-mono uppercase tracking-widest text-white/50">
                Your Name
              </label>

              <input
                type="text"
                name="user_name"
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3
                  bg-white/5
                  border border-white/10
                  rounded-lg
                  text-white
                  placeholder:text-white/30
                  outline-none
                  focus:border-[#0FBF3E]/60
                  focus:ring-1
                  focus:ring-[#0FBF3E]/30
                  transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-xs font-mono uppercase tracking-widest text-white/50">
                Email Address
              </label>

              <input
                type="email"
                name="user_email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3
                  bg-white/5
                  border border-white/10
                  rounded-lg
                  text-white
                  placeholder:text-white/30
                  outline-none
                  focus:border-[#0FBF3E]/60
                  focus:ring-1
                  focus:ring-[#0FBF3E]/30
                  transition-all"
              />
            </div>

          </div>

          {/* Message */}
          <div className="mt-6">
            <label className="block mb-2 text-xs font-mono uppercase tracking-widest text-white/50">
              Message
            </label>

            <textarea
              name="message"
              rows="7"
              placeholder="Tell me about your project..."
              required
              className="w-full px-4 py-3
                bg-white/5
                border border-white/10
                rounded-lg
                text-white
                placeholder:text-white/30
                outline-none
                resize-none
                focus:border-[#0FBF3E]/60
                focus:ring-1
                focus:ring-[#0FBF3E]/30
                transition-all"
            />
          </div>

          {/* Submit */}
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">

            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-8 py-3.5
                bg-[#0FBF3E]
                hover:bg-[#0da936]
                disabled:opacity-50
                disabled:cursor-not-allowed
                text-black
                font-bold
                text-xs
                uppercase
                tracking-widest
                rounded-lg
                transition-all
                duration-300
                hover:scale-105
                active:scale-95
                shadow-[0_0_25px_rgba(15,191,62,0.25)]"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message →'}
            </button>

            {/* Status */}
            {status === 'success' && (
              <p className="text-[#0FBF3E] text-sm font-mono">
                ✓ Message sent successfully!
              </p>
            )}

            {status === 'error' && (
              <p className="text-red-400 text-sm font-mono">
                ✕ Failed to send message. Please try again.
              </p>
            )}

          </div>

        </form>

      </div>
    </section>
  );
};

export default Contact;

