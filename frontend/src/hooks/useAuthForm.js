import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";

export const useAuthForm = (type = "login") => {
  const [form, setForm] = useState(
    type === "login" ? { email: "", password: "" } : { username: "", email: "", password: "" }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e, onSuccess) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = type === "login" ? await loginUser(form) : await registerUser(form);

      if (response?.success) {
        onSuccess?.();
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    error,
    handleChange,
    handleSubmit,
  };
};
