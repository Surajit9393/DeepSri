import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // No backend email handling is required anymore with FormSubmit
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // You can log or process the form data if needed here (no SMTP necessary)
    console.log('Received form submission:', { name, email, message })

    return NextResponse.json(
      { message: 'Message submitted successfully, check your email!' },
      { status: 200 }
    )
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Full error details:', error)
    } else {
      console.error('An unknown error occurred:', error)
    }

    return NextResponse.json(
      {
        error: 'Failed to process message',
        details: (error instanceof Error) ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
