"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

export const Container = ({ children }: { children: React.ReactNode }) => {
  const { collapsed, onCollpase, onExpand } = useSidebar((state) => state);

  //   to konow we are in desktop mode or mobile mode
  const matches = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (matches) {
      onCollpase();
    } else {
      onExpand();
    }
  }, [matches, onCollpase, onExpand]);
  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
};
