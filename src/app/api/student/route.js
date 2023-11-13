import connectMongoDB from '@/libs/mongodb'
import Student from '@/models/student'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// Student Registeration API
export async function POST(request) {
	const {
		first_name,
		last_name,
		email,
		phone,
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
		upload_cv,
	} = await request.json()
	await connectMongoDB()
	const findStudentEmail = await Student.findOne({ email: email })
	const findStudentPhone = await Student.findOne({ phone: phone })
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
		first_name,
		last_name,
		email,
		phone,
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
		upload_cv,
	})
	return NextResponse.json(
		{ message: 'Create Account Succsfully' },
		{ status: 201 }
	)
}

// Fetch Student Details API
export async function GET() {
	await connectMongoDB()
	const Student = await Student.find()
	return NextResponse.json({ Student })
}

// Delete Student Details API
export async function DELETE(request) {
	const id = request.nextUrl.searchParams.get('id')
	await connectMongoDB()
	await Topic.findByIdAndDelete(id)
	return NextResponse.json({ message: 'Topic deleted' }, { status: 200 })
}
