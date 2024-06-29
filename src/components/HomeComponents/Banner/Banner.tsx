"use client";
import BannerSwiper from "./BannerSwiper/BannerSwiper";
import useMediaQuery from "@/hooks/useMediaQuery";
import { IIntroBanner, IIntroBannerDekstop } from "@/types/Home/banner";
import { useEffect } from "react";
import { saveUserCoordinates } from "@/utils/geoUser";

interface IBannerProps {
  mobileData: IIntroBanner;
  deskstopData: IIntroBannerDekstop;
}

const Banner = ({ mobileData, deskstopData }: IBannerProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            const coordinates = { latitude, longitude };
            saveUserCoordinates(coordinates);
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              // Можно оставить этот блок пустым или вывести какое-то сообщение
            } else {
              console.error("Geolocation error:", error);
            }
          }
        );
      } catch (error: any) {
        console.error("Error getting user location:", error);
      }
    };

    getUserLocation();
  }, []);

  return (
    <section className="intro__banner">
      <div className="container">
        <BannerSwiper
          slides={isMobile ? mobileData.product : deskstopData.baner}
        />
      </div>
    </section>
  );
};

export default Banner;
