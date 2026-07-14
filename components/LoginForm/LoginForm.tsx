"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  async function login(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error.message);
      return;
    }

    router.refresh();
    router.push("/");
  }

  return (
    <>
      <form
        onSubmit={login}
        className="border p-3 w-2/6 rounded-2xl flex flex-col gap-3"
      >
        <h1 className="text-3xl font-extrabold text-center">Login</h1>

        <div className="my-6 space-y-6">
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border w-full p-1 rounded"
              placeholder="exemplo@gmail.com"
              required
            />
          </div>

          <div>
            <label htmlFor="pass">Senha</label>
            <input
              id="pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border w-full p-1 rounded"
              placeholder="senha"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="border py-1 px-2 cursor-pointer hover:bg-[#201f1f94]"
        >
          Entrar
        </button>
      </form>
    </>
  );
}
