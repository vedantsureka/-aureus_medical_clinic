export type DoctorId = 'ayushi' | 'ashwin';
export type Doctor = {
  id: DoctorId; name: string; shortTitle: string; subtitle: string; intro: string;
  phone: string; reviewRating: number; reviewCount: number; reviewUrl: string | null;
  photoUrl: string | null; qualifications: string; registration: string;
  schedule: string; focus: string[];
};
export type ClinicSettings = { brand:string; tagline:string; address:string; landmark:string; notice:string; galleryUrls:string[] };
export type Service = { slug:string; title:string; doctorId:DoctorId; intro:string; items:string[]; note:string; published:boolean };
export type Review = { id:string; doctorId:DoctorId; quote:string; visible:boolean };
export type SiteModel = { clinic:ClinicSettings; doctors:Record<DoctorId,Doctor>; services:Service[]; reviews:Review[] };

export const address = 'Ground Floor, Shop No. 2, Singapuri Building, 609, Jagannath Shankar Seth Road, Opposite Wadia Fire Temple, Marine Lines East, Bhangwadi, Mumbai, Maharashtra 400002';
export const directionsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Aureus Medical Clinic, Singapuri Building, 609 Jagannath Shankar Seth Road, Marine Lines, Mumbai');
export const consultationTypes: Record<DoctorId, string[]> = {
 ayushi:['General physician consultation','Diabetes care','Blood pressure & lifestyle care','Vaccination enquiry','Preventive health check','Infectious disease consultation','Other physician enquiry'],
 ashwin:['Orthopaedic consultation','Fracture or trauma follow-up','Joint pain / arthritis','Sports injury assessment','Arthroscopy consultation','Joint replacement consultation','Home consultation enquiry','Other orthopaedic enquiry']
};
export const baseModel: SiteModel = {
 clinic:{brand:'Aureus Medical Clinic',tagline:'Considered care, close to home.',address,landmark:'Opposite Wadia Fire Temple, Marine Lines East',notice:'Please call to confirm consultation availability. Online requests are not confirmed bookings.',galleryUrls:[]},
 doctors:{
 ayushi:{id:'ayushi',name:'Dr. Ayushi Rajendra Thaker',shortTitle:'Physician · Diabetes · Vaccination',subtitle:'Physician | Diabetes Care | Vaccination',intro:'Physician consultations focused on general medicine, diabetes, lifestyle-related health concerns, preventive healthcare and vaccination enquiries.',phone:'+91 91378 95139',reviewRating:5.0,reviewCount:68,reviewUrl:null,photoUrl:null,qualifications:'',registration:'',schedule:'Please call to confirm appointment availability',focus:['General Medicine','Diabetes Management','Vaccination & Preventive Care','Hypertension & Lifestyle Health','Infectious Disease Consultations']},
 ashwin:{id:'ashwin',name:'Dr. Ashwin Joshi',shortTitle:'Orthopaedics · Joint & Fracture Care',subtitle:'Orthopaedic Surgeon | Bone, Joint & Sports Injury Care',intro:'Orthopaedic consultations for bones, joints, fractures, arthritis, sports injuries and surgical evaluation where appropriate.',phone:'+91 80979 02438',reviewRating:5.0,reviewCount:31,reviewUrl:null,photoUrl:null,qualifications:'',registration:'',schedule:'Please call to confirm appointment availability',focus:['Orthopaedic Consultations','Fracture & Trauma Management','Joint Pain & Arthritis','Sports Injury Care','Arthroscopy & Joint Replacement Evaluation']}
 },
 services:[
 {slug:'general-medicine',title:'General Medicine',doctorId:'ayushi',intro:'Thoughtful physician consultations for everyday health concerns, prevention and longer-term care.',items:['Acute medical concerns','Chronic condition follow-up','Preventive screening enquiries','When to seek medical attention'],note:'Seek emergency assistance for severe or rapidly worsening symptoms.',published:true},
 {slug:'diabetes-lifestyle',title:'Diabetes & Lifestyle Care',doctorId:'ayushi',intro:'Individualised medical guidance for diabetes, blood pressure and metabolic wellbeing.',items:['Blood sugar monitoring and diabetes review','Hypertension and cholesterol-related concerns','Lifestyle and nutrition guidance','Ongoing follow-up planning'],note:'Recommendations depend on an individual clinical assessment.',published:true},
 {slug:'vaccination',title:'Vaccination & Preventive Care',doctorId:'ayushi',intro:'Discuss adult and childhood immunisation needs with a physician.',items:['Routine adult vaccination enquiries','Childhood vaccination enquiries','Vaccine schedule counselling','Preventive health advice'],note:'Please confirm individual vaccine availability before visiting.',published:true},
 {slug:'orthopaedics',title:'Orthopaedics',doctorId:'ashwin',intro:'Support for musculoskeletal symptoms involving bones, joints and mobility.',items:['Orthopaedic evaluation','Knee, hip, shoulder and back concerns','Arthritis and joint pain','Mobility-related complaints'],note:'Diagnosis and treatment options require a consultation.',published:true},
 {slug:'fracture-trauma',title:'Fracture & Trauma Care',doctorId:'ashwin',intro:'Orthopaedic assessment and follow-up for injuries and suspected fractures.',items:['Fracture assessment enquiries','Immobilisation and follow-up planning','Recovery and rehabilitation overview','Advice on when urgent evaluation is needed'],note:'For severe injury, major bleeding, deformity or loss of sensation, seek emergency care immediately.',published:true},
 {slug:'joint-replacement-arthroscopy',title:'Joint Replacement & Arthroscopy',doctorId:'ashwin',intro:'Specialist consultations to understand whether surgical assessment may be appropriate.',items:['Joint replacement assessment','Arthroscopy evaluation','Discussion of potential treatment pathways','Recovery and rehabilitation planning'],note:'Any surgical procedures require an appropriately equipped and confirmed hospital or surgical facility, not the clinic.',published:true},
 {slug:'sports-injury',title:'Sports Injury Care',doctorId:'ashwin',intro:'Assess sport-related muscle, tendon, ligament and joint concerns.',items:['Sprains and strains','Knee and shoulder injuries','Return-to-activity discussion','Recovery follow-up'],note:'Avoid relying on an online enquiry for urgent injuries.',published:true}
 ],
 reviews:[
 {id:'ayushi-1',doctorId:'ayushi',quote:'She provides excellent care, proper treatment, and vaccination services.',visible:true},
 {id:'ayushi-2',doctorId:'ayushi',quote:'The staff and overall clinic experience were also very smooth.',visible:true},
 {id:'ayushi-3',doctorId:'ayushi',quote:'Thank you, Doctor, for making the whole experience so positive.',visible:true},
 {id:'ashwin-1',doctorId:'ashwin',quote:'Fantastic treatment given me at home viral arthritis at knee and elbow.',visible:true},
 {id:'ashwin-2',doctorId:'ashwin',quote:'He is brilliant doctor….highly recommend',visible:true},
 {id:'ashwin-3',doctorId:'ashwin',quote:'Had a really good experience',visible:true}
 ]
};
export const doctorSlug = (id:DoctorId) => `/doctors/${id}`;
export const callHref = (phone:string) => `tel:${phone.replace(/[^\d+]/g,'')}`;
