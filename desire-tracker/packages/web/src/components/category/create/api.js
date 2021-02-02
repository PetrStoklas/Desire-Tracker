import { useFirestore } from "react-redux-firebase";
// Locals
import { useUserId } from "../../../firebase/hooks";
import { queries } from "../../../firebase/queries";

export const useCreateNewGroup = () => {
    const firestore = useFirestore();
    const loggedInUserId = useUserId();

    return async (values) => {
        try {
            const batch = firestore.batch()
            // Create new group
            const groups = firestore.collection(queries.groups)
            const newGroupRef = groups.doc()
            const newGroup = {
                ...values,
                createdBy: loggedInUserId,
                createdAt: firestore.FieldValue.serverTimestamp(),
                members: {
                    [loggedInUserId]: {
                        role: 'owner',
                        joinedAt: firestore.FieldValue.serverTimestamp()
                    }
                },
                desires: {},
                numOfDesires: 0
            }

            await batch.set(newGroupRef, newGroup)

            // Assigning new group to user
            const currentUser = firestore.collection(queries.users).doc(loggedInUserId)
            const currentUserRef = await currentUser.get();
            const currentUserData = currentUserRef.data()
            const currentUserGroups = currentUserData.groups || {}
            // const currentUserOwningGroups = currentUserData.owningGroups || 0

            await batch.update(currentUser, {
                groups: {
                    ...currentUserGroups,
                    [newGroupRef.id]: {
                        title: values.title,
                        role: 'owner'
                    }
                },
                owningGroups: firestore.FieldValue.increment(1)
            })

            await batch.commit()

            return newGroupRef.id
        } catch(err) {
            console.error(err)
            // TODO: Toast
        }
    }
}
