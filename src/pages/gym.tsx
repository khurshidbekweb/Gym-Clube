import TaskItem from '@/components/shared/task-item'
import { Button } from '@/components/ui/button'
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator'
import { db } from '@/firebase';
import TaskForm from '@/forms/task-form';
import { taskSchema } from '@/lib/form.validation';
import { useUserState } from '@/store/user.store';
import { addDoc, collection } from 'firebase/firestore';
import { BadgePlus } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';


const Gym = () => {
    const [open, setOpen] = useState(false)
	const {user} = useUserState()
	const onAdd = async ({title}: z.infer<typeof taskSchema>) => {
		return addDoc(collection(db,'task'), {
			title,
			status: 'usstarted',
			startTime: null,
			endTime: null,
			userId: user?.uid
		}).then(() => setOpen(false))
	}

    return (
		<>
        <div className='h-screen max-w-6xl mx-auto flex items-center'>
			<div className='grid grid-cols-2 w-full gap-8 items-center'>
				<div className='flex flex-col space-y-3'>
					<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-background to-secondary'>
						<div className='text-2xl font-bold'>Trainings</div>
						<Button size={'icon'} onClick = {() => setOpen(true)}>
							<BadgePlus size={20} />
						</Button>						
					</div>
					<Separator />
					<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-b from-background to-secondary relative min-h-60'>
						<div className='flex flex-col space-y-3 w-full'>
							{Array.from({ length: 3 }).map((_, idx) => (
								<TaskItem key={idx}/>
							))}
						</div>
					</div>
				</div>

				<div className='flex flex-col space-y-3 relative w-full'>
					<div className='p-4 rounded-md bg-gradient-to-r from-blue-900 to-background relative h-24'>
						<div className='text-2xl font-bold'>Total week</div>
						<div className='text-3xl font-bold'>02:08:47</div>
					</div>
					<div className='p-4 rounded-md bg-gradient-to-r from-secondary to-background relative h-24'>
						<div className='text-2xl font-bold'>Total week</div>
						<div className='text-3xl font-bold'>02:08:47</div>
					</div>
					<div className='p-4 rounded-md bg-gradient-to-r from-destructive to-background relative h-24'>
						<div className='text-2xl font-bold'>Total week</div>
						<div className='text-3xl font-bold'>02:08:47</div>
					</div>
				</div>
			</div>
		</div>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger></DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle className='mb-1'>Create a new task !</DialogTitle>
							<TaskForm handler={onAdd}/>
						</DialogHeader>
					</DialogContent>
				</Dialog>
		</>
    );
};

export default Gym;