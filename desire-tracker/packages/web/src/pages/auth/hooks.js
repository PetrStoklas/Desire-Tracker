import { useSelector } from "react-redux";

export const useIsLoggedIn = () => useSelector(state => state.firebase.auth.isLoaded && !state.firebase.auth.isEmpty)
