import styled from 'styled-components';

export const SearchBoxContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid grey;
  border-radius: 5px;
  width: 200px;
  
  @media screen and (max-width: 800px) {
    width: 150px;
  }
`;

export const SearchResultsContainer = styled.div`
  position: absolute;
  top: 45px;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid black;
  z-index: 5;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const SearchResultItem = styled.div`
  display: flex;
  height: 80px;
  margin-bottom: 15px;
  cursor: pointer;

  img {
    width: 30%;
  }

  .item-details {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 10px 20px;

    .name {
      font-size: 16px;
    }
  }
`;
