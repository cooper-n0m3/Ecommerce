import * as Yup from "yup";
export const ValidationSchema = Yup.object({
  name: Yup.string().required("Hotel's Name is required"),
  location: Yup.string().required("Hotel's location is required"),
  description: Yup.string().required("Hotel's description is required"),
  starRating: Yup.string().required("Hotel's Star Rating is required"),
  amenties: Yup.array()
  .min(1, "Amenties at least one tag must be selected")
  .required("Amenties is required"),
  hotelImage: Yup.array()
    .min(1, "Category image one file must be selected")
    .required("Category image is required"),
    hotelThumbnail: Yup.array()
    .min(1, "Category image one file must be selected")
    .required("Category image is required"),
});
