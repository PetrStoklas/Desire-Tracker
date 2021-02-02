import { useFirestore } from "react-redux-firebase";
// import { uuid } from 'uuidv4';
// Locals
import { useUserId } from "../hooks";
import { queries } from "../queries";
import useCustomSnackbar from "../../components/snackbar";

export const useDeleteCategory = () => {
    const { enqueueSnackbar } = useCustomSnackbar();
    const firestore = useFirestore();
    const loggedInUserId = useUserId();

    return async (categoryId) => {
        if (!categoryId) return

        try {
            const batch = firestore.batch();

            // remove category from user
            const currentUser = firestore.collection(queries.users).doc(loggedInUserId)
            const currentUserRef = await currentUser.get();
            const currentUserData = currentUserRef.data();
            const currentUserGroups = currentUserData.groups || {}

            const newCurrentUserGroups = Object.keys(currentUserGroups).reduce((acc, key) => {
                if (key !== categoryId) {
                    return { ...acc, [key]: { ...currentUserGroups[key] } }
                }
                return acc
            }, {})

            const updatedData = {
                groups: newCurrentUserGroups,
                owningGroups: firestore.FieldValue.increment(-1)
            }

            await batch.update(currentUser, updatedData)

            // remove category from categories
            const categoryToBeDeleted = firestore.collection(queries.groups).doc(categoryId)
            const deletedCategory = await batch.delete(categoryToBeDeleted)

            await batch.commit()
            enqueueSnackbar("Categry deleted!", "success")
            return deletedCategory
        } catch(err) {
            console.error(err)
            enqueueSnackbar("Oops something went wrong when deleting category!", "error")
        }
    }
}
