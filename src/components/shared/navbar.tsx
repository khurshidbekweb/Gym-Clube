import { navLinks } from '@/constants'
import { Button } from '../ui/button'
import { ModeToggle } from './mode-toggle'
import { Link, useNavigate } from 'react-router-dom'
import { useUserState } from '@/store/user.store'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {CgGym} from 'react-icons/cg'
import { LogOut } from 'lucide-react'
import { auth } from '@/firebase'

const Navbar = () => {
	const { user, setUser } = useUserState()
	const navigate = useNavigate()

	const onLogOut = () => {
		auth.signOut().then(()=>{
			setUser(null)
			navigate('/')
		})
	}
	
	return (
		<div className='w-full h-[10vh] border-b fixed inset-0 z-50 bg-background'>
			<div className='container max-w-6xl mx-auto h-full flex justify-between items-center'>
				<Link to={'/'}><h1 className='text-2xl font-bold uppercase'>workout</h1></Link>
				<div className='flex items-center gap-3'>
					{navLinks.map(nav => (
						<a
							href={nav.path}
							key={nav.path}
							className='font-medium hover:underline'
						>
							{nav.label}
						</a>
					))}
					<ModeToggle />
					{user ?
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Avatar>
								<AvatarImage className='w-[30px] rounded-full' src={user?.photoURL!} />
								<AvatarFallback>{user.email![0]}</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent  className='w-80' align='start' forceMount alignOffset={11}>
							<div className="flex flex-col space-y-3">
								<p className='font-medium text-muted-foreground text-xs'>{user.email}</p>
								<div className="flex items-center gap-3">
									<div className="w-12 rounded-md p-1 bg-secondary">
										<Avatar>
											<AvatarImage className='rounded-full ' src={user?.photoURL!} />
											<AvatarFallback>{user.email![0]}</AvatarFallback>
										</Avatar>
									</div>
									<div className="space-y-1 w-[60%]">
										<p className='line-clamp-1 text-md'>{user.displayName ?? user.email}</p>
									</div>
								</div>
							</div>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
									<DropdownMenuItem>
										<CgGym size={20}/>
										<Link to={'/gym'} className='block ml-3 text-md font-semibold'>Gym</Link>
									</DropdownMenuItem>
									<DropdownMenuItem className='cursor-pointer bg-destructive' onClick={onLogOut}>
										<LogOut className='w-5'/>
										<span className='block ml-2 text-md font-semibold'>Log out</span>
									</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
						</DropdownMenu> : 
						<Link to={'/auth'}><Button variant={'secondary'}>Join Free</Button></Link>}
				</div>
			</div>
		</div>
	)
}


export default Navbar
