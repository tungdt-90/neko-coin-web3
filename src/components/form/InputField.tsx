import { Transition } from "@headlessui/react";
import { ChangeEvent } from "react";
import { FormikErrors } from "formik";

interface IProps {
  label?: string;
  id: string;
  type?: string;
  placeHolder: string;
  value: string | number;
  onChange?: (event: ChangeEvent<any>) => void;
  errorMessage: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  showError: boolean;
}
const InputField = ({
  id,
  label,
  onChange,
  placeHolder,
  type,
  value,
  showError,
  errorMessage,
}: IProps) => (
  <>
    {label && (
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Account address
      </label>
    )}
    <input
      type={type || "text"}
      value={value}
      onChange={onChange}
      name={id}
      id={id}
      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
      placeholder={placeHolder}
    />
    <Transition
      show={showError}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <div className="text-sm font-base italic text-red-600 mt-1">
        {Array.isArray(errorMessage) &&
          errorMessage.map((message) => <p>{message}</p>)}
        {!Array.isArray(errorMessage) && errorMessage}
      </div>
    </Transition>
  </>
);

export default InputField;
