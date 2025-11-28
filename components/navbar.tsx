"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Link as HeroLink,
} from "@heroui/react";
import Link from "next/link";

export function CustomNavbar() {
  return (
    <Navbar
      className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 overflow-visible relative"
      maxWidth="xl"
      isBordered
    >
      
      <Link href="/">
        <img
          src="/rv.png"
          alt="Escudo"
          className="absolute -left-40 top-1/4 -translate-y-1/4 w-[130px] h-[130px] drop-shadow-xl cursor-pointer z-50"
        />
      </Link>

      <NavbarBrand>
        <p className="font-bold text-xl text-white tracking-wide">
          REPORTE DE LLAMADAS
        </p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <HeroLink href="/" className="text-white hover:text-pink-200">
            Inicio
          </HeroLink>
        </NavbarItem>

        <NavbarItem>
          <HeroLink
            href="/reporte_llamadas"
            className="text-white hover:text-pink-200"
          >
            Reporte de llamadas
          </HeroLink>
        </NavbarItem>

        <NavbarItem>
          <HeroLink href="/usuarios" className="text-white hover:text-pink-200">
            Usuarios
          </HeroLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="mr-[-30px]">
        <NavbarItem>
          <Button
            color="danger"
            variant="flat"
            className="text-white bg-pink-500 hover:bg-pink-600 transition-all"
          >
            Cerrar sesión
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
