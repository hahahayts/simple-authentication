import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../../schemas/auth";
import type { FormDataLogin } from "../../types";
import { useState } from "react";
import { API_BASE_URL } from "../../constants";

export const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (data: FormDataLogin) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
        body: JSON.stringify(data),
      });

      const result = await response.json();

      console.log(result);

      if (!response.ok) {
        console.log("API Error:", result.message || response.statusText);
        setError(result.message || response.statusText);
        return;
      }
      setError(`You have successfully logged in!", ${result.user.username}`);
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error (e.g., show a notification or alert)
    }
  };
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            {...register("email")}
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        {errors.email && <p>{errors.email.message}</p>}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            {...register("password")}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};
