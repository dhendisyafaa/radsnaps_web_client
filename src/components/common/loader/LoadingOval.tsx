import { cn } from "@/lib/utils";
import { Oval } from "react-loader-spinner";

const LoadingOval = ({ className }) => {
  return (
    <div className={cn(className)}>
      <Oval
        height={20}
        width={20}
        color="#7c3aed"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#7c3aed6e"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default LoadingOval;
