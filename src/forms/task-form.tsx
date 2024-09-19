import { Button } from "@/components/ui/button";
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { db } from "@/firebase";
import { taskSchema } from "@/lib/form.validation";
import { useUserState } from "@/store/user.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";

import { BadgePlus } from 'lucide-react'
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


const TaskForm = () => {
    const [isloading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const {user} = useUserState()

    const form = useForm<z.infer<typeof taskSchema>>({
        resolver: zodResolver(taskSchema),
        defaultValues: { title: "" },
    })

    async function onSubmit(values: z.infer<typeof taskSchema>) {
        const { title } = values
        setIsLoading(true)
        const response = addDoc(collection(db, 'task'), {
            title,
            status: 'unstatted',
            startTime: null,
            endTime: null,
            userId: user?.uid
        }).then(()=> setOpen(false)).finally(() => setIsLoading(false))

        toast.promise(response, {
            loading: "Loading...",
            success: 'Successfull',
            error: 'Error 😰'
        })

    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger><BadgePlus size={20} /></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a new task !</DialogTitle>
                    </DialogHeader>
                    <Separator />
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Enter a task 💪" type='text' disabled={isloading} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end">
                                <Button type="submit" disabled={isloading} >Submit</Button> 
                            </div>
                        </form>
                    </FormProvider>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default TaskForm;