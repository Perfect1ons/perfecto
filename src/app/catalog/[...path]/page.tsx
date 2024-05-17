import { getCatalogsProducts } from "@/api/requests";
import Catalogs from "../page";

interface Params {
  params: { path: string | string[] };
}

export default async function page({ params: { path } }: Params) {
  // return <h4>Test</h4>;
  try {
    let fullPath: string;
    if (Array.isArray(path)) {
      // Если path является массивом строк, объединяем их в одну строку
      fullPath = path.join("/");
    } else {
      // Если path уже является строкой, используем его как есть
      fullPath = path;
    }
    try {
      // const catalogs = await getCatalogsMenu();
      const catalogs = await getCatalogsProducts(fullPath);
      return (
        <div>
          <Catalogs catalog={catalogs} path={fullPath} />
        </div>
      );
    } catch (error) {
      console.error("Ошибка:", error);
      return (
        <div>
          Ошибка при выборе каталогов. Пожалуйста, повторите попытку позже.
        </div>
      );
    }
  } catch (error) {
    console.error("Ошибка:", error);
    return <div>Произошла ошибка. Пожалуйста, попробуйте еще раз позже.</div>;
  }
}
