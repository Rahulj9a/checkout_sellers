"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Category, Color, Image, Product, Size } from "@prisma/client";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import AlertModal from "@/components/modals/alert-modal";

import ImageUpload from "@/components/ui/imageUpload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(2),
  image: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),


});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData?: Product & { image: Image[] }
  categories:Category[]
  sizes:Size[]
  colors:Color[]
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, categories, sizes, colors }) => {
  const params = useParams();

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);


  const title = initialData ? "Edit product" : "Add product"
  const description = initialData ? "Edit a product" : "Add a new product"
  const toastMessage = initialData ? "Product Updated" : "Product Created"
  const action = initialData ? "Save Changes" : "Create"
   

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
   
    defaultValues: initialData ? {...initialData, price:parseFloat(String(initialData?.price))} : {
      name: '',
      image: [],
      price: 0,
      categoryId: '',
      colorId: '',
      sizeId: '',
      isFeatured: false,
      isArchived: false,


    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setloading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data)
      } else {
        await axios.post(`/api/${params.storeId}/products`, data)
      }
      router.refresh();
      router.push(`/${params.storeId}/products`)
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setloading(false);
    }
  };
  const onDelete = async () => {
    try {
      setloading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`)

      toast.success("Product Deleted");

    } catch (error) {
      toast.error("Soemthing went wrong");
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
        <Heading title={title} description={description} />

        {initialData && <Button
          disabled={loading}
          variant="destructive"
          size="icon"
          onClick={() => {
            setOpen(true);
          }
          }

        >
          <Trash className="w-4 h-4" />
        </Button>}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload value={field.value.map((eachImage)=>eachImage.url)} disabled={loading} onChange={(url) => field.onChange([...field.value, {url}])} onRemove={(url) => field.onChange([...field.value.filter((current)=>current.url!==url)])} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product Label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                   <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                     <FormControl>
                      <SelectTrigger>
                          <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a Category"
                          />
                      </SelectTrigger>
                     </FormControl>
                     <SelectContent>
                      {categories.map((category)=>(
                         <SelectItem key={category.id} value={category.id}>
                          {category.name}
                         </SelectItem>
                      ))}
                     </SelectContent>
                   </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                   <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                     <FormControl>
                      <SelectTrigger>
                          <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a size"
                          />
                      </SelectTrigger>
                     </FormControl>
                     <SelectContent>
                      {sizes.map((size)=>(
                         <SelectItem key={size.id} value={size.id}>
                          {size.name}
                         </SelectItem>
                      ))}
                     </SelectContent>
                   </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                   <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                     <FormControl>
                      <SelectTrigger>
                          <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a color"
                          />
                      </SelectTrigger>
                     </FormControl>
                     <SelectContent>
                      {colors.map((color)=>(
                         <SelectItem key={color.id} value={color.id}>
                          <div className="flex gap-x-4 items-center">
                          {color.name}
                          <div className="border p-4 rounded-full" style={{backgroundColor:color.value}}/>
                          </div>
                         
                         </SelectItem>
                      ))}
                     </SelectContent>
                   </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row item-start space-x-3 space-y-0 rounded-md border p-4">
                   <FormControl>
                    <Checkbox 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                   </FormControl>
                   <div className="space-y-1 leading-none">
                        <FormLabel>
                          Featured
                        </FormLabel>
                        <FormDescription>
                          This product will appear on home page
                        </FormDescription>
                   </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row item-start space-x-3 space-y-0 rounded-md border p-4">
                   <FormControl>
                    <Checkbox 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                   </FormControl>
                   <div className="space-y-1 leading-none">
                        <FormLabel>
                          Archived
                        </FormLabel>
                        <FormDescription>
                          This product will not appear anywhere on store 
                        </FormDescription>
                   </div>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />

    </>
  );
};

export default ProductForm