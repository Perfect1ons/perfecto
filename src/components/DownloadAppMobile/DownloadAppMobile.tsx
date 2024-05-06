
import styles from "./style.module.scss";
import AppBanner from "./AppBanner/AppBanner";
import dynamic from "next/dynamic";

const DynamicAppBanner = dynamic(() => import("../DownloadAppMobile/AppBanner/AppBanner"));

const DownloadAppMobile = () => {


  return (
    <div className={styles.app}>
      <DynamicAppBanner />
    </div>
  );
};

export default DownloadAppMobile;
