import React, { useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import toast from "react-hot-toast";

const BookingModal = ({ isOpen, closeModal, booking }) => {
  const { user } = useContext(AuthContext);
  const { _id, name, resalePrice, img } = booking;

  const handleBooking = (e) => {
    e.preventDefault();

    const bookingData = {
      productId: _id,
      customerName: user?.displayName,
      customerEmail: user?.email,
      sellerEmail: booking?.sellerEmail,
      productName: name,
      productPrice: resalePrice,
      customerPhone: e.target.phone.value,
      meetingLocation: e.target.location.value,
      productImg: img,
    };
    console.log(bookingData);

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then((data) => {
        closeModal();
        toast.success("You booking is confirmed");
      });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <form onSubmit={handleBooking} className="space-y-3">
                  <div className="input-field">
                    <input
                      className="border w-full py-1 pl-5 rounded-md focus:outline-none"
                      type="text"
                      defaultValue={user?.displayName}
                      disabled
                    />
                  </div>
                  <div className="input-field">
                    <input
                      className="border w-full py-1 pl-5 rounded-md focus:outline-none"
                      type="text"
                      defaultValue={user?.email}
                      disabled
                    />
                  </div>
                  <div className="input-field">
                    <input
                      className="border w-full py-1 pl-5 rounded-md focus:outline-none"
                      type="text"
                      defaultValue={name}
                      disabled
                    />
                  </div>
                  <div className="input-field">
                    <input
                      className="border w-full py-1 pl-5 rounded-md focus:outline-none"
                      type="text"
                      defaultValue={`$ ${resalePrice}`}
                      disabled
                    />
                  </div>
                  <div className="input-field">
                    <input
                      className="border w-full py-1 pl-5 rounded-md focus:outline-none"
                      type="text"
                      name="phone"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div className="input-field">
                    <input
                      className="border w-full py-1 pl-5 rounded-md focus:outline-none"
                      type="text"
                      name="location"
                      placeholder="Meeting Location"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 w-full py-1 text-white rounded-md"
                  >
                    Submit
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BookingModal;
