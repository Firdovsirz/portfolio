import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Firdovsi Rzaev — for engineering work, research collaborations, and projects in distributed systems, edtech, and research infrastructure.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk."
        intro="Open to engineering work, research collaborations, and projects in distributed systems, edtech, and research infrastructure."
      />

      <Section>
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <ContactForm />
          </div>

          <aside className="md:col-span-5 space-y-10">
            <div>
              <p className="mono text-xs text-muted-2 uppercase tracking-widest mb-3">Email</p>
              <a
                href={site.social.email}
                className="serif text-xl link-underline hover:text-accent"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="mono text-xs text-muted-2 uppercase tracking-widest mb-3">Social</p>
              <ul className="space-y-2">
                <li>
                  <a
                    href={site.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="serif text-xl link-underline hover:text-accent"
                  >
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a
                    href={site.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="serif text-xl link-underline hover:text-accent"
                  >
                    GitHub ↗
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="mono text-xs text-muted-2 uppercase tracking-widest mb-3">Based in</p>
              <p className="serif text-xl">{site.location}</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
