import React, { useState } from "react";
import {
  Star,
  MapPin,
  Calendar,
  Users,
  Wifi,
  Coffee,
  Droplets,
  Tv,
  Utensils,
  Snowflake,
  Dumbbell,
  ChevronDown,
  ChevronUp,
  Heart,
  Share2,
  Clock,
  CreditCard,
  X,
} from "lucide-react";

const MainHotelPage = () => {
  const [activeTab, setActiveTab] = useState("rooms");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingDates, setBookingDates] = useState({
    checkIn: "",
    checkOut: "",
    guests: 2,
  });
  const [favorites, setFavorites] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const hotels = [
    {
      id: 1,
      name: "Grand Marina Hotel",
      location: "San Francisco, CA",
      rating: 4.8,
      reviewCount: 1243,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Luxury waterfront hotel with panoramic bay views and world-class amenities.",
      facilities: ["pool", "spa", "gym", "restaurant", "bar", "business-center", "parking"],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 48 hours before check-in",
        pets: "Pets allowed with fee",
      },
      rooms: [
        {
          id: 101,
          type: "Deluxe Ocean View",
          price: 249,
          size: "450 sq ft",
          capacity: 4,
          beds: "1 King Bed",
          amenities: ["wifi", "breakfast", "ac", "tv", "minibar", "safe"],
          images: [
            "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1566669437686-c2b5c395c2f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
          ],
          description: "Spacious room with panoramic ocean views and premium amenities."
        },
        {
          id: 102,
          type: "Executive Suite",
          price: 349,
          size: "650 sq ft",
          capacity: 2,
          beds: "1 King Bed",
          amenities: ["wifi", "breakfast", "ac", "tv", "minibar", "safe", "jacuzzi"],
          images: [
            "https://images.unsplash.com/photo-1564078516393-cf04bd966897?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
          ],
          description: "Luxurious suite with separate living area and premium services."
        }
      ],
      reviews: [
        {
          id: 1,
          author: "Michael Johnson",
          rating: 5,
          date: "2023-10-15",
          title: "Perfect getaway!",
          content: "The ocean view was breathtaking and the service was impeccable.",
          stayType: "Couple",
        },
        {
          id: 2,
          author: "Sarah Williams",
          rating: 4,
          date: "2023-09-22",
          title: "Great location",
          content: "Excellent hotel with fantastic amenities.",
          stayType: "Family",
        }
      ]
    },
    // Second hotel object would go here...
  ];

  const amenitiesIcons = {
    wifi: <Wifi className="h-4 w-4" />,
    breakfast: <Coffee className="h-4 w-4" />,
    ac: <Snowflake className="h-4 w-4" />,
    tv: <Tv className="h-4 w-4" />,
    minibar: <Droplets className="h-4 w-4" />,
    gym: <Dumbbell className="h-4 w-4" />,
    restaurant: <Utensils className="h-4 w-4" />,
    safe: <CreditCard className="h-4 w-4" />,
    jacuzzi: <Droplets className="h-4 w-4" />,
    fireplace: <Droplets className="h-4 w-4" />,
    balcony: <Droplets className="h-4 w-4" />,
  };

  const facilityIcons = {
    pool: <Droplets className="h-5 w-5" />,
    spa: <Droplets className="h-5 w-5" />,
    gym: <Dumbbell className="h-5 w-5" />,
    restaurant: <Utensils className="h-5 w-5" />,
    bar: <Droplets className="h-5 w-5" />,
    "business-center": <CreditCard className="h-5 w-5" />,
    parking: <Droplets className="h-5 w-5" />,
    "ski-storage": <Droplets className="h-5 w-5" />,
  };

  const toggleFavorite = (hotelId) => {
    setFavorites(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId) 
        : [...prev, hotelId]
    );
  };

  const handleBookNow = (room, hotel) => {
    setSelectedRoom(room);
    setSelectedHotel(hotel);
    setActiveTab("booking");
  };

  const calculateTotalPrice = (pricePerNight, checkIn, checkOut) => {
    if (!checkIn || !checkOut) return pricePerNight;
    
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const timeDiff = endDate - startDate;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    return pricePerNight * Math.max(1, daysDiff);
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-amber-500 fill-amber-500' : i < rating ? 'text-amber-500 fill-amber-500/50' : 'text-gray-300'}`} 
      />
    ));
  };

  const RoomGallery = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);
    
    return (
      <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
        <img src={images[currentImage]} alt="Room" className="w-full h-full object-cover" />
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`w-2 h-2 rounded-full ${currentImage === i ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    );
  };

  const HotelDetails = ({ hotel }) => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4">About This Property</h3>
        <p className="text-gray-700">{hotel.description}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4">Facilities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {hotel.facilities.map(facility => (
            <div key={facility} className="flex items-center">
              {facilityIcons[facility] || <Droplets className="h-5 w-5" />}
              <span className="ml-2 capitalize">{facility.replace('-', ' ')}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4">Policies</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
            <div>
              <p className="font-medium">Check-in/Check-out</p>
              <p className="text-gray-600">{hotel.policies.checkIn} / {hotel.policies.checkOut}</p>
            </div>
          </div>
          <div className="flex items-start">
            <CreditCard className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
            <div>
              <p className="font-medium">Cancellation Policy</p>
              <p className="text-gray-600">{hotel.policies.cancellation}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Droplets className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
            <div>
              <p className="font-medium">Pet Policy</p>
              <p className="text-gray-600">{hotel.policies.pets}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const HotelReviews = ({ reviews }) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Guest Reviews</h3>
          <p className="text-gray-600">{reviews.length} reviews</p>
        </div>
        <button className="text-blue-600 flex items-center">
          <Share2 className="h-4 w-4 mr-1" /> Share
        </button>
      </div>
      
      {reviews.map(review => (
        <div key={review.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-bold">{review.author}</p>
              <p className="text-sm text-gray-500">{review.stayType} • {review.date}</p>
            </div>
            <div className="flex">{renderStars(review.rating)}</div>
          </div>
          <h4 className="font-medium text-lg mb-2">{review.title}</h4>
          <p className="text-gray-700">{review.content}</p>
        </div>
      ))}
    </div>
  );

  return (
    <main className="w-full h-[100vh] pt-[10vh]">
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Stay</h1>
            <p className="text-gray-600">Discover and book hotels with the best amenities</p>
          </header>

          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                <div className="flex items-center border rounded-lg p-3">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <input type="text" placeholder="Where are you going?" className="w-full focus:outline-none" />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                <div className="flex items-center border rounded-lg p-3">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    type="date"
                    className="w-full focus:outline-none"
                    value={bookingDates.checkIn}
                    onChange={(e) => setBookingDates({...bookingDates, checkIn: e.target.value})}
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                <div className="flex items-center border rounded-lg p-3">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    type="date"
                    className="w-full focus:outline-none"
                    value={bookingDates.checkOut}
                    onChange={(e) => setBookingDates({...bookingDates, checkOut: e.target.value})}
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                <div className="flex items-center border rounded-lg p-3">
                  <Users className="h-5 w-5 text-gray-400 mr-2" />
                  <select
                    className="w-full focus:outline-none bg-transparent"
                    value={bookingDates.guests}
                    onChange={(e) => setBookingDates({...bookingDates, guests: parseInt(e.target.value)})}
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>{num} {num === 1 ? "guest" : "guests"}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              className="flex items-center text-blue-600 text-sm font-medium"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" /> Hide filters
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" /> Show filters
                </>
              )}
            </button>

            {showFilters && (
              <div className="mt-4 pt-4 border-t grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Filter options would go here */}
              </div>
            )}

            <button className="mt-4 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              Search hotels
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {activeTab === "rooms" && (
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Available Hotels</h2>
                {hotels.map((hotel) => (
                  <div key={hotel.id} className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                    <div className="md:flex">
                      <div className="md:w-1/3 h-48 md:h-auto relative">
                        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" loading="lazy" />
                        <button 
                          onClick={() => toggleFavorite(hotel.id)}
                          className="absolute top-4 right-4 bg-white/80 p-2 rounded-full"
                        >
                          <Heart 
                            className="h-5 w-5" 
                            fill={favorites.includes(hotel.id) ? "#ef4444" : "none"} 
                            stroke={favorites.includes(hotel.id) ? "#ef4444" : "currentColor"} 
                          />
                        </button>
                      </div>

                      <div className="p-6 md:w-2/3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
                            <p className="text-gray-600 flex items-center mt-1">
                              <MapPin className="h-4 w-4 mr-1" /> {hotel.location}
                            </p>
                          </div>
                          <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                            <div className="flex">{renderStars(hotel.rating)}</div>
                            <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
                            <span className="mx-1 text-gray-400">|</span>
                            <span className="text-sm text-gray-600">{hotel.reviewCount} reviews</span>
                          </div>
                        </div>

                        <div className="my-4 flex border-b">
                          <button
                            className={`px-4 py-2 font-medium ${
                              activeTab === "rooms" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-600"
                            }`}
                            onClick={() => setActiveTab("rooms")}
                          >
                            Rooms
                          </button>
                          <button
                            className={`px-4 py-2 font-medium ${
                              activeTab === "details" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-600"
                            }`}
                            onClick={() => {
                              setSelectedHotel(hotel);
                              setActiveTab("details");
                            }}
                          >
                            Details
                          </button>
                          <button
                            className={`px-4 py-2 font-medium ${
                              activeTab === "reviews" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-600"
                            }`}
                            onClick={() => {
                              setSelectedHotel(hotel);
                              setActiveTab("reviews");
                            }}
                          >
                            Reviews
                          </button>
                        </div>

                        <div className="space-y-4">
                          {hotel.rooms.map((room) => (
                            <div key={room.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-bold text-gray-900">{room.type}</h4>
                                  <p className="text-sm text-gray-600 mt-1">{room.description}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-gray-900">
                                    ${room.price}
                                    <span className="text-sm font-normal text-gray-600"> / night</span>
                                  </p>
                                  <p className="text-xs text-gray-500">+ taxes & fees</p>
                                </div>
                              </div>

                              <div className="mt-3 flex flex-wrap gap-2">
                                {room.amenities.map((amenity) => (
                                  <div key={amenity} className="flex items-center text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">
                                    {amenitiesIcons[amenity]}
                                    <span className="ml-1 capitalize">{amenity}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-4 flex justify-between items-center">
                                <div className="text-sm text-gray-600">
                                  <p>{room.size} • {room.beds}</p>
                                  <p>Sleeps {room.capacity}</p>
                                </div>
                                <button
                                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                  onClick={() => handleBookNow(room, hotel)}
                                >
                                  Book Now
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "details" && selectedHotel && (
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">{selectedHotel.name} Details</h2>
                  <button onClick={() => setActiveTab("rooms")} className="flex items-center text-blue-600">
                    <X className="h-5 w-5 mr-1" /> Close
                  </button>
                </div>
                <HotelDetails hotel={selectedHotel} />
              </div>
            )}

            {activeTab === "reviews" && selectedHotel && (
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">{selectedHotel.name} Reviews</h2>
                  <button onClick={() => setActiveTab("rooms")} className="flex items-center text-blue-600">
                    <X className="h-5 w-5 mr-1" /> Close
                  </button>
                </div>
                <HotelReviews reviews={selectedHotel.reviews} />
              </div>
            )}

            {activeTab === "booking" && selectedRoom && selectedHotel && (
              <div className="flex-1 bg-white rounded-xl shadow-md overflow-hidden p-6">
                <div className="flex  items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Complete Your Booking</h2>
                  <button onClick={() => setActiveTab("rooms")} className="flex items-center text-blue-600">
                    <X className="h-5 w-5 mr-1" /> Close
                  </button>
                </div>

                <div className="mb-8 p-4 border rounded-lg">
                  <div className="flex items-start">
                    <div className="w-1/3 mr-4">
                      <RoomGallery images={selectedRoom.images || [selectedHotel.image]} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{selectedHotel.name}</h3>
                      <p className="text-gray-600 mb-2 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedHotel.location}
                      </p>
                      <h4 className="font-bold text-md mb-2">{selectedRoom.type}</h4>
                      <p className="text-gray-600 text-sm mb-3">{selectedRoom.description}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Price per night</p>
                          <p className="font-bold text-gray-900">${selectedRoom.price}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Total for {bookingDates.checkIn && bookingDates.checkOut ? 
                              Math.ceil((new Date(bookingDates.checkOut) - new Date(bookingDates.checkIn)) / (1000 * 60 * 60 * 24)) : 
                              'X'} nights
                          </p>
                          <p className="font-bold text-gray-900">
                            ${calculateTotalPrice(selectedRoom.price, bookingDates.checkIn, bookingDates.checkOut)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  alert(`Booking confirmed for ${selectedRoom.type} at ${selectedHotel.name}`);
                  setActiveTab("rooms");
                }}>
                  {/* Booking form fields would go here */}
                  <div className="flex justify-between items-center pt-4">
                    <button
                      type="button"
                      className="text-blue-600 font-medium"
                      onClick={() => setActiveTab("rooms")}
                    >
                      ← Back to rooms
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainHotelPage;