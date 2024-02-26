import { useUpdateAvatarUser } from "@/app/api/resolver/userResolver";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingOval from "../common/loader/LoadingOval";
import AvatarUserComponent from "../profile/AvatarUserComponent";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

export default function FormEditAvatar({ avatar, username, userId }) {
  // const { mutateAsync: removeAvatar } = useRemoveAvatar();
  // const updateAvatar = () => {};
  const { mutateAsync: updateAvatarUser, isPending } = useUpdateAvatarUser();
  const removeAvatar = () => {};
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const form = useForm({});
  const { toast } = useToast();

  const onSubmit = async () => {
    try {
      await updateAvatarUser({
        id: userId,
        data_image: selectedFile,
      });
      toast({
        title: "berhasil",
      });
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
  };

  const handleRemoveAvatar = async () => {
    try {
      await removeAvatar({
        level: levelUser,
        id: idUser,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-end flex-wrap sm:flex-nowrap gap-3">
            {selectedFile ? (
              <AvatarUserComponent
                className="w-20 h-20 border-primary border-2"
                imageUrl={preview}
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
            <FormField
              control={form.control}
              name="data_image"
              render={({ field: { onChange, value, ...rest } }) => (
                <>
                  <FormItem>
                    <FormLabel>Choose a profile picture</FormLabel>
                    <FormControl>
                      <Input
                        {...rest}
                        accept="image/*"
                        name="data_image"
                        type="file"
                        disabled={isSubmitting || isPending}
                        onChange={onSelectFile}
                      />
                    </FormControl>
                  </FormItem>
                </>
              )}
            />
            <Button
              type="submit"
              disabled={isPending || !preview}
              className="flex gap-3 w-full sm:max-w-fit"
            >
              {isPending && <LoadingOval />}
              Change avatar
            </Button>
          </div>
        </form>
      </Form>
      <div
        className="text-primary w-fit mt-3 cursor-pointer hover:underline decoration-primary"
        onClick={() => handleRemoveAvatar()}
      >
        Remove avatar
      </div>
    </>
  );
}
