import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LayoutComponent from "./Admin/components/Layouts/LayoutComponent.jsx";
import Dashboard from "./Admin/pages/dashboard/DashboardLayout.jsx";
import ProductAnalytics from "./Admin/pages/dashboard/ProductAnalytics.jsx";
import AreaChartCard from "./Admin/components/common/charts/SaleChart.jsx";
import SaleAnalytics from "./Admin/pages/dashboard/components/SaleAnalytics.jsx";
import Visitor from "./Admin/pages/dashboard/components/VisitorAnalysis.jsx";
import ListAllComponent from "./Admin/pages/order/components/ListAllComponent.jsx";
import ListOrder from "./Admin/pages/order/Order.jsx";
import { Provider } from "react-redux";
import ProductComponent from "./Admin/pages/product/Product.jsx";
import PostProduct from "./Admin/pages/product/components/ProductPost.jsx";
import ViewProduct from "./Admin/pages/product/components/ProductView.jsx";
import AuthLayout from "./Admin/pages/auth/AuthLayout.jsx";
import { SignIn } from "./Admin/pages/auth/Signin.jsx";
import Signup from "./Admin/pages/auth/Signup.jsx";
import ProtectedRoute from "./Admin/pages/auth/ProtectRoutes.jsx";
import ApproveProduct from "./Admin/pages/product/components/approveProduct/ApproveProduct.jsx";
import store from "./redux/store.js";
import Draft from "./Admin/pages/product-draft/draft-Components/DraftProduct.jsx";
import Category from "./Admin/pages/category/Category.jsx";
import AddCategory from "./Admin/pages/category/components/Category-Add.jsx";
import CategoryView from "./Admin/pages/category/components/Category-View.jsx";
import DraftEditor from "./Admin/pages/product-draft/draft-Components/DraftEditor.jsx";
import UserMainLayout from "./User/Layout/UserMainLayout.jsx";
import MainHomePage from "./User/pages/main/MainHomePage.jsx";
import ScrollGrid from "./User/pages/main/mainComponent/testScroll.jsx";
// import { store } from "./redux/store.js";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/signin",
        element: <SignIn />,
      },
      {
        path: "/auth/signup",
        element: <Signup />,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <LayoutComponent />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        element: <ListOrder />,
        children: [
          {
            path: "/admin/list-order",
            element: <ListAllComponent />,
          },
          {
            path: "/admin/list-order/paid",
            element: <ListAllComponent />,
          },
          {
            path: "/admin/list-order/pending",
            element: <ListAllComponent />,
          },
          {
            path: "/admin/list-order/cancelled",
            element: <ListAllComponent />,
          },
        ],
      },
      {
        element: <ProductComponent />,
        children: [
          {
            path: "/admin/post-product",
            element: <PostProduct />,
          },
          {
            path: "/admin/view-product",
            element: <ViewProduct />,
          },
          {
            path: "/admin/draft",
            element: <Draft />,
          },
        ],
      },
      {
        element: <Category />,
        children: [
          {
            path: "/admin/add-category",
            element: <AddCategory />,
          },
          {
            path: "/admin/view-category",
            element: <CategoryView />,
          },
          {
            path: "/admin/approve-product",
            element: <ApproveProduct />,
          },
          {
            path: "/admin/draft",
            element: <Draft />,
          },
          {
            path: "/admin/draft-edit",
            element: <DraftEditor />,
          },
        ],
      },
      {
        element: <ProductAnalytics />,
        children: [
          {
            path: "/admin/product-analysis/sale",
            element: <SaleAnalytics />,
          },
          {
            path: "/admin/product-analysis/visitor",
            element: <Visitor />,
          },
        ],
      },
    ],
  },
  {
    
    element: <UserMainLayout />,
    children:[
      {
        path:'/home',
        element:<MainHomePage/>
      },
      
    ]
  },
  {
    path:'/test',
    element:  <ScrollGrid/>
  }
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Redux */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
