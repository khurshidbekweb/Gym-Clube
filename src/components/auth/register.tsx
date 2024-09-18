import { useAuthState } from '@/stores/auth.store'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { FormProvider, useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { registerSchema } from '@/lib/form.validation'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { useNavigate } from 'react-router-dom'
import FillLoading from '../shared/fill-loading'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { CiCircleAlert } from 'react-icons/ci'

const Register = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const { setAuth } = useAuthState()
	const navigate = useNavigate()

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: ""
		},
	})

	const onSubmit = async(values: z.infer<typeof registerSchema>) => {
		const {email, password} = values
		setIsLoading(true)
		try {
			const res = await createUserWithEmailAndPassword(auth, email, password)
			console.log(res);			
			navigate('/')
		} catch (error) {
			const result = error as Error
			setError(result.message)
		} finally{
			setIsLoading(false)
		}
	}

	return (
		<div className='flex flex-col'>
			{isLoading && <FillLoading/>} 
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
			{error && <Alert variant="destructive" className='shadow-md flex items-center gap-2'>
				<CiCircleAlert size={25}/>
				<div className="">
				<AlertTitle>Register 🔐</AlertTitle>
				<AlertDescription>
					{error.slice(10)}
				</AlertDescription>
				</div>
			</Alert>}
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email address</FormLabel>
								<FormControl>
									<Input placeholder="example@gmail.com" type='email' disabled={isLoading} {...field} />
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
										<Input placeholder="*******" type='password' disabled={isLoading} {...field} />
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
										<Input placeholder="*******" type='password' disabled={isLoading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button className='w-full' type="submit" disabled={isLoading}>Submit</Button>
				</form>
			</FormProvider>
		</div>
	)
}

export default Register
