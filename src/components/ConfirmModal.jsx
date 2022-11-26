import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const ConfirmModal = ({ isOpen, closeModal, clickHandler, item }) => {
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
                <div className="mt-2">
                  <p className="text-gray-500 text-center">
                    Are you sure want to delete this {item}?
                  </p>
                </div>

                <div className="mt-4 w-1/2 mx-auto flex justify-between">
                  <button
                    type="button"
                    className="bg-red-100 text-red-500 px-5 py-1 rounded-md"
                    onClick={clickHandler}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-blue-100 text-blue-500 px-5 py-1 rounded-md"
                    type="button"
                    onClick={closeModal}
                  >
                    No
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmModal;
