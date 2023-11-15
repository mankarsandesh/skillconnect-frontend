'use client'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Example() {
	const [data, setData] = useState(null)
	const [isLoading, setLoading] = useState(true)

	const handleDelete = (personId) => {
		fetch(`/api/student?id=${personId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((data) => {
			console.log(data, 'sandesh')
		})
	}

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
			<div className="grid h-screen place-items-center ">
				<div>
					<h2 className="text-2xl text-center mb-4">Loading...</h2>
					<img
						className="h-14 w-auto"
						src="https://d2ordbtgj864gn.cloudfront.net/assets/frontend/images/logo/skillsconnect-logo.webp"
						alt="home"
					/>
				</div>
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
						{data.length > 0 ? (
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
										<th
											scope="col"
											className="relative py-3.5 pl-3 pr-4 sm:pr-0"
										>
											<span className="sr-only">Edit</span>
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
									{data.map((person, index) => (
										<tr key={index}>
											<td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
												<div className="flex items-center">
													<div className="h-11 w-11 flex-shrink-0">
														<img
															className="h-11 w-11 rounded-full"
															src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
															alt={person.firstname}
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
															{person.firstname} &nbsp;
															{person.lastname}
														</div>
														<div className="mt-1 text-gray-500">
															{person.email}
														</div>
													</div>
												</div>
											</td>
											<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
												<div className="text-gray-900">
													{person.phoneno}
													{person.whatsup && (
														<span
															title="Avaible on Whatsup"
															className="ml-2 inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
														>
															W
														</span>
													)}
												</div>
											</td>
											<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
												<div className="text-gray-900">
													{person.job_location}
												</div>
											</td>
											<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
												{person.updatedAt}
											</td>
											<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 ">
												<div className="text-gray-900">
													{person.country?.label} &nbsp; {person.state}{' '}
												</div>
												<div className="mt-1 text-gray-500">
													{person.city?.label} {person.pincode}
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
													className="text-[#c03e8e] hover:text-[#c03e8e]"
												>
													Edit
												</Link>{' '}
												<button
													onClick={handleDelete(person._id)}
													className="text-red-500 hover:text-red-600"
												>
													Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<div className="text-red-500">
								There are no data fetch. please refresh the page.
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
