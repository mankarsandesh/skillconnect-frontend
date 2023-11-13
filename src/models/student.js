import mongoose, { Schema } from 'mongoose'

const StudentSchema = new Schema(
	{
		first_name: String,
		last_name: String,
		email: String,
		phone: String,
		whatsup: Boolean,
		password: String,
		gender: String,
		country: String,
		state: String,
		city: String,
		pincode: Number,
		dateofbirth: Date,
		job_location: String,
		education_details: String,
		upload_cv: String,
	},
	{
		timestamps: true,
	}
)

const Student =
	mongoose.models.Student || mongoose.model('Student', StudentSchema)

export default Student
