import { BreadCrumbs } from "@/types/BreadCrums/breadCrums";
import Link from "next/link";
import { BackArrow } from "../../../../../public/Icons/Icons";

interface ICrumbsProps {
  breadCrumbs: BreadCrumbs[];
}

const CatalogCrumbs = ({ breadCrumbs }: ICrumbsProps) => {
  return (
    <div className="container">
      <div className="all__directions">
        {breadCrumbs &&
          breadCrumbs.slice(-2, -1).map((crumbs) => (
            <Link
              className="all__directions_link"
              href={`/catalog/${crumbs.full_slug}`}
              key={crumbs.id}
            >
              <BackArrow /> Назад
            </Link>
          ))}
        {breadCrumbs.map((crumbs) => {
          return (
            <Link
              className="all__directions_link"
              href={`/catalog/${crumbs.full_slug}`}
              key={crumbs.id}
            >
              {crumbs.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CatalogCrumbs;
