import { getCardProduct } from "@/api/requests";
import ItemPage from "../page"


interface Params {
    params: { path: string };
  }

export default async function item({params: {path}}: Params) {

    const data = await getCardProduct(path[0]);


    
    

    return (
      <ItemPage data={data.items}/>
    )
  }