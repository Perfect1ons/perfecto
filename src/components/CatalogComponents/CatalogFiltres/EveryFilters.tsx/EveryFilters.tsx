import { IFiltersBrand } from "@/types/filtersBrand";
import { FilterIcon, СhevronDownIcon } from "../../../../../public/Icons/Icons";
import cn from "clsx";
import AllFiltersMobile from "../../AllFiltersMobile/AllFiltersMobile";
import Modal from "@/components/UI/ModalHeaders/Modal/Modal";
interface IEveryFilterProps {
  filter: IFiltersBrand;
  visibleFilter: string | null;
  toggleFilter: (name: string) => void;
}

const EveryFilters = ({
  filter,
  toggleFilter,
  visibleFilter,
}: IEveryFilterProps) => {
  const closeEveryFilter = () => {
    toggleFilter("every");
  };

  return (
    <>
      <div className="positionContainer">
        <button
          className="catalogFilterButton"
          onClick={() => toggleFilter("every")}
        >
          Все фильтры
          <span className={cn("filterNavItemArrowIsActive")}>
            <FilterIcon />
          </span>
        </button>
        <Modal close={closeEveryFilter} isVisible={visibleFilter === "every"}>
          eqwasddasd
        </Modal>
      </div>
    </>
  );
};

export default EveryFilters;
