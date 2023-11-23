import connectMongoDB from '@/libs/mongodb'
import Student from '@/models/student'
import { NextResponse } from 'next/server'

// Edit Student Registeration API
export async function PUT(request, { params }) {
	const { id } = params
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
	await Student.findByIdAndUpdate(id, {
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
	return NextResponse.json({ message: 'Student updated' }, { status: 200 })
}

// fetch Student Information API
export async function GET(request, { params }) {
	const { id } = params
	await connectMongoDB()
	const studentData = await Student.findOne({ _id: id })
	return NextResponse.json({ studentData }, { status: 200 })
}
