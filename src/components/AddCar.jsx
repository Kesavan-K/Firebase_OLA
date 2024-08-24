import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, storage, collection, addDoc, ref, uploadBytes, getDownloadURL } from '../config/firebase';

const AddCar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [carDetails, setCarDetails] = useState({
    name: '',
    model: '',
    mileage: '',
    postedDate: "",
    chargePerKm: "",
    seatingCapacity: "",
    luggageCapacity: '',
    transactionType: '',
    fuelType: '',
    description: '',
    rentalPrice: "",
    image: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const adminEmails = ['whitty8754@gmail.com', 'kesavan8388@gmail.com'];
        setIsAdmin(adminEmails.includes(user.email));
            } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleImageChange = (e) => {
    setCarDetails({ ...carDetails, image: e.target.files[0] });
  };

  const handleAddCar = async () => {
    if (!isAdmin) {
      alert('Unauthorized action');
      return;
    }

    try {
      const { name, model, mileage, chargePerKm, seatingCapacity, luggageCapacity, transactionType, fuelType, description, rentalPrice, image } = carDetails;
      
      let imageUrl = '';
      if (image) {
        const imageRef = ref(storage, `cars/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const currentDate = new Date();
      const postedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

      const carsCollectionRef = collection(db, "olaBase", "carCollections", "Cars");

      // Add new car
      await addDoc(carsCollectionRef, { 
        name, 
        model, 
        mileage, 
        postedDate,
        chargePerKm, 
        seatingCapacity, 
        luggageCapacity, 
        transactionType,
        fuelType, 
        description, 
        rentalPrice, 
        imageUrl, 
      });
      alert('Car details added successfully!');

      setCarDetails({
        name: '',
        model: '',
        mileage: '',
        postedDate: "",
        chargePerKm: "",
        seatingCapacity: "",
        luggageCapacity: '',
        transactionType: '',
        fuelType: '',
        description: '',
        rentalPrice: "",
        image: null,
      });
    } catch (error) {
      console.error('Error adding car details: ', error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center md:my-20 bg-white p-10 ">
      <h1 className="text-2xl font-bold mb-4">Add Car</h1>
      <div className="mt-8">
        <input
          type="text"
          placeholder="Name"
          value={carDetails.name}
          onChange={(e) => setCarDetails({ ...carDetails, name: e.target.value })}
          className="border mx-2 p-2 w-full md:w-auto  mb-2"
        />
        <input
          type="text"
          placeholder="Model"
          value={carDetails.model}
          onChange={(e) => setCarDetails({ ...carDetails, model: e.target.value })}
          className="border mx-2 p-2 w-full md:w-auto mb-2"
        />
        <input
          type="text"
          placeholder="Mileage"
          value={carDetails.mileage}
          onChange={(e) => setCarDetails({ ...carDetails, mileage: e.target.value })}
          className="border mx-2 p-2 w-full md:w-auto mb-2"
        />
        <input
          type="number"
          placeholder="Charge Per Km"
          value={carDetails.chargePerKm}
          onChange={(e) => setCarDetails({ ...carDetails, chargePerKm: e.target.value })}
          className="border mx-2 p-2 w-full md:w-auto mb-2"
        />
        <input
          type="number"
          placeholder="Seating Capacity"
          value={carDetails.seatingCapacity}
          onChange={(e) => setCarDetails({ ...carDetails, seatingCapacity: e.target.value })}
          className="border mx-2 p-2 w-full md:w-auto mb-2"
        />
        <input
          type="text"
          placeholder="Luggage Capacity"
          value={carDetails.luggageCapacity}
          onChange={(e) => setCarDetails({ ...carDetails, luggageCapacity: e.target.value })}
          className="border mx-2 p-2 w-full md:w-auto mb-2"
        />
        <input
          type="text"
          placeholder="Transaction Type"
          value={carDetails.transactionType}
          onChange={(e) => setCarDetails({ ...carDetails, transactionType: e.target.value })}
          className="border mx-2 p-2 w-full md:w-auto mb-2"
        />
        <input
          type="text"
          placeholder="Fuel Type"
          value={carDetails.fuelType}
          onChange={(e) => setCarDetails({ ...carDetails, fuelType: e.target.value })}
          className="border mx-2 p-2 w-full md:w-auto mb-2"
        />
        <input
          type="number"
          placeholder="Rental Price Per Day"
          value={carDetails.rentalPrice}
          onChange={(e) => setCarDetails({ ...carDetails, rentalPrice: e.target.value })}
          className="border mx-2 p-2 w-full md:w-auto mb-2"
        />
        <textarea
          placeholder="Description"
          rows={2}
          value={carDetails.description}
          onChange={(e) => setCarDetails({ ...carDetails, description: e.target.value })}
          className="border mx-2 p-2 w-full md:w-auto  -mb-4"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="border mx-2 p-2 w-full md:w-auto mb-2"
        />
        <button onClick={handleAddCar} className="bg-green-500 text-white p-2 ml-2">Add</button>
      </div>
    </div>
  );
};

export default AddCar;
