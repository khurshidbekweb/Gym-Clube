import { useAuthState } from '@/stores/auth.store'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { registerSchema } from '@/lib/form.validation'

const Register = () => {
	const { setAuth } = useAuthState()

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: ""
		},
	})

	function onSubmit(values: z.infer<typeof registerSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
	  }

	return (
		<div className='flex flex-col'>
			<h2 className='text-xl font-bold'>Register</h2>
			<p className='text-muted-foreground'>
				Already have an account?{' '}
				<span
					className='text-blue-500 cursor-pointer hover:underline'
					onClick={() => setAuth('login')}
				>
					Sign in
				</span>
			</p>
			<Separator className='my-3' />
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email address</FormLabel>
								<FormControl>
									<Input placeholder="example@gmail.com" type='email' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='grid grid-cols-2 gap-4 mt-2'>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder="*******" type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm password</FormLabel>
									<FormControl>
										<Input placeholder="*******" type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button className='w-full' type="submit">Submit</Button>
				</form>
			</FormProvider>
		</div>
	)
}

export default Register
