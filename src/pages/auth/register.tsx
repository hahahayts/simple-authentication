import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../../schemas/auth";
import { useState } from "react";
import type { FormDataRegister } from "../../types";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [error, setError] = useState<string | null>(null);

  const handleRegisterSubmit = async (data: FormDataRegister) => {
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.log("API Error:", result.message || response.statusText);
        setError(result.message || response.statusText);
        return;
      }

      setError("You have successfully registered! Please login now.");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Register Page</h1>
      {/* Add registration form or components here */}
      <form onSubmit={handleSubmit(handleRegisterSubmit)}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            {...register("username")}
            type="text"
            id="username"
            name="username"
            required
          />
        </div>
        {errors.username && <p className="error">{errors.username.message}</p>}
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
        {errors.email && <p className="error">{errors.email.message}</p>}

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
        {errors.password && <p className="error">{errors.password.message}</p>}

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
          />
        </div>
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )}

        <button type="submit">Register</button>
      </form>

      <div>
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <p>There's no error occured</p>
        )}
      </div>
    </div>
  );
};
