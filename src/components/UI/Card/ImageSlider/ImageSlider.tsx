"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./style.module.scss";

interface IImageProps {
  images: string[];
  name: string;
}

const ImageSlider = ({ images, name }: IImageProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMouseMove = (e: any) => {
    const sliderWidth = e.currentTarget.offsetWidth;
    const mouseX = e.nativeEvent.offsetX;
    const newIdx = Math.floor((mouseX / sliderWidth) * images.length);
    setCurrentIndex(newIdx);
  };

  return (
    <div className={styles.slider} onMouseMove={handleMouseMove}>
      {images.map((src, index) => (
        <div
          key={index}
          className={`${styles.slide} ${
            index === currentIndex ? styles.visible : styles.hidden
          }`}
        >
          <Image
            className="card__image"
            src={src}
            width={300}
            height={250}
            alt={name}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
