import { useState, ChangeEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { selectCategoriesMap } from '../../store/categories/category.selector';
import { CategoryItem } from '../../store/categories/category.types';

import {
  SearchBoxContainer,
  SearchInput,
  SearchResultsContainer,
  SearchResultItem,
} from './search-box.styles';

const SearchBox = () => {
  const [searchField, setSearchField] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<CategoryItem[]>([]);
  const categoriesMap = useSelector(selectCategoriesMap);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchField.length > 0) {
      const allProducts = Object.values(categoriesMap).flat();
      const newFilteredProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchField.toLowerCase())
      );
      setFilteredProducts(newFilteredProducts.slice(0, 10)); // Limit to 10 results
    } else {
      setFilteredProducts([]);
    }
  }, [searchField, categoriesMap]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchField(event.target.value);
  };

  const onResultClick = (product: CategoryItem) => {
    // Find which category this product belongs to
    const category = Object.keys(categoriesMap).find((key) =>
      categoriesMap[key].some((item) => item.id === product.id)
    );
    if (category) {
      navigate(`/shop/${category}/${product.id}`);
      setSearchField('');
    }
  };

  return (
    <SearchBoxContainer>
      <SearchInput
        type='search'
        placeholder='Search products'
        value={searchField}
        onChange={onSearchChange}
      />
      {filteredProducts.length > 0 && (
        <SearchResultsContainer>
          {filteredProducts.map((product) => (
            <SearchResultItem key={product.id} onClick={() => onResultClick(product)}>
              <img src={product.imageUrl} alt={`${product.name}`} />
              <div className='item-details'>
                <span className='name'>{product.name}</span>
                <span className='price'>${product.price}</span>
              </div>
            </SearchResultItem>
          ))}
        </SearchResultsContainer>
      )}
    </SearchBoxContainer>
  );
};

export default SearchBox;
