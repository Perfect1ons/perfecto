"use client"

import Image from "next/image";
import { useState, useEffect } from "react";


interface IImageCheckerProps{
    img: string;
}

const ImageChecker = ({ img }: IImageCheckerProps) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
   useEffect(() => {
     const imgElement = new Image();
     imgElement.src = img;
     imgElement.onload = () => setIsValid(true);
     imgElement.onerror = () => setIsValid(false);
   }, [img]);

   if (isValid === null) {
     return null; // Здесь можно вернуть индикатор загрузки, если необходимо
   }

   return isValid ? (
     <Image
       
       src={
         img
       }
       alt={z}
       width={60}
       height={60}
     />
   ) : null;
};

export default ImageChecker