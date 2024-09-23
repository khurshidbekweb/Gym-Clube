import { db } from "@/firebase"
import { ITask, ITaskData } from "@/types"
import { collection, getDocs, query } from "firebase/firestore"
import {endOfMonth, endOfWeek, isWithinInterval, startOfMonth, startOfWeek} from 'date-fns'


export const ServiceTask = {
    getTask:  async () => {
        let monthTotal = 0
        let total = 0
        let weekTotal = 0

        const q = query(collection(db, 'task'))
        const querySnapshot = await getDocs(q)

        const now = new Date()
        const startWeek = startOfWeek(now)
        const endWeek = endOfWeek(now)
        const startMonth = startOfMonth(now)
        const endMonth = endOfMonth(now)

        let taskData: ITaskData

        querySnapshot.docs.forEach(doc => {
            const data = doc.data()
            const taskDate = new Date(data.startTime)
            const taskTime = data.totalTime || 0

            if(isWithinInterval(taskDate, {start: startWeek, end: endWeek})){
                weekTotal+=taskTime
            }
            if(isWithinInterval(taskDate, {start: startMonth, end: endMonth})){
                monthTotal+=taskTime
            }
            total+=taskTime
        })

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