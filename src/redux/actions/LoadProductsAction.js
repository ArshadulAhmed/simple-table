import axios from "axios";
import { baseURL } from "../utils/ApiRequestPaths";
import {
  LOAD_ITEMS_START,
  LOAD_ITEMS_SUCCESS,
  LOAD_ITEMS_FAIL,
  REMOVE_ITEMS_START,
  REMOVE_ITEMS_SUCCESS,
  EDIT_RECORD_START,
  EDIT_RECORD_SUCCESS,
} from "../utils/types";

export const loadItems = (page) => (dispatch) => {
  dispatch({ type: LOAD_ITEMS_START });
  axios
    .get(`${baseURL}?_start=${page}&_limit=5`)
    .then((res) => {
      dispatch({
        type: LOAD_ITEMS_SUCCESS,
        payload: res,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOAD_ITEMS_FAIL,
      });
    });
};

export const removeTableItems = (id) => (dispatch) => {
  dispatch({ type: REMOVE_ITEMS_START });
  dispatch({ type: REMOVE_ITEMS_SUCCESS, payload: id });
};

export const editTableItems = (id, new_value) => (dispatch) => {
  dispatch({ type: EDIT_RECORD_START });
  dispatch({
    type: EDIT_RECORD_SUCCESS,
    payload: { id: id, value: new_value },
  });
};
