"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import styles from "./navBarButton.module.scss";

interface NavBarButton {
  children: string;
  href: string;
  pathnameStartsWith: string;
  borderRadiusPosition?: string;
}

function NavBarButton({
  children,
  href,
  pathnameStartsWith,
  borderRadiusPosition,
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

  let borderRadiusPositionStyles = "";

  switch (borderRadiusPosition) {
    case "top-left":
      borderRadiusPositionStyles = styles.borderRadiusTopLeft;
      break;
    case "top-right":
      borderRadiusPositionStyles = styles.borderRadiusTopRight;
      break;
    case "bottom-left":
      borderRadiusPositionStyles = styles.borderRadiusBottomLeft;
      break;
    case "bottom-right":
      borderRadiusPositionStyles = styles.borderRadiusBottomRight;
      break;
  }

  return (
    <Link href={href}>
      <button
        className={`${styles.navBarButton} ${
          buttonIsActive ? styles.active : ""
        } ${borderRadiusPositionStyles}`}
        type="button"
      >
        {children}
      </button>
    </Link>
  );
}

export default NavBarButton;
