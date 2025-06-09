"use client";
import Image from "next/image";
import DisplayImage from "../../../public/assets/auth/zazu.webp";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import LoginForm from "@/app/components/auth/Login";
import callApi from "@/services/apiService";
import { createClient } from "@/utils/supabase/client";

interface FormTypes {
  email: string;
  password: string;
}

function login() {
  const router = useRouter();
  const supabase = createClient();

  const login = useMutation({
    mutationFn: async (form: { values: FormTypes }) => {
      const response = await callApi.post("/auth/login", form.values);
      return response.data; // Extract only the data from the response
    },
    onSuccess: async (data) => {
      if (data.session) {
        // Store session in Supabase auth (important for middleware detection)
        await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });

        // Reload the page to sync session cookies
        window.location.reload();
      } else {
        console.error("Session data missing from response");
      }
    },
    onError: (err: Error) => {
      console.log(err.message);
    },
  });

  return <LoginForm login={login} />;
}

export default login;
