import { cn } from "@/lib/utils";
import { Oval } from "react-loader-spinner";

const LoadingOval = ({ className }) => {
  return (
    <div className={cn(className)}>
      <Oval
        height={20}
        width={20}
        color="#fff"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#ac8ee0"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default LoadingOval;
