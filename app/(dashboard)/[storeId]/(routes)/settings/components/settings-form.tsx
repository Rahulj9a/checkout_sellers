"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import React, { useState } from "react";
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
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import axios from "axios";
import { redirect, useParams, useRouter } from "next/navigation";
import useGetStores from "@/hooks/useGetStores";
import AlertModal from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/apiAlert";
import { useOrigin } from "@/hooks/useOrigin";

const formSchema = z.object({
  name: z.string().min(2),
});

type SettingFormValues = z.infer<typeof formSchema>;

interface SettingsFormProps {
  initialData: Store;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();
  const { refetch } = useGetStores();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const origin = useOrigin()

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingFormValues) => {
    try {
      setloading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      refetch();
      toast.success("Store Updated");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setloading(false);
    }
  };
  const onDelete = async () => {
    try {
      setloading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
    router.refresh()
      toast.success("Store Deleted");
       
    } catch (error) {
      toast.error("Make sure you removed all products and categories first.");
    } finally {
      setloading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        loading={loading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
      />
      <div className="flex items-center justify-between  ">
        <Heading title="Settings" description="Manage Store Preferences" />

        <Button
          disabled={loading}
          variant="destructive"
          size="icon"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
      <Separator/>
      <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${params.storeId}`} variant="public"/>
    </>
  );
};

export default SettingsForm;
