"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import Button from "@/components/Button/Button";

interface NavBarButton {
  children: string;
  href: string;
  pathnameStartsWith: string;
  increasedBorderRadiusPosition?: string;
}

function NavBarButton({
  children,
  href,
  pathnameStartsWith,
  increasedBorderRadiusPosition,
}: NavBarButton) {
  const pathname = usePathname() || "/";

  let homeButtonIsActive: boolean;

  if (pathnameStartsWith.length === 1 && pathname.length === 1) {
    homeButtonIsActive = true;
  } else {
    homeButtonIsActive = false;
  }

  const buttonIsActive =
    (pathname.startsWith(pathnameStartsWith) &&
      pathnameStartsWith.length > 1) ||
    homeButtonIsActive;

  return (
    <Link href={href}>
      <Button
        isActive={buttonIsActive}
        increasedBorderRadiusPosition={increasedBorderRadiusPosition}
      >
        {children}
      </Button>
    </Link>
  );
}

export default NavBarButton;
