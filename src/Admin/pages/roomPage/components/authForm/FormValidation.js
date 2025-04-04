import * as Yup from "yup";

export const ValidationSchema = Yup.object({
  hotelId: Yup.string().required("Hotel is required."),
  roomType: Yup.string().required("Room type is required."),
  capacity: Yup.string().required("Capacity customer is required."),
  pricePerNight: Yup.number()
    .min(1, "Price per night must be number value.")
    .required("Price per night is required"),
  description: Yup.string().required("Descriptoin is required."),
  roomThumbnail: Yup.array()
    .min(1, "Thumbnail must be selected")
    .required("Product image is required"),
    roomImage: Yup.array()
    .min(1, "Thumbnail must be selected")
    .max(5,'Images out of limit')
    .required("Product image is required"),
});

export const validationSchemaDraft = Yup.object({
  productName: Yup.string().required("Product Name is required"),
  productBrand: Yup.array()
    .min(1, "At least one Brand Name must be selected.")
    .max(5, "You can select up to 5 items.")
    .required("required"),
  category: Yup.string().required("category is required"),
  price: Yup.number().required("Product Price is required"),
  expireDate: Yup.array().required("Expiry date is required"),
});
