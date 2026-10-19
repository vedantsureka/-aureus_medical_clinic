import {NextRequest,NextResponse} from 'next/server';
import {createClient} from '@supabase/supabase-js';
import {z} from 'zod';
import {consultationTypes,type DoctorId} from '@/lib/site';
export const runtime='nodejs';
const schema=z.object({
 doctor_id:z.enum(['ayushi','ashwin']),
 full_name:z.string().trim().min(2).max(100),
 phone:z.string().trim().regex(/^[6-9][0-9]{9}$/,'Enter a 10-digit Indian mobile number.'),
 email:z.union([z.literal(''),z.string().trim().email().max(160)]),
 consultation_type:z.string().min(3).max(100),
 preferred_date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
 preferred_time:z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
 message:z.string().max(500).optional().default(''),
 consent:z.literal(true),
 website:z.string().optional().default(''),
 turnstile_token:z.string().optional().default('')
}).strict();
function localToday(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
async function validateTurnstile(token:string,remoteIp:string|null){
 const secret=process.env.TURNSTILE_SECRET_KEY;
 if(!secret)return true;
 if(!token)return false;
 const body=new URLSearchParams({secret,response:token});
 if(remoteIp)body.set('remoteip',remoteIp);
 try{const response=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body,cache:'no-store'});const outcome=await response.json() as {success:boolean};return Boolean(response.ok&&outcome.success)}catch{return false;}
}
export async function POST(request:NextRequest){
 try{
  // Do not accept cross-site browser submissions. This is supplemental to CAPTCHA and validation.
  const origin=request.headers.get('origin');const host=request.headers.get('x-forwarded-host')||request.headers.get('host');
  if(origin&&host&&new URL(origin).host!==host)return NextResponse.json({error:'Invalid request origin.'},{status:403});
  const raw=await request.text();if(raw.length>6000)return NextResponse.json({error:'Request too large.'},{status:413});
  const parsed=schema.safeParse(JSON.parse(raw));if(!parsed.success)return NextResponse.json({error:parsed.error.issues[0]?.message||'Please check the form fields.'},{status:400});
  const input=parsed.data;
  if(input.website)return NextResponse.json({error:'Unable to process request.'},{status:400});
  if(!consultationTypes[input.doctor_id as DoctorId].includes(input.consultation_type))return NextResponse.json({error:'The consultation type does not match the selected doctor.'},{status:400});
  const date=new Date(input.preferred_date+'T00:00:00Z');const today=localToday();
  if(!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==input.preferred_date||input.preferred_date<today||date.getTime()-new Date(today+'T00:00:00Z').getTime()>180*86400000)return NextResponse.json({error:'Choose a valid date within the next 180 days.'},{status:400});
  const ip=request.headers.get('cf-connecting-ip')||request.headers.get('x-real-ip');
  if(!await validateTurnstile(input.turnstile_token,ip))return NextResponse.json({error:'Security check failed. Please retry the verification.'},{status:403});
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!key)return NextResponse.json({error:'Online booking is temporarily unavailable. Please call the doctor directly.'},{status:503});
  const supabase=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
  const {error}=await supabase.from('appointments').insert({doctor_id:input.doctor_id,full_name:input.full_name,phone:input.phone,email:input.email||null,consultation_type:input.consultation_type,preferred_date:input.preferred_date,preferred_time:input.preferred_time,message:input.message.trim()||null,consent_at:new Date().toISOString(),status:'pending'});
  if(error){console.error('Appointment insert failed:',error.code);return NextResponse.json({error:'We could not save your request. Please call the doctor directly.'},{status:500});}
  return NextResponse.json({message:'Your appointment request has been received and is pending clinic confirmation.'},{status:201,headers:{'Cache-Control':'no-store'}});
 }catch{return NextResponse.json({error:'Unable to process this request.'},{status:400});}
}
