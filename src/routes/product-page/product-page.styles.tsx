import styled from 'styled-components';

export const ProductPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;

  @media screen and (min-width: 800px) {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin-bottom: 30px;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  @media screen and (min-width: 800px) {
    margin-bottom: 0;
    margin-right: 50px;
  }
`;

export const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;

  @media screen and (min-width: 800px) {
    align-items: flex-start;
  }
`;

export const Name = styled.h1`
  font-size: 38px;
  margin-bottom: 10px;
`;

export const Price = styled.span`
  font-size: 28px;
  margin-bottom: 25px;
`;
