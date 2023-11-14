'use client'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
const navigation = [
	{ name: 'Home', href: '/' },
	{ name: 'About', href: '#' },
	{ name: 'Blogs', href: '#' },
	{ name: 'Webinar', href: '#' },
]

export default function Example() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<header className="bg-white border-b-2">
			<nav
				className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 "
				aria-label="Global"
			>
				<div className="flex lg:flex-1">
					<div href="#" className="-m-1.5 p-1.5">
						<span className="sr-only">SkillConnect</span>
						<Link href="/">
							<img
								className="h-8 w-auto cursor-pointer"
								src="https://d2ordbtgj864gn.cloudfront.net/assets/frontend/images/logo/skillsconnect-logo.webp"
								alt="home"
							/>
						</Link>
					</div>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<div className="hidden lg:flex lg:gap-x-12">
					{navigation.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
						>
							{item.name}
						</Link>
					))}
				</div>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					<Link
						href="/registration"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Registration <span aria-hidden="true">&rarr;</span>
					</Link>
				</div>
			</nav>
			<Dialog
				as="div"
				className="lg:hidden"
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
			>
				<div className="fixed inset-0 z-10" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<Link href="#" className="-m-1.5 p-1.5">
							<span className="sr-only">SkillConnect</span>
							<img
								className="h-8 w-auto"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
								alt=""
							/>
						</Link>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								{navigation.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer"
									>
										{item.name}
									</Link>
								))}
							</div>
							<div className="py-6">
								<Link
									href="/registration"
									className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer"
								>
									Register
								</Link>
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</header>
	)
}
