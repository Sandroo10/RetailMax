import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../Button.component/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useRegister } from "../../components/Query/register";

const formSchema = z.object({
  username: z.string().nonempty({ message: "Username is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .nonempty({ message: "Password is required" }),
});

const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutate: register, isError, error, isPending } = useRegister();

  function onSubmit(values: z.infer<typeof formSchema>) {
    register(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col items-center space-y-6 max-w-xs *:w-full px-2 w-full dark:text-white"
      >
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Username </FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Register</Button>
        <FormDescription>
          <div className="flex justify-center gap-2">
            <h1 className="text-sm text-gray-600 dark:text-gray-500">
              Already have an account?
            </h1>
            <a
              className="text-sm text-purple-900 font-semibold hover:underline cursor-pointer"
              href="/"
            >
              Go back to home and log in
            </a>
          </div>
        </FormDescription>
        {isError && (
          <p className="text-red-500">Sign Up failed: {String(error)}</p>
        )}
        {isPending && (
          <h1 className="m-auto text-center text-lg">Signing you up...</h1>
        )}
      </form>
    </Form>
  );
};

export default RegisterForm;
