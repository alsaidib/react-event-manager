// import { createStore, combineReducers } from "redux";


// const initaiState = {
//     result: 1,
//     lastValue: []
// };



// const mathReducer = (state = initaiState, action) => {               // if i dont hve the state yet the reducer <ill use the default or the initial state
//     switch (action.type) {
//         case "ADD":

//             state = {
//                 ...state,
//                 result: state.result + action.payload,  // taking the imutable value and add the payload 
//                 lastValue: [...state.lastValue, action.payload]           //pushing in the immutableWay  
//             }                                                  //    state.result+= action.payload


//             state.lastValue.push(action.payload)
//             //state = state + action.payload;
//             break;
//         case "SUBTRACT":
//             state = {
//                 ...state,
//                 result: state.result - action.payload,    // taking the imutable value and add the payload 
//                 lastValue: [...state.lastValue, action.payload]
//             }
//             state.lastValue.push(action.payload)// updating the LastValue
//             break;
//     }
//     return state;

// }

// const store = createStore(combineReducers({ mathReducer, userReducer }));  // {mathReducer:mathReducer, userReducer:userReducer}  => both they have multiple sub-state
// store.subscribe(() => {                             // subscribe means when ever the sotre updated fire the call back here
//     console.log("store updated", store.getState())    /// getState buildin func to give me the state
// })
// store.dispatch({
//     type: "ADD",
//     payload: 10
// });
// store.dispatch({
//     type: "SUBTRACT",
//     payload: 210
// })