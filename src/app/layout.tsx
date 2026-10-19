import type {Metadata} from 'next';
import {Header,Footer} from '@/components/layout';
import {siteUrl} from '@/lib/meta';
import {address} from '@/lib/site';
import {getSiteModel} from '@/lib/public-data';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:'Aureus Medical Clinic | Physician & Orthopaedic Care in Marine Lines',template:'%s | Aureus Medical Clinic'},description:'Meet Dr. Ayushi Rajendra Thaker and Dr. Ashwin Joshi at Aureus Medical Clinic, Marine Lines, Mumbai. Request a physician, diabetes, vaccination or orthopaedic consultation.',robots:{index:true,follow:true},openGraph:{type:'website',siteName:'Aureus Medical Clinic',locale:'en_IN'}};
const schema={'@context':'https://schema.org','@type':'MedicalClinic',name:'Aureus Medical Clinic',url:siteUrl,address:{'@type':'PostalAddress',streetAddress:address,addressLocality:'Mumbai',addressRegion:'Maharashtra',postalCode:'400002',addressCountry:'IN'},medicalSpecialty:['PrimaryCare','Orthopedic'],employee:[{'@type':'Physician',name:'Dr. Ayushi Rajendra Thaker',telephone:'+919137895139'},{'@type':'Physician',name:'Dr. Ashwin Joshi',telephone:'+918097902438'}]};
export const dynamic='force-dynamic';
export default async function RootLayout({children}:{children:React.ReactNode}){const {doctors}=await getSiteModel();return <html lang="en-IN"><head><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/></head><body><Header doctors={doctors}/><main>{children}</main><Footer doctors={doctors}/></body></html>}
