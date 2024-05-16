import { useDetailImage } from "@/app/api/resolver/imageResolver";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageZoom from "react-image-zooom";
import ButtonDownloadImage from "../button/ButtonDownloadImage";
import ButtonLike from "../button/ButtonLike";
import ButtonReportIssue from "../button/ButtonReportIssue";
import ButtonSaveToAlbum from "../button/ButtonSaveToAlbum";
import ButtonShare from "../button/ButtonShare";
import LoadingThreeDoots from "../common/loader/LoadingThreeDoots";
import AvatarUserComponent from "../profile/AvatarUserComponent";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import CommentSection from "./CommentSection";
import EmptyStateComponent from "../common/EmptyStateComponent";
import ErrorMessage from "../common/ErrorMessage";

export default function DetailImageComponent({ imageId }) {
  const [imageLoading, setImageLoading] = useState(true);
  const { data: image, isLoading, isError, error } = useDetailImage(imageId);
  const { push } = useRouter();

  if (isLoading)
    return (
      <div className="flex justify-center">
        <LoadingThreeDoots />
      </div>
    );

  if (image === undefined)
    return (
      <EmptyStateComponent
        width={100}
        height={100}
        withButton={false}
        descriptionMessage={
          "Image may have been deleted by the owner or the Radsnaps system"
        }
        titleMessage={"This image is no longer available"}
        illustration={"/assets/svg/empty-image.svg"}
      />
    );

  if (isError) return <ErrorMessage errMessage={error.message} />;

  const detailImage = image.data.data;

  return (
    <div className="h-full p-4 md:p-16 gap-5 grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
      <div>
        <div className="border rounded-lg overflow-hidden">
          <ImageZoom
            className="object-cover w-full h-full"
            src={detailImage.image_url}
            alt={`image ${detailImage.image_name} from owner ${detailImage.owner.username}`}
            zoom="200"
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full mt-3">
          {detailImage?.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer"
              onClick={() => push(`/search/image?q=${tag}`)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <div className="space-y-5">
          <p className="text-2xl font-semibold leading-none tracking-tight">
            {detailImage.image_title}
          </p>
          <div className="flex items-center justify-end gap-4">
            <ButtonLike
              totalLike={detailImage.total_like}
              isLiked={detailImage.user_liked}
              imageId={detailImage.id}
              className={
                "text-xs [&_svg]:h-5 [&_svg]:w-5 md:[&_svg]:h-6 md:[&_svg]:w-6"
              }
            />
            <ButtonDownloadImage
              imageUrl={detailImage.image_url}
              filename={`${detailImage.owner.username}-${detailImage.original_filename}-radsnaps.jpg`}
              className={
                "text-xs [&_svg]:h-5 [&_svg]:w-5 md:[&_svg]:h-6 md:[&_svg]:w-6"
              }
            />
            <ButtonSaveToAlbum
              saved={detailImage.image_saved}
              image_id={detailImage.id}
              className={
                "text-xs [&_svg]:h-5 [&_svg]:w-5 md:[&_svg]:h-6 md:[&_svg]:w-6"
              }
            />
            <ButtonShare
              className={
                "text-xs [&_svg]:h-5 [&_svg]:w-5 md:[&_svg]:h-6 md:[&_svg]:w-6"
              }
            />
            <ButtonReportIssue
              content_type={"image"}
              content_id={detailImage.id}
              className={
                "text-xs [&_svg]:h-5 [&_svg]:w-5 md:[&_svg]:h-6 md:[&_svg]:w-6"
              }
            />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-semibold leading-none tracking-tight">
              Description
            </p>
            <p className="text-sm text-muted-foreground">
              {detailImage.image_description}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <AvatarUserComponent
              username={detailImage.owner.username}
              imageUrl={detailImage.owner.avatar}
            />
            <Button
              size="sm"
              className="text-xs"
              onClick={() => push(`/profile/${detailImage.owner.username}`)}
            >
              View profile
            </Button>
          </div>
        </div>
        <CommentSection
          imageId={imageId}
          totalComment={detailImage.total_comment}
        />
      </div>
    </div>
  );
}
