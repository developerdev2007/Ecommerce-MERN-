import React from "react";
import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoritesCount = favorites.length;
  return (
    <div className="absolute left-2 top-8">
      {favoritesCount > 0 && (
        <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
          {favoritesCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;
