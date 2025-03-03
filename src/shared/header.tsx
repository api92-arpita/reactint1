import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { PlusCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <nav className="bg-gray-100 min-w-screen fixed top-0 left-0">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex shrink-0 items-center">
            <img className="h-8 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"/>
          </div>
        
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <SignedOut>
          
        <SignInButton />
        </SignedOut>
        <SignedIn>
        <div className="hidden mr-4 sm:ml-6 sm:block">
            <div className="flex space-x-4">
                <Link to="/employee-form" className="">
            <Button variant="ghost" className="flex items-center gap-2 text-gray-300" >
            <PlusCircle size={18} />
            <span>Add Employee</span>
            </Button>
            </Link>
            <Link to="/employee-list" className="">
            <Button variant="ghost" className="flex items-center gap-2 text-gray-300">
            <Users size={18} />
            <span>Employee List</span>
             </Button>
            </Link>
            </div>
          </div>
            <UserButton />
        </SignedIn>
        </div>
      </div>
    </div>
  
  
  </nav>
  
  );
};

export default Header;