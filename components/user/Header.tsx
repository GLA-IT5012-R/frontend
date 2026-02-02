'use client';
// React and Clerk imports
import React, { useEffect, useState } from 'react';
import { SignedIn, SignedOut, SignIn, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { syncUserApi } from "@/api/auth";

// UI Components
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CustomModal from "@/components/CustomModal";
import { Logo } from '../Logo';
import { LogOutIcon } from 'lucide-react';

const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
];

export function Header() {

    const { user, isSignedIn } = useUser();
    const [open, setOpen] = useState(false); // For SignIn modal
    const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle

    // Sync user info to backend when user signs in
    const [synced, setSynced] = useState(false);

    useEffect(() => {
        if (user && isSignedIn && !synced) {
            if (user && isSignedIn) {
                const email = user.emailAddresses[0]?.emailAddress;
                const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();
                const clerk_id = user.id; // Clerk 的唯一 ID

                syncUserApi({ id: clerk_id, email, name })  // 注意这里传 id
                    .then((res) => console.log("User synced:", res.data))
                    .catch((err) => console.error("Sync user failed:", err));
            }
        }
    }, [user, isSignedIn, synced]);


    const firstName = user?.firstName || user?.username || "there";

    useEffect(() => {
        console.log('XXXXXXXX: ', process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
    });

    return (
        <header id="header" className="w-full z-9 absolute top-0 left-0 flex items-center justify-between px-8 py-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
                <Logo className="text-brand-purple fl-h-10/20" />
            </Link>
            {/* Menu */}
            <nav
                className="hidden lg:flex gap-8"
                aria-label="Menu"
            >
                {menuItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className="text-gray-700 hover:text-blue-600 transition"
                    >
                        {item.label}
                    </a>
                ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-2 justify-self-end">
                {/* Desktop Auth Buttons */}

                <SignedIn>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <span className='cursor-pointer'>Hi,&nbsp;{firstName}</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Link
                                        href="/account"
                                        title="View Account"
                                    >
                                        View Account
                                    </Link>

                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <SignOutButton>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem variant="destructive">
                                        <LogOutIcon />
                                        Sign Out

                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </SignOutButton>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SignedIn>


                <SignedOut>
                    <Link
                        href="/sign-in"
                        className="hidden lg:inline-flex button-cutout group items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg fl-py-2.5/3 from-brand-blue to-brand-lime text-black mr-4"
                    >
                        Login
                    </Link>
                </SignedOut>
                {/* <SignedIn>
                    <SignOutButton>
                        <button className="hidden lg:inline-flex button-cutout group items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-md fl-py-0.5/1 from-brand-blue to-brand-lime text-black mr-2">
                            Logout
                        </button>
                    </SignOutButton>
                </SignedIn> */}

                <div className="lg:hidden flex items-center gap-4">
                    {/* <CartButton /> */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="relative z-50 w-8 h-8 flex flex-col items-center justify-center gap-1.5 group"
                        aria-label="Toggle menu"
                    >
                        <span className={`block h-1 w-7 bg-brand-purple transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                        <span className={`block h-1 w-7 bg-brand-purple transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block h-1 w-7 bg-brand-purple transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                    </button>
                </div>

                <div className="hidden lg:block">
                    {/* <CartButton /> */}
                </div>

                <CustomModal
                    open={open}
                    onClose={() => setOpen(false)}
                    showCloseButton={true} // 右上角小叉号
                >
                    {/* 这里是弹窗内容，可自定义 */}
                    <SignIn
                        appearance={{
                            elements: {
                                rootBox: "mx-auto",
                                card: "shadow-2xl",
                            },
                        }}
                    />
                </CustomModal>
            </div>
        </header>
    );
};

