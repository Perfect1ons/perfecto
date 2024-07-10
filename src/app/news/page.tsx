import React from "react";
import { getMetaNewsPage, getNews, getNewsPagination } from "@/api/requests";
import AllNews from "@/components/HomeComponents/News/AllNews/AllNews";
import NewsPagination from "@/components/HomeComponents/News/NewsPaginate/NewsPaginate";
import { generatePageMetadata } from "@/utils/metadata";
import NotFound from "../not-found";

interface NewsProps {
  searchParams: {
    page?: string;
  };
}

export default async function Page({ searchParams }: NewsProps) {
BrandProps;

  return (
  <>
    <AllNews allnews={newsData} />
    <NewsPagination
      pageCount={pageCount}
      currentPage={currentPage}
    />
  </>
  );
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaNewsPage);
}


