'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import { Menu, X, Phone, MapPin, CalendarDays, ArrowUpRight, ChevronDown, ArrowRight } from 'lucide-react';
import {callHref, directionsUrl, type Doctor, type DoctorId} from '@/lib/site';
type DoctorMap=Record<DoctorId,Doctor>;
const nav=[['About','/about'],['Our Doctors','/doctors'],['Specialties','/specialties'],['Patient Reviews','/reviews'],['FAQs','/faqs'],['Contact','/contact']];
export function Logo({light=false}:{light?:boolean}){
 return <Link href="/" className={`brand flex items-center gap-3 ${light?'text-white':'text-navy'}`} aria-label="Aureus Medical Clinic home">
 <span className="brand-symbol"><span/><span/><span/><span/></span>
 <span className="leading-tight"><strong className="font-heading text-[1.3rem] tracking-[.11em]">AUREUS</strong><small className={`block font-medium text-[.61rem] tracking-[.16em] ${light?'text-white/75':'text-muted'}`}>MEDICAL CLINIC</small></span>
 </Link>
}
export function Header({doctors}:{doctors:DoctorMap}){
 const pathname=usePathname();const [open,setOpen]=useState(false);const [phones,setPhones]=useState(false);
 if(pathname?.startsWith('/admin'))return null;
 return <>
 <div className="top-strip"><div className="container-wide flex items-center justify-between gap-3"><span><MapPin size={12} className="inline mr-1"/>Marine Lines East, Mumbai · Opposite Wadia Fire Temple</span><span className="hidden sm:inline">Physician & Orthopaedic Care, Under One Roof</span></div></div>
 <header className="site-header"><div className="container-wide h-full flex items-center justify-between gap-5"><Logo/>
 <nav className="hidden xl:flex items-center gap-7" aria-label="Main navigation">{nav.map(([label,href])=><Link key={href} className={`nav-link ${pathname===href?'active':''}`} href={href}>{label}</Link>)}</nav>
 <div className="hidden md:flex items-center gap-3"><div className="relative"><button onClick={()=>setPhones(!phones)} className="header-phone" aria-expanded={phones}><Phone size={15}/>Call Doctor <ChevronDown size={12}/></button>{phones&&<div className="call-popover !bottom-auto !top-9 !right-0"><a href={callHref(doctors.ayushi.phone)}><span>Dr. Ayushi</span><small>{doctors.ayushi.phone}</small></a><a href={callHref(doctors.ashwin.phone)}><span>Dr. Ashwin</span><small>{doctors.ashwin.phone}</small></a></div>}</div><Link href="/book" className="btn btn-navy !py-3">Book Appointment <ArrowUpRight size={16}/></Link></div>
 <button onClick={()=>setOpen(!open)} className="icon-button xl:hidden" aria-label={open?'Close menu':'Open menu'} aria-expanded={open}>{open?<X/>:<Menu/>}</button></div>
 {open&&<nav className="mobile-menu" aria-label="Mobile navigation">{nav.map(([label,href])=><Link key={href} href={href} onClick={()=>setOpen(false)}>{label}<ArrowRight size={17}/></Link>)}<Link href="/book" onClick={()=>setOpen(false)} className="!bg-sage !text-teal">Book Appointment<CalendarDays size={18}/></Link></nav>}
 </header>
 <div className="mobile-action-bar md:hidden"><div className="relative"><button onClick={()=>setPhones(!phones)} aria-expanded={phones}><Phone size={19}/>Call <ChevronDown size={12}/></button>{phones&&<div className="call-popover"><a href={callHref(doctors.ayushi.phone)}><span>Dr. Ayushi</span><small>{doctors.ayushi.phone}</small></a><a href={callHref(doctors.ashwin.phone)}><span>Dr. Ashwin</span><small>{doctors.ashwin.phone}</small></a></div>}</div><Link href="/book" className="book-mobile"><CalendarDays size={20}/>Book</Link><a href={directionsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={19}/>Directions</a></div>
 </>;
}
export function Footer({doctors}:{doctors:DoctorMap}){const pathname=usePathname();if(pathname?.startsWith('/admin'))return null;return <footer className="footer"><div className="container-wide"><div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1.1fr] gap-10 py-16"><div><Logo light/><p className="text-white/65 max-w-xs mt-6 leading-7">Considered physician and orthopaedic care, close to home in the heart of South Mumbai.</p><p className="mt-7 text-sm text-white/50">Aureus Medical Clinic · Marine Lines East</p></div><div><h4>Explore</h4>{[['About Aureus','/about'],['Meet Our Doctors','/doctors'],['Specialties','/specialties'],['Patient Reviews','/reviews'],['FAQs','/faqs']].map(([l,u])=><Link href={u} key={u}>{l}</Link>)}</div><div><h4>Plan your visit</h4><Link href="/book">Request Appointment</Link><Link href="/contact">Location & Directions</Link><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Use</Link><Link href="/admin">Staff Login</Link></div><div><h4>Contact the doctors</h4><span className="text-white/50 text-xs block mb-2">Dr. Ayushi Rajendra Thaker</span><a href={callHref(doctors.ayushi.phone)}>{doctors.ayushi.phone}</a><span className="text-white/50 text-xs block mb-2 mt-4">Dr. Ashwin Joshi</span><a href={callHref(doctors.ashwin.phone)}>{doctors.ashwin.phone}</a><a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex gap-2 items-center">Get Directions <ArrowUpRight size={14}/></a></div></div><div className="border-t border-white/15 py-6 flex flex-col md:flex-row gap-3 justify-between text-xs text-white/50"><span>© {new Date().getFullYear()} Aureus Medical Clinic. All rights reserved.</span><span>Appointment requests require confirmation. For emergencies, seek urgent medical care.</span></div></div></footer>}
