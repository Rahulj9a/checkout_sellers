"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {toast} from "react-hot-toast"

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
import { useLoginModal } from "@/hooks/useLoginModal";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

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
});



export const LoginModal = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setisLoading] = useState(false)
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setisLoading(true)
      await signIn("credentials", values);
      toast.success("Login Successfull")
      loginModal.onClose();
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setisLoading(false);
    }
  };
   

  return (
    <Modal
      title="Login"
      description="Login to your existing account"
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
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
                      <Input disabled={isLoading} placeholder="Your Email" type="email" {...field} />
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
                      <Input
                      disabled={isLoading}
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end">
                 
                <Button disabled={isLoading} type="submit">Login</Button>
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
