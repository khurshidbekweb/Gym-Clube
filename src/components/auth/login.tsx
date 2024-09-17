import { useAuthState } from '@/stores/auth.store'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { loginSchema } from '@/lib/form.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from "zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { CiCircleAlert  } from 'react-icons/ci'
import FillLoading from '../shared/fill-loading'

const Login = () => {
	const [isloading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const { setAuth } = useAuthState()

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: '' },
	})

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		const {email, password} = values
		setIsLoading(true)
		try {
			
			const res = await signInWithEmailAndPassword(auth, email, password)
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
			{!isloading && <FillLoading/>} 
			<h2 className='text-xl font-bold'>Login</h2>
			<p className='text-muted-foreground'>
				Don't have an account?{' '}
				<span
					className='text-blue-500 cursor-pointer hover:underline'
					onClick={() => setAuth('register')}
				>
					Sign up
				</span>
			</p>
			<Separator className='my-3' />
			{error && <Alert variant="destructive" className='shadow-md flex items-center gap-2'>
				<CiCircleAlert size={25}/>
				<div className="">
				<AlertTitle>Login 🔑</AlertTitle>
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
									<Input placeholder="example@gmail.com" type='email' disabled={isloading} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input placeholder="*******" type='password' disabled={isloading}  {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className='w-full' type="submit" disabled={isloading} >Submit</Button>
				</form>
			</FormProvider>
		</div>
	)
}

export default Login
