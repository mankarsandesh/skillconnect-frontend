'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
export default function Input({
	name,
	label,
	type,
	register,
	errors,
	required,
	validationSchema,
}) {
	return (
		<>
			<label
				htmlFor={name}
				className="block text-sm font-semibold leading-6 text-gray-900"
			>
				{label}
				{required && '*'}
				{register} ddssds
			</label>
			<div className="mt-2.5 ">
				<input {...register(name, { required })} />
				{/* <input
					{...register(name, validationSchema)}
					type={type}
					name={name}
					id={name}
					autoComplete="given-name"
					className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/> */}
				{errors && errors[name]?.type === 'required' && (
					<span className="error">{errors[name]?.message}</span>
				)}
				{errors && errors[name]?.type === 'minLength' && (
					<span className="error">{errors[name]?.message}</span>
				)}
			</div>
		</>
	)
}
