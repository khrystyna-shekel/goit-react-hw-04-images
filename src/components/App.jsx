import React, { useEffect, useState } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

import { fetchGallary, fetchGallaryByQuery } from 'services/api';
import { StyledWrapper } from './App.Styled';

export const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [modalImgUrl, setModalImgUrl] = useState('');

  // useEffect(() => {
  //   const getImages = async () => {
  //     try {
  //       setIsLoading(true);
  //       const { hits } = search
  //         ? await fetchGallaryByQuery({ search, page })
  //         : await fetchGallary({ page });
  //       setImages(prevState => [...prevState, ...hits]);
  //     } catch (error) {
  //       console.log(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   getImages();
  // }, [page, search]);

  useEffect(() => {
    const getImages = async () => {
      try {
        setIsLoading(true);
        const { hits } = await fetchGallary();
        setImages(hits);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    setPage(1);

    setSearch(e.currentTarget.elements.search.value);
  };

  useEffect(() => {
    const getImagesByQuery = async () => {
      try {
        setIsLoading(true);
        const { hits } = await fetchGallaryByQuery(search, page);
        if (page === 1) {
          setImages(hits);
        } else {
          setImages(prevState => [...prevState, ...hits]);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getImagesByQuery();
  }, [page, search]);

  const handleLoadBtn = async () => {
    setPage(prevState => prevState + 1);
    setShowLoadMore(true);
  };

  const openModal = targetImgUrl => {
    setModalImgUrl(targetImgUrl);
    setIsModalOpen(true);
  };

  const closeModal = e => {
    setIsModalOpen(false);
  };

  return (
    <StyledWrapper>
      {isModalOpen && (
        <Modal closeModal={closeModal} modalImgUrl={modalImgUrl} />
      )}
      <SearchBar onSubmit={onSubmit} />
      <ImageGallery images={images} openModal={openModal} />
      {showLoadMore && <Button handleLoadBtn={handleLoadBtn} />}
      {isLoading && <Loader wrapperStyle={{ margin: '0 auto' }} />}
    </StyledWrapper>
  );
};
