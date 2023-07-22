"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { useLoginModal } from "@/hooks/useLoginModal";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long.",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&).",
      }
    ),
    enterprise:z.string().min(4,{
      message:"Enterprise name must be at least 4 letters long"
    }).regex(/^[A-Za-z]+$/, {
      message:"Enterprize name must contain only letters from English Alphabet"
    }),
});

export const RegisterModal = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:"",
      enterprise:"",
    },
  });

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const onToggle = () => {
    loginModal.onOpen();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    if (!registerModal.isOpen) {
      return null;
    }
  };
  return (
    <Modal
      title="Register"
      description="Create an account on Checkout Sellers"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
    >
      <div>
        <div className="space-y-4 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email address" {...field} />
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
                      <Input placeholder="Password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="enterprise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enterprise Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enterprise Name" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button variant="outline" onClick={registerModal.onClose}>
                  Cancel
                </Button>
                <Button type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="text-neutral-400 text-center mt-4">
          <p>
            First time using Checkout Sellers?{" "}
            <span
              className="text-neutral-800 hover:text-black cursor-pointer hover:underline"
              onClick={onToggle}
            >
              Regsiter
            </span>
          </p>
        </div>
      </div>
    </Modal>
  );
};
