'use client'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { useEffect, useState } from 'react'
const people = [
	{
		name: 'Lindsay Walton',
		title: 'Front-end Developer',
		department: 'Optimization',
		email: 'lindsay.walton@example.com',
		role: 'Member',
		image:
			'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		name: 'Lindsay Walton',
		title: 'Front-end Developer',
		department: 'Optimization',
		email: 'lindsay.walton@example.com',
		role: 'Member',
		image:
			'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		name: 'Lindsay Walton',
		title: 'Front-end Developer',
		department: 'Optimization',
		email: 'lindsay.walton@example.com',
		role: 'Member',
		image:
			'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		name: 'Lindsay Walton',
		title: 'Front-end Developer',
		department: 'Optimization',
		email: 'lindsay.walton@example.com',
		role: 'Member',
		image:
			'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		name: 'Lindsay Walton',
		title: 'Front-end Developer',
		department: 'Optimization',
		email: 'lindsay.walton@example.com',
		role: 'Member',
		image:
			'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	// More people...
]

// async function getData() {
// 	axios
// 		.get('http://localhost:3000/api/student/')
// 		.then((res) => {
// 			return res.data
// 		})
// 		.catch((error) => {
// 			console.error(error)
// 		})
// }

export default function Example() {
	const [data, setData] = useState(null)
	const [isLoading, setLoading] = useState(true)

	useEffect(() => {
		fetch('/api/student/')
			.then((res) => res.json())
			.then((data) => {
				console.log(data, 'sandesh')
				setData(data.StudentData)
				setLoading(false)
			})
	}, [])

	if (isLoading)
		return (
			<div class="grid h-screen place-items-center">
				<img
					className="h-14 w-auto"
					src="https://d2ordbtgj864gn.cloudfront.net/assets/frontend/images/logo/skillsconnect-logo.webp"
					alt="home"
				/>
			</div>
		)
	if (!data) return <p>No profile data</p>
	return (
		<div className="px-4 sm:px-6 lg:px-8 bg-white p-10 ">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-base font-semibold leading-6 text-gray-900">
						Students
					</h1>
					<p className="mt-2 text-sm text-gray-700">
						A list of all the students in your account including their name,
						title, email and role.
					</p>
				</div>
			</div>
			<div className="mt-8 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table className="min-w-full divide-y divide-gray-300">
							<thead>
								<tr>
									<th
										scope="col"
										className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
									>
										Name
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Phone
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Job Location
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Date
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Address
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Resume
									</th>
									<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
										<span className="sr-only">Edit</span>
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white">
								{data.map((person) => (
									<tr key={person.email}>
										<td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
											<div className="flex items-center">
												<div className="h-11 w-11 flex-shrink-0">
													<img
														className="h-11 w-11 rounded-full"
														src="https://avatars.githubusercontent.com/u/55863239?v=4"
														alt={person.name}
													/>
													{/* <Image
														src={person.image}
														width={100}
														height={500}
														src={person.name}
													/> */}
												</div>
												<div className="ml-4">
													<div className="font-medium text-gray-900 capitalize">
														{person.first_name} &nbsp;
														{person.last_name}
													</div>
													<div className="mt-1 text-gray-500">
														{person.email}
													</div>
												</div>
											</div>
										</td>
										<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
											<div className="text-gray-900">
												{person.phone}{' '}
												{person.whatsup && (
													<span
														title="Avaible on Whatsup"
														className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
													>
														W
													</span>
												)}
											</div>
										</td>
										<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
											<div className="text-gray-900">{person.job_location}</div>
										</td>
										<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
											{person.updatedAt}
										</td>
										<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 ">
											<div className="text-gray-900">
												{person.country} &nbsp; {person.state}{' '}
											</div>
											<div className="mt-1 text-gray-500">
												{person.city} {person.pincode}
											</div>
										</td>
										<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 ">
											<div className="text-gray-900">
												<Link
													href="#"
													className="text-indigo-600 hover:text-indigo-900"
												>
													Download CV
												</Link>
											</div>
										</td>
										<td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
											<Link
												href="#"
												className="text-indigo-600 hover:text-indigo-900"
											>
												Edit
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}
