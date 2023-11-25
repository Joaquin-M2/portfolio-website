import { Metadata } from "next";

import NavBar from "../components/NavBar/NavBar";
import NavBarButton from "../components/NavBar/NavBarButton/NavBarButton";

import "../sass/main.scss";

export const metadata: Metadata = {
  title: "Joaquin-M2 website",
  description: "Projects, technologies and tools used by Joaquin-M2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <NavBar>
          <NavBarButton
            href="/portfolio/projects"
            pathnameStartsWith="/portfolio"
            borderRadiusPosition="top-left"
          >
            Portfolio
          </NavBarButton>
          <NavBarButton href="/skills/frontend" pathnameStartsWith="/skills">
            Skills
          </NavBarButton>
          <NavBarButton href="/" pathnameStartsWith="/">
            HOME
          </NavBarButton>
          <NavBarButton href="/contact" pathnameStartsWith="/contact">
            Contact
          </NavBarButton>
          <NavBarButton
            href="/tools"
            pathnameStartsWith="/tools"
            borderRadiusPosition="top-right"
          >
            Tools
          </NavBarButton>
        </NavBar>
      </body>
    </html>
  );
}
