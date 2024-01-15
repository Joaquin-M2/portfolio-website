"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import styles from "./navBarButton.module.scss";

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

  let increasedBorderRadiusPositionStyles = "";

  switch (increasedBorderRadiusPosition) {
    case "top-left":
      increasedBorderRadiusPositionStyles = styles.increasedBorderRadiusTopLeft;
      break;
    case "top-right":
      increasedBorderRadiusPositionStyles =
        styles.increasedBorderRadiusTopRight;
      break;
    case "bottom-left":
      increasedBorderRadiusPositionStyles =
        styles.increasedBorderRadiusBottomLeft;
      break;
    case "bottom-right":
      increasedBorderRadiusPositionStyles =
        styles.increasedBorderRadiusBottomRight;
      break;
  }

  return (
    <Link href={href}>
      <button
        className={`${styles.navBarButton} ${
          buttonIsActive ? styles.active : ""
        } ${increasedBorderRadiusPositionStyles}`}
        type="button"
      >
        {children}
      </button>
    </Link>
  );
}

export default NavBarButton;
