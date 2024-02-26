"use client";
import LoadingOval from "@/components/common/loader/LoadingOval";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useUserData } from "@/hooks/useUserData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Replace } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import prettyBytes from "pretty-bytes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePostImage } from "../api/resolver/imageResolver";

export default function PostingNewImage() {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const { mutateAsync: postImage, isPending } = usePostImage();
  const { user_id } = useUserData();
  const { toast } = useToast();
  const { push } = useRouter();

  const formSchema = z.object({
    image_title: z.string().min(2).max(100, {
      message: "Image title maximum 100 characters",
    }),
    image_description: z.string().min(2).max(500, {
      message: "Image description maximum 500 characters",
    }),
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
      const responseUpload = await postImage(data);
      toast({
        title: "Successfully uploaded your photo!",
        description:
          "Make sure your photos can be searched by users according to the tags you provide",
      });
      push(`/gallery/detail/${responseUpload?.data?.data.id}`);
      form.reset();
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

  const isSubmitting = form.formState.isSubmitting;

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
                      <FormLabel className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full text-xs [&_svg]:h-5 [&_svg]:w-5 font-medium text-center py-2 px-3 cursor-pointer flex items-center gap-2">
                        <Replace />
                        Change image
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="hidden"
                          accept="image/*"
                          name="data_image"
                          type="file"
                          disabled={form.formState.isSubmitting || isPending}
                          onChange={onSelectFile}
                          {...rest}
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
                        disabled={form.formState.isSubmitting || isPending}
                        onChange={onSelectFile}
                      />
                    </FormControl>
                    <FormLabel className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full text-xs font-medium text-center py-1 px-3 cursor-pointer">
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
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="image_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Historical Alnwick Castle"
                      disabled={form.formState.isSubmitting || isPending}
                      {...field}
                    />
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
                    <Textarea
                      disabled={form.formState.isSubmitting || isPending}
                      {...field}
                    />
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
                      disabled={form.formState.isSubmitting || isPending}
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
            {selectedFile !== undefined ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Image information</CardTitle>
                  <CardDescription>
                    information of the image you selected
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-foreground">
                  <p>Filename: {selectedFile.name}</p>
                  <p>Size: {prettyBytes(selectedFile.size)}</p>
                  <p>Type: {selectedFile.type}</p>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
        <Button
          disabled={form.formState.isSubmitting || isPending}
          type="submit"
          className="w-full md:w-fit md:absolute md:-top-4 md:right-5 z-50"
        >
          {isPending && <LoadingOval className={"mr-3"} />}
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
  );
}
