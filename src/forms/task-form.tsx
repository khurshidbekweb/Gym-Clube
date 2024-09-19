import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { taskSchema } from "@/lib/form.validation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
    title?: string,
    onEdit?: boolean,
    onClose?: () => void,
    handler: (values: z.infer<typeof taskSchema>) => Promise<void | null>
}


const TaskForm = ({title = '', handler} : Props) => {
    const [isloading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof taskSchema>>({
        resolver: zodResolver(taskSchema),
        defaultValues: { title },
    })

    async function onSubmit(values: z.infer<typeof taskSchema>) {
        setIsLoading(true)
        const response = handler(values).finally(() => setIsLoading(false))

        toast.promise(response, {
            loading: "Loading...",
            success: 'Successfull',
            error: 'Error 😰'
        })
    }
    return (
        <div>  
            <Separator/>         
            <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className=" mt-2 space-y-4">
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
        </div>
    );
};

export default TaskForm;