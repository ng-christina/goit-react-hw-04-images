import React, { useState, useEffect, useCallback } from 'react';
import { BASE_URL, API_KEY, SEARCH_PARAMS } from './service/servise';
import axios from 'axios';
import Notiflix from 'notiflix';

import Button from './Button/Button';
import ImageGalleryList from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader.';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
const App = () => {
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');

  const fetchImages = useCallback(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}?key=${API_KEY}&q=${name}&page=${page}&${SEARCH_PARAMS}`)
      .then(response => {
        if (!response.data.hits.length) {
          Notiflix.Notify.failure('No images found!');
        }
        const modifiedHits = response.data.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id: String(id),
            tags,
            webformatURL,
            largeImageURL,
          })
        );
        setHits(prevHits => [...prevHits, ...modifiedHits]);
        setTotalHits(response.data.totalHits);
        setLoading(false);
      })
      .catch(error => {
        console.error(error.message);
        setLoading(false);
      });
  }, [name, page]);

  useEffect(() => {
    if (name.trim() === '') {
      return;
    }
    fetchImages();
  }, [name, page, fetchImages]);

  const buttonLoadClick = () => {
    setPage(prevPage => prevPage + 1);
  };
  const handleSubmit = ({ name }) => {
    setHits([]);
    setName(name);
    setPage(1);
    setTotalHits(0);
  };

  const handleImageClick = (imageURL, tag) => {
    setShowModal(prevShowModal => !prevShowModal);
    setLargeImageURL(imageURL);
    setTags(tags);
  };

  const handleModalClick = () => {
    setShowModal(false);
    setLargeImageURL(largeImageURL);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      {hits.length !== 0 && (
        <ImageGalleryList>
          <ImageGalleryItem images={hits} onImage={handleImageClick} />
        </ImageGalleryList>
      )}
      {showModal && (
        <Modal onClose={handleModalClick}>
          <img src={largeImageURL} alt="Modal" />
        </Modal>
      )}
      {loading && <Loader />}
      {totalHits > 0 && hits.length < totalHits && (
        <Button onBtnClick={buttonLoadClick} />
      )}
    </div>
  );
};

export default App;
