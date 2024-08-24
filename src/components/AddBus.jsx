import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, storage, collection, addDoc, ref, uploadBytes, getDownloadURL } from '../config/firebase';

const AddBus = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [busDetails, setBusDetails] = useState({
    name: '',
    model: '',
    mileage: '',
    chargePerKm: '',
    seatingCapacity: '',
    luggageCapacity: '',
    fuelType: '',
    description: '',
    rentalPrice: "",
    image: null,
    transactionType: '',
    postedDate: '',
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
    setBusDetails({ ...busDetails, image: e.target.files[0] });
  };

  const handleAddBus = async () => {
    if (!isAdmin) {
      alert('Unauthorized action');
      return;
    }

    try {
      const { name, model, mileage, chargePerKm, seatingCapacity, luggageCapacity, fuelType, description, rentalPrice, image, transactionType } = busDetails;

      let imageUrl = '';
      if (image) {
        const imageRef = ref(storage, `buses/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const currentDate = new Date();
      const postedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

      const busesCollectionRef = collection(db, "olaBase", "busCollections", "Buses");

      await addDoc(busesCollectionRef, { 
        name, 
        model, 
        mileage, 
        chargePerKm, 
        seatingCapacity, 
        luggageCapacity, 
        fuelType, 
        description, 
        rentalPrice, 
        imageUrl, 
        transactionType,
        postedDate,
      });
      alert('Bus details added successfully!');

      setBusDetails({
        name: '',
        model: '',
        mileage: '',
        chargePerKm: '',
        seatingCapacity: '',
        luggageCapacity: '',
        fuelType: '',
        description: '',
        rentalPrice: "",
        image: null,
        transactionType: '',
        postedDate: '',
      });
    } catch (error) {
      console.error('Error adding bus details: ', error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center md:my-20 bg-white p-10 ">
      <h1 className="text-2xl font-bold mb-4">Add Bus</h1>
      <div className="mt-8">
        <input
          type="text"
          placeholder="Name"
          value={busDetails.name}
          onChange={(e) => setBusDetails({ ...busDetails, name: e.target.value })}
          className="border mx-2 p-2 w-full md:w-auto mb-2"
        />
        <input
          type="text"
          placeholder="Model"
          value={busDetails.model}
          onChange={(e) => setBusDetails({ ...busDetails, model: e.target.value })}
          className="border mx-2 p-2 mb-2 md:w-auto w-full"
        />
        <input
          type="text"
          placeholder="Mileage"
          value={busDetails.mileage}
          onChange={(e) => setBusDetails({ ...busDetails, mileage: e.target.value })}
          className="border mx-2 p-2 mb-2 md:w-auto w-full"
        />
        <input
          type="number"
          placeholder="Charge Per Km"
          value={busDetails.chargePerKm}
          onChange={(e) => setBusDetails({ ...busDetails, chargePerKm: e.target.value })}
          className="border mx-2 p-2 mb-2 md:w-auto w-full"
        />
        <input
          type="number"
          placeholder="Seating Capacity"
          value={busDetails.seatingCapacity}
          onChange={(e) => setBusDetails({ ...busDetails, seatingCapacity: e.target.value })}
          className="border mx-2 p-2 mb-2 md:w-auto w-full"
        />
        <input
          type="text"
          placeholder="Luggage Capacity"
          value={busDetails.luggageCapacity}
          onChange={(e) => setBusDetails({ ...busDetails, luggageCapacity: e.target.value })}
          className="border mx-2 p-2 mb-2 md:w-auto w-full"
        />
        <input
          type="text"
          placeholder="Transaction Type"
          value={busDetails.transactionType}
          onChange={(e) => setBusDetails({ ...busDetails, transactionType: e.target.value })}
          className="border mx-2 p-2 mb-2 md:w-auto w-full"
        />
        <input
          type="text"
          placeholder="Fuel Type"
          value={busDetails.fuelType}
          onChange={(e) => setBusDetails({ ...busDetails, fuelType: e.target.value })}
          className="border mx-2 p-2 mb-2 md:w-auto w-full"
        />
        <input
          type="number"
          placeholder="Rental Price Per Day"
          value={busDetails.rentalPrice}
          onChange={(e) => setBusDetails({ ...busDetails, rentalPrice: e.target.value })}
          className="border mx-2 p-2 mb-2  md:w-auto w-full"
        />
        <textarea
          placeholder="Description"
          rows={2}
          value={busDetails.description}
          onChange={(e) => setBusDetails({ ...busDetails, description: e.target.value })}
          className="border mx-2 p-2 -mb-4 md:w-auto w-full"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="border mx-2 p-2 mb-2 md:w-auto w-full"
        />
        <button onClick={handleAddBus} className="bg-green-500 text-white p-2 ml-2">Add</button>
      </div>
    </div>
  );
};

export default AddBus;
