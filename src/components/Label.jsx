import React from 'react'

const Label = ({ label, required }) => {
	return (
		<label
			htmlFor="first_name"
			className="block text-sm font-semibold leading-6 text-gray-900"
		>
			{label} {required && <label className="text-red-500">*</label>}
		</label>
	)
}

export default Label
