"use server";

import {
  type ContactState,
  readContactFields,
  validateContact,
} from "@/components/sections/contact/validate";

const defaultFrom = "Website Contact <onboarding@resend.dev>";

export async function sendContactMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const isBot = Boolean(formData.get("company"));
  if (isBot) {
    return { status: "success" };
  }

  const values = readContactFields(formData);
  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return { errors, status: "error", values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form is misconfigured");
    return { status: "error", values };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || defaultFrom,
        reply_to: values.email,
        subject: `Website contact: ${values.subject}`,
        text: `From: ${values.firstName} ${values.lastName} <${values.email}>\n\n${values.message}`,
        to,
      }),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    if (!response.ok) {
      console.error("Resend rejected the contact message", response.status);
      return { status: "error", values };
    }
  } catch (error) {
    console.error("Could not reach Resend", error);
    return { status: "error", values };
  }

  return { status: "success" };
}
