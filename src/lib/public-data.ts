import { createClient } from '@supabase/supabase-js';
import { cache } from 'react';
import { baseModel, type SiteModel, type DoctorId, type Service, type Review, type ClinicSettings, type Doctor } from './site';
export const getSiteModel=cache(async (): Promise<SiteModel> => {
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL, key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(!url||!key) return baseModel;
 try {
  const supabase=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
  const [c,d,s,r] = await Promise.all([
    supabase.from('clinic_settings').select('*').eq('id','main').maybeSingle(),
    supabase.from('doctor_profiles').select('*'),
    supabase.from('services').select('*').eq('published',true).order('sort_order'),
    supabase.from('reviews').select('*').eq('visible',true).order('sort_order')
  ]);
  const clinic: ClinicSettings=c.data?{
    brand:c.data.brand,tagline:c.data.tagline,address:c.data.address,landmark:c.data.landmark,
    notice:c.data.notice||'',galleryUrls:c.data.gallery_urls||[]
  }:baseModel.clinic;
  const doctors={...baseModel.doctors};
  for(const item of d.data||[]) if (item.id==='ayushi'||item.id==='ashwin'){
    const id=item.id as DoctorId;
    doctors[id]={id,name:item.name,shortTitle:item.short_title,subtitle:item.subtitle,
      intro:item.intro,phone:item.phone,reviewRating:item.review_rating,reviewCount:item.review_count,
      reviewUrl:item.review_url,photoUrl:item.photo_url,qualifications:item.qualifications||'',
      registration:item.registration||'',schedule:item.schedule||baseModel.doctors[id].schedule,
      focus:item.focus||baseModel.doctors[id].focus} as Doctor;
  }
  const services:Service[]=s.error?baseModel.services:(s.data||[]).map(item=>({slug:item.slug,title:item.title,doctorId:item.doctor_id as DoctorId,intro:item.intro,items:item.items||[],note:item.note||'',published:item.published}));
  const reviews:Review[]=r.error?baseModel.reviews:(r.data||[]).map(item=>({id:item.id,doctorId:item.doctor_id as DoctorId,quote:item.quote,visible:item.visible}));
  return {clinic,doctors,services,reviews};
 } catch { return baseModel; }
});
