import {
  LOAD_ITEMS_START,
  LOAD_ITEMS_SUCCESS,
  LOAD_ITEMS_FAIL,
  REMOVE_ITEMS_START,
  REMOVE_ITEMS_SUCCESS,
  REMOVE_ITEMS_FAIL,
  EDIT_RECORD_START,
  EDIT_RECORD_SUCCESS,
} from "../utils/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ITEMS_START:
      return {
        ...state,
        ...action.payload,
        isLoading: true,
      };

    case LOAD_ITEMS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };

    case LOAD_ITEMS_FAIL:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };

    case REMOVE_ITEMS_START:
      return {
        ...state,
        ...action.payload,
        isLoading: true,
      };

    case REMOVE_ITEMS_SUCCESS:
      return {
        ...state,
        data: state.data.filter((item) => {
          return item.id !== action.payload.id;
        }),

        isLoading: false,
      };

    case REMOVE_ITEMS_FAIL:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };

    case EDIT_RECORD_START:
      return {
        ...state,
        ...action.payload,
        isLoading: true,
      };

    case EDIT_RECORD_SUCCESS:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.payload.id) {
            item.title = action.payload.value;
          }
          return item;
        }),

        isLoading: false,
      };

    default:
      return state;
  }
}
