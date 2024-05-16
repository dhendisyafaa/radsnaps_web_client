"use client";
import EmptyStateComponent from "@/components/common/EmptyStateComponent";
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
import { cloudinaryCloudname } from "@/configs/config";
import { useUserData } from "@/hooks/useUserData";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { GalleryHorizontal, Replace } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import prettyBytes from "pretty-bytes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePostImage } from "../api/resolver/imageResolver";

export default function PostingNewImage() {
  const { mutateAsync: postImage, isPending } = usePostImage();
  const { user_id } = useUserData();
  const { toast } = useToast();
  const { push } = useRouter();
  const [imageSrc, setImageSrc] = useState();
  const [imageInfo, setImageInfo] = useState();
  const [isUploading, setIsUploading] = useState(false);

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

  function handleOnChange(changeEvent) {
    const selectedFile = changeEvent.target.files[0];

    const allowedTypeFile = ["image/jpeg", "image/png"];

    if (!allowedTypeFile.includes(selectedFile.type)) {
      toast({
        variant: "destructive",
        title: `Cannot upload files other than jpeg, jpg, and png yet`,
      });
      return;
    }

    setImageInfo(selectedFile);
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(selectedFile);
  }

  const uploadImageToCloudinary = async (
    event,
    preset = "ml_default",
    folder
  ) => {
    const form = event.currentTarget;

    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", preset);
    formData.append("folder", folder);

    try {
      return await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudname}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());
    } catch (error) {
      console.log("error:", error);
      if (error.response) {
        toast({
          variant: "destructive",
          title: `${
            error.response?.data?.message ||
            "Failed to upload image to cloudinary"
          }`,
        });
      }
    }
  };

  async function handleOnSubmit(event) {
    event.preventDefault();
    setIsUploading(true);
    try {
      const values = form.getValues();
      const upload = await uploadImageToCloudinary(
        event,
        "ml_default",
        "radsnaps/images"
      );

      const responseUpload = await postImage({
        cloudinary_id: upload.public_id,
        image_url: upload.secure_url,
        image_title: values.image_title,
        image_name: imageInfo.name,
        image_description: values.image_description,
        album_id: 1,
        width: upload.width,
        height: upload.height,
        format: upload.format,
        resource_type: upload.resource_type,
        tags: values.tags,
        bytes: upload.bytes,
        folder: upload.folder,
        original_filename: upload.original_filename,
        owner_id: user_id,
        created_at: upload.created_at,
      });

      toast({
        title: "Successfully uploaded your photo!",
        description:
          "Make sure your photos can be searched by users according to the tags you provide",
      });
      setIsUploading(false);
      push(`/gallery/detail/${responseUpload?.data?.data.id}`);
    } catch (error) {
      setIsUploading(false);
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
    const handleBeforeUnload = (event) => {
      if (isUploading) {
        const message =
          "Upload is in progress. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isUploading]);

  const isSubmitting = form.formState.isSubmitting;
  const buttonLoading =
    isSubmitting ||
    isPending ||
    !imageSrc ||
    form.getValues().image_title === "" ||
    isUploading;

  return (
    <Form {...form}>
      <form onSubmit={handleOnSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div
              className={cn(
                "relative border rounded-lg",
                imageSrc
                  ? " min-h-[50vh] md:min-h-screen max-h-screen"
                  : "min-h-44"
              )}
            >
              <div className="absolute bottom-3 right-3 z-10">
                <label
                  htmlFor="file"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full text-xs [&_svg]:h-5 [&_svg]:w-5 font-medium text-center py-2 px-3 cursor-pointer flex items-center gap-2"
                >
                  {imageSrc ? (
                    <>
                      <Replace />
                      Change image
                    </>
                  ) : (
                    <>
                      <GalleryHorizontal />
                      Choose image
                    </>
                  )}
                </label>
                <Input
                  className="hidden"
                  accept="image/*"
                  name="file"
                  id="file"
                  type="file"
                  disabled={isSubmitting || isPending}
                  onChange={handleOnChange}
                />
              </div>
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="preview selected image"
                  fill={true}
                  quality={10}
                  className="object-contain"
                />
              ) : (
                <EmptyStateComponent
                  width={100}
                  height={100}
                  withButton={false}
                  descriptionMessage={
                    "Please choose the photo you want to upload"
                  }
                  illustration={"/assets/svg/empty-image.svg"}
                />
              )}
            </div>
          </div>
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
            {imageSrc && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Image information</CardTitle>
                  <CardDescription>
                    information of the image you selected
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-foreground">
                  <p>Filename: {imageInfo.name}</p>
                  <p>Size: {prettyBytes(imageInfo.size)}</p>
                  <p>Type: {imageInfo.type}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        <Button
          disabled={buttonLoading}
          type="submit"
          className="w-full md:w-fit md:absolute md:-top-4 md:right-5 z-50"
        >
          {isUploading && <LoadingOval className={"mr-3"} />}
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
