import React from 'react'

const Error = ({ errors }) => {
	return
	{
		errors.firstname?.type === 'required' && (
			<p role="alert">First name is required</p>
		)
	}
}

export default Error
