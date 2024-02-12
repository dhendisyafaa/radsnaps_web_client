"use client";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useDecodedToken } from "@/hooks/useDecodedToken";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePostImage } from "../api/resolver/imageResolver";

export default function PostingNewImage() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const { mutateAsync: postImage } = usePostImage();
  const { user_id } = useDecodedToken();
  const formSchema = z.object({
    image_title: z.string().min(2).max(50),
    image_description: z.string().min(2),
    tags: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image_title: "",
      image_description: "",
      tags: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = {
        ...values,
        album_id: 1,
        owner_id: user_id,
        data_image: selectedFile,
      };

      await postImage(data);
      toast({
        title: "Yeah, berhasil login!",
        description: "Anda akan langsung diarahkan ke halaman gallery",
      });
      push("/gallery?filter=trending");
    } catch (error) {
      console.log("error:", error);
      if (error.response) {
        toast({
          variant: "destructive",
          title: `${
            error.response?.data?.message || "Failed to upload images"
          }`,
        });
      }
    }
  }

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedFile ? (
            <div className="relative min-h-[50vh] md:min-h-screen max-h-screen border rounded-lg">
              <div className="absolute bottom-3 right-3 z-10">
                <FormField
                  control={form.control}
                  name="data_image"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...rest}
                          accept="image/*"
                          name="data_image"
                          type="file"
                          disabled={form.formState.isSubmitting}
                          onChange={onSelectFile}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Image
                src={preview}
                alt="test"
                fill={true}
                quality={10}
                className="object-contain"
              />
            </div>
          ) : (
            <FormField
              control={form.control}
              name="data_image"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        {...rest}
                        accept="image/*"
                        name="data_image"
                        type="file"
                        disabled={form.formState.isSubmitting}
                        onChange={onSelectFile}
                      />
                    </FormControl>
                    <FormLabel className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md text-xs font-medium text-center py-1 px-3">
                      Choose Image
                    </FormLabel>
                  </div>
                  <FormDescription>
                    Photos should have their own stories and memories
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div>
            <FormField
              control={form.control}
              name="image_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Historical Alnwick Castle" {...field} />
                  </FormControl>
                  <FormDescription>
                    Title image must match the selected image
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Describe the image you chose
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Castle, Historical, England"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Separate tags with a comma. Ex: market, food
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full md:w-fit md:absolute md:-top-4 md:right-5 z-50"
        >
          Posting
        </Button>
        <div>
          <p className="text-center text-xs text-muted-foreground">
            The title and tags you give to this photo will determine the image
            search results
          </p>
        </div>
      </form>
    </Form>

    // <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    // <div className="relative min-h-[50vh] md:min-h-screen max-h-screen border rounded-lg">
    //   <Image
    //     // src="https://images.unsplash.com/photo-1514539079130-25950c84af65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FzdGxlfGVufDB8fDB8fHww"
    //     src="https://images.unsplash.com/photo-1571504211935-1c936b327411?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzdGxlfGVufDB8fDB8fHww"
    //     alt="test"
    //     fill={true}
    //     quality={10}
    //     className="object-contain"
    //   />
    // </div>
    //   <div>
    //     <Form {...form}>
    //       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    //         <FormField
    //           control={form.control}
    //           name="image_title"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Image Title</FormLabel>
    //               <FormControl>
    //                 <Input placeholder="Historical Alnwick Castle" {...field} />
    //               </FormControl>
    //               <FormDescription>
    //                 Title image must match the selected image
    //               </FormDescription>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />
    //         <FormField
    //           control={form.control}
    //           name="image_description"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Image Description</FormLabel>
    //               <FormControl>
    //                 <Textarea {...field} />
    //               </FormControl>
    //               <FormDescription>
    //                 Describe the image you chose
    //               </FormDescription>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />
    //         <FormField
    //           control={form.control}
    //           name="tags"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Tags</FormLabel>
    //               <FormControl>
    //                 <Input
    //                   placeholder="Castle, Historical, England"
    //                   {...field}
    //                 />
    //               </FormControl>
    //               <FormDescription>
    //                 Separate tags with a comma. Ex: market, food
    //               </FormDescription>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />
    //         <Button
    //           type="submit"
    //           variant={"default"}
    //           className="absolute -top-3 right-5 z-50"
    //         >
    //           Posting
    //         </Button>
    //         <div>
    //           <p className="text-center text-xs text-muted-foreground">
    //             The title and tags you give to this photo will determine the
    //             image search results
    //           </p>
    //         </div>
    //       </form>
    //     </Form>
    //   </div>
    // </div>
  );
}
