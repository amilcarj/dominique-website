"use client";

import { type ReactNode, useActionState } from "react";

import { sendContactMessage } from "@/components/sections/contact/actions";
import type {
  ContactFields,
  ContactState,
} from "@/components/sections/contact/validate";
import { site } from "@/constants/site";

const input =
  "mt-1 w-full border border-neutral-400 bg-neutral-50 p-2.5 aria-invalid:border-red-700";

const initialState: ContactState = { status: "idle" };

interface FieldLabelProps {
  htmlFor: string;
  small?: boolean;
  children: ReactNode;
}

function FieldLabel({ htmlFor, small = false, children }: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className={small ? "text-sm" : ""}>
      {children} <span className="ml-1 text-xs">(required)</span>
    </label>
  );
}

interface FieldErrorProps {
  id: string;
  error?: string;
}

function FieldError({ id, error }: FieldErrorProps) {
  if (!error) {
    return null;
  }
  return (
    <p id={id} className="mt-1 text-sm text-red-700">
      {error}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );
  const errors = state.errors ?? {};
  const values: Partial<ContactFields> = state.values ?? {};

  const fieldProps = (name: keyof ContactFields, id: string) => ({
    "aria-describedby": errors[name] ? `${id}-error` : undefined,
    "aria-invalid": errors[name] ? true : undefined,
    className: input,
    defaultValue: values[name],
    id,
    name,
    required: true,
  });

  return (
    <form
      action={formAction}
      aria-label="Contact form"
      noValidate
      className="mx-auto mt-8 max-w-6xl"
    >
      <div className="flex flex-col gap-6">
        <fieldset>
          <legend>Name</legend>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel htmlFor="first-name" small>
                First Name
              </FieldLabel>
              <input
                {...fieldProps("firstName", "first-name")}
                autoComplete="given-name"
              />
              <FieldError id="first-name-error" error={errors.firstName} />
            </div>
            <div>
              <FieldLabel htmlFor="last-name" small>
                Last Name
              </FieldLabel>
              <input
                {...fieldProps("lastName", "last-name")}
                autoComplete="family-name"
              />
              <FieldError id="last-name-error" error={errors.lastName} />
            </div>
          </div>
        </fieldset>
        <div>
          <FieldLabel htmlFor="email">Email Address</FieldLabel>
          <input
            {...fieldProps("email", "email")}
            type="email"
            autoComplete="email"
          />
          <FieldError id="email-error" error={errors.email} />
        </div>
        <div>
          <FieldLabel htmlFor="subject">Subject</FieldLabel>
          <input {...fieldProps("subject", "subject")} />
          <FieldError id="subject-error" error={errors.subject} />
        </div>
        <div>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <textarea {...fieldProps("message", "message")} rows={4} />
          <FieldError id="message-error" error={errors.message} />
        </div>
        <div aria-hidden="true" className="sr-only">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="button-outline self-start"
        >
          {pending ? "Sending…" : "Submit"}
        </button>
        <div aria-live="polite">
          {state.status === "success" && <p>Thanks! Your message was sent.</p>}
          {state.status === "error" && state.errors && (
            <p className="text-red-700">Please fix the highlighted fields.</p>
          )}
          {state.status === "error" && !state.errors && (
            <p className="text-red-700">
              Your message couldn&apos;t be sent. Please try again, or email{" "}
              <a href={`mailto:${site.email}`} className="underline">
                {site.email}
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
