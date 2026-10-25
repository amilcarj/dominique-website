export interface ContactFields {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export interface ContactState {
  status: "idle" | "success" | "error";
  errors?: ContactErrors;
  values?: ContactFields;
}

const maxLengths: Record<keyof ContactFields, number> = {
  email: 254,
  firstName: 100,
  lastName: 100,
  message: 5000,
  subject: 200,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function readContactFields(formData: FormData): ContactFields {
  const read = (name: keyof ContactFields) =>
    String(formData.get(name) ?? "").trim();
  return {
    email: read("email"),
    firstName: read("firstName"),
    lastName: read("lastName"),
    message: read("message"),
    subject: read("subject"),
  };
}

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  for (const name of Object.keys(maxLengths) as (keyof ContactFields)[]) {
    const value = fields[name];
    if (!value) {
      errors[name] = "This field is required.";
    } else if (value.length > maxLengths[name]) {
      errors[name] = `Keep this under ${maxLengths[name]} characters.`;
    } else if (name === "email" && !emailPattern.test(value)) {
      errors[name] = "Enter a valid email address.";
    }
  }
  return errors;
}
