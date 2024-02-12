"use client";

import { useCreateComment } from "@/app/api/resolver/commentResolver";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

export default function FormCreateComment() {
  const { toast } = useToast();
  const pathname = usePathname();
  const idImage = pathname.split("/");
  const {
    mutateAsync: createCommentByImage,
    variables,
    isPending,
    isSuccess,
    isError,
  } = useCreateComment();
  const { data: session } = useSession();

  const formSchema = z.object({
    comment_content: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment_content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = {
        comment: {
          ...values,
          user_id: session?.user.user_id,
          image_id: idImage[3],
        },
        token: session?.user.accessToken,
      };
      await createCommentByImage(data);
      // isSuccess
      //   ? toast({
      //       title: "Create new comment",
      //       description: `${variables.comment.comment_content}`,
      //     })
      //   : null;

      form.reset();
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      {/*   {isSuccess &&
        toast({
          title: "Comment created!",
        })}
      {isError &&
        toast({
          variant: "destructive",
          title: "Cannot create comment",
          description: "Errors occur when making comment",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })} */}
      <div className="w-full">
        {!session ? (
          <Button
            className="w-full text-primary-foreground"
            onClick={() => signIn()}
          >
            Login to add comment
          </Button>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-center gap-1 w-full"
            >
              <FormField
                control={form.control}
                name="comment_content"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Add comment"
                        className="rounded-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="icon" variant="ghost">
                <Send className="w-5 text-primary" />
              </Button>
            </form>
          </Form>
        )}
      </div>
    </>
  );
}
