import React, { useEffect, useState } from "react";
import axios from "axios";
import EditableImage from "./EditableImage";
import { MenuItemFormProps, GetAllCategories } from "@/app/types/index";
import MenuItemsPriceProps from "./MenuItemsPriceProps";

const MenuItemForm = (props: MenuItemFormProps) => {
  const { menuItem, onSubmit } = props;

  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || 0);
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(menuItem?.category || "");

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

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraIngredientPrices,
          category,
        })
      }
      className="mt-8 max-w-2xl mx-auto"
    >
      <div className="md:grid items-start gap-4">
        <div>
          <div
            style={{ gridTemplateColumns: ".3fr .7fr" }}
            className="p-2 rounded-lg relative max-w-[100px]"
          >
            <EditableImage link={image} setLink={setImage} />
          </div>
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
          <label>Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
          />

          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.length > 0 &&
              categories.map((item: GetAllCategories) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
          </select>
          <label>Base price</label>
          <input
            value={basePrice}
            onChange={(e) => setBasePrice(Number(e.target.value))}
            type="text"
          />

          <MenuItemsPriceProps
            name="Sizes"
            addLabel="Add item Sizes"
            sized={sizes}
            setSized={setSizes}
          />
          <MenuItemsPriceProps
            name="Extra ingredients"
            addLabel="Add ingredients prices"
            sized={extraIngredientPrices}
            setSized={setExtraIngredientPrices}
          />

          <button
            type="submit"
            className="bg-primary text-white rounded p-2 mt-4"
          >
            Add Menu Item
          </button>
        </div>
      </div>
    </form>
  );
};

export default MenuItemForm;
