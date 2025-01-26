import { ButtonHTMLAttributes } from 'react';
import { buttonTypes } from './button-types'; // Update the import path if needed

const getButtonClass = (buttonType = buttonTypes.base) => {
    return {
        [buttonTypes.base]:
            'min-w-[165px] w-auto h-12 px-9 text-sm bg-black text-white uppercase font-bold flex justify-center items-center cursor-pointer hover:bg-white hover:text-black hover:border hover:border-black',
        [buttonTypes.google]:
            'min-w-[165px] w-auto h-12 px-9 text-sm bg-blue-500 text-white uppercase font-bold flex justify-center items-center cursor-pointer hover:bg-blue-700',
        [buttonTypes.inverted]:
            'min-w-[165px] w-auto h-12 px-9 text-sm bg-white text-black border border-black uppercase font-bold flex justify-center items-center cursor-pointer hover:bg-black hover:text-white hover:border-transparent',
    }[buttonType];
};

const Button = ({ children, btnType = 'base', ...otherProps }: { btnType?: string } & ButtonHTMLAttributes<HTMLButtonElement>) => {
    const buttonClass = getButtonClass(btnType);
    return (
        <button className={buttonClass} {...otherProps}>
            {children}
        </button>
    );
};

export default Button;
