"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
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
import { useCallback, useEffect, useState } from "react";
 

import axios from "axios";
import { signIn } from "next-auth/react";
interface RegsiterModalProps {
  refetch: () => void; // Assuming refetch is a function that doesn't take any arguments and returns void
}

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
  enterprise: z
    .string()
    .min(4, {
      message: "Enterprise name must be at least 4 letters long",
    })
    .regex(/^[A-Za-z]+$/, {
      message:
        "Enterprize name must contain only letters from English Alphabet",
    }),
});

export const RegisterModal: React.FC<RegsiterModalProps> = ({ refetch }) => {
   
 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      enterprise: "",
    },
  });

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const onToggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const [isLoading, setisLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setisLoading(true);

      await axios.post("/api/register", values);

      signIn("credentials", values);
      toast.success("Account created");
     /*  refetch(); */
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setisLoading(false);
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
                      <Input
                        disabled={isLoading}
                        placeholder="Email address"
                        {...field}
                      />
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
              <FormField
                control={form.control}
                name="enterprise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enterprise Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enterprise Name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button disabled={isLoading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="text-neutral-400 text-center mt-4">
          <p>
            Already registered?{" "}
            <span
              className="text-neutral-800 hover:text-black cursor-pointer hover:underline"
              onClick={onToggle}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </Modal>
  );
};
