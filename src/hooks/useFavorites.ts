"use client";
import {
  deleteFavoritesProductAllAuthed,
  deleteFavoritesProductAuthed,
  getFavorites,
  postFavorite,
} from "@/api/clientRequest";

import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

// hook for control favorite products
const useFavorites = () => {
  const { token } = useContext(AuthContext);

  //favorite refresh count function
  const refreshFav = async (page: number) => {
    try {
      const response = await getFavorites(token, page);
      if (response === null) {
        localStorage.removeItem("favCount");
      } else if (response.count) {
        localStorage.setItem("favCount", JSON.stringify(response.count));
      }
      window.dispatchEvent(new Event("favoritesUpdated"));
      return response;
    } catch (e) {
      console.log("Error fetching favorites: ", e);
    }
  };

  //add product to favorite function
  const postFav = async (id_tov: number, kol: number) => {
    try {
      const data = await postFavorite(id_tov, kol, token);
      await refreshFav(1);
      if (data) {
        return data;
      }
    } catch (e) {
      console.log("Error posting favorite: ", e);
    }
  };

  //delete product from favorite function
  const deleteFav = async (id_tov: number) => {
    try {
      await deleteFavoritesProductAuthed(token, id_tov);
      await refreshFav(1);
    } catch (e) {
      console.log("Error deleting favorite: ", e);
    }
  };

  //delete products by array fuction
  const deleteFavAll = async (id_tov: number[]) => {
    try {
      await deleteFavoritesProductAllAuthed(token, id_tov);
      await refreshFav(1);
    } catch (e) {
      console.log("Error deleting favorites all: ", e);
    }
  };

  return {
    refreshFav,
    postFav,
    deleteFav,
    deleteFavAll,
  };
};

export default useFavorites;
