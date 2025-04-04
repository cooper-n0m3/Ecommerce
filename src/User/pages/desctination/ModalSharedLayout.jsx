import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ImageModalGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      id: 1,
      title: "Facebook",
      thumbnail:
        "https://via.placeholder.com/300x200/3b5998/ffffff?text=Facebook",
      fullSize:
        "https://via.placeholder.com/800x600/3b5998/ffffff?text=Facebook+Full",
    },
    {
      id: 2,
      title: "ShoppeeClient",
      thumbnail:
        "https://via.placeholder.com/300x200/ff6b00/ffffff?text=Shoppee",
      fullSize:
        "https://via.placeholder.com/800x600/ff6b00/ffffff?text=Shoppee+Full",
    },
    {
      id: 3,
      title: "YouTube",
      thumbnail:
        "https://via.placeholder.com/300x200/ff0000/ffffff?text=YouTube",
      fullSize:
        "https://via.placeholder.com/800x600/ff0000/ffffff?text=YouTube+Full",
    },
    {
      id: 4,
      title: "Tailwind CSS",
      subtitle: "Rapidly build...",
      thumbnail:
        "https://tailwindcss.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcard.a1cd9cff.jpg&w=3840&q=75",
      fullSize:
        "https://tailwindcss.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcard.a1cd9cff.jpg&w=3840&q=75",
    },
    {
      id: 5,
      title: "ChatGPT",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D",
      fullSize:
        "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D",
    },
  ];

  return (
    <main className="w-full Hide-Scrollbar h-[100vh] Hide-Scrollbar ">
      <div className="w-[100vw] relative bg-white grid grid-cols-5 grid-rows-1">
        <div className="w-[100vw] bg-gray-100 p-4 md:p-8">
          {/* Changed container width handling */}
          <div className="mx-auto w-full max-w-screen-xl px-4">
            <h1 className="text-2xl font-bold mb-6">
              examples.motion.dev/react/modal-shared-layout
            </h1>
            <h2 className="text-xl font-semibold mb-4">Image Gallery</h2>

            {/* Image Grid - adjusted gap and responsive columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {images.map((image) => (
                <motion.div
                  key={image.id}
                  layoutId={`image-${image.id}`}
                  onClick={() => setSelectedImage(image)}
                  className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  initial={{ borderRadius: 8 }}
                >
                  <motion.img
                    src={image.thumbnail}
                    alt={image.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <motion.h3 className="font-medium">{image.title}</motion.h3>
                    {image.subtitle && (
                      <motion.p className="text-sm text-gray-500">
                        {image.subtitle}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t pt-4">
              <h3 className="font-bold">Examples</h3>
              <ul className="list-disc pl-5">
                <li>React</li>
                <li>Modal: Shared layout</li>
              </ul>
            </div>

            {/* Modal overlay - adjusted max-width */}
            <AnimatePresence>
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
                  onClick={() => setSelectedImage(null)}
                >
                  {/* Modal content - now responsive to screen size */}
                  <motion.div
                    layoutId={`image-${selectedImage.id}`}
                    className="bg-white rounded-lg w-full max-w-[90vw] md:max-w-4xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <motion.img
                      src={selectedImage.fullSize}
                      alt={selectedImage.title}
                      className="w-full object-contain"
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ImageModalGallery;
