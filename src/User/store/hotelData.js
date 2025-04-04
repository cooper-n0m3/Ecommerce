
export const hotelsData = [
  {
    id: 1,
    name: "Grand Marina Hotel",
    location: "San Francisco, CA",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.4692116394376!2d104.92902939999999!3d11.589858999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310953ab09f41caf%3A0x98388b82b85c0f6!2sBoBo%20Cafe!5e0!3m2!1sen!2skh!4v1743744465559!5m2!1sen!2skh",
    rating: 4.8,
    reviews: 1243,
    available: false,
    amenities: {
      general: [
        { name: "Free WiFi", icon: "wifi", available: false },
        { name: "Swimming Pool", icon: "pool", available: true },
        { name: "Fitness Center", icon: "gym", available: true },
      ],
    },
    image:
      "https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg?cs=srgb&dl=pexels-asman-chema-91897-594077.jpg&fm=jpg",
    sections: {
      rooms: [
        {
          id: 101,
          type: "Deluxe Ocean View",
          price: 249,
          size: "450 sq ft",
          capacity: 4,
          beds: "1 King Bed",
          amenities: ["wifi", "breakfast", "ac", "tv"],
          description:
            "Spacious room with panoramic ocean views and premium amenities.",
        },
        {
          id: 102,
          type: "Executive Suite",
          price: 349,
          size: "650 sq ft",
          capacity: 2,
          beds: "1 King Bed",
          amenities: ["wifi", "breakfast", "ac", "tv", "minibar"],
          description:
            "Luxurious suite with separate living area and premium services.",
        },
        {
          id: 103,
          type: "Executive Suite",
          price: 349,
          size: "650 sq ft",
          capacity: 2,
          beds: "1 King Bed",
          amenities: ["wifi", "breakfast", "ac", "tv", "minibar"],
          description:
            "Luxurious suite with separate living area and premium services.",
        },
      ],
      reviews: [
        {
          id: 1,
          author: "Michael Johnson",
          authorImage:
            "https://i.pinimg.com/474x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg",
          rating: 5,
          date: "2023-10-15",
          title: "Perfect getaway!",
          content:
            "The ocean view was breathtaking and the service was impeccable.",
          stayType: "Couple",
        },
        {
          id: 2,
          author: "Sarah Williams",
          authorImage:
            "https://www.mensjournal.com/.image/t_share/MTk2MTM2NTcwNDMxMjg0NzQx/man-taking-selfie.jpg",
          rating: 4,
          date: "2023-09-22",
          title: "Great location",
          content: "Excellent hotel with fantastic amenities.",
          stayType: "Family",
        },
        {
          id: 3,
          author: "David Chen",
          rating: 5,
          date: "2023-11-05",
          title: "Absolutely wonderful",
          content:
            "From check-in to check-out, everything was perfect. The staff went above and beyond to make our anniversary special.",
          stayType: "Couple",
        },
        {
          id: 4,
          author: "Emily Rodriguez",
          rating: 4,
          date: "2023-08-17",
          title: "Relaxing vacation",
          content:
            "The spa services were exceptional and our room was always impeccably cleaned. Would definitely return!",
          stayType: "Solo",
        },
        {
          id: 5,
          author: "James Wilson",
          rating: 3,
          date: "2023-12-10",
          title: "Good but noisy",
          content:
            "Comfortable beds and great food, though the street noise was noticeable at night. Request a room facing the courtyard.",
          stayType: "Business",
        },
        {
          id: 6,
          author: "Olivia Thompson",
          rating: 5,
          date: "2024-01-08",
          title: "Perfect family stay",
          content:
            "The kids loved the pool and the connecting rooms worked perfectly for our family of five. Breakfast buffet was outstanding!",
          stayType: "Family",
        },
        {
          id: 7,
          author: "Robert Kim",
          rating: 4,
          date: "2023-07-22",
          title: "Excellent service",
          content:
            "Concierge gave us fantastic local dining recommendations. Room was spacious with a comfortable work desk.",
          stayType: "Business",
        },
      ],
      details: [
        {
          id: 1,
          author: "Michael Johnson",
          rating: 5,
          date: "2023-10-15",
          title: "Perfect getaway!",
          content:
            "The ocean view was breathtaking and the service was impeccable.",
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
        },
      ],
    },
    policies: {
      checkIn: "3:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 48 hours before check-in",
      pets: "Pets allowed with fee",
    },
    tabSelections: [
      { value: "rooms", label: "Rooms" },
      { value: "details", label: "Details" },
      { value: "reviews", label: "Reviews" },
      { value: "policies", label: "Policies" },
    ],
  },
  {
    id: 2,
    name: "Mountain View Resort",
    location: "Denver, CO",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3880.9976164977274!2d103.86441077374005!3d13.412474505061937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3110168aea9a272d:0x3eaba81157b0418d!2sAngkor%20Wat!5e0!3m2!1sen!2skh!4v1743744702998!5m2!1sen!2skh",
    rating: 4.6,
    reviews: 892,
    available: true,
    amenities: {
      general: [
        { name: "Free WiFi", icon: "wifi", available: true },
        { name: "Swimming Pool", icon: "pool", available: true },
        { name: "Fitness Center", icon: "gym", available: true },
      ],
    },
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    policies: {
      checkIn: "3:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 48 hours before check-in",
      pets: "Pets allowed with fee",
    },
    sections: {
      rooms: [
        {
          id: 201,
          type: "Standard Room",
          price: 159,
          size: "350 sq ft",
          capacity: 2,
          beds: "1 Queen Bed",
          amenities: ["wifi", "ac", "tv"],
          description:
            "Comfortable room with mountain views and standard amenities.",
        },
        {
          id: 202,
          type: "Standard Room",
          price: 159,
          size: "350 sq ft",
          capacity: 2,
          beds: "1 Queen Bed",
          amenities: ["wifi", "ac", "tv"],
          description:
            "Comfortable room with mountain views and standard amenities.",
        },
      ],
      reviews: [
        {
          id: 1,
          author: "Michael Johnson",
          rating: 5,
          date: "2023-10-15",
          title: "Perfect getaway!",
          content:
            "The ocean view was breathtaking and the service was impeccable.",
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
        },
      ],
      details: [
        {
          id: 1,
          author: "Michael Johnson",
          rating: 5,
          date: "2023-10-15",
          title: "Perfect getaway!",
          content:
            "The ocean view was breathtaking and the service was impeccable.",
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
        },
      ],
    },
    tabSelections: [
      { value: "rooms", label: "Rooms" },
      { value: "details", label: "Details" },
      { value: "reviews", label: "Reviews" },
      { value: "policies", label: "Policies" },
    ],
  },
  {
    id: 3,
    name: "Mountain View Resort",
    location: "Koh Pich",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d125054.83745044952!2d104.78563014192454!3d11.625939305054885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1srupp!5e0!3m2!1sen!2skh!4v1743744746775!5m2!1sen!2skh",
    rating: 4.6,
    reviews: 892,
    available: true,
    amenities: {
      general: [
        { name: "Free WiFi", icon: "wifi", available: false },
        { name: "Swimming Pool", icon: "pool", available: true },
        { name: "Fitness Center", icon: "gym", available: false },
      ],
    },
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    policies: {
      checkIn: "3:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 48 hours before check-in",
      pets: "Pets allowed with fee",
    },
    sections: {
      rooms: [
        {
          id: 201,
          type: "Standard Room",
          price: 159,
          size: "350 sq ft",
          capacity: 2,
          beds: "1 Queen Bed",
          amenities: ["wifi", "ac", "tv"],
          description:
            "Comfortable room with mountain views and standard amenities.",
        },
        {
          id: 202,
          type: "Standard Room",
          price: 159,
          size: "350 sq ft",
          capacity: 2,
          beds: "1 Queen Bed",
          amenities: ["wifi", "ac", "tv"],
          description:
            "Comfortable room with mountain views and standard amenities.",
        },
      ],
      reviews: [
        {
          id: 1,
          author: "Michael Johnson",
          rating: 5,
          date: "2023-10-15",
          title: "Perfect getaway!",
          content:
            "The ocean view was breathtaking and the service was impeccable.",
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
        },
      ],
      details: [
        {
          id: 1,
          author: "Michael Johnson",
          rating: 5,
          date: "2023-10-15",
          title: "Perfect getaway!",
          content:
            "The ocean view was breathtaking and the service was impeccable.",
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
        },
      ],
    },
    tabSelections: [
      { value: "rooms", label: "Rooms" },
      { value: "details", label: "Details" },
      { value: "reviews", label: "Reviews" },
      { value: "policies", label: "Policies" },
    ],
  },
];

