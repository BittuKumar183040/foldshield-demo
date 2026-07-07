"use client";

import { useState, ChangeEvent, FormEvent, ReactNode, JSX } from "react";
import axios from "axios";
import GradientLabel from "../components/GradientLabel";
import Button from "../components/Button";
import FloatingField from "../contact/FloatingField";
import FloatingTextarea from "../contact/FloatingTextarea";
import { Pages } from "../config/pages";

type FormState = {
  name: string;
  email: string;
  interest: string;
  project: string;
  message: string;
};

type Status = "idle" | "loading" | "success";

type FieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

const interestOptions = ["Product Demo", "Early Access", "Partnership", "Investment", "General Inquiry"] as const;

const infoStats = [
  {
    label: "Product Demo",
    desc: "Requested for Showcase the product Demo.",
  },
  {
    label: "Early Access",
    desc: "Priority onboarding for researchers and development partners",
  },
  {
    label: "Partnership",
    desc: "Co-development, integration, and institutional collaboration",
  },
  {
    label: "Investment",
    desc: "Strategic funding and venture engagement inquiries",
  },
] as const;

export default function ProjectInterestSection( { project="FOLDSHIELD++" } : {project: string}): JSX.Element {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    interest: "Product Demo",
    project: project,
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const err: Partial<FormState> = {};

    if (!form.name.trim()) err.name = "Name is required";

    if (!form.email.trim()) {
      err.email = "Enter a valid email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      err.email = "Enter a valid email";
    }

    if (!form.interest) err.interest = "Please select an interest";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setStatus("loading");

      await axios.post("/api/send-mail", {
        name: form.name,
        email: form.email,
        subject: `Product Interest: ${form.project} (${form.interest})`,
        phone: "N/A",
        message: `Project: ${form.project}\nInterest: ${form.interest}\n\nMessage:\n${form.message || "N/A"
          }`,
      });

      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("idle");
    }
  };

  const resetForm = (): void => {
    setForm({
      name: "",
      email: "",
      interest: "Product Demo",
      project: project,
      message: "",
    });
    setErrors({});
    setStatus("idle");
  };

  const inputClass =
    "w-full px-3 py-2 rounded text-sm outline-none transition-colors " +
    "bg-black/5 dark:bg-white/5 " +
    "border border-black/10 dark:border-white/10 " +
    "text-black dark:text-white " +
    "focus:border-black/30 dark:focus:border-white/30";

  return (
    <section className="transition-colors relative px-2.5 md:px-2.5 lg:px-25 gap-10 flex-wrap-reverse justify-between w-full duration-300 grid grid-cols-1 md:grid-cols-2 py-16">
      <div>
        <GradientLabel label="PROJECT INTEREST/DEMO" />

        <h2 className="text-2xl font-light my-4">
          Register your interest in our platforms
        </h2>

        <p className="text-sm text-black/60 dark:text-white/50 leading-relaxed mb-6">
          {Pages[0].desc}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
            <span
              className="text-xs px-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/50"
            >{project}
            </span>
        </div>

        <div className="h-px bg-black/10 dark:bg-white/10 mb-6" />

        <div className="space-y-4">
          {infoStats.map((s) => (
            <div key={s.label} className=" pt-3">
              <p className="text-sm text-black/80 dark:text-white/80">{s.label}</p>
              <p className="text-xs text-black/50 dark:text-white/40">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        {status === "success" ? (
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-black/40 dark:text-white/40">
              Interest Received
            </p>

            <h3 className="text-xl font-light">Thank you for reaching out</h3>

            <p className="text-sm text-black/60 dark:text-white/50">
              Your interest in <strong>{form.project}</strong> has been submitted.
            </p>

            <div className="flex gap-3 mt-4">
              <button onClick={resetForm} className="px-4 py-2 border border-black/20 dark:border-white/20 text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white">
                Submit Another
              </button>

              <Button label="Go Back" onClick={() => window.history.back()}/>

            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={`space-y-4 ${status === "loading" ? "opacity-50 pointer-events-none" : ""}`}
          >
            <FloatingField
              id="name"
              label="Name"
              type="text"
              value={form.name}
              onChange={(val) => handleChange("name", val)}
            />
            <FloatingField
              id="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={(val) => handleChange("email", val)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Field label="Interest" error={errors.interest}>
                <select defaultValue={interestOptions[0]} className={`${inputClass} bg-white dark:bg-black text-black dark:text-white`}
                  value={form.interest}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange("interest", e.target.value)}
                >
                  {interestOptions.map((o) => (
                    <option
                      key={o}
                      value={o}
                      className="bg-white text-black dark:bg-black dark:text-white"
                    >
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="form-field">
              <FloatingTextarea
                value={form.message}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  handleChange("message", e.target.value)
                }
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center flex-wrap gap-4 pt-2">
              <p className="text-xs text-black/50 dark:text-white/40">
                Response within 1–2 business days
              </p>
              <Button type="submit" label={status === "loading" ? "Submitting..." : "Submit"} />
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({ label, error, children }: FieldProps): JSX.Element {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-black/40 dark:text-white/40">{label}</label>
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}