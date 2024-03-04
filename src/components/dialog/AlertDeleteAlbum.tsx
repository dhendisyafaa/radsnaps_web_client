import { useDeleteAlbum } from "@/app/api/resolver/albumResolver";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import LoadingOval from "../common/loader/LoadingOval";
import { Button, buttonVariants } from "../ui/button";
import { useToast } from "../ui/use-toast";

export default function AlertDeleteAlbum({ album_id, album_name }) {
  const { mutateAsync: deleteAlbum, isPending } = useDeleteAlbum();
  const { push } = useRouter();
  const { toast } = useToast();

  const handleDeleteAlbum = async () => {
    await deleteAlbum(album_id);
    push("/album");
    toast({
      title: "Album deleted!",
    });
    try {
    } catch (error) {
      console.log("error:", error);
      if (error.response) {
        toast({
          variant: "destructive",
          title: `${
            error.response?.data?.message ||
            `Failed to delete album ${album_id}`
          }`,
        });
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant={"outline"}
          size={"icon"}
          className="bg-transparent border-destructive hover:bg-destructive/50 w-8 h-8 shadow-sm"
        >
          <Trash className="w-4 h-4 text-red-600" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this album?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Photos in this album will not be deleted, only the album information{" "}
            {album_name} will be deleted,
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() => handleDeleteAlbum()}
            className={buttonVariants({
              variant: "destructive",
            })}
          >
            {isPending && <LoadingOval className={"mr-3"} />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
