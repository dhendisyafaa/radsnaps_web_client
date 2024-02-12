import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function DrawerDialogShare({ open, onOpenChange, url }) {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share this image</DialogTitle>
            <DialogDescription>
              Share this photo to people who want to see it
            </DialogDescription>
          </DialogHeader>
          <DrawerShareContent url={url} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="container pb-6">
        <DrawerHeader>
          <DrawerTitle>Share this image</DrawerTitle>
          <DrawerDescription>
            Share this photo to people who want to see it
          </DrawerDescription>
        </DrawerHeader>
        <DrawerShareContent url={url} />
      </DrawerContent>
    </Drawer>
  );
}

export function DrawerShareContent({ url }) {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied to clipboard",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-3 text-sm font-semibold">Copy link</p>
        <div className="flex w-full items-center space-x-2">
          <Input type="text" value={url} />
          <Button type="submit" onClick={() => copyToClipboard()}>
            Copy
          </Button>
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold">Share to</p>
        <div className="flex flex-wrap gap-3">
          <WhatsappShareButton
            url={url}
            blankTarget={true}
            title={
              "next-share is a social share buttons for your next React apps."
            }
            separator=":: "
          >
            <WhatsappIcon size={42} round />
          </WhatsappShareButton>
          <TelegramShareButton
            url={url}
            blankTarget={true}
            title={
              "next-share is a social share buttons for your next React apps."
            }
          >
            <TelegramIcon size={42} round />
          </TelegramShareButton>
          <FacebookShareButton
            url={url}
            blankTarget={true}
            quote={
              "next-share is a social share buttons for your next React apps."
            }
            hashtag={"#nextshare"}
          >
            <FacebookIcon size={42} round />
          </FacebookShareButton>
          <FacebookMessengerShareButton url={url} blankTarget={true} appId={""}>
            <FacebookMessengerIcon size={42} round />
          </FacebookMessengerShareButton>
          <TwitterShareButton
            url={url}
            blankTarget={true}
            title={
              "next-share is a social share buttons for your next React apps."
            }
          >
            <TwitterIcon size={42} round />
          </TwitterShareButton>
          <EmailShareButton
            url={url}
            blankTarget={true}
            subject={"Next Share"}
            body="body"
          >
            <EmailIcon size={42} round />
          </EmailShareButton>
          <LinkedinShareButton url={url} blankTarget={true}>
            <LinkedinIcon size={42} round />
          </LinkedinShareButton>
          <PinterestShareButton
            url={url}
            blankTarget={true}
            media={
              "next-share is a social share buttons for your next React apps."
            }
          >
            <PinterestIcon size={42} round />
          </PinterestShareButton>
        </div>
      </div>
    </div>
  );
}
