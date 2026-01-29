import { testSaga } from "redux-saga-test-plan";
import {
  categoriesSaga,
  onFetchCategories,
  fetchCategoriesAsync,
} from "../category.saga";
import { all, call, put, takeLatest } from "redux-saga";
import { CATEGORIES_ACTION_TYPES } from "../category.types";
import { getCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "../category.action";

describe("Category Saga Tests", () => {
  test("categoriesSaga", () => {
    testSaga(categoriesSaga)
      .next()
      .next()
      .isDone();
  });

  test("onFetchCategories", () => {
    testSaga(onFetchCategories)
      .next()
      .takeLatest(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
      )
      .next()
      .isDone();
  });

  test("fetchCategoriesAsync success", () => {
    const mockCategoriesArray = [
      { id: 1, name: "hats", items: [] },
      { id: 2, name: "jackets", items: [] },
    ];
    testSaga(fetchCategoriesAsync)
      .next()
      .call(getCategoriesAndDocuments)
      .next(mockCategoriesArray)
      .put(fetchCategoriesSuccess(mockCategoriesArray))
      .next()
      .isDone();
  });

  test("fetchCategoriesAsync failure", () => {
    const error = new Error("Failed to fetch categories");
    testSaga(fetchCategoriesAsync)
      .next()
      .call(getCategoriesAndDocuments)
      .throw(error)
      .put(fetchCategoriesFailed(error))
      .next()
      .isDone();
  });
});
