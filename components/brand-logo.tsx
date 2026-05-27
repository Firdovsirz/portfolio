import Image from "next/image";
import logo from "@/public/logo.png";

export function BrandLogo({
  height = 28,
  priority = false,
  className = "",
}: {
  height?: number;
  priority?: boolean;
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
      priority={priority}
      placeholder="blur"
      className={className}
    />
  );
}
