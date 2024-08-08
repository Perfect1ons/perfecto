"use client";
import {
  deleteFavoritesProductAllAuthed,
  deleteFavoritesProductAuthed,
  getFavorites,
  postFavorite,
} from "@/api/clientRequest";

import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

// Хук для управления избранными товарами
const useFavorites = () => {
  const { token } = useContext(AuthContext);

  const refreshFav = async (page: number) => {
    try {
      const response = await getFavorites(token, page.toString());
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

  const deleteFav = async (id_tov: number) => {
    try {
      await deleteFavoritesProductAuthed(token, id_tov);
      await refreshFav(1);
    } catch (e) {
      console.log("Error deleting favorite: ", e);
    }
  };

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
