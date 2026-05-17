"use client";

import { Button } from "@/shared/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/shared/model/utils/utils";

interface Props {
  backUrl?: string;
  needParams?: boolean;
}

const BackButton = ({ backUrl, needParams }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();

  const goBack = () => {
    startTransition(() => {
      if (backUrl) {
        const params = new URLSearchParams(searchParams.toString());
        const url = needParams ? `${backUrl}?${params.toString()}` : backUrl;

        router.replace(url);
      } else {
        router.back();
      }
    });
  };

  return (
    <Button
      variant="secondary"
      className={cn(isPending ? "cursor-not-allowed" : "cursor-pointer")}
      onClick={goBack}
    >
      <ChevronLeft className="size-5" />
      <p className={"text-sm"}>Back</p>
    </Button>
  );
};

export default BackButton;
