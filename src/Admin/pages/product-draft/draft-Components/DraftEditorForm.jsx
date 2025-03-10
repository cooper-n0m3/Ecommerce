import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { initializeValue } from "../../product/components/authForm/initializeComponents.js"; 
import { productTypeOptions,productTags,productMerkOptions } from "../../product/components/SelectOptions.js";
import StepperCompleted from "../../product/components/Stepper.jsx";
import { Flowbite } from "flowbite-react";
import TagsSelect from "../../product/components/TagsSelect.jsx";
import AreaTabText from "../../product/components/AreaTabText.jsx";
import DateRangePicker from "../../product/components/DateRangePicker.jsx";
import FileSingleUploader from "./DraftFileSingleUploader.jsx";
import FileSingleUploader from "./DraftFileSingleUploader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { draftEditorSave,getProductDraftById
} from "../../../../redux/features/products/productActions.js";
import toast from "react-hot-toast";

const DraftEditorForm = ({ productId }) => {
  const dispatch = useDispatch();

  //State-Alert to all child that form submitted
  const [reset, setReset] = useState(false);
  // Prodcut
  const [product, setProduct] = useState(null);
  // Draft Product State
  const { allProduct, isLoading } = useSelector((state) => state.product);
  const [brand, setBrand] = useState([]);
  const [skinType, setSkinType] = useState([]);
  const [tag, setTag] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const [productThumbnail, setProductThumbnail] = useState([]);
  const [productCertificate, setProductCertificate] = useState([]);

  const [completedStep, setCompletedStep] = useState(-1);
  const data = useSelector((state) => state.product.categories[1]);
  const category = data?.category || [];
  const CategorySelect = [];
  category.forEach((item) => {
    CategorySelect.push({ label: item.categoryName, value: item.id });
  });

  useEffect(() => {
    // const matchProduct = allProduct.find(item=>item.id==productId)
    if (!productId || isNaN(productId)) {
      console.error("Invalid product ID");
      return;
    }
    const matchedProduct = allProduct.find((item) => item.id == productId);
    if (matchedProduct) {
      // Use the product from Redux
      setProduct(matchedProduct);
    } else {
      // Dispatch an action to fetch the product if not found in Redux
      dispatch(getProductDraftById({ productId }));
    }
  }, [productId, allProduct]);

  useEffect(() => {
    // Update local state when Redux state changes
    if (!product && allProduct.length > 0) {
      const matchedProduct = allProduct.find((item) => item.id == productId);
      if (matchedProduct) {
        setProduct(matchedProduct);
      }
    }
  }, [allProduct, product, productId]);

  const handleSubmit = async (values) => {
    setReset(true);
    // console.log(values);
    setProduct([]);
    setProductImage([]);
    setProductThumbnail([]);
    setProductCertificate([]);
    const pId = productId;
    toast.promise(dispatch(draftEditorSave({ pId, values })).unwrap(), {
      loading: "Saving...",
      success: () => {
        setReset(false);
        return "Product edit successfully!";
      },
      error: () => {
        return "Failed to save product.";
      },
    });
  };

  return (
    <>
      <Flowbite>
        <Formik
          initialValues={initializeValue}
          // validationSchema={ValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleBlur, setFieldValue }) => {
            useEffect(() => {
              let completed = 0;
              for (const key in values) {
                if (
                  values[key] &&
                  (Array.isArray(values[key])
                    ? values[key].length > 0
                    : values[key] !== "")
                ) {
                  completed += 1;
                }
              }
              setFieldValue(
                "discountPrice",
                values.price && values.discount
                  ? (
                      values.price -
                      values.price * (values.discount / 100)
                    ).toFixed(2)
                  : values.price
                  ? values.price
                  : ""
              );
              setCompletedStep(completed);
            }, [values]);
            useEffect(() => {
              setFieldValue("productName", product?.name ?? "");
              setFieldValue("title", product?.title ?? "");
              setFieldValue("price", product?.price ?? "");
              setFieldValue("sizeVolume", product?.sizeVolume ?? "");
              setFieldValue("discount", product?.discountPercent ?? "");
              setFieldValue("discountPrice", product?.name ?? "");
              setFieldValue("productDescriptions", product?.description ?? "");
              setFieldValue("stockQty", product?.quantity ?? "");
              setFieldValue("benefit", product?.benefit ?? "");
              setFieldValue(
                "usageInstruction",
                product?.usageInstruction ?? ""
              );
              setFieldValue("certiciateLabel", product?.certificateTitle ?? "");
              //multip select
              const brand =
                product?.brand && product.brand !== "undefined"
                  ? product.brand.split(",")
                  : [];
              const tag =
                product?.tag && product.tag !== "undefined"
                  ? product.tag.split(",")
                  : [];
              const skinType =
                product?.skinType && product.skinType !== "undefined"
                  ? product.skinType.split(",")
                  : [];
              const keyIngredient =
                product?.ingredient && product.ingredient !== "undefined"
                  ? product.ingredient.split(",")
                  : [];
              const productImage = product?.productImageUrl?.split(",") ?? [];
              const productThumbnail =
                product?.productThumbnail?.split(",") ?? [];
              const certificateImage =
                product?.certificateImageUrl?.split(",") ?? [];

              setProductImage(productImage);
              setProductThumbnail(productThumbnail);
              setProductCertificate(certificateImage);
              setBrand(brand);
              setTag(tag);
              setIngredient(keyIngredient);
              setSkinType(skinType);
            }, [allProduct, product, productId]);
            return (
              <Form
                method="POST"
                className="w-full flex-col flex gap-2 border-opacity-60"
              >
                <div className="w-full border-b pb-3 border-gray-500">
                  <StepperCompleted completed={completedStep} />
                </div>
                <div className="w-full grid grid-cols-2 gap-2 border-opacity-60">
                  <div className="col-span-2">
                    <h3 className="font-bold border-b border-gray-600 p-2 text-gray-300 mb-2">
                      Basic Information
                    </h3>
                    <div className="mb-2 mt-2 p-1 w-full flex flex-col">
                      <label
                        htmlFor="productName"
                        className="text-gray-400 flex gap-1"
                      >
                        Product Name
                      </label>
                      <Field
                        className="h-[35px]   focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
                        type="text"
                        as="input"
                        name="productName"
                        id="productName"
                        autoComplete="off"
                      />

                      <ErrorMessage name="productName">
                        {(msg) => <div className="text-red-600">{msg}</div>}
                      </ErrorMessage>
                    </div>
                    <div className="mb-2 p-1 w-full flex flex-col">
                      <label className="text-gray-400 flex gap-1">Brand</label>
                      <TagsSelect
                        defaultSelect={brand}
                        MAX_SELECT={5}
                        defaultData={productMerkOptions}
                        name="productBrand"
                        typeSelect="tags"
                        onBlur={handleBlur}
                        onChange={setFieldValue}
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="w-full flex justify-between font-bold border-b border-gray-600 p-2">
                      <h3 className="w-6/12 text-gray-300">
                        Product Image Uploading
                      </h3>
                    </div>
                    <div className="mb-2 p-2  w-full flex flex-col">
                      <label htmlFor="tage" className="text-gray-400">
                        Upload Product Thumbnail (
                        <font color="red">500x500</font>)
                      </label>
                      <FileSingleUploader
                        statusSubmit={reset}
                        oldThumbnailValue="newUpdateThumbnail"
                        draftImage={productThumbnail}
                        name="uploadThumbnail"
                      />
                      <ErrorMessage name="uploadThumbnail">
                        {(msg) => <div className="text-red-600">{msg}</div>}
                      </ErrorMessage>
                    </div>
                    <div className="mb-2 p-2  w-full flex flex-col">
                      <label htmlFor="tage" className="text-gray-400">
                        Upload Product Image (<font color="red">500x500</font>)
                      </label>
                      <FileUploader
                        statusSubmit={reset}
                        nameOldImage="newUpdateProductImage"
                        draftImage={productImage}
                        name="productImage"
                        name2="pushAnotherFile"
                      />
                      <ErrorMessage name="productImage">
                        {(msg) => <div className="text-red-600">{msg}</div>}
                      </ErrorMessage>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="w-full flex justify-between font-bold border-b border-gray-600 p-2">
                      <h3 className="w-6/12 text-gray-300">
                        General Information
                      </h3>
                    </div>
                    <div className="mb-2 mt-2 p-1 w-full flex flex-col">
                      <label htmlFor="productName" className="text-gray-400">
                        Title
                      </label>
                      <Field
                        className="h-[35px]   focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
                        type="text"
                        as="input"
                        name="title"
                        id="title"
                      />
                      <ErrorMessage name="title">
                        {(msg) => <div className="text-red-600">{msg}</div>}
                      </ErrorMessage>
                    </div>
                    <div className="mb-2 p-1 w-full flex flex-col">
                      <label className="text-gray-400">Tag</label>
                      <TagsSelect
                        defaultSelect={tag}
                        MAX_SELECT={5}
                        defaultData={productTypeOptions}
                        name="tags"
                        typeSelect="tags"
                        onBlur={handleBlur}
                        onChange={setFieldValue}
                      />
                    </div>

                    <div className="mb-2 p-1 w-full flex flex-col">
                      <label className="text-gray-400 flex gap-1">
                        Category
                      </label>
                      <TagsSelect
                        defaultSelect={product?.category?.categoryName ?? ''}
                        MAX_SELECT={5}
                        defaultData={CategorySelect}
                        name="category"
                        typeSelect="tag"
                        onBlur={handleBlur}
                        onChange={setFieldValue}
                      />
                    </div>
                    <div className="mb-2 p-1 w-full flex flex-col">
                      <label className="text-gray-400">Skin Type</label>
                      <TagsSelect
                        defaultSelect={skinType}
                        MAX_SELECT={5}
                        defaultData={productTypeOptions}
                        name="skinType"
                        typeSelect="tags"
                        onBlur={handleBlur}
                        onChange={setFieldValue}
                      />
                    </div>
                    <div className="grid p-1 grid-cols-2 gap-3">
                      <div className="mb-2 relative  w-full flex flex-col">
                        <label
                          htmlFor="price"
                          className="text-gray-400 flex gap-1"
                        >
                          Price
                        </label>
                        <Field
                          className="h-[35px]  focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
                          type="number"
                          as="input"
                          name="price"
                          autoComplete="off"
                          id="price"
                        />
                        <svg
                          className="w-6 h-6 absolute top-[30px] right-2 text-gray-800 dark:text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
                          />
                        </svg>

                        <ErrorMessage name="price">
                          {(msg) => <div className="text-red-600">{msg}</div>}
                        </ErrorMessage>
                      </div>
                      <div className=" mb-2 relative w-full flex flex-col">
                        <label
                          htmlFor="discount"
                          className="flex gap-2 text-gray-400"
                        >
                          Discount <p className="opacity-75">(Optional%)</p>
                        </label>
                        <Field
                          className=" h-[35px] relative focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
                          type="number"
                          as="input"
                          name="discount"
                          id="discount"
                          autoComplete="off"
                        />
                        <svg
                          className=" w-6 h-6 absolute top-[30px] right-2 text-gray-800 dark:text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.891 15.107 15.11 8.89m-5.183-.52h.01m3.089 7.254h.01M14.08 3.902a2.849 2.849 0 0 0 2.176.902 2.845 2.845 0 0 1 2.94 2.94 2.849 2.849 0 0 0 .901 2.176 2.847 2.847 0 0 1 0 4.16 2.848 2.848 0 0 0-.901 2.175 2.843 2.843 0 0 1-2.94 2.94 2.848 2.848 0 0 0-2.176.902 2.847 2.847 0 0 1-4.16 0 2.85 2.85 0 0 0-2.176-.902 2.845 2.845 0 0 1-2.94-2.94 2.848 2.848 0 0 0-.901-2.176 2.848 2.848 0 0 1 0-4.16 2.849 2.849 0 0 0 .901-2.176 2.845 2.845 0 0 1 2.941-2.94 2.849 2.849 0 0 0 2.176-.901 2.847 2.847 0 0 1 4.159 0Z"
                          />
                        </svg>

                        <ErrorMessage name="discount">
                          {(msg) => <div className="text-red-600">{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className=" mb-2 relative p-1 w-full flex flex-col">
                      <label className="text-gray-400">Discount Price</label>
                      <Field
                        className="h-[35px] cursor-default text-center focus:outline-none focus:border-none  bg-gray-800 text-gray-500 focus:text-gray-300"
                        type="text"
                        name="discountPrice"
                        id="discountPrice"
                        value={
                          values.price && values.discount
                            ? `$${(
                                values.price -
                                values.price * (values.discount / 100)
                              ).toFixed(2)}`
                            : values.price
                            ? `$${values.price}`
                            : ""
                        }
                        readOnly // Set the calculated value
                      />

                      <svg
                        className="w-6 group-focus:text-gray-300 h-6 absolute top-[33px] right-2 text-gray-800 dark:text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
                        />
                      </svg>
                    </div>
                    <div className="w-full mb-2 flex justify-between font-bold border-b border-gray-600 p-2">
                      <h3 className=" text-gray-300">Product Details</h3>
                    </div>
                    <AreaTabText
                      benefit={values.benefit}
                      description={values.productDescriptions}
                      usageInstruction={values.usageInstruction}
                    />
                  </div>
                  <div className="col-span-2">
                    <div className="w-full mb-2 flex justify-between font-bold border-b border-gray-600 p-2">
                      <h3 className="w-6/12 text-gray-300">
                        Ingredients and Features
                      </h3>
                    </div>
                    <div className="mb-2 p-1 w-full flex flex-col">
                      <label className="text-gray-400">Ingredient</label>
                      <TagsSelect
                        defaultSelect={ingredient}
                        MAX_SELECT={5}
                        defaultData={productTags}
                        name="keyIngredients"
                        typeSelect="tags"
                        onBlur={handleBlur}
                        onChange={setFieldValue}
                      />
                    </div>
                    <div className=" mb-2 p-1 relative w-full flex flex-col">
                      <label
                        htmlFor="sizeVolume"
                        className="flex gap-2 text-gray-400"
                      >
                        Size/Volume
                      </label>
                      <Field
                        className=" h-[35px]  focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
                        type="text"
                        as="input"
                        name="sizeVolume"
                        id="sizeVolume"
                        autoComplete="off"
                      />
                      <ErrorMessage name="sizeVolume">
                        {(msg) => <div className="text-red-600">{msg}</div>}
                      </ErrorMessage>
                    </div>

                    <div className="mb-2 mt-2 p-1 w-full flex flex-col">
                      <label htmlFor="stockQty" className="text-gray-400">
                        Stock Quantity
                      </label>
                      <Field
                        className="h-[35px]   focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
                        type="text"
                        as="input"
                        name="stockQty"
                        id="stockQty"
                        autoComplete="off"
                      />
                      <ErrorMessage name="stockQty">
                        {(msg) => <div className="text-red-600">{msg}</div>}
                      </ErrorMessage>
                    </div>
                    <div className="mb-2 mt-2 p-1 w-full flex flex-col">
                      <label
                        htmlFor="expireDate"
                        className="text-gray-400 flex gap-1"
                      >
                        Expiration Date
                      </label>
                      <DateRangePicker
                        createdDefaultDate={product?.createdAt ?? ""}
                        expirationDefaultDate={product?.expiredDate ?? ""}
                        name="expireDate"
                        setFieldValue={setFieldValue}
                      />
                      <ErrorMessage name="expireDate">
                        {(msg) => <div className="text-red-600">{msg}</div>}
                      </ErrorMessage>
                    </div>
                    <div className="w-full mb-2 flex justify-between font-bold border-b border-gray-600 p-2">
                      <h3 className="w-6/12 text-gray-300">Certification</h3>
                    </div>
                    <div className="mb-2 mt-2 p-1 w-full flex flex-col">
                      <label
                        htmlFor="certiciateLabel"
                        className="text-gray-400"
                      >
                        Get Certification from
                      </label>
                      <Field
                        className="h-[35px]   focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
                        type="text"
                        as="input"
                        name="certiciateLabel"
                        id="certiciateLabel"
                        autoComplete="off"
                      />
                      <ErrorMessage name="certiciateLabel">
                        {(msg) => <div className="text-red-600">{msg}</div>}
                      </ErrorMessage>
                    </div>
                    <div className="mb-2 p-2  w-full flex flex-col">
                      <label
                        htmlFor="uploadCertificate"
                        className="text-gray-400"
                      >
                        Upload Certificate (<font color="red">500x500</font>)
                      </label>
                      <FileUploader
                        statusSubmit={reset}
                        nameOldImage="newUpdateCertificateImage"
                        draftImage={productCertificate}
                        name="uploadCertificate"
                        name2="pushAnotherFile2"
                      />
                    </div>
                  </div>
                  {/* Hidden button */}
                  <div className="mb-2 p-2 w-full hidden">
                    <button
                      type="submit"
                      className="p-3 SaveDraft bg-gray-400 "
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Flowbite>
    </>
  );
};

export default DraftEditorForm;
