import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, storage, collection, addDoc, ref, uploadBytes, getDownloadURL } from '../config/firebase';

const AddVan = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [vanDetails, setVanDetails] = useState({
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
        setIsAdmin(adminEmails.includes(user.email));      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleImageChange = (e) => {
    setVanDetails({ ...vanDetails, image: e.target.files[0] });
  };

  const handleAddVan = async () => {
    if (!isAdmin) {
      alert('Unauthorized action');
      return;
    }

    try {
      const { name, model, mileage, chargePerKm, seatingCapacity, luggageCapacity, fuelType, description, rentalPrice, image, transactionType } = vanDetails;

      let imageUrl = '';
      if (image) {
        const imageRef = ref(storage, `vans/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const currentDate = new Date();
      const postedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

      const vansCollectionRef = collection(db, "olaBase", "vanCollections", "Vans");

      await addDoc(vansCollectionRef, { 
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
      alert('Van details added successfully!');

      setVanDetails({
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
      console.error('Error adding van details: ', error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center md:my-20 bg-white p-10">
      <h1 className="text-2xl font-bold mb-4">Add Van</h1>
      <div className="mt-8">
        <input
          type="text"
          placeholder="Name"
          value={vanDetails.name}
          onChange={(e) => setVanDetails({ ...vanDetails, name: e.target.value })}
          className="border p-2 mx-2 w-full md:w-auto mb-2"
        />
        <input
          type="text"
          placeholder="Model"
          value={vanDetails.model}
          onChange={(e) => setVanDetails({ ...vanDetails, model: e.target.value })}
          className="border p-2 mx-2 w-full md:w-auto mb-2"
        />
        <input
          type="text"
          placeholder="Mileage"
          value={vanDetails.mileage}
          onChange={(e) => setVanDetails({ ...vanDetails, mileage: e.target.value })}
          className="border p-2 mx-2 w-full md:w-auto mb-2"
        />
        <input
          type="number"
          placeholder="Charge Per Km"
          value={vanDetails.chargePerKm}
          onChange={(e) => setVanDetails({ ...vanDetails, chargePerKm: e.target.value })}
          className="border p-2 mx-2 w-full md:w-auto mb-2"
        />
        <input
          type="number"
          placeholder="Seating Capacity"
          value={vanDetails.seatingCapacity}
          onChange={(e) => setVanDetails({ ...vanDetails, seatingCapacity: e.target.value })}
          className="border p-2 mx-2 mb-2 w-full md:w-auto "
        />
        <input
          type="text"
          placeholder="Luggage Capacity"
          value={vanDetails.luggageCapacity}
          onChange={(e) => setVanDetails({ ...vanDetails, luggageCapacity: e.target.value })}
          className="border p-2 mx-2 w-full md:w-auto mb-2"
        />
        <input
          type="text"
          placeholder="Fuel Type"
          value={vanDetails.fuelType}
          onChange={(e) => setVanDetails({ ...vanDetails, fuelType: e.target.value })}
          className="border p-2 mx-2 w-full md:w-auto mb-2"
        />
        <textarea
          placeholder="Description"
          rows={2}
          value={vanDetails.description}
          onChange={(e) => setVanDetails({ ...vanDetails, description: e.target.value })}
          className="border mx-2 p-2 w-full md:w-auto -mb-4"
        />
        <input
          type="number"
          placeholder="Rental Price Per Day"
          value={vanDetails.rentalPrice}
          onChange={(e) => setVanDetails({ ...vanDetails, rentalPrice: e.target.value })}
          className="border p-2 mx-2 w-full md:w-auto mb-2"
        />
        <input
          type="text"
          placeholder="Transaction Type"
          value={vanDetails.transactionType}
          onChange={(e) => setVanDetails({ ...vanDetails, transactionType: e.target.value })}
          className="border p-2 mx-2 w-full md:w-auto mb-2"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="border p-2 mx-2 w-full md:w-auto mb-2"
        />
        <button onClick={handleAddVan} className="bg-green-500 text-white p-2 ml-2" >Add</button>
      </div>
    </div>
  );
};

export default AddVan;
