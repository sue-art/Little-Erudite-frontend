import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import IconClose from "../Icons/IconClose";

export default function Modal({ isOpen, onClose, title, children }) {
  const cancelButtonRef = useRef(null);
  if (!isOpen) return null;
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        className="relative z-99"
        initialFocus={cancelButtonRef}
        open={isOpen}
        onOpenChange={onClose}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-99 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="bg-green py-4 pb-4 sm:p-3 sm:pb-4">
                  <div className="flex items-center justify-between  pr-4 pt-4 rounded-t">
                    <button
                      type="button"
                      className="bg-transparent hover:bg-gray-200 text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="top-left-modal"
                      onClick={(e) => onClose(e)}
                    >
                      <IconClose />
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div className="px-4">{children}</div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
