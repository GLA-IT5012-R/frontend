'use client';
// React and Clerk imports
import React, { useState } from 'react';
import { SignedIn, SignedOut, SignIn, SignOutButton, useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Logo } from '../Logo';
import { LogOutIcon, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CustomModal from "@/components/HeroModal";


export function Header() {
    const { user,logout } = useAuth();
    const { signOut } = useClerk();
    const [open, setOpen] = useState(false); // For SignIn modal
    const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle

    const firstName = user?.username || "there";

    const menuItems = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'About', href: '/about' },

    ];

    /***** end clerk */

    return (
        <header id="header" className="w-full z-9 absolute top-0 left-0 flex items-center justify-between px-8 py-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
                <Logo className="text-brand-purple fl-h-10/20" />
            </Link>
            {/* Menu */}
            <nav
                className="hidden sm:flex gap-8"
                aria-label="Menu"
            >
                {menuItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className="text-gray-700 hover:text-amber-700 transition text-lg"
                    >
                        {item.label}
                    </a>
                ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-2 justify-self-end">
                {/* Desktop Auth Buttons */}
                {/* {user ? (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <span className='cursor-pointer'>Hi,&nbsp;{user.username}</span>
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
                                <DropdownMenuGroup>
                                    <DropdownMenuItem variant="destructive" onClick={logout}>
                                        <LogOutIcon />
                                        Sign Out

                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Link
                            href="/cart"
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 hover:brightness-110"
                        >
                            <ShoppingCart size={20} strokeWidth={2} />
                        </Link>

                    </>
                ) : (
                    <Link
                        href="/signin"
                        className="hidden sm:inline-flex button-cutout group items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg fl-py-2.5/3 from-brand-blue to-brand-lime text-black mr-4"
                    >
                        Login
                    </Link>

                )} */}

                {/* Clerk/nextjs */}
                <SignedIn>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <span className='cursor-pointer text-lg'>Hi,&nbsp;{firstName}</span>
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
                                <DropdownMenuItem>
                                    <Link
                                        href="/account/order"
                                        title="My Orders"
                                    >
                                        My Orders
                                    </Link>

                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            {/* <SignOutButton> */}
                            <DropdownMenuGroup>
                                <DropdownMenuItem variant="destructive"
                                    onClick={async () => {
                                        await signOut();   // 退出 Clerk
                                        logout();          // 清理你自己的状态
                                    }}
                                >
                                    <LogOutIcon />
                                    Sign Out

                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            {/* </SignOutButton> */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link
                        href="/cart"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 hover:brightness-110"
                    >
                        <ShoppingCart size={20} strokeWidth={2} />
                    </Link>
                </SignedIn>


                <SignedOut>
                    <Link
                        href="/sign-in"
                        className="hidden sm:inline-flex button-cutout group items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg fl-py-2.5/3 from-brand-blue to-brand-lime text-black mr-4"
                    >
                        Login
                    </Link>
                </SignedOut>



                <div className="sm:hidden flex items-center gap-4">
                    {/* <CartButton /> */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 group"
                        aria-label="Toggle menu"
                    >
                        <span className={`block h-1 w-7 bg-brand-purple transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                        <span className={`block h-1 w-7 bg-brand-purple transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block h-1 w-7 bg-brand-purple transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                    </button>
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

