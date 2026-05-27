"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Design-only form — wire to API later.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border hairline p-10 rounded-sm">
        <p className="mono text-xs text-accent uppercase tracking-widest mb-3">
          Form preview
        </p>
        <h3 className="serif text-2xl tracking-tight">Thanks — message captured.</h3>
        <p className="text-muted mt-3 leading-relaxed">
          This form is currently a design preview. For now, please email{" "}
          <a href="mailto:firdovsirz@gmail.com" className="text-foreground link-underline">
            firdovsirz@gmail.com
          </a>{" "}
          directly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mono text-xs text-muted hover:text-foreground mt-6 link-underline"
        >
          ← Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Field label="Name" name="name" placeholder="Your name" />
      <Field label="Email" name="email" type="email" placeholder="you@institution.edu" />
      <Field label="Subject" name="subject" placeholder="What's this about?" />
      <Field
        label="Message"
        name="message"
        textarea
        placeholder="A few lines about your project, lab, or opportunity."
      />
      <button
        type="submit"
        className="border hairline px-6 py-3 text-sm hover:border-[var(--border-strong)] hover:text-accent transition-colors"
      >
        Send message →
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="mono text-xs text-muted-2 uppercase tracking-widest block mb-2">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          rows={6}
          className="w-full bg-transparent border-b hairline focus:border-accent outline-none py-2 text-foreground placeholder:text-muted-2 transition-colors resize-none"
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent border-b hairline focus:border-accent outline-none py-2 text-foreground placeholder:text-muted-2 transition-colors"
        />
      )}
    </label>
  );
}
