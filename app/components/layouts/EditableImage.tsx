import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { EditableImageProps } from "@/app/types/index";

const EditableImage = (props: EditableImageProps) => {
  const { link, setLink } = props;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const files = e.target.files;

      if (files?.length === 1) {
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "orderfood");

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/db4yerdo5/image/upload`,
          data
        );

        if (res.status === 200) {
          setLink(res.data.secure_url);
          toast.success("Image uploaded successfully!");
        } else {
          toast.error("Upload failed!");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during image upload.");
    }
  };

  return (
    <>
      {link && (
        <Image
          src={link as string}
          width={250}
          height={250}
          alt="avatar"
          className="rounded-lg w-full h-full mb-1"
        />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No Image
        </div>
      )}

      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
          Edit
        </span>
      </label>
    </>
  );
};

export default EditableImage;
