interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FormInput = ({ label, ...otherProps }: FormInputProps) => {
  const shrink = !!otherProps.value && otherProps.value.toString().length > 0;

  return (
    <div className="relative my-10">
      <input
        className={`bg-white text-black text-lg py-2 px-1 w-full border-b border-gray-400 focus:outline-none focus:border-black ${
          otherProps.type === "password" ? "tracking-[0.3em]" : ""
        }`}
        {...otherProps}
      />
      {label && (
        <label
          className={`absolute left-1 top-2 text-gray-500 text-lg transition-all ease-linear ${
            shrink ? "-top-4 text-sm text-black" : ""
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
