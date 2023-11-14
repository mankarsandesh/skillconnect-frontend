import connectMongoDB from '@/libs/mongodb'
import Student from '@/models/student'
import { NextResponse } from 'next/server'

// Student Registeration API
export async function POST(request) {
	const {
		firstname,
		lastname,
		email,
		phoneno,
		whatsup,
		password,
		gender,
		country,
		state,
		city,
		pincode,
		dateofbirth,
		job_location,
		education_details,
		institute_name,
		course_type,
		course_name,
		specialization,
		grading_system,
		marks_grade,
		year_of_passing,
		upload_cv,
	} = await request.json()
	await connectMongoDB()
	const findStudentEmail = await Student.findOne({ email: email })
	const findStudentPhone = await Student.findOne({ phoneno: phoneno })
	if (findStudentEmail) {
		return NextResponse.json(
			{ message: 'Email id  already exists' },
			{ status: 201 }
		)
	}
	if (findStudentPhone) {
		return NextResponse.json(
			{ message: 'Phone Number already exists' },
			{ status: 201 }
		)
	}
	// console.log(findStudent, 'find')
	await Student.create({
		firstname,
		lastname,
		email,
		phoneno,
		whatsup,
		password,
		gender,
		country,
		state,
		city,
		pincode,
		dateofbirth,
		job_location,
		education_details,
		institute_name,
		course_type,
		course_name,
		specialization,
		grading_system,
		marks_grade,
		year_of_passing,
		upload_cv,
	})
	return NextResponse.json(
		{ message: 'Create Account Succsfully' },
		{ status: 200 }
	)
}

// Fetch Student Details API
export async function GET() {
	await connectMongoDB()
	const StudentData = await Student.find()
	console.log(StudentData, 'StudentData')
	return NextResponse.json({ StudentData })
}

// Delete Student Details API
export async function DELETE(request) {
	const id = request.nextUrl.searchParams.get('id')
	await connectMongoDB()
	await Topic.findByIdAndDelete(id)
	return NextResponse.json({ message: 'Topic deleted' }, { status: 200 })
}
