import { db } from "@/firebase"
import { ITask, ITaskData } from "@/types"
import { collection, getDocs, query } from "firebase/firestore"


export const ServiceTask = {
    getTask:  async () => {
        let monthTotal = 0
        let total = 0
        let weekTotal = 0

        const q = query(collection(db, 'task'))
        const querySnapshot = await getDocs(q)

        let taskData: ITaskData

        const tasks = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        })) as ITask[]
        taskData = {
            tasks,
            monthTotal,
            total,
            weekTotal
        }
        return taskData
    }
}