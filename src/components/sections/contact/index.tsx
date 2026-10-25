import { ContactForm } from "@/components/sections/contact/contact-form";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section">
      <h2 id="contact-heading" className="section-heading">
        Contact
      </h2>
      <p className="mt-8">
        Dominique can be reached directly through the form below:
      </p>
      <ContactForm />
    </section>
  );
}
