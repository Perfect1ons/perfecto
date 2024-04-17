import { IBanner } from "@/types/bannerRequest";
import ky from "ky";

const maxkg = ky.create({
    prefixUrl: "https://max.kg/api/",
    cache: "no-cache",
  });

  export const getBannerData = (): Promise<IBanner> => {
    return maxkg.get("baner?pageSize=20&page=1").json();
  };