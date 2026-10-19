import type { Metadata } from 'next';
export const siteUrl=process.env.NEXT_PUBLIC_SITE_URL || 'https://aureusmedicalclinic.example';
export function pageMetadata(title:string,description:string,path:string):Metadata {
 return {title,description,alternates:{canonical:path},openGraph:{title,description,type:'website',url:path,siteName:'Aureus Medical Clinic',locale:'en_IN'}};
}
