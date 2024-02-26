import Image from "next/image";
import { Button } from "../ui/button";

export default function EmptyStateComponent({
  illustration,
  className,
  onClick,
  titleMessage,
  descriptionMessage,
  buttonTitle,
  withMessage = true,
  withButton = true,
  height = 180,
  width = 180,
}) {
  return (
    <div className="w-full h-full grid place-items-center text-center min-h-[60vh]">
      <div>
        <Image
          src={illustration}
          alt="illustration empty state"
          className="mx-auto"
          width={width}
          height={height}
        />
        {withMessage && (
          <div className="space-y-1 my-6">
            <p className="font-bold text-xl">{titleMessage}</p>
            <p className="text-muted-foreground">{descriptionMessage}</p>
          </div>
        )}
        {withButton && <Button onClick={onClick}>{buttonTitle}</Button>}
      </div>
    </div>
  );
}
