import { Icon } from "@iconify/react/dist/iconify.js";
import CategoryItem from "./CategoryItem";

import { useApiContext } from "../../../context/ApiContext";

const CategoryList: React.FC = () => {
  //   const { isDisabled, toggleDisabled } = useCategoryActions();
  const { categories } = useApiContext();

  const categoriesArray = Object.values(categories);

  return (
    <div className="flex flex-col lg:flex-row w-full justify-between items-start gap-2">
      <div className="min-h-52 w-full border border-white/30">
        <h1 className="flex items-center text-2xl gap-2 text-cyan-400 font-semibold p-3">
          <Icon icon="pepicons-print:triangle-up" /> RECEITAS
        </h1>
        {categoriesArray
          .filter((item) => !item.expense)
          .map((category, index) => (
            <CategoryItem
              key={index}
              category={category}
              //   isDisabled={isDisabled}
              //   toggleDisabled={toggleDisabled}
            />
          ))}
      </div>

      <div className="min-h-52 w-full border border-white/30">
        <h1 className="flex items-center text-2xl gap-2 text-red-600 font-semibold p-3">
          <Icon icon="pepicons-print:triangle-down" /> DESPESAS
        </h1>
        {categoriesArray
          .filter((item) => item.expense)
          .map((category, index) => (
            <CategoryItem
              key={index}
              category={category}
              //   isDisabled={isDisabled}
              //   toggleDisabled={toggleDisabled}
            />
          ))}
      </div>
    </div>
  );
};

export default CategoryList;
