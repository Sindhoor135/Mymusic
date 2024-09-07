import React, { useEffect, useState } from 'react';
import { actionType } from '../Context/reducer';
import { useStateValue } from '../Context/StateProvider';

import FilterButtons from './FilterButtons';
import { MdClearAll } from 'react-icons/md';
import { motion } from 'framer-motion';
import { getAllCategories, getAllArtist, getAllAlbums, getSongsByCategory } from '../api/index';
const Filter = ({ setFilteredSongs }) => {
  const [{ filterTerm, artists, allAlbums, allCategories }, dispatch] = useStateValue();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories if not already available
    // if (!allCategories) {
    //   getAllCategories().then((data) => {
    //     dispatch({ type: actionType.SET_ALL_CATEGORIES, allCategories: data });
    //     setCategories(data);
    //   });
    // }

    // Fetch artists if not already available
    if (!artists) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
      });
    }

    // Fetch albums if not already available
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: data.data });
      });
    }
  }, [artists, allAlbums, allCategories, dispatch]);

  const updateFilter = (value) => {
    dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: value });

    // Fetch songs by selected category
    getSongsByCategory(value).then((data) => {
      setFilteredSongs(data);
    });
  };

  const clearAllFilters = () => {
    setFilteredSongs(null); // Clear filtered songs to show all
    dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
    dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
    dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
    dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
  };

  return (
    <div className="w-full my-4 px-6 py-4 flex items-center justify-start md:justify-center gap-10">
      {/* Filter by Categories */}
      <div className="flex items-center gap-6 mx-4">
        {categories.map((data) => (
          <p
            key={data.id}
            onClick={() => updateFilter(data.name)}
            className={`text-base ${
              data.name === filterTerm ? 'font-semibold' : 'font-normal'
            } text-textColor cursor-pointer hover:font-semibold transition-all duration-100 ease-in-out`}
          >
            {data.name}
          </p>
        ))}
      </div>

      {/* Clear All Filters Button */}
      <motion.i
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.75 }}
        onClick={clearAllFilters}
      >
        <MdClearAll className="text-textColor text-xl cursor-pointer" />
      </motion.i>
    </div>
  );
};

export default Filter;
