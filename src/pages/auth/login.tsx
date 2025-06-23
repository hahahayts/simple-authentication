import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../../schemas/auth";
import { useAuth } from "../../contexts/authContext";
import type { FormDataLogin } from "../../types";

export const LoginPage = () => {
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

  const { login } = useAuth();

  const handleLoginSubmit = (data: FormDataLogin) => {
    login(data);
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
    </div>
  );
};
