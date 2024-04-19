import React from "react";
import { IListItem } from "@/app/catalog/page";

interface IOptionsProps {
  options: IListItem[];
}

const CatalogOptions: React.FC<IOptionsProps> = ({ options }) => {
  return (
    <section>
      {options.map((section, index) => (
        <div key={index}>
          <h2>{section.title}</h2>
          <ul>
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default CatalogOptions;
