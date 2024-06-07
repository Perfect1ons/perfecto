import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PGCSkeleton() {
  return (
    <div className="default__card_skeleton">
      <div className="default__card_images">
        <Skeleton />
      </div>
      <div className="default__card_info">
        <Skeleton />
        <div className="default__card_price"></div>
        <Skeleton />
        <h2 className="default__card_name"></h2>
        <Skeleton />
        <div className="ocenka"></div>
        <Skeleton />
        <div className="ddos"></div>
        <div className="add__to">
          <button className="add__to_cart">
            <Skeleton />
          </button>
          <button title="Добавить в избранное" className={"add__to_fav"}>
            <Skeleton />
          </button>
        </div>
      </div>
    </div>
  );
}
