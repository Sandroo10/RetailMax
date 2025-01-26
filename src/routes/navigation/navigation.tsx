import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/User.Context';
import Cart from '../../components/Cart/Cart';
import CartDropdown from '../../components/Cart-Dropdown/Cart-Dropdown';
import { CartContext } from '../../contexts/Cart.context';
import SiteImage from '../../assets/RetailMax.png';
import LightIcon from '../../assets/person-white.png';
import DarkIcon from '../../assets/person-black.png';
import DefaultProfile from '../../assets/pfp.png';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../components/ui/sheet";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "../../components/ui/dialog"
import SignInForm from '../../components/sign-in-form/sign-in-form';
import { useTranslation } from 'react-i18next';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "../../components/ui/dropdown-menu"
import { changeLanguage } from 'i18next';
import { ModeToggle } from '../../components/Mode-Toggle/mode-toggle';
  

const Navigation = () => {
    const { t } = useTranslation();
    const { currentUser, profilePicture } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    const [isSignInSheetOpen, setSignInSheetOpen] = useState(false);
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);

    const openSignInSheet = () => setSignInSheetOpen(true);
    const closeSignInSheet = () => setSignInSheetOpen(false);

    const closeMobileNav = () => setMobileNavOpen(false);

    const handleSignOut = () => {
        console.log("Sign out logic");
    };
    

    return (
        <div className="h-[95px] w-full flex justify-between mb-6 bg-[rgb(72,166,167)] dark:bg-orange-700">
            <Link to="/" className="h-full w-[180px] p-6">
                <img src={SiteImage} alt="Site Logo" className="h-full w-[180px]" />
            </Link>

            <div className="hidden sm:flex w-1/2 h-full items-center justify-end space-x-2.5 mr-5">
                <Link to="/profile">
                    <button className="px-4 py-2 flex items-center gap-2 cursor-pointer text-black rounded hover:bg-gray-500">
                        <img
                            src={profilePicture || DefaultProfile}
                            alt="Profile Icon"
                            className="w-6 h-6 rounded-full"
                        />
                        {t('navigation.profile')}
                    </button>
                </Link>
                <DropdownMenu>
            <DropdownMenuTrigger className="hover:bg-gray-500 focus:outline-none px-3 py-2 rounded-md ">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 fill-current text-black"
              >
                <path
                  d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
                <path
                  d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
                <path
                  d="M7.09991 13.5V1.5H7.89991V13.5H7.09991zM10.375 7.49998C10.375 5.32724 9.59364 3.17778 8.06183 1.75656L8.53793 1.24341C10.2396 2.82218 11.075 5.17273 11.075 7.49998 11.075 9.82724 10.2396 12.1778 8.53793 13.7566L8.06183 13.2434C9.59364 11.8222 10.375 9.67273 10.375 7.49998zM3.99969 7.5C3.99969 5.17611 4.80786 2.82678 6.45768 1.24719L6.94177 1.75281C5.4582 3.17323 4.69969 5.32389 4.69969 7.5 4.6997 9.67611 5.45822 11.8268 6.94179 13.2472L6.45769 13.7528C4.80788 12.1732 3.9997 9.8239 3.99969 7.5z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-700 text-white rounded-md mt-2">
              <DropdownMenuItem
                onClick={() => changeLanguage('en')}
                className="hover:bg-gray-600 px-4 py-2 cursor-pointer"
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => changeLanguage('ka')}
                className="hover:bg-gray-600 px-4 py-2 cursor-pointer"
              >
                ქართული
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
                <Link to="/shop">
                    <button className="px-4 py-2 cursor-pointer text-black rounded hover:bg-gray-500">
                      {t('navigation.shop')}
                    </button>
                </Link>
                <Dialog>
                    <DialogTrigger>
                        <button
                            className="px-4 py-2 flex items-center gap-2 cursor-pointer text-black rounded hover:bg-gray-500"
                        >
                            <img
                                src={LightIcon}
                                alt="Person Icon"
                                className="w-4 h-4 dark:hidden"
                            />
                            <img
                                src={DarkIcon}
                                alt="Person Icon"
                                className="w-4 h-4 hidden dark:block"
                            />
                            {currentUser ? t('navigation.signOut') : t('navigation.signIn')}
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogDescription>
                                <SignInForm />
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Cart />
            
                {isCartOpen && <CartDropdown />}
            </div>

            <div className="sm:hidden flex items-center mr-5">
                <Sheet open={isMobileNavOpen} onOpenChange={setMobileNavOpen}>
                    <SheetTrigger className='flex flex-row justify-between items-center gap-3'>
                        <Link to="/profile" onClick={closeMobileNav}>
                           <img
                            src={profilePicture || DefaultProfile}
                            alt="Profile Icon"
                            className="w-9 h-9 rounded-full"
                            />
                        </Link>
                        <button className="p-2 bg-[rgb(41,115,178)] text-white rounded">
                            ☰
                        </button>
                        
                    </SheetTrigger>
                    <SheetContent className="w-full h-full fixed top-0 left-0 bg-white z-50">
                        <SheetHeader>
                            <SheetTitle>{t('navigation.navigation')}</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col space-y-4 mt-4">
                            <Link to="/" onClick={closeMobileNav}>
                                <button className="px-4 py-2 w-full text-left text-black rounded">
                                   {t('navigaiton.home')}
                                </button>
                            </Link>
                            <Link to="/shop" onClick={closeMobileNav}>
                                <button className="px-4 py-2 w-full text-left text-black rounded">
                                {t('navigaiton.shop')}
                                </button>
                            </Link>
                            <button
    className="px-4 py-2 w-full text-left text-black rounded"
    onClick={currentUser ? handleSignOut : openSignInSheet}
>
{currentUser ? t('navigation.signOut') : t('navigation.signIn')}
</button>

                            <Link to="/checkout" onClick={closeMobileNav}>
                                <button className="px-4 py-2 w-full text-left text-black rounded">
                                 {t('navigaiton.checkout')}
                                </button>
                            </Link>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {isSignInSheetOpen && (
                <Sheet open={isSignInSheetOpen} onOpenChange={closeSignInSheet}>
                    <SheetContent className="w-full h-full fixed top-0 left-0 bg-white z-50">
                        <SheetHeader>
                            <SheetTitle>{t('navigation.signIn')}</SheetTitle>
                        </SheetHeader>
                        <div className="mt-4">
                            <SignInForm />
                        </div>
                    </SheetContent>
                </Sheet>
            )}
            <ModeToggle 
    className="fixed bottom-4 right-8 bg-[rgb(41,115,178)] text-white p-3 rounded-full shadow-lg hover:bg-[rgb(60,140,200)] transition-transform z-50" 
    style={{ transform: 'translate(0, 0)' }}
/>

        </div>
    );
};

export default Navigation;
