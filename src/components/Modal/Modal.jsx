import React, { useEffect } from 'react';
import styled from 'styled-components';

export const Modal = ({ closeModal, modalImgUrl }) => {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [closeModal]);

  return (
    <StyledOverlay onClick={closeModal}>
      <div>
        <img src={modalImgUrl} alt="img" />
      </div>
    </StyledOverlay>
  );
};

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;

  & div {
    background-color: white;
    max-width: calc(100vw - 48px);
    max-height: calc(100vh - 24px);
  }
`;
