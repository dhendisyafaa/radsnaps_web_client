import { useUpdateAlbum } from "@/app/api/resolver/albumResolver";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingOval from "../common/loader/LoadingOval";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

export default function FormEditAlbum({ data }) {
  const [openDialog, setOpenDialog] = useState(false);
  const { mutateAsync: updateAlbum, isPending } = useUpdateAlbum();
  const { toast } = useToast();

  const formSchema = z.object({
    album_name: z.string().min(2).max(50),
    description: z.string().min(2),
    tags: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      album_name: `${data.album_name}`,
      description: `${data.description}`,
      tags: `${data.tags.join(", ")}`,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateAlbum({ id: data.id, body: values });
      setOpenDialog(!openDialog);
      toast({
        title: "Album updated!",
      });
      form.reset();
    } catch (error) {
      console.log("error:", error);
      if (error.response) {
        toast({
          variant: "destructive",
          title: `${error.response?.data?.message || "Failed to edit album"}`,
        });
      }
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <Button
        variant={"outline"}
        size={"icon"}
        className="bg-transparent border-muted-foreground hover:bg-white/50 w-8 h-8 shadow-sm"
        onClick={() => setOpenDialog(true)}
      >
        <Pencil className="w-4 h-4" />
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit album</DialogTitle>k
          <DialogDescription>
            You can only change the album name, description, and tags.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="album_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Album Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="The Middle Ages"
                      disabled={isSubmitting || isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Album Description</FormLabel>
                  <FormControl>
                    <Textarea disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormDescription>
                    An overview of the album you&apos;ll be creating
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
                      disabled={isSubmitting || isPending}
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
            <div className="flex gap-2 md:justify-end mt-6">
              <Button
                type="button"
                variant={"outline"}
                className="w-full md:w-fit flex items-center gap-2"
                disabled={isSubmitting || isPending}
                onClick={() => setOpenDialog(!openDialog)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full md:w-fit flex items-center gap-2"
                disabled={isSubmitting || isPending}
              >
                {isSubmitting && <LoadingOval />}
                Update
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
