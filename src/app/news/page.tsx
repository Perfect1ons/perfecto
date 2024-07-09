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
  const currentPage = parseInt(searchParams.page || "1", 10);
  const newsData = await getNewsPagination(currentPage);
  const news = await getNews();
  const pageCount = Math.ceil(news.length / 10);

  if (currentPage > pageCount) {
    return (
       <NotFound/>
    );
  }

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


