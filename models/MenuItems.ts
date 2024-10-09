import mongoose, { model, models, Schema } from "mongoose";

const ExtraPricesSchema = new Schema({
  name: String,
  price: Number,
});

const MenuItemsSchema = new Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    basePrice: {
      type: Number,
    },
    sizes: {
      type: [ExtraPricesSchema],
    },
    extraIngredientPrices: {
      type: [ExtraPricesSchema],
    },
  },
  {
    timestamps: true,
  }
);

const MenuItem = models.MenuItem || model("MenuItem", MenuItemsSchema);
export default MenuItem;
