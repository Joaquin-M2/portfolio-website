import TP_Menu from "@/components/z-projects/tattoo-parlor/00.- Menu/menu";
import MenuButton from "@/components/z-projects/tattoo-parlor/00.- Menu/nav-button/nav-button";

import TP_Header from "@/components/z-projects/tattoo-parlor/01.- Header/header";
import TP_About from "@/components/z-projects/tattoo-parlor/02.- About/about";
import TP_Benefits from "@/components/z-projects/tattoo-parlor/03.- Benefits/benefits";
import TP_Services from "@/components/z-projects/tattoo-parlor/04.- Services/services";
import TP_Stories from "@/components/z-projects/tattoo-parlor/05.- Stories/stories";
import TP_Contact from "@/components/z-projects/tattoo-parlor/06.- Contact/contact";
import TP_Footer from "@/components/z-projects/tattoo-parlor/07.- Footer/footer";

import TonguesContainer from "@/components/TonguesContainer/TonguesContainer";

import projectsData from "@/data/projects";

import styles from "./tattoo-parlor.module.scss";

const Page: React.FC = () => {
  return (
    <>
      <div className={styles.body}>
        <TP_Header />
        <main>
          <TP_Menu>
            <MenuButton number="01" path="#about">
              About
            </MenuButton>
            <MenuButton number="02" path="#benefits">
              Benefits
            </MenuButton>
            <MenuButton number="03" path="#services">
              Services
            </MenuButton>
            <MenuButton number="04" path="#stories">
              Stories
            </MenuButton>
            <MenuButton number="05" path="#contact">
              Contact
            </MenuButton>
          </TP_Menu>
          <TP_About id="about" />
          <TP_Benefits id="benefits" />
          <TP_Services id="services" />
          <TP_Stories id="stories" />
          <TP_Contact id="contact" />
          <TP_Footer />
        </main>
      </div>
      <TonguesContainer
        CheckCodePath={
          projectsData.find((project) => project.title === "Tattoo Parlor")
            .linkToCode
        }
      />
    </>
  );
};

export default Page;
