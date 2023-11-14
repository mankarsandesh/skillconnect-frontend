import mongoose, { Schema } from 'mongoose'

const StudentSchema = new Schema(
	{
		firstname: String,
		lastname: String,
		email: String,
		phoneno: String,
		whatsup: Boolean,
		password: String,
		gender: String,
		country: { label: String, value: String },
		state: String,
		cities: { label: String, value: String },
		pincode: Number,
		dateofbirth: Date,
		job_location: String,
		education_details: String,
		institute_name: { label: String, value: String },
		course_type: { label: String, value: String },
		course_name: { label: String, value: String },
		specialization: String,
		grading_system: { label: String, value: String },
		marks_grade: String,
		year_of_passing: String,
		upload_cv: {
			data: Buffer,
			contentType: String,
		},
	},
	{
		timestamps: true,
	}
)

const Student =
	mongoose.models.Student || mongoose.model('Student', StudentSchema)

export default Student
