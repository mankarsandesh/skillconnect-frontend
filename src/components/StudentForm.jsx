'use client'
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { ChevronDownIcon, PhotoIcon, EyeIcon } from '@heroicons/react/20/solid'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { Switch } from '@headlessui/react'
import { ToastContainer, toast } from 'react-toastify'
function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}
import {
	country,
	cities,
	courseType,
	courseNames,
	gradingSystem,
	institute_List,
} from '@/constants/index'
import Input from '@/components/Input'
import Label from './Label'

const schema = Yup.object().shape({
	firstname: Yup.string().label('First Name').required().min(3).max(64),
	lastname: Yup.string().label('First Name').trim().required().min(3).max(64),
	email: Yup.string()
		.label('email')
		.email('Invalid email format')
		.required()
		.min(3)
		.max(64),
	phoneno: Yup.string().label('Phone number').trim().required().min(8).max(10),
	password: Yup.string().label('Password').trim().required().min(3).max(12),
	gender: Yup.string().label('Gender').required(),
	country: Yup.object()
		.shape({
			label: Yup.string().required('Country is required '),
			value: Yup.string().required('Country is required'),
		})
		.label('Country')
		.nullable() // for handling null value when clearing options via clicking "x"
		.required('country is required '),
	cities: Yup.object()
		.shape({
			label: Yup.string().required('Cities is required '),
			value: Yup.string().required('Cities is required'),
		})
		.label('Cities')
		.nullable() // for handling null value when clearing options via clicking "x"
		.required('Cities is required '),
	state: Yup.string().label('State').required().min(3).max(12),
	pincode: Yup.string().label('Pincode').required().min(6).max(6),
	dateofbirth: Yup.string().label('Date of Birth').required().min(3).max(12),
	job_location: Yup.string().label('Job Location').required().min(3).max(12),
	education: Yup.string().label('Education').required(),
	institute_name: Yup.object()
		.shape({
			label: Yup.string().required('institute name is required '),
			value: Yup.string().required('institute name is required'),
		})
		.label('institute name')
		.nullable() // for handling null value when clearing options via clicking "x"
		.required('institute name is required '),
	course_type: Yup.object().label('Course Type').required(),
	course_name: Yup.object().label('Course Name').required(),
	specialization: Yup.string()
		.label('Specialization')
		.required('Specialization name is required'),
	grading_system: Yup.object()
		.shape({
			label: Yup.string().required('Grading name is required '),
			value: Yup.string().required('Grading name is required'),
		})
		.label('Grading System')
		.nullable()
		.required('grading system is required'),
	marks_grade: Yup.string().label('Marks grade').required(),
	year_of_passing: Yup.string().label('Year of passing').required(),
	resume: Yup.string().label('Resune').required(),
	i_agree: Yup.string().label('I Agree').required(),
})
const defaultValues = {
	firstname: 'Tushar',
	lastname: 'Hadawale',
	email: 'tushar@skillconect.com  ',
	phoneno: '7397273972',
	password: 'tushar',
	gender: 'Male',
	country: '',
	cities: '',
	state: '',
	pincode: '',
	dateofbirth: '',
	job_location: '',
	education: '',
	institute_name: '',
	course_type: '',
	course_name: '',
	specialization: '',
	grading_system: '',
	marks_grade: '',
	year_of_passing: '',
	resume: '',
	i_agree: '',
}
export default function StudentForm() {
	const {
		control,
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm({
		resolver: yupResolver(schema),
	})
	const methods = useForm()
	const router = useRouter()
	const [agreed, setAgreed] = useState(false)
	const [mobileWhatsup, setMobileWhatsup] = useState(false)
	const [page, setPage] = useState(1)
	const [passVisible, setPassVisible] = useState(false)
	const [uploadedPhotos, setUploadedPhotos] = useState([])
	const [data, setData] = useState(null)
	const [isLoading, setLoading] = useState(false)

	const onSubmit = (data) => {
		setLoading(true)

		console.log(data, 'data')
		if (!agreed) {
			setLoading(false)
			return toast('Please check Privacy policy and Terms conditions')
		}
		var newData = { whatsup: mobileWhatsup }
		Object.assign(data, newData)
		fetch('/api/student/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.message === 'success') {
					toast('Student Register Successfully')
					router.push('/')
				} else {
					toast(data.message)
				}
			})
		setLoading(false)
	}
	// var storage = multer.diskStorage({
	// 	destination: function (req, file, cb) {
	// 		cb(null, 'uploads')
	// 	},
	// 	filename: function (req, file, cb) {
	// 		cb(null, file.fieldname + '-' + Date.now())
	// 	},
	// })
	const handleUpload = (e) => {
		console.log(typeof e.target.files)
		const files = e.target.files[0]
		console.log(files)
		setUploadedPhotos(files)
		// setPhotoPreview(
		// 	uploadedPhotos.map((photo) =>
		// 		Object.assign(photo, {
		// 			preview: URL.createObjectURL(photo),
		// 		})
		// 	)
		// )
		console.log(files)
	}

	function registerStudent() {
		fetch('/api/student/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setData(data.StudentData)
				setLoading(false)
			})
	}

	return (
		<form
			action="#"
			method="POST"
			className="mx-auto   w-6/6 sm:mt-10"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div>
				<h2 className="text-xl text-[#c03e8e]">Basic Details</h2>
				<div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 ">
					<div>
						<Label label="First Name" required />
						<div className="mt-2.5 ">
							<input
								{...register('firstname')}
								type="text"
								name="firstname"
								autoComplete="given-name"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							{errors.firstname && (
								<p className="error">{errors.firstname.message}</p>
							)}
						</div>
					</div>
					<div>
						<Label label="Last Name" required />
						<div className="mt-2.5 ">
							<input
								{...register('lastname')}
								type="text"
								name="lastname"
								autoComplete="given-name"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							{errors.lastname?.type === 'required' && (
								<p className="error">Last name is required</p>
							)}
						</div>
					</div>
					<div className="sm:col-span-1">
						<Label label="Email" required />
						<div className="mt-2.5 ">
							<input
								{...register('email')}
								type="text"
								name="email"
								autoComplete="given-name"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							<p className="error">
								{errors.email?.message || errors.email?.label.message}
							</p>
						</div>
					</div>

					<div className="sm:col-span-1">
						<Label label="Phone no" required />
						<div className=" mt-2.5  border rounded-md flex shadow-sm">
							<span className="pointer-events-none  flex items-center pl-3 text-gray-700 font-semibold pr-4 bg-gray-300">
								+91
							</span>
							<input
								type="tel"
								name="phoneno"
								id="phoneno"
								autoComplete="tel"
								className="block w-full  border-none px-3.5 py-2  text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-none sm:text-sm sm:leading-6"
								{...register('phoneno')}
							/>
							{/* {errors.phoneno?.type === 'required' && (
								<p className="error">Phone no is required</p>
							)} */}
						</div>
						<p className="error">
							{errors.phoneno?.message || errors.phoneno?.label.message}
						</p>
					</div>

					<div className="sm:col-span-1">
						<Label label="Password" required />
						<div className="relative mt-2.5">
							<input
								{...register('password')}
								type={passVisible ? 'text' : 'password'}
								name="password"
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							<div className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3">
								<EyeIcon
									className="h-5 w-5 text-gray-400 "
									aria-hidden="true"
									onClick={() => setPassVisible(!passVisible)}
								/>
							</div>
							{errors.password?.type === 'required' && (
								<p className="error">Password is required</p>
							)}
						</div>
					</div>

					<div className="sm:col-span-1">
						<Label label="Gender" required />
						<div className="mt-2.5">
							<input
								type="radio"
								name="gender"
								value="Male"
								{...register('gender')}
							/>{' '}
							<label className="mr-2">Male</label>
							<input
								type="radio"
								name="gender"
								value="Female"
								{...register('gender')}
							/>{' '}
							<label>Female</label>
						</div>
						<p className="error">
							{errors.gender?.message || errors.gender?.label.message}
						</p>
					</div>
					<Switch.Group as="div" className="flex gap-x-4 sm:col-span-1    ">
						<div className="flex h-6 items-center">
							<Switch
								checked={mobileWhatsup}
								onChange={setMobileWhatsup}
								className={classNames(
									mobileWhatsup ? 'bg-[#c03e8e]' : 'bg-gray-200',
									'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
								)}
							>
								<span className="sr-only">Agree to policies</span>
								<span
									aria-hidden="true"
									className={classNames(
										mobileWhatsup ? 'translate-x-3.5' : 'translate-x-0',
										'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
									)}
								/>
							</Switch>
						</div>
						<Switch.Label className="text-sm leading-6 text-gray-600">
							Check this box if this is not a Whatsapp Number
						</Switch.Label>
					</Switch.Group>
					<div className="sm:col-span-1">
						<Label label="Country" required />
						<div className="mt-2">
							<Controller
								name="country"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										isClearable
										className="react-dropdown"
										classNamePrefix="dropdown"
										options={country}
										// value={country.find((c) => c.value === value)}
									/>
								)}
							/>

							<p className="error">
								{errors.country?.message || errors.country?.label.message}
							</p>
						</div>
					</div>

					<div className="sm:col-span-1 ">
						<Label label="City" required />
						<div className="mt-2">
							<Controller
								control={control}
								name="cities"
								render={({ field }) => (
									<Select
										{...field}
										isClearable
										options={cities}
										className="react-dropdown"
										classNamePrefix="dropdown"
									/>
								)}
							/>
							<p className="error">
								{errors.cities?.message || errors.cities?.label.message}
							</p>
						</div>
					</div>

					<div className="sm:col-span-1">
						<Label label="State" required />
						<input
							{...register('state')}
							type="text"
							name="state"
							autoComplete="email"
							className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
						{errors.state?.type === 'required' && (
							<p className="error">state is required</p>
						)}
					</div>

					<div className="sm:col-span-1">
						<Label label="Zip / Postal Code" required />
						<input
							{...register('pincode')}
							type="number"
							name="pincode"
							className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
						{/* {errors.pincode?.type === 'required' && (
							<p className="error">Pincode is required</p>
						)} */}
						<p className="error">
							{errors.pincode?.message || errors.pincode?.label.message}
						</p>
					</div>

					<div className="sm:col-span-1">
						<Label label="Date of Birth" required />
						<input
							{...register('dateofbirth')}
							type="date"
							name="dateofbirth"
							className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
						{errors.dateofbirth?.type === 'required' && (
							<p className="error">date of birth is required</p>
						)}
					</div>

					<div className="sm:col-span-1">
						<Label label="Job Location" required />
						<input
							{...register('job_location')}
							type="text"
							name="job_location"
							className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
						{errors.job_location?.type === 'required' && (
							<p className="error">Job Location is required</p>
						)}
					</div>

					<div className="sm:col-span-2">
						<Label label="Education details" required />

						<div className="mt-2 flex  flex-col py-2">
							<div className="flex">
								<div>
									<input
										type="radio"
										name="education"
										value="Doctorate"
										{...register('education')}
									/>{' '}
									<label className="mr-2">Doctorate</label>
								</div>
								<div>
									<input
										type="radio"
										name="education"
										value="Post Graduate"
										{...register('education')}
									/>{' '}
									<label className="mr-2">Post Graduate</label>
								</div>
								<div>
									<input
										type="radio"
										name="education"
										value="Graduate"
										{...register('education')}
									/>{' '}
									<label className="mr-2">Graduate</label>
								</div>
								<div>
									<input
										type="radio"
										name="education"
										value="Under Graduate"
										{...register('education')}
									/>{' '}
									<label className="mr-2">Under Graduate</label>
								</div>
							</div>

							<div>
								<p className="error">
									{errors.education?.message || errors.education?.label.message}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-10">
				<h2 className="text-xl text-[#c03e8e]">Graduate Details</h2>
				<div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 ">
					<div>
						<Label label="Institute Name" required />
						<div className="mt-2.5">
							<Controller
								control={control}
								name="institute_name"
								render={({ field }) => (
									<Select {...field} isClearable options={institute_List} />
								)}
							/>
							<p className="error">
								{errors.institute_name?.message ||
									errors.institute_name?.label.message}
							</p>
						</div>
					</div>
					<div>
						<Label label="Course Type" required />
						<div className="mt-2.5">
							<Controller
								control={control}
								rules={{
									required: true,
								}}
								name="course_type"
								render={({ field }) => (
									<Select
										{...field}
										isClearable
										classNamePrefix="addl-class"
										options={courseType}
									/>
								)}
							/>
							<p className="error">
								{errors.course_type?.message ||
									errors.course_type?.label.message}
							</p>
						</div>
					</div>
					<div>
						<Label label="Course Name" required />

						<div className="mt-2.5">
							<Controller
								control={control}
								name="course_name"
								render={({ field }) => (
									<Select
										{...field}
										isClearable
										classNamePrefix="addl-class"
										options={courseNames}
									/>
								)}
							/>
							<p className="error">
								{errors.course_name?.message ||
									errors.course_name?.label.message}
							</p>
						</div>
					</div>
					<div>
						<Label label="Specialization" required />
						<input
							{...register('specialization')}
							type="text"
							name="specialization"
							className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
						<p className="error">
							{errors.specialization?.message ||
								errors.specialization?.label.message}
						</p>
					</div>
					<div>
						<Label label="Grading system" required />

						<div className="mt-2.5">
							<Controller
								control={control}
								name="grading_system"
								render={({ field }) => (
									<Select
										{...field}
										isClearable
										classNamePrefix="addl-class"
										options={gradingSystem}
									/>
								)}
							/>
							<p className="error">
								{errors.grading_system?.message ||
									errors.grading_system?.label.message}
							</p>
						</div>
					</div>
					<div>
						<Label label="Your marks / grade" required />
						<input
							{...register('marks_grade')}
							type="number"
							name="marks_grade"
							className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
						{errors.marks_grade?.type === 'required' && (
							<p className="error">Marks Grade is required</p>
						)}
					</div>

					<div>
						<Label label="Year of passing" required />
						<input
							{...register('year_of_passing')}
							type="month"
							min="2010-08"
							name="year_of_passing"
							className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
						{errors.year_of_passing?.type === 'required' && (
							<p className="error">Year of passing is required</p>
						)}
					</div>
				</div>
				<h2 className="text-xl mt-4 text-[#c03e8e]">
					Upload CV <label className="text-red-500">*</label>
				</h2>
				<div className="col-span-full">
					<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
						<div className="text-center">
							<PhotoIcon
								className="mx-auto h-12 w-12 text-gray-300"
								aria-hidden="true"
							/>
							{uploadedPhotos && <h2>{uploadedPhotos.name}</h2>}
							<div className="text-center mt-4 flex text-sm leading-6 text-gray-600">
								<label
									htmlFor="file-upload"
									className="relative cursor-pointer rounded-md bg-white font-semibold text-[#c03e8e] focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
								>
									<span>Upload a file</span>

									<input
										{...register('resume', {
											validate: {
												lessThan10MB: (files) =>
													files[0]?.size < 300000 || 'Max 30kb',
												// acceptedFormats: (files) =>
												//   ["image/jpeg", "image/png", "image/gif"].includes(
												//     files[0]?.type
												//   ) || "Only PNG, JPEG e GIF"
											},
										})}
										type="file"
										onChange={handleUpload}
										id="file-upload"
										name="file-upload"
										className="sr-only"
										accept="application/pdf"
									/>
								</label>
								<p className="pl-1">or drag and drop</p>
							</div>
							<p className="text-xs leading-5 text-gray-600">
								Only PDF is allowed & max size should not be greater then 2MB
							</p>
							{errors.resume?.type === 'required' && (
								<p className="error">Please Upload Your Resume.</p>
							)}
						</div>
					</div>
					<input
						{...register('i_agree')}
						type="checkbox"
						name="i_agree"
						value={agreed}
						onChange={(e) => setAgreed(!agreed)}
						className="mt-4"
					/>
					&nbsp;I have read and agreed to the following policies - Privacy
					Policy, Terms & Conditions before proceeding.
					{!agreed && (
						<p className="error">
							Please check Privacy policy and Terms conditions
						</p>
					)}
				</div>
			</div>

			<div className="mt-10 flex gap-3">
				<button
					disabled={isLoading}
					type="submit"
					className="block w-full rounded-md bg-[#c03e8e] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#c03e8e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c03e8e]"
				>
					{isLoading ? 'Loading...' : 'Submit Form'}
				</button>
			</div>
		</form>
	)
}
