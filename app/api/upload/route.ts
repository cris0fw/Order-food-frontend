import { v2 as cloudinary } from "cloudinary";
import { Buffer } from "buffer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as Blob;

    if (!file) {
      return new Response(JSON.stringify({ message: "No file uploaded" }), {
        status: 400,
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Subir la imagen a Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "profile_pictures" },
          (error, result) => {
            if (error) {
              reject(new Error("Error uploading to Cloudinary"));
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    return new Response(
      JSON.stringify({ url: (uploadResult as any).secure_url }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Error uploading file", error }),
      { status: 500 }
    );
  }
}
