import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslation } from "react-i18next";
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

const createSignUpSchema = (t: (key: string) => string) =>
  z.object({
    username: z.string().min(1, t("auth.usernameRequired")),
    email: z.string().email(t("auth.emailInvalid")),
    password: z.string().min(8, t("auth.passwordMin")),
  });

type SignUpValues = z.infer<ReturnType<typeof createSignUpSchema>>;

const SignUpSection = () => {
  const { t } = useTranslation();
  const { mutate: registerUser, isPending, error } = useRegisterMutation();
  const signUpSchema = createSignUpSchema(t);

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
        {t("auth.signUpHelper")}
      </p>

      <div className={fieldGroup()}>
        <label className={label()} htmlFor="signup-username">
          {t("auth.username")}
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
          {t("auth.email")}
        </label>
        <input className={input()} id="signup-email" {...register("email")} />
        {errors.email ? (
          <p className={errorText()}>{errors.email.message}</p>
        ) : null}
      </div>

      <div className={fieldGroup()}>
        <label className={label()} htmlFor="signup-password">
          {t("auth.password")}
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
        aria-label={t("auth.createAccountAria")}
        className={submitButton()}
        type="submit"
      >
        {isPending ? t("auth.creatingAccount") : t("auth.createAccount")}
      </button>
    </form>
  );
};

export default SignUpSection;
