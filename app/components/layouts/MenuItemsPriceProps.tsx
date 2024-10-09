import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { MenuItemsPriceProp, ExtraPrice } from "@/app/types/index";

const MenuItemsPriceProps = (props: MenuItemsPriceProp) => {
  const { sized, setSized, name, addLabel } = props;
  const [isOpen, setIsOpen] = useState(false);

  const addSize = () => {
    setSized((oldSizes) => [...oldSizes, { _id: "", name: "", price: 0 }]);
  };

  const removeSize = (indexToRemove: number) => {
    setSized((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const editSize = ({
    ev,
    index,
    prop,
  }: {
    ev: React.ChangeEvent<HTMLInputElement>;
    index: number;
    prop: keyof ExtraPrice;
  }) => {
    const newValue = ev.target.value;

    setSized((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index] = {
        ...newSizes[index],
        [prop]: prop === "price" ? parseFloat(newValue) : newValue,
      };
      return newSizes;
    });
  };

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex p-1 border-0 justify-start"
        type="button"
      >
        {isOpen && <FaChevronUp />}
        {!isOpen && <FaChevronDown />}
        <span>{name}</span>
        <span>({sized?.length})</span>
      </button>

      <div className={isOpen ? "block" : "hidden"}>
        {sized.length > 0 &&
          sized.map((size, index) => (
            <div key={index} className="flex items-end gap-2">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Size name"
                  value={size.name}
                  onChange={(ev) => editSize({ ev, index, prop: "name" })}
                />
              </div>
              <div>
                <label>Extra Price</label>
                <input
                  type="text"
                  placeholder="Extra price"
                  value={size.price}
                  onChange={(ev) => editSize({ ev, index, prop: "price" })}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="bg-white mb-2 px-2"
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            </div>
          ))}
        <button type="button" onClick={addSize} className="bg-white ">
          <CiCirclePlus /> {addLabel}
        </button>
      </div>
    </div>
  );
};

export default MenuItemsPriceProps;
