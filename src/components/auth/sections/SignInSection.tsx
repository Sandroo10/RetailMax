import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSignInMutation } from "@/hooks/useAuthMutations";
import {
  errorText,
  fieldGroup,
  form,
  helperText,
  input,
  label,
  submitButton,
} from "./AuthForm.styles";

const signInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignInValues = z.infer<typeof signInSchema>;

const SignInSection = () => {
  const { mutate: signIn, isPending, error } = useSignInMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInValues) => {
    signIn(values);
  };

  return (
    <form className={form()} onSubmit={handleSubmit(onSubmit)}>
      <p className={helperText()}>Use your account credentials to continue.</p>

      <div className={fieldGroup()}>
        <label className={label()} htmlFor="signin-email">
          Email
        </label>
        <input className={input()} id="signin-email" {...register("email")} />
        {errors.email ? (
          <p className={errorText()}>{errors.email.message}</p>
        ) : null}
      </div>

      <div className={fieldGroup()}>
        <label className={label()} htmlFor="signin-password">
          Password
        </label>
        <input
          className={input()}
          id="signin-password"
          type="password"
          {...register("password")}
        />
        {errors.password ? (
          <p className={errorText()}>{errors.password.message}</p>
        ) : null}
      </div>

      {error ? <p className={errorText()}>{error.message}</p> : null}

      <button aria-label="Sign in" className={submitButton()} type="submit">
        {isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

export default SignInSection;
