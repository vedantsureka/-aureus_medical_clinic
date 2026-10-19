'use client';
import {useState} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import {ChevronLeft,ChevronRight,Star,ArrowUpRight} from 'lucide-react';
import type {Doctor,Review} from '@/lib/site';
export function ReviewCarousel({doctor,reviews}:{doctor:Doctor;reviews:Review[]}){
 const [index,setIndex]=useState(0),reduce=useReducedMotion();
 const count=reviews.length;const current=reviews[index];
 const choose=(i:number)=>{if(count)setIndex((i+count)%count)};
 return <section className="detail-panel h-full flex flex-col" aria-label={`${doctor.name} patient reviews`}><div className="flex flex-wrap items-start justify-between gap-2 mb-6"><h3 className="!mb-0">{doctor.name}</h3><span className="rating"><Star size={16} fill="currentColor"/>{doctor.reviewRating.toFixed(1)} · {doctor.reviewCount} reviews</span></div>
 <div className="relative min-h-[175px] flex-1 overflow-hidden rounded-xl bg-[#f6faf8] px-6 py-6" aria-live="polite"><AnimatePresence mode="wait" initial={false}>{current&&<motion.blockquote key={current.id} className="text-[#526c70] leading-8" initial={reduce?false:{opacity:0,x:15}} animate={{opacity:1,x:0}} exit={reduce?{opacity:1}:{opacity:0,x:-12}} transition={{duration:reduce?0:.28,ease:'easeOut'}}>“{current.quote}”</motion.blockquote>}</AnimatePresence></div>
 <div className="flex items-center justify-between mt-5"><div className="flex items-center gap-1">{reviews.map((r,i)=><button key={r.id} onClick={()=>choose(i)} aria-label={`View review ${i+1} for ${doctor.name}`} aria-current={i===index?'true':undefined} className={`h-[6px] rounded-full ${i===index?'w-5 bg-teal':'w-[6px] bg-[#cad7d6]'}`}/>)}</div><div className="flex gap-2"><button disabled={!count} onClick={()=>choose(index-1)} aria-label={`Previous review for ${doctor.name}`} className="w-9 h-9 grid place-items-center rounded-full border border-[#d4e5e1] text-navy hover:bg-sage"><ChevronLeft size={17}/></button><button disabled={!count} onClick={()=>choose(index+1)} aria-label={`Next review for ${doctor.name}`} className="w-9 h-9 grid place-items-center rounded-full border border-[#d4e5e1] text-navy hover:bg-sage"><ChevronRight size={17}/></button></div></div>
 {doctor.reviewUrl&&<a href={doctor.reviewUrl} target="_blank" rel="noopener noreferrer" className="text-teal font-bold text-sm inline-flex gap-2 items-center mt-5">Read Google Reviews <ArrowUpRight size={16}/></a>}</section>
}
