import { useUpdateAvatarUser } from "@/app/api/resolver/userResolver";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingOval from "../common/loader/LoadingOval";
import AvatarUserComponent from "../profile/AvatarUserComponent";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { cloudinaryCloudname } from "@/configs/config";

export default function FormEditAvatar({ avatar, username, userId }) {
  const { mutateAsync: updateAvatarUser, isPending } = useUpdateAvatarUser();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [imageSrc, setImageSrc] = useState();

  const form = useForm({});
  const { toast } = useToast();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
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
    try {
      const values = form.getValues();
      const upload = await uploadImageToCloudinary(
        event,
        "ml_default",
        "radsnaps/avatar"
      );

      await updateAvatarUser({
        id: userId,
        data_image: {
          cloudinary_id: upload.public_id,
          avatar: upload.secure_url,
        },
        username,
      });

      toast({
        title: "Successfully change your avatar!",
      });
    } catch (error) {
      console.log("error:", error);
      if (error.response) {
        toast({
          variant: "destructive",
          title: `${
            error.response?.data?.message || "Failed to change avatar"
          }`,
        });
      }
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={handleOnSubmit}>
        <div className="flex items-end flex-wrap sm:flex-nowrap gap-3">
          {imageSrc ? (
            <AvatarUserComponent
              className="w-20 h-20 border-primary border-2"
              imageUrl={imageSrc}
              username={username}
              withUsername={false}
            />
          ) : (
            <AvatarUserComponent
              className="w-20 h-20 border-primary border-2 text-2xl"
              imageUrl={avatar}
              username={username}
              withUsername={false}
            />
          )}
          <div>
            <p className="font-semibold text-sm">Choose a profile picture</p>
            <Input
              accept="image/*"
              name="file"
              type="file"
              disabled={isSubmitting || isPending}
              onChange={handleOnChange}
            />
          </div>
          <Button
            type="submit"
            disabled={isPending || !imageSrc}
            className="flex gap-3 w-full sm:max-w-fit"
          >
            {isPending && <LoadingOval />}
            Change avatar
          </Button>
        </div>
      </form>
    </Form>
  );
}
