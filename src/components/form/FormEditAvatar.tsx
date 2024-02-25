import { useUpdateAvatarUser } from "@/app/api/resolver/userResolver";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingOval from "../common/loader/LoadingOval";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

export default function FormEditAvatar({ avatar, username, userId }) {
  // const { mutateAsync: removeAvatar } = useRemoveAvatar();
  // const updateAvatar = () => {};
  const { mutateAsync: updateAvatarUser, isPending } = useUpdateAvatarUser();
  const removeAvatar = () => {};
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState("");
  const [warningFile, setWarningFile] = useState();
  const [selectedFile, setSelectedFile] = useState();
  console.log("🚀 ~ FormEditAvatar ~ selectedFile:", selectedFile);

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

  const getImageData = (event) => {
    const image = event.target.files[0];
    setFile(image);
    const dataTransfer = new DataTransfer();
    Array.from(event.target?.files).forEach((image) =>
      dataTransfer.items.add(image)
    );

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target?.files[0]);

    return { files, displayUrl };
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, setPreview]);

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
            {preview ? (
              <Avatar className="w-20 h-20 border-primary border-2">
                <AvatarImage
                  className="object-cover"
                  alt="new avatar"
                  src={preview}
                />
                <AvatarFallback>newAvatar</AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className="w-20 h-20 border-primary border-2">
                <AvatarImage
                  className="object-cover"
                  alt={`avatar from @${username}`}
                  src={avatar}
                />
                <AvatarFallback>{username}</AvatarFallback>
              </Avatar>
            )}
            <FormField
              control={form.control}
              name="data_image"
              render={({ field: { onChange, value, ...rest } }) => (
                <>
                  <FormItem>
                    <FormLabel>Choose a profile picture (max 3MB)</FormLabel>
                    <FormControl>
                      <Input
                        {...rest}
                        accept="image/*"
                        name="data_image"
                        type="file"
                        disabled={isSubmitting || isPending}
                        onChange={onSelectFile}
                        // type="file"
                        // accept="image/*"
                        // name="data_image"
                        // multiple={true}
                        // disabled={form.formState.isSubmitting}
                        // {...rest}
                        // onChange={(event) => {
                        //   const { files, displayUrl } = getImageData(event);
                        //   setPreview(displayUrl);
                        //   onChange(files);
                        //   setWarningFile(
                        //     files[0].size > 3000000
                        //       ? "Photo size more than 3MB"
                        //       : null
                        //   );
                        // }}
                      />
                    </FormControl>
                    {warningFile && (
                      <p className="text-destructive text-xs">{`*${warningFile}`}</p>
                    )}
                  </FormItem>
                </>
              )}
            />
            <Button
              type="submit"
              disabled={isPending || !preview || warningFile != undefined}
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
