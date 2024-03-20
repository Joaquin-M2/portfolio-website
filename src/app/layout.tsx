import { Metadata } from "next";
import { Orbitron } from "next/font/google";

import NavBar from "@/components/NavBar/NavBar";
import NavBarButton from "@/components/NavBar/NavBarButton/NavBarButton";

import "@/sass/main.scss";

export const metadata: Metadata = {
  title: "Joaquin-M2 website",
  description: "Projects, technologies and tools used by Joaquin-M2",
};

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={orbitron.variable}>
      <body>
        {children}
        <NavBar>
          <NavBarButton
            href="/portfolio/projects"
            pathnameStartsWith="/portfolio"
            increasedBorderRadiusPosition="top-left"
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
            href="/resources"
            pathnameStartsWith="/resources"
            increasedBorderRadiusPosition="top-right"
          >
            Resources
          </NavBarButton>
        </NavBar>
      </body>
    </html>
  );
}
