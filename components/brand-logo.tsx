import Image from "next/image";
import logo from "@/public/logo.png";

export function BrandLogo({
  height = 28,
  preload = false,
  className = "",
}: {
  height?: number;
  preload?: boolean;
  className?: string;
}) {
  // Keep aspect ratio of source 677x369.
  const width = Math.round((677 / 369) * height);
  return (
    <Image
      src={logo}
      alt="Firdovsi Rzaev"
      width={width}
      height={height}
      preload={preload}
      placeholder="blur"
      className={className}
    />
  );
}
