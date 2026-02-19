import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRegisterMutation } from "@/hooks/useAuthMutations";
import {
  errorText,
  fieldGroup,
  form,
  helperText,
  input,
  label,
  submitButton,
} from "./AuthForm.styles";

const signUpSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignUpValues = z.infer<typeof signUpSchema>;

const SignUpSection = () => {
  const { mutate: registerUser, isPending, error } = useRegisterMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignUpValues) => {
    registerUser(values);
  };

  return (
    <form className={form()} onSubmit={handleSubmit(onSubmit)}>
      <p className={helperText()}>
        Create your account to save your profile details.
      </p>

      <div className={fieldGroup()}>
        <label className={label()} htmlFor="signup-username">
          Username
        </label>
        <input
          className={input()}
          id="signup-username"
          {...register("username")}
        />
        {errors.username ? (
          <p className={errorText()}>{errors.username.message}</p>
        ) : null}
      </div>

      <div className={fieldGroup()}>
        <label className={label()} htmlFor="signup-email">
          Email
        </label>
        <input className={input()} id="signup-email" {...register("email")} />
        {errors.email ? (
          <p className={errorText()}>{errors.email.message}</p>
        ) : null}
      </div>

      <div className={fieldGroup()}>
        <label className={label()} htmlFor="signup-password">
          Password
        </label>
        <input
          className={input()}
          id="signup-password"
          type="password"
          {...register("password")}
        />
        {errors.password ? (
          <p className={errorText()}>{errors.password.message}</p>
        ) : null}
      </div>

      {error ? <p className={errorText()}>{error.message}</p> : null}

      <button
        aria-label="Create account"
        className={submitButton()}
        type="submit"
      >
        {isPending ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
};

export default SignUpSection;
