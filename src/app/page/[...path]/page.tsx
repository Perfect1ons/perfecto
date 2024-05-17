import { getFooter, getFooterPages } from '@/api/requests';
import FooterPage from '@/components/Footer/FooterPage/FooterPage';
import React from 'react'

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
    <FooterPage  data={data} links={sidebarLinks} breadcrumb={fullPath}/>
  )
}
