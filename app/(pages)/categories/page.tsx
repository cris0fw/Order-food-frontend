"use client";
import UserTabs from "@/app/components/layouts/UserTabs";
import useProfile from "@/app/components/useProfile";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { EditedCategory, GetAllCategories } from "@/app/types/index";
import DeleteButton from "@/app/components/layouts/DeleteButton";

const PageCategories = () => {
  const { loading: profileLoading, isAdmin: profileData } = useProfile();
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState<GetAllCategories | null>(
    null
  );

  const handleCategorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: EditedCategory = { name: newCategory };

    if (editedCategory) {
      data._id = editedCategory._id;

      try {
        await toast.promise(
          axios.put("/api/categories", { _id: data._id, name: data.name }),
          {
            loading: "Updating category",
            success: "Category updated",
            error: "Error, sorry",
          }
        );
        getAllCategories();
      } catch (error) {
        console.log(error);
        toast.error("Sorry, something went wrong");
      }
    } else {
      try {
        await toast.promise(axios.post("/api/categories", data), {
          loading: "Creating new category",
          success: "Category created",
          error: "Error, sorry",
        });
        getAllCategories();
        setNewCategory("");
        setEditedCategory(null);
      } catch (error) {
        console.log(error);
        toast.error("Sorry, something went wrong");
      }
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleDeleteClick = async (_id: string) => {
    try {
      const deleteCategory = axios.delete(`/api/categories?_id=${_id}`);

      await toast.promise(deleteCategory, {
        loading: "Deleting...",
        success: "Deleted",
        error: "Error",
      });

      getAllCategories();
    } catch (error) {
      console.log(error);
    }
  };

  if (profileLoading) {
    return "Loading user info";
  }

  if (!profileData) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <form onSubmit={handleCategorySubmit} className="mt-8">
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? "Updated category" : "New category name"}
              {editedCategory && (
                <>
                  <b>{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setNewCategory("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing Category: </h2>
        {categories.length > 0 &&
          categories.map((category: GetAllCategories) => (
            <div
              key={category._id}
              className="bg-gray-200 mb-1 rounded-xl p-2 px-4 flex gap-1 items-center"
            >
              <div className="grow">{category.name}</div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory({
                      _id: category._id,
                      name: category.name,
                    });
                    setNewCategory(category.name);
                  }}
                >
                  Edit
                </button>

                <DeleteButton
                  label="Delete"
                  onDelete={() => handleDeleteClick(category._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default PageCategories;
