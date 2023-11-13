import mongoose, { Schema } from 'mongoose'

const topicSchema = new Schema(
	{
		first_name: String,
		last_name: String,
		email: String,
		phone: String,
		whatsup: boolean,
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

const Topic = mongoose.models.Topic || mongoose.model('Topic', topicSchema)

export default Topic
