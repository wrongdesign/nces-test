import { cn } from "@/shared/model/utils/utils";
import { LOADER_DEFAULT_SIZE } from "@/shared/model/constants/common";

interface Props {
  fixed?: boolean;
  size?: number;
}

const LoaderComponent = ({ fixed, size = LOADER_DEFAULT_SIZE }: Props) => {
  return (
    <div
      className={cn(
        "inset-0 flex h-full w-full items-center justify-center bg-white/50",
        fixed ? "fixed" : "absolute",
      )}
      style={{ zIndex: 9998 }}
    >
      <div
        className="animate-spin rounded-full border-[3px] border-gray-300 border-t-black"
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  );
};

export default LoaderComponent;
