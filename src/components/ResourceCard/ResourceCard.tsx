"use client";

import {
  useState,
  useEffect,
  MouseEventHandler,
  Dispatch,
  SetStateAction,
} from "react";
import Image, { StaticImageData } from "next/image";

import MenuCard from "@/components/MenuCard/MenuCard";
import Tag from "@/components/Tag/Tag";
import DeleteResourceForm from "./DeleteResourceForm/DeleteResourceForm";
import UpdateResourceForm from "./UpdateResourceForm/UpdateResourceForm";

import { createRequest } from "@/utils/requests";
import checkJwtHasExpired from "@/utils/check-user-token-expiration";
import getUserTokenData from "@/utils/get-user-token-data";

import styles from "./resourceCard.module.scss";

interface ResourceCardProps {
  allIcons: any[];
  allTags: any[];
  backendResponseDeleteTool?: { status: number; message: string };
  deleteToolModalIsShown: boolean;
  description: string;
  handleAddTag: (event) => void;
  handleRemoveTag: (event) => void;
  hideDeleteToolModal: MouseEventHandler;
  hideUpdateToolModal: MouseEventHandler;
  id: string;
  logo: string | StaticImageData;
  selectedTagsAddToolForm: any[];
  setDeleteToolModalIsShown: MouseEventHandler;
  setToolsFrontend?: Dispatch<SetStateAction<any[]>>;
  setUpdateToolModalIsShown: MouseEventHandler;
  title: string;
  toolTags: { _id: string; name: string }[];
  updateToolModalIsShown: boolean;
  url: string;
  userAllFavoriteTools: string[];
}

export default function ResourceCard({
  allIcons,
  allTags,
  deleteToolModalIsShown,
  description,
  handleAddTag,
  handleRemoveTag,
  hideDeleteToolModal,
  hideUpdateToolModal,
  id,
  logo,
  selectedTagsAddToolForm,
  setDeleteToolModalIsShown,
  setToolsFrontend,
  setUpdateToolModalIsShown,
  title,
  toolTags,
  updateToolModalIsShown,
  url,
  userAllFavoriteTools,
}: ResourceCardProps) {
  const [favoriteButtonIsChecked, setFavoriteButtonIsChecked] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("accountFavoriteResourcesId")) {
      userAllFavoriteTools.includes(id.toString()) &&
        setFavoriteButtonIsChecked(true);
    } else {
      setFavoriteButtonIsChecked(false);
    }
  }, [userAllFavoriteTools]);
  const [menuCardIsVisible, setMenuCardIsVisible] = useState(false);

  ////////////////////////////
  // FAVORITE RESOURCES

  const handleCheck = () => {
    let favoritedResources =
      JSON.parse(localStorage.getItem("accountFavoriteResourcesId")) || [];
    if (favoritedResources.includes(id)) {
      favoritedResources = favoritedResources.filter((toolId) => {
        return toolId !== id;
      });
      setFavoriteButtonIsChecked(false);
    } else {
      // Insert the "id" from localStorage if it is not in localStorage
      favoritedResources.push(id);

      setFavoriteButtonIsChecked(true);
    }
    localStorage.setItem(
      "accountFavoriteResourcesId",
      JSON.stringify(favoritedResources)
    );
    // Update user resources saved in his account:
    if (localStorage.getItem("userToken") && checkJwtHasExpired() === false) {
      fetch(
        createRequest({
          urlPath: `/user/${getUserTokenData("userId")}`,
          method: "PATCH",
          requestBody: { favoriteResources: favoritedResources },
        })
      );
    }
  };

  return (
    <>
      <a href={url} className={styles.cardLink} target="_blank">
        <div className={styles.container}>
          <div className={styles.upperHalfContainer}>
            <div className={styles.logoContainer}>
              <Image
                src={logo}
                alt={`Logo image of the ${title} tool.`}
                width={60}
                height={60}
              />
            </div>
            <div className={styles.titleIconsDescriptionContainer}>
              <div className={styles.titleIconsContainer}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <div
                  className={styles.toggleIconsContainer}
                  data-testid="iconsContainer"
                >
                  <input
                    className={styles.toggleHeartInput}
                    id={id.toString()}
                    type="checkbox"
                    onChange={handleCheck}
                    checked={favoriteButtonIsChecked}
                  />
                  <label
                    role="button"
                    aria-description="Favorite button"
                    className={styles.toggleHeartLabel}
                    htmlFor={id.toString()}
                  >
                    <svg
                      role="img"
                      aria-label="Heart icon"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                    </svg>
                  </label>
                  {getUserTokenData("role") === "admin" && (
                    <div
                      role="button"
                      aria-description="Tool configuration button"
                      className={styles.menuButtonContainer}
                      onClick={(e) => {
                        e.preventDefault();
                        setMenuCardIsVisible((prevValue) => !prevValue);
                      }}
                      onBlur={() => setMenuCardIsVisible(false)}
                      tabIndex={0}
                    >
                      <svg
                        role="img"
                        aria-label="Gear icon"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                        className={`${styles.gearIcon} ${
                          menuCardIsVisible && styles.gearIconChecked
                        }`}
                      >
                        <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                      </svg>
                      <MenuCard isVisible={menuCardIsVisible}>
                        <li onClick={setUpdateToolModalIsShown}>
                          Modify resource
                        </li>
                        <li onClick={setDeleteToolModalIsShown}>
                          Delete resource
                        </li>
                      </MenuCard>
                    </div>
                  )}
                </div>
              </div>
              <p role="paragraph">{description}</p>
            </div>
          </div>
          <div className={styles.horizontalBar}></div>
          <div role="list" className={styles.tagsContainer}>
            {toolTags.map((tag, id) => (
              <Tag key={id}>{tag.name}</Tag>
            ))}
          </div>
        </div>
      </a>
      <UpdateResourceForm
        formIsOpen={updateToolModalIsShown}
        hideModal={hideUpdateToolModal}
        requestMethod="PATCH"
        requestUrlPath={`/resources/${id}`}
        selectedTagsAddToolForm={selectedTagsAddToolForm}
        allIcons={allIcons}
        allTags={allTags}
        id={id}
        setToolsFrontend={setToolsFrontend}
        handleAddTag={handleAddTag}
        handleRemoveTag={handleRemoveTag}
      />
      <DeleteResourceForm
        description={description}
        formIsOpen={deleteToolModalIsShown}
        hideModal={hideDeleteToolModal}
        id={id}
        setToolsFrontend={setToolsFrontend}
        title={title}
      />
    </>
  );
}
