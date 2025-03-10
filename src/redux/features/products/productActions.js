import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* Action */
/* Edit-save */
export const draftEditorSave = createAsyncThunk(
  "products/draftEditorSave",
  async ({ pId, values }, { rejectWithValue }) => {
    if (!pId) {
      return rejectWithValue("Product ID not found!");
    }
    if (!values) {
      return rejectWithValue("Invalid data!");
    }
    const formData = new FormData();
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token is missing.");
    }
    const userId = sessionStorage.getItem("userId");
    formData.append("userId", userId);
    formData.append("productName", values.productName);
    formData.append("productTitle", values.title);
    formData.append("productCategory", values.category);
    formData.append("productBrand", values.productBrand);
    formData.append("productPrice", values.price);
    formData.append("productSalePrice", values.discountPrice);
    formData.append("productDiscountPercent", values.discount);
    formData.append("productQuantity", values.stockQty);
    formData.append("productDescription", values.productDescriptions);
    formData.append("productSkinType", values.skinType);
    formData.append("productIngredients", values.keyIngredients);
    formData.append("productBenefits", values.benefit);
    formData.append("productUsageInstructions", values.usageInstruction);
    formData.append("productSizeVolume", values.sizeVolume);
    formData.append("productPublishedDate", values.expireDate[0]);
    formData.append("productExpireDate", values.expireDate[1]);
    formData.append("productTag", values.tags);
    formData.append("productCertificateTitle", values.certiciateLabel);
    formData.append("fieldOldThumbnailValue", values.fieldOldThumbnailValue);
    formData.append("productUpdateDeletedThumbnail", values.newUpdateThumbnail);

    /* Update Image in db */
    formData.append("productUpdateDeletedImage", values.newUpdateProductImage);
    formData.append(
      "productUpdateDeletedCertificateImage",
      values.newUpdateCertificateImage
    );
    values.productImage.forEach((item) => {
      formData.append("productImage", item);
    });
    values.uploadCertificate.forEach((item) => {
      formData.append("productCertificateImage", item);
    });
    values.uploadThumbnail.forEach((item) => {
      formData.append("productThumbnail", item);
    });

    const url = `http://localhost:3000/api/admin/product-draft/${pId}`;
    try {
      const response = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/* Delete Product */
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ pId }, { rejectWithValue }) => {
    console.log(pId);
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      if (!accessToken) {
        navigate("/auth/signin");
        return;
      }
      const url = `http://localhost:3000/api/admin/product-draft/${pId}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/* Post(Draft-Fullfiled) Product */
export const postProduct = createAsyncThunk(
  "products/postProduct",
  async ({ values, actionBtn }, { rejectWithValue }) => {
    const formData = new FormData();
    const accessToken = sessionStorage.getItem("accessToken");
    const userId = sessionStorage.getItem("userId");
    formData.append("userId", userId);
    formData.append("productName", values.productName);
    formData.append("productTitle", values.title);
    formData.append("productCategory", values.category);
    formData.append("productBrand", values.productBrand);
    formData.append("productPrice", values.price);
    formData.append("productSalePrice", values.discountPrice);
    formData.append("productDiscountPercent", values.discount);
    formData.append("productQuantity", values.stockQty);
    formData.append("productDescription", values.productDescriptions);
    formData.append("productSkinType", values.skinType);
    formData.append("productIngredients", values.keyIngredients);
    formData.append("productBenefits", values.benefit);
    formData.append("productUsageInstructions", values.usageInstruction);
    formData.append("productSizeVolume", values.sizeVolume);
    formData.append("productPublishedDate", values.expireDate[0]);
    formData.append("productExpireDate", values.expireDate[1]);
    formData.append("productTag", values.tags);
    formData.append("productCertificateTitle", values.certiciateLabel);
    values.productImage.forEach((item) => {
      formData.append("productImage", item);
    });
    values.uploadCertificate.forEach((item) => {
      formData.append("productCertificateImage", item);
    });
    values.uploadThumbnail.forEach((item) => {
      formData.append("productThumbnail", item);
    });
    const endPoint = actionBtn ? "/product" : "/product-draft";

    const url = `http://localhost:3000/api/admin${endPoint}`; // Adjust as needed
    try {
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const approveProduct = createAsyncThunk(
  "products/approveProduct",
  async (_, { rejectWithValue }) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      return rejectWithValue("Access token is missing.");
    }
    try {
      const url = "http://localhost:3000/api/admin/product-draft";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Something wrong with request");
    }
  }
);
//fetch product by ID
export const getProductDraftById = createAsyncThunk(
  "products/getProductDraftById",
  async ({ productId }, { rejectWithValue }) => {
    if (!productId) {
      return rejectWithValue("Product-Draft Id not found!");
    }
    const url = `http://localhost:3000/api/admin/product-draft/${productId}`;
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Something wrong with request");
    }
  }
);
/* Post-Category */
export const postCategory = createAsyncThunk(
  "products/postCategory",
  async ({ values }, { rejectWithValue }) => {
    const formData = new FormData();
    const accessToken = sessionStorage.getItem("accessToken");
    formData.append("categoryName", values.categoryName);
    formData.append("Slug", values.Slug);
    formData.append("Description", values.Description);
    values.CategoryThumbnail.forEach((item) => {
      formData.append("CategoryThumbnail", item);
    });

    const url = `http://localhost:3000/api/admin/category`; // Adjust as needed
    try {
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/*fetch all categories*/
export const getCategory = createAsyncThunk(
  "products/getCategory",
  async (_, { rejectWithValue }) => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const url = "http://localhost:3000/api/admin/category/DESC";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Something wrong with request");
    }
  }
);
/* Disabled Category */
export const disabledCategory = createAsyncThunk(
  "products/disabledCategory",
  async ({ cateId }, { rejectWithValue }) => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const url = `http://localhost:3000/api/admin/category/${cateId}`;
      const response = await axios.put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/* Make a changed is draft status */
export const makeAChangeDraftProductAction = createAsyncThunk(
  "products/makeAChangeDraftProductAction",
  async ({ pId }, { rejectWithValue }) => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const url = `http://localhost:3000/api/admin/product-draft/${pId}`;
      const response = await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
/* Change is Active status */
export const changeStatusProduct = createAsyncThunk(
  "products/changeStatusProduct",
  async ({ pId }, { rejectWithValue }) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const url = `http://localhost:3000/api/admin/product/${pId}`;
    try {
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
      const response = await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      if(response.data.status !== 200){
        throw new Error('Update status product incomplete!')
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//productSlice
const productSlice = createSlice({
  name: "products",
  initialState: {
    /* Globale Use */
    productToSearch:[],
    searchResult:[],
    /* Draft */
    items: [],
    allProduct: [],
    draftItem: [],
    draftAfterUpdate: [],
    isLoading: false,
    idle: "",
    error: null,

    // pagination
    currentPage: 1,
    itemsPerPage: 6,
    fulfilledProduct: [],
    unfulfilledProduct: [],
    allProduct: [],
    /* Category */
    categories: [],
    allCategories: [],
    activeCategories: [],
    inactiveCategories: [],
    /* Non-Draft */
    productList: [],

    /* Sort revers (a-z and z-a) */
    sort:false//defaul a-z
  },
  reducers: {
    postDraft(state, action) {
      state.allProduct.push(action.payload);
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setFulfilled: (state, action) => {
      state.fulfilledProduct = action.payload;
    },
    setUnfulfilled: (state, action) => {
      state.unfulfilledProduct = action.payload;
    },
    setAll: (state, action) => {
      state.allProduct = action.payload;
    },
    setByNameSort: (state, action) => {
      // 0. By a-z 1. By z-a 2. By latest 3. By oldest
      state.productList.sort((a, b) => {
        if (action.payload==1) {
          // Sort descending (z-a)
          return b.name.localeCompare(a.name);
        } else if(action.payload==2) {
          // Sort ascending (latest)
          return b.id-a.id;
        }else if(action.payload==3) {
          // Sort ascending (oldest)
          return a.id-b.id;
        }else {
          // Sort ascending (a-z)
          return a.name.localeCompare(b.name);
        }
      })
    },
    setSearch:(state,action)=>{
      state.productToSearch = action.payload.searchIn;
      const searchField = action.payload.searchField;
      state.searchResult = state.productToSearch.filter(item=>item.name.startsWith(searchField));
    },
  },
  extraReducers: (builder) => {
    builder
      /* Post Product-draft */
      .addCase(postProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const newProduct = action.payload.data;

        if (newProduct.isIncomplete) {
          state.unfulfilledProduct.push(newProduct);
        } else {
          state.fulfilledProduct.push(newProduct);
        }
        state.allProduct.push(newProduct);

        state.fulfilledProduct.sort((a, b) => b.id - a.id);
        state.allProduct.sort((a, b) => b.id - a.id);
        state.unfulfilledProduct.sort((a, b) => b.id - a.id);
      })
      .addCase(postProduct.rejected, (state, action) => {
        state.isLoading = false;
        action.error = action.payload;
      })
      /* Fetch-all Product-draft */
      .addCase(approveProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(approveProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fulfilledProduct = action.payload.data.filter(
          (item) => !item.isIncomplete && item.isDraft
        );
        state.unfulfilledProduct = action.payload.data.filter(
          (item) => item.isIncomplete && item.isDraft
        );
        state.allProduct = action.payload.data.filter((item) => item.isDraft);
        state.productList = action.payload.data.filter(
          (item) => !item.isIncomplete && !item.isDraft
        );
      })
      .addCase(approveProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* posting category  */
      .addCase(postCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories.unshift(action.payload.data);
        state.allCategories.unshift(action.payload.data);
      })
      .addCase(postCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* fetching category  */
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload.category;
        state.allCategories = action.payload.category;
        state.activeCategories = action.payload.category.filter(
          (item) => item.isActive == 1
        );
        state.inactiveCategories = action.payload.category.filter(
          (item) => item.isActive != 1
        );
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* Disabled Category */
      .addCase(disabledCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(disabledCategory.fulfilled, (state, action) => {
        state.isLoading = false;

        /* Checking it in allCategory arrray does it exist or not */
        const newIdUpdated = action.payload.data.id;

        const getIndex = state.allCategories.findIndex(
          (item) => item.id == newIdUpdated
        );
        state.allCategories[getIndex] = action.payload.data;
        state.allCategories.sort((a, b) => b.id - a.id);

        if (action.payload.data.isActive) {
          /* Checking it in inActive arrray does it exist or not */
          const checkingInactive = state.inactiveCategories.filter(
            (item) => item.id !== action.payload.data.id
          );
          state.inactiveCategories = checkingInactive;
          const getIndex = state.activeCategories.findIndex(
            (item) => item.id == newIdUpdated
          );
          if (getIndex === -1) {
            state.activeCategories.unshift(action.payload.data);
          } else {
            state.activeCategories[getIndex] = action.payload.data;
          }
          state.activeCategories.sort((a, b) => b.id - a.id);
        } else {
          /* Checking it in active arrray does it exist or not */

          const checkingActive = state.activeCategories.filter(
            (item) => item.id !== action.payload.data.id
          );
          state.activeCategories = checkingActive;
          const getIndex = state.inactiveCategories.findIndex(
            (item) => item.id == newIdUpdated
          );
          if (getIndex === -1) {
            state.inactiveCategories.unshift(action.payload.data);
          } else {
            state.inactiveCategories[getIndex] = action.payload.data;
          }
          state.inactiveCategories.sort((a, b) => b.id - a.id);
        }
      })
      .addCase(disabledCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      /* Get-Product by Id */
      .addCase(getProductDraftById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProductDraftById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.draftItem.push(action.payload);
      })
      .addCase(getProductDraftById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Save-edit action
      .addCase(draftEditorSave.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(draftEditorSave.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedProduct = action.payload.product;

        if (updatedProduct.isIncomplete) {
          const filterFulFilled = state.fulfilledProduct.filter(
            (item) => item.id != updatedProduct.id
          );
          state.fulfilledProduct = filterFulFilled;
          const findIndexUnfulfilled = state.unfulfilledProduct.findIndex(
            (item) => item.id == updatedProduct.id
          );
          if (findIndexUnfulfilled !== 1) {
            state.unfulfilledProduct[findIndexUnfulfilled] = updatedProduct;
          } else {
            state.unfulfilledProduct.push(updatedProduct);
          }
          state.unfulfilledProduct.sort((a, b) => b.id - a.id);
        } else {
          const filterUnfulfilled = state.unfulfilledProduct.filter(
            (item) => item.id !== updatedProduct.id
          );
          state.unfulfilledProduct = filterUnfulfilled;
          const findIndexFulfilled = state.fulfilledProduct.findIndex(
            (item) => item.id == updatedProduct.id
          );
          if (findIndexFulfilled !== -1) {
            state.fulfilledProduct[findIndexFulfilled] = updatedProduct;
          } else {
            state.fulfilledProduct.push(updatedProduct);
          }
          state.fulfilledProduct.sort((a, b) => b.id - a.id);
        }
        const searchAll = state.allProduct.findIndex(
          (product) => product.id === updatedProduct.id
        );
        state.allProduct[searchAll] = updatedProduct;
        state.allProduct.sort((a, b) => b.id - a.id);
      })
      .addCase(draftEditorSave.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* Delete product */
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const deleteProductId = action.payload.idDeleted;
        state.allProduct = state.allProduct.filter(
          (item) => item.id != deleteProductId
        );
        state.productList = state.productList.filter(
          (item) => item.id != deleteProductId
        );
        state.fulfilledProduct = state.fulfilledProduct.filter(
          (item) => item.id != deleteProductId
        );
        state.unfulfilledProduct = state.unfulfilledProduct.filter(
          (item) => item.id != deleteProductId
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* Make change to Product Draft/non-Draft */
      .addCase(makeAChangeDraftProductAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(makeAChangeDraftProductAction.fulfilled, (state, action) => {
        state.isLoading = false;
        const newChangeProduct = action.payload.data;

        if(newChangeProduct.isDraft){
          state.productList = state.productList.filter(item=>item.id!==newChangeProduct.id)
          state.allProduct.push(newChangeProduct)     
          state.fulfilledProduct.push(newChangeProduct) 
          
          /* sort */
          state.allProduct.sort((a,b)=>b.id-a.id)
          state.fulfilledProduct.sort((a,b)=>b.id-a.id)
        }else{
          state.productList.push(newChangeProduct);
          state.productList.sort((a, b) => b.id - a.id);
          state.allProduct = state.allProduct.filter(
            (item) => item.id != newChangeProduct.id
          );
          state.fulfilledProduct = state.fulfilledProduct.filter(
            (item) => item.id != newChangeProduct.id
          );
          state.unfulfilledProduct = state.unfulfilledProduct.filter(
            (item) => item.id != newChangeProduct.id
          );
        }
      })
      .addCase(makeAChangeDraftProductAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* Make change to Product's Status */
      .addCase(changeStatusProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeStatusProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const newChangeProduct = action.payload.data;
        const findExistProductIndex = state.productList.findIndex((item)=>item.id===newChangeProduct.id);
        if(findExistProductIndex!==-1){
          state.productList[findExistProductIndex] = newChangeProduct;
        }else{
          state.productList.push(newChangeProduct);
        }
        state.productList.sort((a, b) => b.id - a.id);
      })
      .addCase(changeStatusProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { setPage, setItemPerPage, setFulfilled, setUnfulfilled, setAll,setByNameSort } =
  productSlice.actions;
export default productSlice.reducer;
