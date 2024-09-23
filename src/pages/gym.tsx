import FillLoading from '@/components/shared/fill-loading';
import TaskItem from '@/components/shared/task-item'
import { Button } from '@/components/ui/button'
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator'
import { db } from '@/firebase';
import TaskForm from '@/forms/task-form';
import { taskSchema } from '@/lib/form.validation';
import { ServiceTask } from '@/services/service-tak';
import { useUserState } from '@/store/user.store';
import { ITask } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { addMilliseconds, addMinutes, format } from 'date-fns';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { BadgePlus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';


const Gym = () => {
	const [open, setOpen] = useState(false)
	const [editing, setEditing] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [current, setCurrent] = useState<ITask | null>(null)
	const { user } = useUserState()

	const { data, isPending, refetch } = useQuery({
		queryKey: ['task-data'],
		queryFn: ServiceTask.getTask
	})

	const onAdd = async ({ title }: z.infer<typeof taskSchema>) => {
		return addDoc(collection(db, 'task'), {
			title,
			status: 'unstarted',
			startTime: null,
			endTime: null,
			userId: user?.uid
		}).then(() => {
			setOpen(false)
			refetch()
		})
	}

	const onUpdate = async ({ title }: z.infer<typeof taskSchema>) => {
		return current && updateDoc(doc(db, 'task', current?.id), { title }).then(() => {
			setOpen(false)
			refetch()
		}).finally(() => setEditing(false))
	}

	const onDeleted = async (id: string) => {
		setIsDeleting(true)
		const promise = deleteDoc(doc(db, 'task', id)).then(() => refetch()).finally(() => setIsDeleting(false))

		toast.promise(promise, {
			loading: "Loading...",
			error: "Samthing went wrong ?",
			success: "Saccessfull"
		})
	}

	const onStartEditing = (task: ITask) => {
		setEditing(true)
		setCurrent(task)
	}

	const formatTime = (time: number) => {
		const date = addMilliseconds(new Date(0), time)
		const formatDate = format(addMinutes(date, date.getTimezoneOffset()), 'HH:mm:ss')

		return formatDate
	}


	return (
		<>
			<div className='h-screen max-w-6xl mx-auto flex items-center px-5'>
				<div className='grid lg:grid-cols-2 md:grid-cols-1 w-full gap-8 items-center'>
					<div className='flex flex-col space-y-3'>
						<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-background to-secondary'>
							<div className='text-2xl font-bold'>Trainings</div>
							<Button size={'icon'} onClick={() => setOpen(true)}>
								<BadgePlus size={20} />
							</Button>
						</div>
						<Separator />
						<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-b from-background to-secondary relative min-h-60'>
							{isPending || isDeleting && <FillLoading />}
							{data && (
								<div className='flex flex-col space-y-3 w-full'>
									{!editing && data.tasks.map((task) => (
										<TaskItem task={task} refetch={refetch} onDeleted={() => onDeleted(task.id)} isEditing={() => onStartEditing(task)} key={task.id} />
									))}
									{editing && <TaskForm
										title={current?.title}
										onEdit
										onClose={() => setEditing(false)}
										handler={onUpdate}
									/>}
								</div>
							)}
						</div>
					</div>

					<div className='flex flex-col space-y-3 w-full'>
						<div className='p-4 rounded-md bg-gradient-to-r from-blue-900 to-background relative h-24'>
							<div className='text-2xl font-bold'>Total week</div>
							{isPending ? <FillLoading /> : data && <>
								<div className='text-3xl font-bold'>{formatTime(data.weekTotal)}</div>
							</>}
						</div>
						<div className='p-4 rounded-md bg-gradient-to-r from-secondary to-background relative h-24'>
							<div className='text-2xl font-bold'>Total month</div>
							{isPending ? <FillLoading /> : data && <>
								<div className='text-3xl font-bold'>{formatTime(data.monthTotal)}</div>
							</>}
						</div>
						<div className='p-4 rounded-md bg-gradient-to-r from-destructive to-background relative h-24'>
							<div className='text-2xl font-bold'>Total time</div>
							{isPending ? <FillLoading /> : data && <>
								<div className='text-3xl font-bold'>{formatTime(data.total)}</div>
							</>}
						</div>
					</div>
				</div>
			</div>
			{/* Dialog item */}
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger></DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className='mb-1'>Create a new task !</DialogTitle>
						<TaskForm handler={onAdd} />
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default Gym;