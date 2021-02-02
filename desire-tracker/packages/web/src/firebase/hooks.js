import { useSelector } from "react-redux";

export const useAuthLoaded = () =>
    useSelector((state) => state.firebase.auth.isLoaded);

export const useAuthEmpty = () =>
    useSelector((state) => state.firebase.auth.isEmpty);

export const useIsLogged = () =>
    useSelector((state) =>
        state.firebase.auth.isLoaded && !state.firebase.auth.isEmpty,
);

export const useUserId = () =>
    useSelector((state) =>
        state.firebase.auth.isLoaded && !state.firebase.auth.isEmpty ? state.firebase.auth.uid : "",
);

export const useHowManyGroupsIOwn = () =>
    useSelector(state =>
        state.firestore.data.me && state.firestore.data.me.owningGroups)

export const useOrdered = (select) =>
    useSelector((state) => state.firestore.ordered[select]);

export const useData = (select, subSelect) =>
    useSelector(state => {
      if (subSelect) {
        const all = state.firestore.data[select]
        return all ? all[subSelect] : {}
      }

      return state.firestore.data[select]
    });

