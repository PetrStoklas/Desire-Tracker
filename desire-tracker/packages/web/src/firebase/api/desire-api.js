import { useFirestore } from "react-redux-firebase";
import { uuid } from 'uuidv4';
// Locals
import { useUserId } from "../hooks";
import { queries } from "../queries";
import useCustomSnackbar from "../../components/snackbar";

/**
 * Used for creating new desire and saving them into DB
 * @returns {function(*): Promise<void>}
 */
export const useAddDesire = () => {
    const { enqueueSnackbar } = useCustomSnackbar();
    const firestore = useFirestore();
    const loggedInUserId = useUserId();

    return async (values, categoryId) => {
        try {
            const category = firestore.collection(queries.groups).doc(categoryId)
            // old desires
            const categoryRef = await category.get()
            const { desires } = categoryRef.data()

            // combining with newly created desires
            const newId = uuid();
            await category.update({
                desires: {
                    ...desires,
                    [newId]: {
                        ...values,
                        votes: 0,
                        createdAt: firestore.FieldValue.serverTimestamp(),
                        createdBy: loggedInUserId
                    },
                },
                numOfDesires: firestore.FieldValue.increment(1)
            })
            enqueueSnackbar("Desire added!", "success")
        } catch(err) {
            console.error(err)
            enqueueSnackbar("Oops something went wrong when creating desire!", "error")
        }
    }
}

export const useUpdateDesire = () => {
    const { enqueueSnackbar } = useCustomSnackbar();
    const firestore = useFirestore();
    const loggedInUserId = useUserId();

    return async (desireId, values) => {
        try {
            const desireToBeUpdated = firestore.collection(queries.users).doc(loggedInUserId).collection(queries.desires).doc(desireId)
            // TODO: Add some validations
            await desireToBeUpdated.update(values)
            enqueueSnackbar("Desire updated!", "success")
        } catch(err) {
            console.error(err)
            enqueueSnackbar("Oops something went wrong when updating desire!", "error")
        }
    }
}

export const useDeleteDesire = () => {
    const { enqueueSnackbar } = useCustomSnackbar();
    const firestore = useFirestore();
    const loggedInUserId = useUserId();

    return async (categoryId, desireId) => {
        try {
            const selectedCategory = firestore.collection(queries.groups).doc(categoryId)
            const selectedCategoryRef = await selectedCategory.get()
            const selectedCategoryData = selectedCategoryRef.data()
            const selectedCategoryDesires = selectedCategoryData[queries.desires]
            const selectedCategoryNumOfDesires = selectedCategoryData.numOfDesires

            const newDesires = Object.keys(selectedCategoryDesires).reduce((acc, key) => {
                if (desireId !== key) {
                    return { ...acc, [key]: { ...selectedCategoryDesires[key] } }
                }
                return acc
            }, {})

            const updatedCategory = await selectedCategory.update({
                desires: newDesires,
                numOfDesires: firestore.FieldValue.increment(-1),
                updatedBy: loggedInUserId,
                updatedAt: firestore.FieldValue.serverTimestamp(),
            })

            enqueueSnackbar("Desire deleted!", "success")
            return updatedCategory;
        } catch(err) {
            console.error(err)
            enqueueSnackbar("Oops something went wrong when deleting desire!", "error")
        }
    }
}
