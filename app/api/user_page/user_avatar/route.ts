import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  // Выводим информацию о полях формы и файлах
  formData.forEach((value, name) => {
    if (value instanceof File) {
      console.log(
        `File field: ${name}, filename: ${value.name}, size: ${value.size}`
      );
    } else {
      console.log(`Text field: ${name}, value: ${value}`);
    }
  });

  return NextResponse.json({ message: 'Form data received successfully.' });
}
