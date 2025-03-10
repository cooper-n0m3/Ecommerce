import * as Yup from "yup";
export const ValidationSchema = Yup.object({
  categoryName: Yup.string().required("Category Name is required"),
  Slug: Yup.string().required("Category Slug is required"),
  Description: Yup.string().required("Description is required"),
  CategoryThumbnail: Yup.array()
    .min(1, "Category image one file must be selected")
    .required("Category image is required"),
});
