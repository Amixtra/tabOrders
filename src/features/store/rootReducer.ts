import { combineReducers } from "redux";
import cartReducer from "features/cart/cartReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from ".";

const rootReducer = combineReducers({
  cart: cartReducer,
});

// component에서 type 추론을 위한 설정
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default rootReducer;
