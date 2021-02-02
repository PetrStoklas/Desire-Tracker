import { useFirestore } from "react-redux-firebase";
// Locals
import {queries} from "../../firebase/queries";

export const useVoteForDesire = (categoryId) => {
  const firestore = useFirestore();

  return async (desireId) => {
    try {
      const category = firestore.collection(queries.groups).doc(categoryId)
      const categoryRef = await category.get()
      const categoryData = categoryRef.data()

      const updatedDesires = {
        ...categoryData.desires,
        [desireId]: {
          ...categoryData.desires[desireId],
          votes: firestore.FieldValues.increment(1)
        }
      }

      // TODO: add some information about the update
      const newValues = {
        ...categoryData,
        desires: updatedDesires
      }

      await category.update(newValues)
    } catch(err) {
      console.error(err)
    }
  }
}
