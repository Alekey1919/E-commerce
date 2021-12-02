let cartFromLocalStorage;

if (localStorage.getItem("shoppingCart")) {
  cartFromLocalStorage = JSON.parse(localStorage.getItem("shoppingCart"));
} else {
  cartFromLocalStorage = [];
}

export const initialState = {
  basket: cartFromLocalStorage,
};

// Selector

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.totalPrice + amount, 0);
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      let indexInner = 0;
      let theIndex;
      let isRepeated = false;
      let innerItem;
      state.basket.forEach((item) => {
        if (item.id === action.item.id) {
          item.quantity += action.item.quantity;
          item.totalPrice += action.item.totalPrice;
          innerItem = item;
          isRepeated = true;
          theIndex = indexInner;
        }
        if (!isRepeated) {
          innerItem = action.item;
        }
        indexInner++;
      });

      if (isRepeated) {
        state.basket[theIndex] = innerItem;
        return {
          ...state,
          basket: [...state.basket],
        };
      } else {
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
      }

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as it's not in the basket!`
        );
      }
      return { ...state, basket: newBasket };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "CLEAR_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "INCREMENT_BY_ONE":
      let indexInnerAdd = 0;
      let theIndexAdd = null;
      state.basket.forEach((item) => {
        if (item.id === action.item.id) {
          theIndexAdd = indexInnerAdd;
        }
        indexInnerAdd++;
      });

      state.basket[theIndexAdd].quantity = action.item.quantity;
      state.basket[theIndexAdd].totalPrice = action.item.totalPrice;

      return {
        ...state,
        basket: [...state.basket],
      };

    case "DECREMENT_BY_ONE":
      let indexInnerRemove = 0;
      let theIndexRemove = null;
      state.basket.forEach((item) => {
        if (item.id === action.item.id) {
          theIndexRemove = indexInnerRemove;
        }
        indexInnerRemove++;
      });

      state.basket[theIndexRemove].quantity = action.item.quantity;
      state.basket[theIndexRemove].totalPrice = action.item.totalPrice;

      return {
        ...state,
        basket: [...state.basket],
      };

    default:
      return state;
  }
};

export default reducer;
