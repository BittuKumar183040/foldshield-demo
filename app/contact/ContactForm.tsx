"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import axios from "axios";
import Button from "../components/Button";
import FloatingField from "./FloatingField";
import FloatingTextarea from "./FloatingTextarea";

export type FormData = {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  message: string;
};

const initForm: FormData = {
  name: "",
  email: "",
  countryCode: "+1",
  phone: "",
  message: "",
};

type Status = "idle" | "loading" | "success";

const ContactForm = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [formData, setFormData] = useState<FormData>(initForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".form-field", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      });
    }, formRef);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // if (!formData.phone.trim()) {
    //   newErrors.phone = "Phone number is required";
    // } else if (!/^[0-9]{6,15}$/.test(formData.phone)) {
    //   newErrors.phone = "Invalid phone number";
    // }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (id: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: undefined }));
  };

  const handleSubmit = async () => {
    const isValid = validate();
    if (!isValid) return;

    try {
      setStatus("loading");

      const fullPhone = `${formData.countryCode}${formData.phone}`;

      await axios.post("/api/send-mail", {
        name: formData.name,
        email: formData.email,
        phone: fullPhone,
        message: formData.message,
      });

      setStatus("success");
    } catch (error) {
      console.error("Error:", error);
      setStatus("idle");
    }
  };

  const handleReset = () => {
    setFormData(initForm);
    setErrors({});
    setStatus("idle");
  };

  useEffect(() => {
    if (!overlayRef.current) return;

    if (status === "loading") {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    }
  }, [status]);

  return (
    <div ref={formRef} className="relative">
      {status !== "success" && (
        <>
          <p className="text-[10px] tracking-widest text-gray-400 uppercase mb-8">
            Fill in the details below, and our team will get back to you
          </p>

          <div className={`${status === "loading" ? "opacity-10" : ""} space-y-6`}>
            <div className="form-field">
              <FloatingField
                id="name"
                label="Your Name"
                type="text"
                value={formData.name}
                onChange={(value) => handleChange("name", value)}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="form-field">
              <FloatingField
                id="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(value) => handleChange("email", value)}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="form-field flex w-full gap-4">
              <FloatingField
                id="countryCode"
                label="Code"
                type="select"
                value={formData.countryCode}
                onChange={(value) => handleChange("countryCode", value)}
              />

              <div className="flex-1">
                <FloatingField
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(value) => handleChange("phone", value)}
                />
              </div>
            </div>

            <div className="form-field">
              <FloatingTextarea
                value={formData.message}
                onChange={(e) =>
                  handleChange("message", e.target.value)
                }
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          <div className="form-field flex justify-end mt-8">
            <Button
              label={status === "loading" ? "Sending..." : "Submit"}
              onClick={handleSubmit}
            />
          </div>
        </>
      )}

      {status === "loading" && (
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/10 flex items-center justify-center z-50"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-cyan-400 text-sm tracking-wide">
              Sending your request...
            </p>
          </div>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center gap-4 justify-center py-20 text-center">
          <h2 className="text-cyan-400 text-xl">
            Request Submitted Successfully
          </h2>

          <p className="text-gray-400 text-sm mb-6 max-w-sm">
            Thank you for reaching out. Our team will get back to you shortly.
          </p>

          <button
            onClick={handleReset}
            className="px-10 py-2 border border-cyan-400 text-cyan-400 hover:bg-gray-400 hover:text-gray-300 transition"
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactForm;