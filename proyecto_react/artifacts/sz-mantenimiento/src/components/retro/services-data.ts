import { Cpu, Fan, Gamepad2, Gauge, LayoutGrid } from 'lucide-react';

export interface RetroServiceItem {
  n: string;
  title: string;
  text: string;
  icon: typeof Gamepad2;
  tag: string;
  msg: string;
}

export const servicesData: RetroServiceItem[] = [
  {
    n: '01',
    title: 'Armado gamer y de oficina',
    text: 'Un equipo pensado para lo que necesitás: juego, trabajo o uso diario.',
    icon: Gamepad2,
    tag: 'ARMADO DE PC',
    msg: 'Hola SZ Mantenimiento PC! Quiero consultar por Armado gamer y de oficina.'
  },
  {
    n: '02',
    title: 'Windows y programas',
    text: 'Instalación y configuración de Windows, drivers y software.',
    icon: LayoutGrid,
    tag: 'INSTALACIÓN',
    msg: 'Hola SZ Mantenimiento PC! Quiero consultar por Windows y programas.'
  },
  {
    n: '03',
    title: 'Limpieza interna + pasta térmica',
    text: 'Limpieza de componentes y reemplazo de pasta térmica.',
    icon: Fan,
    tag: 'MANTENIMIENTO',
    msg: 'Hola SZ Mantenimiento PC! Quiero consultar por Limpieza interna y cambio de pasta térmica.'
  },
  {
    n: '04',
    title: 'Optimización del sistema',
    text: 'Ajustes para que el sistema funcione de manera más fluida.',
    icon: Gauge,
    tag: 'PUESTA A PUNTO',
    msg: 'Hola SZ Mantenimiento PC! Quiero consultar por Optimización del sistema.'
  },
  {
    n: '05',
    title: 'Asesoramiento en componentes',
    text: 'Orientación para elegir componentes compatibles con tu equipo.',
    icon: Cpu,
    tag: 'CONSULTA',
    msg: 'Hola SZ Mantenimiento PC! Quiero asesorarme sobre componentes y upgrades.'
  },
];
