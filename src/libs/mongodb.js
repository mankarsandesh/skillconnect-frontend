import mongoose from 'mongoose'
const connectMongoDB = async () => {
	try {
		await mongoose
			.connect(process.env.MONGODB_URI)
			.then(() => console.log(`Database connected successfully`))
			.catch((err) => console.log(err))
	} catch (error) {
		console.log(error)
		return error
	}
}

export default connectMongoDB
