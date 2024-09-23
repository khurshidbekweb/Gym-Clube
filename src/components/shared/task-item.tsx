import { Edit2, Trash } from 'lucide-react'
import { CiPlay1 } from 'react-icons/ci'
import { HiStatusOnline } from 'react-icons/hi'
import { MdOutlineTaskAlt } from 'react-icons/md'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { ITask, ITaskData } from '@/types'
import {RiPauseFill } from 'react-icons/ri'
import {RxReload} from 'react-icons/rx'
import { toast } from 'sonner'
import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import FillLoading from './fill-loading'
import { QueryObserverResult } from '@tanstack/react-query'

interface Props {
	task: ITask,
	isEditing: () => void,
	onDeleted: () => void,
	refetch: () => Promise<QueryObserverResult<ITaskData, Error>>
}

const TaskItem = ({task, isEditing, onDeleted, refetch}:Props) => {
	const [isLoading, setIsLoading] = useState(false)

	const onStart = async() => {
		setIsLoading(true)
		const ref = doc(db, 'task', task.id)
		try {
			await updateDoc(ref, {
				status: 'in_progress',
				startTime: Date.now(),
			})
			refetch()
		} catch (error) {
			toast.error("At somthinh want wrong 😰")
			console.log(error);			
		} finally{
			setIsLoading(false)
		}
	}	

	const onPause = async () => {
		const ref = doc(db, 'task', task.id)
		setIsLoading(true)
		try {
			const elepsed = task.startTime ? Date.now() - task.startTime : 0
			const totalTime = (task.totalTime || 0) + elepsed 
			await updateDoc(ref, {
				status: 'paused',
				startTime: Date.now(),
				totalTime
			})
			refetch()
		} catch (error) {
			console.log(error);	
			toast.error("At wrong")		
		} finally{
			setIsLoading(false)
		}
	}

	console.log(task);	
	return (
		<Card className='w-full p-4 shadow-md grid grid-cols-4 items-center relative'>
			{isLoading && <FillLoading/>}
			<div className='flex gap-1 items-center col-span-2'>
				<MdOutlineTaskAlt className='text-blue-500' />
				<span className='capitalize'>{task.title}</span>
			</div>
			<div className='flex gap-1 items-center'>
				<HiStatusOnline />
				<span className='capitalize text-sm'>{task.status}</span>
			</div>
			<div className='flex  gap-1 items-center justify-self-end'>
					{ButtonAction()}
				<Button variant={'secondary'} size={'icon'} className='w-8 h-8' onClick={isEditing}>
					<Edit2 className='w-5 h-5' />
				</Button>
				<Button variant={'destructive'} size={'icon'} className='w-8 h-8' onClick={onDeleted}>
					<Trash className='w-5 h-5' />
				</Button>
			</div>
		</Card>
	)
// Booton icons change function
function ButtonAction() {
	switch (task.status){
		case "unstarted":
			return (<Button variant={'ghost'} size={'icon'} className='w-8 h-8' onClick={onStart}>
						<CiPlay1 className='w-5 h-5 text-indigo-500' />
					</Button>)
					
		case "paused":
			return(
				<Button variant={'ghost'} size={'icon'} className='w-8 h-8' onClick={onStart}>
						<RxReload  className='w-5 h-5 text-indigo-500' />
					</Button>
		)
		case "in_progress": 
		return (<Button variant={'ghost'} size={'icon'} className='w-8 h-8' onClick={onPause}>
					<RiPauseFill  className='w-5 h-5 text-indigo-500' />
					</Button>)
	}
}
}

export default TaskItem
