import connectMongoDB from '@/libs/mongodb'
import Student from '@/models/student'
import { NextResponse } from 'next/server'

// Edit Student Registeration API
export async function PUT(request, { params }) {
	const { id } = params
	const { newTitle: title, newDescription: description } = await request.json()
	await connectMongoDB()
	await Student.findByIdAndUpdate(id, { title, description })
	return NextResponse.json({ message: 'Student updated' }, { status: 200 })
}

// fetch Student Information API
export async function GET(request, { params }) {
	const { id } = params
	await connectMongoDB()
	const studentData = await Student.findOne({ _id: id })
	return NextResponse.json({ studentData }, { status: 200 })
}
