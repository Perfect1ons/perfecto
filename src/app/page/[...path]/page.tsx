import { getFooter, getFooterPages } from '@/api/requests';
import React from 'react'
import FooterPage from '../page';

interface Params {
    params: { path: string };
  }

export default async function page({params: {path}}: Params) {


    let fullPath: string;
    if (Array.isArray(path)) {
      fullPath = path.join("/");
    } else {
      fullPath = path;
    }

    const data = await getFooterPages(fullPath);
    const sidebarLinks = await getFooter();
    
    
  return (
    <FooterPage  data={data} links={sidebarLinks}/>
  )
}
