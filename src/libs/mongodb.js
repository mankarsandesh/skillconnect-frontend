import mongoose from 'mongoose'
const connectMongoDB = async () => {
	try {
		await mongoose
			.connect(process.env.MONGODB_URI)
			.then(() => console.log(`Database connected successfully`))
			.catch((err) => console.log(err))
	} catch (error) {
		console.log(error)
	}
	// const client = new MongoClient(process.env.MONGODB_URI)
	// try {
	// 	const database = client.db('Skillconnect')
	// 	const student = database.collection('student')
	// 	// Query for a movie that has the title 'Back to the Future'
	// 	const query = { title: 'Back to the Future' }
	// 	const movie = await student.findOne(query)
	// 	console.log(movie)
	// } finally {
	// 	// Ensures that the client will close when you finish/error
	// 	await client.close()
	// }
}

export default connectMongoDB
