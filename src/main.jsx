import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LayoutComponent from "./Admin/components/Layouts/LayoutComponent.jsx";
import Dashboard from "./Admin/pages/dashboard/DashboardLayout.jsx";
import ProductAnalytics from "./Admin/pages/dashboard/ProductAnalytics.jsx";
import SaleAnalytics from "./Admin/pages/dashboard/components/SaleAnalytics.jsx";
import Visitor from "./Admin/pages/dashboard/components/VisitorAnalysis.jsx";
import ListAllComponent from "./Admin/pages/order/components/ListAllComponent.jsx";
import { Provider } from "react-redux";
import Room from "./Admin/pages/roomPage/RoomMain.jsx";
import RoomPost from "./Admin/pages/roomPage/components/Room-Post.jsx";
import RoomView from "./Admin/pages/roomPage/components/Room-View.jsx";
import AuthLayout from "./Admin/pages/auth/AuthLayout.jsx";
import { Login } from "./Admin/pages/auth/Login.jsx";
import ProtectedRoute from "./Admin/pages/auth/ProtectRoutes.jsx";
import store from "./redux/store.js";
import HotelPost from "./Admin/pages/hotelPage/components/Hotel-Add.jsx";
import HotelView from "./Admin/pages/hotelPage/components/Hotel-View.jsx";
import UserMainLayout from "./User/Layout/UserMainLayout.jsx";
import MainHomePage from "./User/pages/main/MainHomePage.jsx";
import ScrollGrid from "./User/pages/main/mainComponent/testScroll.jsx";
import BookingView from "./Admin/pages/booking/Booking-View.jsx";
import Register from "./Admin/pages/auth/Register.jsx";
import BookingTableList from "./Admin/pages/booking/components/Booking-Component.jsx";
import MainHotel from "./Admin/pages/hotelPage/HotelMain.jsx";
import MainBooking from "./User/pages/booking/MainBooking.jsx";
import HotelRoomCard from './User/pages/main/mainComponent/HotelList.jsx'
import MainHotelPage from "./User/pages/hotels/MainHotelPage.jsx";
import ModalSharedLayout from "./User/pages/desctination/ModalSharedLayout.jsx";
import TabComponent from "./User/pages/myBookings/MainMyBooking.jsx";
import ContactMain from "./User/pages/contact/ContactMain.jsx";
// import { store } from "./redux/store.js";

const router = createBrowserRouter([
  {
    element: <UserMainLayout />,
    children: [
      {
        path: "/",
        element: <MainHomePage />,
      },
      {
        path: "/hotels",
        element: <MainHotelPage/>
      },
      {
        path: "/my-bookings",
        element: <TabComponent/>
      },
      {
        path: "/destinations",
        element: <ModalSharedLayout/>
      },
      {
        path: "/contact",
        element: <ContactMain/>
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
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
        element: <BookingView />,
        children: [
          {
            path: "/admin/list-booking/:status",
            element: <BookingTableList />,
          },
        ],
      },
      {
        element: <Room />,
        children: [
          {
            path: "/admin/post-room",
            element: <RoomPost />,
          },
          {
            path: "/admin/view-room/:status",
            element: <RoomView />,
          },
        ],
      },
      {
        element: <MainHotel />,
        children: [
          {
            path: "/admin/post-hotel",
            element: <HotelPost />,
          },
          {
            path: "/admin/view-hotel/:status?",
            element: <HotelView />,
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
    path: "/test",
    element: <ScrollGrid />,
  },
  {
    path: "/not-found",
    element: <ScrollGrid />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Redux */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
