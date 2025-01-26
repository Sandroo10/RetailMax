import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../Button.component/Button";
import { buttonTypes } from "../Button.component/button-types";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useSignIn } from "../../components/Query/signIn";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .nonempty({ message: "Password is required" }),
});
interface SignInFormProps {
  onSuccess: () => void; // Add the onSuccess prop
}

const SignInForm: React.FC<SignInFormProps> = ({ onSuccess }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isError, error, isPending } = useSignIn();

  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values, {
      onSuccess: () => {
        // Trigger the onSuccess callback when sign-in is successful
        onSuccess();
      },
    });
  }

  return (
    <div className="max-w-[500px] mx-auto">
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>
      <h2>
        Don't Have one?{" "}
        <Link to="/auth" className="font-bold">
          Sign up
        </Link>{" "}
        Here{" "}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col items-center space-y-6 max-w-s *:w-full px-2 w-full dark:text-white"
        >
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="relative my-10">
                    <FormControl>
                      <input
                        type="text"
                        className={`bg-white text-black text-lg py-2 px-1 w-full border-b border-gray-400 focus:outline-none focus:border-black`}
                        {...field}
                      />
                    </FormControl>
                    <FormLabel
                      className={`absolute left-1 top-2 text-gray-500 text-lg transition-all ease-linear ${
                        !!field.value && field.value.toString().length > 0
                          ? "-top-4 text-sm text-black"
                          : ""
                      }`}
                    >
                      Email
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="relative my-10">
                    <FormControl>
                      <input
                        type="password"
                        className="bg-white text-black text-lg py-2 px-1 w-full border-b border-gray-400 focus:outline-none focus:border-black tracking-[0.3em]"
                        {...field}
                      />
                    </FormControl>
                    <FormLabel
                      className={`absolute left-1 top-2 text-gray-500 text-lg transition-all ease-linear ${
                        !!field.value && field.value.toString().length > 0
                          ? "-top-4 text-sm text-black"
                          : ""
                      }`}
                    >
                      Password
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-around">
            <Button type="submit">Sign In</Button>
            <Button type="button" btnType={`${buttonTypes.google}`}>
              Google Sign In
            </Button>
          </div>
        </form>
        {isError && (
          <p className="text-red-500">Login failed: {String(error)}</p>
        )}
        {isPending && (
          <h1 className="m-auto text-center text-lg">Signing you in...</h1>
        )}
      </Form>
    </div>
  );
};

export default SignInForm;
