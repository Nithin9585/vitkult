// components/Navbar.js
import Link from 'next/link';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from './theme-btn';
export default function Navbar() {
  return (
    <nav className="bg-background/50 sticky top-0 backdrop-blur border-b p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className=" text-2xl font-bold">
        <Link href="/" className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-red-500">
  VITKULT
</Link>

        </div>
      <div className="hidden md:flex space-x-4 items-center">
  <Link href="/" className="transition duration-300 ease-in-out relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-blue-400 after:to-purple-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-500 hover:after:scale-x-100 hover:-translate-y-1">Forms</Link>
  <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
  <ModeToggle />
</div>
        <div className="md:hidden">
          <Sheet>            

        
            <SheetTrigger>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </SheetTrigger>
            
            <SheetContent>
              <SheetHeader>
                <SheetTitle>VITKULT</SheetTitle>
                <SheetDescription>
                  <div className="flex pt-10 flex-col gap-8 items-center">
                    <Link href="/" className=" hover:text-gray-200">Forms</Link>
                    <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <span className='mx-2'>
          <ModeToggle />

</span>

        </div>
      </div>
    </nav>
  );
}