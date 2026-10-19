'use client';
import {motion, useReducedMotion} from 'framer-motion';
import type { ReactNode } from 'react';
export function Reveal({children,delay=0,className=''}:{children:ReactNode;delay?:number;className?:string}){
 const reduce=useReducedMotion();
 return <motion.div className={className} initial={reduce?false:{opacity:0,y:26,filter:'blur(4px)'}} whileInView={{opacity:1,y:0,filter:'blur(0px)'}} viewport={{once:true,amount:.14,margin:'0px 0px -50px 0px'}} transition={{duration:reduce?0:.75,delay:reduce?0:delay,ease:[.21,1,.32,1]}}>{children}</motion.div>;
}
