import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoginCover from "../../public/assets/auth/logincover.jpg";
import GoogleLogo from "../../public/assets/auth/google.png";
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

const validateEmail = (email: string) => {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const LoginForm = ({ login }: { login: any }) => {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [generalError, setGeneralError] = useState<string>("");

  // Check auth state on component mount and URL changes
  useEffect(() => {
    const handleAuthStateChange = async () => {
      setIsLoading(true);
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (session) {
        window.location.href = "/";
        return;
      }
      setIsLoading(false);
    };
    handleAuthStateChange();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: any, session: any) => {
        if (event === "SIGNED_IN" && session) {
          window.location.href = "/";
        }
      }
    );
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [router, supabase]);

  const googleLoginMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      if (data && data.url) {
        window.location.href = data.url;
      }
    },
    onError: (err: Error) => {
      console.error("Google login error:", err.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setGeneralError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate
    const newErrors: { email?: string; password?: string } = {};
    if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      login.mutate(
        { values: form },
        {
          onError: (err: Error) => {
            setGeneralError(err.message || "Login failed");
          },
        }
      );
    }
  };

  if (isLoading || googleLoginMutation.isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="inline-block w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 sm:p-10 flex flex-col gap-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
          Sign in to your account
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-base font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-base transition"
              placeholder="you@example.com"
              required
              autoFocus
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-base font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-base transition"
              placeholder="••••••••"
              required
            />
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>
          {generalError && (
            <div className="text-red-500 text-sm text-center">
              {generalError}
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-lg font-semibold text-base shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
            disabled={login.isPending}
          >
            {login.isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
