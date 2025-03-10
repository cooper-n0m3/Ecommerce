import * as Yup from "yup";

export const ValidationSchema = Yup.object({
  tags: Yup.array()
    .min(1, "At least one item must be selected.")
    .max(5, "You can select up to 5 items.")
    .required("required"),
  productImage: Yup.array()
    .min(1, "Product IMages at least one file must be selected")
    .required("Product image is required"),
  uploadCertificate: Yup.array()
    .min(1, "Product Certificate at least one file must be selected")
    .required("Product Certificate is required"),
  skinType: Yup.array()
    .min(1, "at least one file")
    .required("skin-type is required"),
  productName: Yup.string().required("Product Name is required"),
  title: Yup.string().required("Title is required"),
  productBrand: Yup.array()
    .min(1, "At least one Brand Name must be selected.")
    .max(5, "You can select up to 5 items.")
    .required("required"),
  category: Yup.string().required("category is required"),
  certiciateLabel: Yup.string().required("Certificate Title is required"),
    keyIngredients: Yup.array()
    .min(1, "At least one item must be selected.")
    .max(5, "You can select up to 5 items.")
    .required("required"),
  price: Yup.number().required("Price is required"),
  discount: Yup.number().max(100, "Discount must be 1% to 100%"),
  productDescriptions: Yup.string().required("Description is required"),
  expireDate: Yup.array().required("Expiry date is required"),
  benefit: Yup.string().required("Benefit field is required"),
  usageInstruction: Yup.string().required("Usage Instruction is required"),
  stockQty: Yup.number().required("Stock Quantity is required"),
  sizeVolume: Yup.number().required("Size Volume is required"),
  uploadThumbnail: Yup.array()
    .min(1, "Product Thumbnail must be selected")
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
