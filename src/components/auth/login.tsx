import { useAuthState } from '@/stores/auth.store'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'

const Login = () => {
	const { setAuth } = useAuthState()

	return (
		<div className='flex flex-col'>
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
			<div>
				<span>Email</span>
				<Input placeholder='example@gmail.com' />
			</div>
			<div className='mt-2'>
				<span>Password</span>
				<Input placeholder='*****' type='password' />
			</div>
			<Button className='w-full h-12 mt-2'>Login</Button>
		</div>
	)
}

export default Login
