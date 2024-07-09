import { NextRequest, NextResponse } from 'next/server';
import User from '@/app/models/registrationSchema';
import { connectDB } from '@/app/database/db';

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const { _id, firstName, lastName, birthYear, country, city } =
      await request.json();

    const user = await User.findById(_id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.about_user.firstName = firstName;
    user.about_user.lastName = lastName;
    user.about_user.birthYear = birthYear;
    user.about_user.country = country;
    user.about_user.city = city;

    await user.save();
    return NextResponse.json(
      {
        message: 'User updated successfully',
        firstName: user.about_user.firstName,
        lastName: user.about_user.lastName,
        birthYear: user.about_user.birthYear,
        country: user.about_user.country,
        city: user.about_user.city,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}
