import { useState, useEffect } from "react";
import {
  db,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "../config/firebase";
import { FaEdit, FaTrash, FaHeart, FaShareAlt } from "react-icons/fa";
import { MdDirectionsCar, MdMonetizationOn } from "react-icons/md";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase"; // Import Firebase storage
import PropTypes from "prop-types"; // Import PropTypes
import { SiFueler } from "react-icons/si";

const VanList = ({ isAdmin }) => {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingVanId, setEditingVanId] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  const [editDetails, setEditDetails] = useState({
    name: "",
    model: "",
    mileage: "",
    chargePerKm: "",
    seatingCapacity: "",
    luggageCapacity: "",
    fuelType: "",
    description: "",
    rentalPrice: 0,
    imageUrl: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchVans = async () => {
      try {
        const vansCollection = collection(
          db,
          "olaBase",
          "vanCollections",
          "Vans"
        );
        const querySnapshot = await getDocs(vansCollection);

        const vansList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setVans(vansList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching van data: ", error);
        setLoading(false);
      }
    };

    fetchVans();
  }, []);

  const handleDelete = async (id) => {
    try {
      const vanDoc = doc(db, "olaBase", "vanCollections", "Vans", id);
      await deleteDoc(vanDoc);
      setVans(vans.filter((van) => van.id !== id));
      alert("Van Deleted!!!")

    } catch (error) {
      console.error("Error deleting van: ", error);
    }
  };

  const handleEditClick = (van) => {
    setEditingVanId(van.id);
    setEditDetails({
      name: van.name,
      model: van.model,
      mileage: van.mileage,
      chargePerKm: van.chargePerKm,
      seatingCapacity: van.seatingCapacity,
      luggageCapacity: van.luggageCapacity,
      fuelType: van.fuelType,
      description: van.description,
      rentalPrice: van.rentalPrice,
      imageUrl: van.imageUrl,
    });
    setSelectedImage(null); // Clear selected image on edit
  };

  const handleEdit = async () => {
    if (editingVanId) {
      try {
        let imageUrl = editDetails.imageUrl;

        // Handle image upload if a new image is selected
        if (selectedImage) {
          const imageRef = ref(storage, `van-images/${selectedImage.name}`);
          await uploadBytes(imageRef, selectedImage);
          imageUrl = await getDownloadURL(imageRef);
        }

        const vanDoc = doc(
          db,
          "olaBase",
          "vanCollections",
          "Vans",
          editingVanId
        );
        await updateDoc(vanDoc, { ...editDetails, imageUrl });
        alert("Van Updated Successfully!");
        setVans(
          vans.map((van) =>
            van.id === editingVanId ? { ...van, ...editDetails, imageUrl } : van
          )
        );
        setEditingVanId(null);
        setEditDetails({
          name: "",
          model: "",
          mileage: "",
          chargePerKm: "",
          seatingCapacity: "",
          luggageCapacity: "",
          fuelType: "",
          description: "",
          rentalPrice: 0,
          imageUrl: "",
        });
        setSelectedImage(null); // Clear selected image after update
      } catch (error) {
        console.error("Error updating van: ", error);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!isAdmin && (
        <section className="relative overflow-hidden bg-gradient-to-b -z-50  from-blue-50 via-transparent to-transparent pb-12 pt-20 sm:pb-16 sm:pt-32 lg:pb-24 xl:pb-32 xl:pt-40">
          <div className="relative z-10">
            <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
              <svg
                className="h-[60rem] w-[100rem] flex-none stroke-blue-600 opacity-20"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                    width="200"
                    height="200"
                    x="50%"
                    y="50%"
                    patternUnits="userSpaceOnUse"
                    patternTransform="translate(-100 0)"
                  >
                    <path d="M.5 200V.5H200" fill="none"></path>
                  </pattern>
                </defs>
                <svg x="50%" y="50%" className="overflow-visible fill-blue-50">
                  <path
                    d="M-300 0h201v201h-201Z M300 200h201v201h-201Z"
                    strokeWidth="0"
                  ></path>
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth="0"
                  fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"
                ></rect>
              </svg>
            </div>
          </div>
          <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl mt-10 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Vehicals for Rental:
                <span className="text-blue-600">Book Your Van</span>
              </h1>
              <h2 className="mt-6 text-lg leading-8 text-gray-600">
                Discover affordable and reliable vehicle rentals for all your
                travel needs. Book your van today!
              </h2>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  className="isomorphic-link isomorphic-link--internal inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href="/contact"
                >
                  Book Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="relative mx-auto mt-10 max-w-lg">
              <img
                className="w-full rounded-2xl border border-gray-100 shadow"
                src="/olavan.jpg"
                alt=""
              />
            </div>
          </div>
        </section>
      )}
      <div className="flex flex-col items-center justify-center bg-slate-50 p-4">
        <h1 className="text-3xl font-bold mb-6">Van List</h1>
        {isAdmin && editingVanId && (
          <div className="mt-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Van</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={editDetails.name}
                onChange={(e) =>
                  setEditDetails({ ...editDetails, name: e.target.value })
                }
                className="border p-3 w-full rounded"
              />
              <input
                type="text"
                placeholder="Model"
                value={editDetails.model}
                onChange={(e) =>
                  setEditDetails({ ...editDetails, model: e.target.value })
                }
                className="border p-3 w-full rounded"
              />
              {/* <input
                type="text"
                placeholder="Mileage"
                value={editDetails.mileage}
                onChange={(e) =>
                  setEditDetails({ ...editDetails, mileage: e.target.value })
                }
                className="border p-3 w-full rounded"
              /> */}
              <input
                type="number"
                placeholder="Charge Per Km"
                value={editDetails.chargePerKm}
                onChange={(e) =>
                  setEditDetails({
                    ...editDetails,
                    chargePerKm: e.target.value,
                  })
                }
                className="border p-3 w-full rounded"
              />
              {/* <input
                type="number"
                placeholder="Seating Capacity"
                value={editDetails.seatingCapacity}
                onChange={(e) =>
                  setEditDetails({
                    ...editDetails,
                    seatingCapacity: e.target.value,
                  })
                }
                className="border p-3 w-full rounded"
              /> */}
              {/* <input
                type="text"
                placeholder="Luggage Capacity"
                value={editDetails.luggageCapacity}
                onChange={(e) =>
                  setEditDetails({
                    ...editDetails,
                    luggageCapacity: e.target.value,
                  })
                }
                className="border p-3  w-full rounded"
              /> */}
              <input
                type="text"
                placeholder="Fuel Type"
                value={editDetails.fuelType}
                onChange={(e) =>
                  setEditDetails({ ...editDetails, fuelType: e.target.value })
                }
                className="border p-3  w-full rounded"
              />
              <textarea
                placeholder="Description"
                value={editDetails.description}
                onChange={(e) =>
                  setEditDetails({
                    ...editDetails,
                    description: e.target.value,
                  })
                }
                className="border p-3  w-full rounded "
              />
              <input
                type="number"
                placeholder="Rental Price"
                value={editDetails.rentalPrice}
                onChange={(e) =>
                  setEditDetails({
                    ...editDetails,
                    rentalPrice: e.target.value,
                  })
                }
                className="border p-3 w-full rounded"
              />
              <input
                type="file"
                onChange={(e) => setSelectedImage(e.target.files[0])}
                className="border p-3 w-full rounded"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => setEditingVanId(null)}
                className="bg-gray-500 text-white p-3 rounded ml-2 hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col space-y-6 w-full max-w-screen-xl md:mt-10 mt-10">
          {vans.map((van) => (
            <div
              key={van.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-10 lg:mx-20 mx-0"
            >
              <div className="w-full lg:w-1/4">
                <div className="relative">
                  <img
                    src={van.imageUrl}
                    alt="van"
                    className="w-full h-56 object-cover rounded-lg"
                  />

                  <span className="absolute bottom-2 left-2 bg-black text-white text-xs rounded-full px-2 py-1">
                    Posted: {van.postedDate}
                  </span>
                </div>
              </div>
              <div className="w-full lg:w-3/4 lg:pl-6 mt-4 lg:mt-0">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-green-600 text-sm font-semibold">
                    POPULAR RENTAL
                  </div>
                  <div className="flex space-x-2 text-gray-500">
                    <FaHeart
                      className={`${
                        isClicked ? "text-red-600" : "text-red-200"
                      } hover:text-red-600 hover:cursor-pointer transition-colors duration-500`}
                      onClick={handleClick}
                    />{" "}
                    <FaShareAlt />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-800">{van.name}</h2>
                <p className="text-sm text-gray-500">Model: {van.model}</p>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
                  <div className="flex items-center">
                    <MdDirectionsCar className="mr-2 text-lg" />
                    <span>
                      <strong>AVAILABILITY</strong>
                      <br />
                      {/* Replace with van.availability if available */}
                      Available
                    </span>
                  </div>
                  <div className="flex items-center">
                    <SiFueler className="mr-2 text-lg" />
                    <span>
                      <strong>FuelType</strong>
                      <br />
                      {/* Replace with car.status if available */}
                      {van.fuelType}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MdMonetizationOn className="mr-2 text-lg" />
                    <span>
                      <strong>TRANSACTION</strong>
                      <br />
                      {van.transactionType}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 text-sm">{van.description}</p>
                <div className="mt-4 flex md:flex-row flex-col md:justify-between">
                  <div className="text-lg font-bold text-gray-800">
                    ₹ {van.rentalPrice}
                    <span className="text-gray-600 text-sm">
                      &nbsp;({van.chargePerKm} per km)
                    </span>
                  </div>
                  <div className="flex gap-2 text-center md:my-0 my-2">
                    <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 md:px-4 px-2 rounded-lg text-sm md:text-md">
                      <a href="/contact">Enquire Now</a>
                    </button>
                    {/* <button className="border border-blue-600 text-blue-600 font-semibold py-2 md:px-4 px-2 rounded-lg text-sm md:text-md m-0">
                    Enquire Now
                  </button> */}
                  </div>
                </div>
                {isAdmin && (
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => handleEditClick(van)}
                      className="text-blue-600 hover:text-blue-500"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(van.id)}
                      className="text-red-600 hover:text-red-500"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Define prop types for the component
VanList.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default VanList;
