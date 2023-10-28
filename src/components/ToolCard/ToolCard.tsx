"use client";

import Image, { StaticImageData } from "next/image";
import { useState, useEffect } from "react";

import Tag from "./Tag/Tag";

import styles from "./toolCard.module.scss";

interface ToolCardProps {
  toolsInLocalStorage: string[];
  id: string;
  url: string;
  logo: string | StaticImageData;
  title: string;
  description: string;
  tags: { _id: string; name: string }[];
}

export default function ToolCard({
  toolsInLocalStorage,
  id,
  url,
  logo,
  title,
  description,
  tags,
}: ToolCardProps) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    toolsInLocalStorage.includes(id.toString()) && setIsChecked(true);
  }, [toolsInLocalStorage]);

  const handleCheck = () => {
    let favoritedTools = JSON.parse(localStorage.getItem("toolsId")) || [];
    if (favoritedTools.includes(id)) {
      // Remove the "id" in localStorage if it is not in localStorage
      favoritedTools = favoritedTools.filter((toolId) => {
        return toolId !== id;
      });
      setIsChecked(false);
    } else {
      // Insert the "id" from localStorage if it is not in localStorage
      favoritedTools.push(id);

      setIsChecked(true);
    }
    localStorage.setItem("toolsId", JSON.stringify(favoritedTools));
  };

  return (
    <>
      <a href={url} className={styles.cardLink} target="_blank">
        <div className={styles.container}>
          <div className={styles.upperHalfContainer}>
            <div className={styles.logoContainer}>
              <Image
                src={logo}
                alt="Logo image from the website providing the tool."
                width={60}
                height={60}
              />
            </div>
            <div className={styles.titleHeartDescriptionContainer}>
              <div className={styles.titleHeartContainer}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <div className={styles.toggleHeartContainer}>
                  <input
                    className={styles.toggleHeartInput}
                    id={id.toString()}
                    type="checkbox"
                    onChange={handleCheck}
                    checked={isChecked}
                  />
                  <label
                    className={styles.toggleHeartLabel}
                    htmlFor={id.toString()}
                  >
                    ❤
                  </label>
                </div>
              </div>
              <p>{description}</p>
            </div>
          </div>
          <div className={styles.horizontalBar}></div>
          <div className={styles.tagsContainer}>
            {tags.map((tag, id) => (
              <Tag key={id}>{tag.name}</Tag>
            ))}
          </div>
        </div>
      </a>
    </>
  );
}
