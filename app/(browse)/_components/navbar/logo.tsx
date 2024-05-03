import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="flex lg:flex items-center gap-x-4 hover:opacity-75 transition lg:pt-4 ">
        <div className="bg-white rounded-full p-1 mr-2 lg:mr-0 lg:shrink">
          <Image src={"/logo.png"} alt="streamy" height={32} width={32} />
        </div>
        <div className={cn("hidden lg:block", font.className)}>
          <p className="text-lg font-semibold">Streamy</p>
        </div>
      </div>
    </Link>
  );
};
