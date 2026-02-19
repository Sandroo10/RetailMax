import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslation } from "react-i18next";
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

const createSignInSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t("auth.emailInvalid")),
    password: z.string().min(8, t("auth.passwordMin")),
  });

type SignInValues = z.infer<ReturnType<typeof createSignInSchema>>;

const SignInSection = () => {
  const { t } = useTranslation();
  const { mutate: signIn, isPending, error } = useSignInMutation();
  const signInSchema = createSignInSchema(t);

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
      <p className={helperText()}>{t("auth.signInHelper")}</p>

      <div className={fieldGroup()}>
        <label className={label()} htmlFor="signin-email">
          {t("auth.email")}
        </label>
        <input className={input()} id="signin-email" {...register("email")} />
        {errors.email ? (
          <p className={errorText()}>{errors.email.message}</p>
        ) : null}
      </div>

      <div className={fieldGroup()}>
        <label className={label()} htmlFor="signin-password">
          {t("auth.password")}
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

      <button
        aria-label={t("auth.signInSubmitAria")}
        className={submitButton()}
        type="submit"
      >
        {isPending ? t("auth.signingIn") : t("auth.signInTab")}
      </button>
    </form>
  );
};

export default SignInSection;
