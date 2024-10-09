"use client";
import React, { useState } from "react";
import { UseFormProps } from "@/app/types/index";
import EditableImage from "./EditableImage";
import useProfile from "../useProfile";
import AddressInputs from "./AddressInputs";

const UseForm = (props: UseFormProps) => {
  const { user, onSave } = props;

  const [username, setUsername] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { isAdmin } = useProfile();

  const handleAddressChange = (propName: string, value: string) => {
    if (propName === "phone") setCity(value);
    if (propName === "streetAddress") setStreetAddress(value);
    if (propName === "portalCode") setPostalCode(value);
    if (propName === "city") setCity(value);
    if (propName === "country") setCountry(value);
  };

  return (
    <div className="md:flex gap-4">
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: username,
            image,
            phone,
            streetAddress,
            city,
            country,
            postalCode,
            admin,
          })
        }
      >
        <label>Username</label>
        <input
          type="text"
          placeholder="First and last name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input type="email" disabled={true} value={user?.email} />

        <AddressInputs
          disabled={false}
          addressProps={{ phone, streetAddress, postalCode, city, country }}
          setAddressProps={handleAddressChange}
        />

        {isAdmin && (
          <div>
            <label
              htmlFor="adminCb"
              className="p-2 inline-flex items-center gap-2 mb-2"
            >
              <input
                checked={admin}
                value={1}
                onChange={(ev) =>
                  setAdmin((ev.target as HTMLInputElement).checked)
                }
                type="checkbox"
                className=""
                id="adminCb"
              />
              <span>Admin</span>
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UseForm;
