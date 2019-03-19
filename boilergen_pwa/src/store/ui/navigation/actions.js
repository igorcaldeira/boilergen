import * as Type from "./actionsTypes";

const setNavigation = (url, stateInitial) => ({
    url,
    stateInitial, 
    type: Type.NAVIGATION
})

export {
    setNavigation
}