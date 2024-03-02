"use client";
import { useContentReported } from "@/app/api/resolver/contentResolver";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingThreeDoots from "../common/loader/LoadingThreeDoots";
import AvatarUserComponent from "../profile/AvatarUserComponent";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ContentReportIssue({ content_type, content_id }) {
  const { push, back } = useRouter();
  const { data: contentReported, isLoading } = useContentReported({
    endpoint: content_type,
    id: content_id,
  });

  if (isLoading)
    return (
      <div className="flex justify-center">
        <LoadingThreeDoots />
      </div>
    );

  if (contentReported === undefined)
    return (
      <div className="grid place-items-center h-24 w-full bg-secondary text-secondary-foreground rounded-md border">
        Content has been deleted
      </div>
    );

  const content = contentReported.data.data;

  const contentComponent = {
    image: <ContentReportImage content={content} />,
    user: <ContentReportUser content={content} />,
    album: <ContentReportAlbum content={content} />,
    comment: <ContentReportCommentar content={content} />,
  };

  return contentComponent[content_type];
}

export const ContentReportImage = ({ content }) => {
  const { push } = useRouter();

  return (
    <div
      className="flex gap-3 w-full items-center h-44 cursor-pointer"
      onClick={() => push(`/gallery/detail/${content.id}`)}
    >
      <div className="relative border rounded-md w-[70%] lg:w-[40%] h-full">
        <Image
          src={content.image_url}
          alt={`image ${content.image_name} from owner ${content.owner.username}`}
          loading="lazy"
          fill
          quality={30}
          className={cn(
            "w-full object-cover lg:object-contain object-center cursor-pointer transition-all ease-in-out group-hover:scale-105 overflow-hidden"
          )}
        />
      </div>
      <div className="w-full space-y-1">
        <p className="text-sm md:text-lg font-semibold">
          {content.image_title}
        </p>
        <p className="text-xs md:text-sm">{content.image_description}</p>
        <AvatarUserComponent
          className="w-6 h-6 text-xs md:text-sm"
          imageUrl={content.owner.avatar}
          username={content.owner.username}
        />
      </div>
    </div>
  );
};

export const ContentReportUser = ({ content }) => {
  const { push } = useRouter();

  return (
    <div
      className="flex gap-2 items-center p-5 cursor-pointer"
      onClick={() => push(`/profile/${content.username}`)}
    >
      <Avatar className="w-12 h-12">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold text-lg">{content.username}</p>
        <p className="text-sm">{content.fullname}</p>
      </div>
    </div>
  );
};

export const ContentReportAlbum = ({ content }) => {
  const { push } = useRouter();

  return (
    <div
      className="flex gap-3 w-full items-center h-44 cursor-pointer"
      onClick={() => push(`/album/${content.id}`)}
    >
      <div className="relative border rounded-md w-[70%] lg:w-[40%] h-full">
        <Image
          src={content.album_cover}
          alt={`image ${content.album_name} from owner ${content.owner.username}`}
          loading="lazy"
          fill
          quality={30}
          className={cn(
            "w-full object-cover lg:object-contain object-center cursor-pointer transition-all ease-in-out group-hover:scale-105 overflow-hidden"
          )}
        />
      </div>
      <div className="w-full">
        <p className="text-sm md:text-lg font-semibold">{content.album_name}</p>
        <p className="text-xs md:text-sm truncate">{content.description}</p>
        <div className="flex gap-2 items-center text-xs md:text-sm mt-3">
          <Avatar className="w-6 h-6">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>{content.owner.username}</p>
        </div>
      </div>
    </div>
  );
};

export const ContentReportCommentar = ({ content }) => {
  const { push } = useRouter();

  return (
    <div
      className="flex items-start gap-2 p-4 w-full cursor-pointer"
      onClick={() => push(`/gallery/detail/${content.image_id}`)}
    >
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="">
        <p className="text-lg font-semibold leading-none tracking-tight">
          {content.user.username}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          {content.comment_content}
        </p>
      </div>
    </div>
  );
};
