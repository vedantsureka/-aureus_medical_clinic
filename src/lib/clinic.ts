// Editable clinic content. Items marked `verified: false` are hidden or flagged until the clinic confirms them.
export const clinic = {
  name: "Aureus Medical Clinic",
  doctor: "Dr. Ayushi Rajendra Thaker",
  phoneDisplay: "+91 91378 95139",
  phoneTel: "tel:+919137895139",
  whatsapp: "919137895139",
  shortAddress: "Ground Floor, Shop No. 2, Opposite Wadia Fire Temple, Marine Lines East, Mumbai.",
  fullAddress:
    "Ground Floor, Shop No. 2, Aureus Medical Clinic, Singapuri Building, 609, Jagannath Shankar Seth Road, Opposite Wadia Fire Temple, Marine Lines East, Bhangwadi, Marine Lines, Mumbai, Maharashtra – 400002",
  rating: 5.0,
  reviewCount: 68,
  mapsQuery: "Aureus Medical Clinic, Singapuri Building, Jagannath Shankar Seth Road, Marine Lines, Mumbai 400002",
  siteUrl: "https://aureusmedicalclinic.in",
};

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.mapsQuery)}`;
export const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(clinic.mapsQuery)}`;
export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(clinic.mapsQuery)}&z=16&output=embed`;
export const reviewsLink = mapsLink;

export const credentials = {
  verified: false,
  items: ["M.B.B.S.", "M.D. (Community Medicine)", "D.N.B.", "C.C.E.B.D.M."],
};

export const profileFields = [
  { label: "Medical registration number", value: null },
  { label: "Institutions", value: null },
  { label: "Experience", value: null },
  { label: "Languages spoken", value: null },
  { label: "Professional certifications", value: null },
];

// null = unconfirmed. Monday 4:00 PM opening is from the Google listing snapshot.
export const hours: { day: string; time: string | null }[] = [
  { day: "Monday", time: "From 4:00 PM" },
  { day: "Tuesday", time: null },
  { day: "Wednesday", time: null },
  { day: "Thursday", time: null },
  { day: "Friday", time: null },
  { day: "Saturday", time: null },
  { day: "Sunday", time: null },
];

export const testimonials = [
  "She provides excellent care, proper treatment, and vaccination services.",
  "The staff and overall clinic experience were also very smooth.",
  "Thank you, Doctor, for making the whole experience so positive.",
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: string;
  confirm?: boolean;
  intro: string;
  reasons: string[];
  discuss: string[];
  advice: string[];
  faqs: { q: string; a: string }[];
  notice?: string;
};

const genericFaq = (topic: string) => [
  { q: `Do I need an appointment for ${topic}?`, a: "Please call the clinic or send an enquiry so the team can advise on available timings." },
  { q: "What should I bring?", a: "Any previous prescriptions, reports and a list of current medicines are helpful for your consultation." },
];

export const services: Service[] = [
  {
    slug: "general-physician",
    title: "General Physician Consultations",
    short: "Assessment and management of general health concerns, routine illnesses, and follow-up needs.",
    icon: "Stethoscope",
    intro: "A physician consultation is often the first step in understanding a new symptom, managing a routine illness or reviewing ongoing health needs.",
    reasons: ["Fever, cough, cold or body ache", "Stomach upsets and acidity", "Persistent fatigue or weakness", "Review of reports and medicines"],
    discuss: ["Your symptoms and how long they have lasted", "Relevant past medical history", "Tests that may be appropriate", "Follow-up plan"],
    advice: ["Stay hydrated and rest during acute illness", "Avoid self-medicating with antibiotics", "Keep a simple record of your medicines"],
    faqs: genericFaq("a physician consultation"),
  },
  {
    slug: "diabetes-care",
    title: "Diabetes Care",
    short: "Consultations related to blood sugar management, diabetes monitoring, lifestyle guidance and follow-up care.",
    icon: "Activity",
    intro: "Diabetes care is an ongoing partnership. Regular consultations help review sugar levels, medicines and lifestyle in a structured way.",
    reasons: ["New diagnosis of diabetes or prediabetes", "Unstable sugar readings", "Medicine review", "Routine follow-up"],
    discuss: ["Home glucose readings and HbA1c", "Diet, activity and sleep", "Medicine timing and side effects", "Screening for long-term complications"],
    advice: ["Monitor as advised by your doctor", "Prefer whole foods and regular meal timings", "Stay active most days of the week"],
    faqs: genericFaq("diabetes care"),
  },
  {
    slug: "vaccination",
    title: "Adult & Paediatric Vaccination",
    short: "Vaccination enquiries, eligibility guidance and scheduling according to available vaccines and the patient's clinical circumstances.",
    icon: "Syringe",
    intro: "Vaccination is one of the most effective preventive measures. Suitability depends on age, health history and current guidelines.",
    reasons: ["Routine childhood immunisation", "Adult booster doses", "Seasonal vaccine enquiries", "Catch-up schedules"],
    discuss: ["Past vaccination records", "Allergies and current health", "Vaccine availability", "Scheduling the next dose"],
    advice: ["Carry your vaccination card", "Inform the doctor of any previous reactions", "Wait at the clinic briefly after vaccination as advised"],
    faqs: genericFaq("vaccination"),
  },
  {
    slug: "lifestyle-disease",
    title: "Lifestyle Disease Management",
    short: "Consultations concerning hypertension, cholesterol, thyroid-related concerns, weight and metabolic health.",
    icon: "HeartPulse",
    intro: "Conditions such as high blood pressure, cholesterol and thyroid imbalance often need steady, long-term attention.",
    reasons: ["High blood pressure readings", "Abnormal cholesterol report", "Thyroid-related concerns", "Weight and metabolic health"],
    discuss: ["Readings and reports", "Family history", "Lifestyle habits", "Follow-up schedule"],
    advice: ["Reduce added salt and processed foods", "Regular physical activity", "Do not stop medicines without advice"],
    faqs: genericFaq("lifestyle disease management"),
  },
  {
    slug: "preventive-healthcare",
    title: "Preventive Healthcare & Screening",
    short: "Preventive consultations and health screening guidance based on individual risk factors.",
    icon: "ShieldCheck",
    intro: "Preventive care focuses on identifying risks early and planning sensible screening for your age and history.",
    reasons: ["Annual health review", "Family history of chronic disease", "Pre-employment or routine checks", "Planning age-appropriate screening"],
    discuss: ["Personal and family risk factors", "Which tests may be relevant", "Lifestyle priorities", "Vaccination status"],
    advice: ["Schedule regular check-ups", "Know your blood pressure and sugar levels", "Avoid tobacco"],
    faqs: genericFaq("a preventive consultation"),
  },
  {
    slug: "infectious-disease",
    title: "Infectious Disease Consultations",
    short: "Medical evaluation and consultation for infectious health conditions.",
    icon: "Microscope",
    intro: "Infections range from mild to serious. A timely physician evaluation helps decide on appropriate tests and care.",
    reasons: ["Fever lasting more than a couple of days", "Seasonal infections", "Stomach infections", "Skin or wound infections"],
    discuss: ["Symptoms and timeline", "Recent travel or exposure", "Tests that may be needed", "Warning signs to watch for"],
    advice: ["Wash hands often", "Drink safe water", "Seek urgent care for breathlessness, confusion or persistent high fever"],
    faqs: genericFaq("an infection consultation"),
  },
  {
    slug: "nutrition-lifestyle",
    title: "Nutrition & Lifestyle Counselling",
    short: "Guidance related to sustainable lifestyle practices, diet and preventive health.",
    icon: "Salad",
    intro: "Small, sustainable changes in food, movement and sleep can make a meaningful difference to long-term health.",
    reasons: ["Weight concerns", "Diet guidance with a chronic condition", "Low energy", "Building healthier routines"],
    discuss: ["Current eating patterns", "Activity and sleep", "Realistic goals", "Follow-up"],
    advice: ["Fill half your plate with vegetables", "Limit sugary drinks", "Aim for regular sleep"],
    faqs: genericFaq("lifestyle counselling"),
  },
  {
    slug: "mother-child",
    title: "Mother & Child Health Guidance",
    short: "Counselling enquiries around breastfeeding, maternal nutrition, and related preventive health questions.",
    icon: "Baby",
    intro: "Guidance for mothers and young children on nutrition, breastfeeding and preventive health questions.",
    reasons: ["Breastfeeding questions", "Maternal nutrition", "Childhood vaccination planning", "General preventive questions"],
    discuss: ["Concerns and questions", "Nutrition", "Vaccination schedule", "When specialist care may be needed"],
    advice: ["Keep vaccination records up to date", "Seek prompt care if an infant has fever or feeds poorly"],
    faqs: genericFaq("mother and child guidance"),
  },
  {
    slug: "wound-care",
    title: "Wound Care & Minor Procedures",
    short: "Enquiries regarding wound dressing, minor suturing and suture removal, subject to confirmed clinic facilities.",
    icon: "Bandage",
    confirm: true,
    intro: "Clean, timely wound care supports healing and lowers the risk of infection. Facilities are subject to clinic confirmation.",
    reasons: ["Dressing changes", "Suture removal", "Minor cuts", "Wound review"],
    discuss: ["How the wound occurred", "Tetanus vaccination status", "Signs of infection", "Dressing schedule"],
    advice: ["Keep the wound clean and dry", "Watch for redness, swelling or pus", "Seek emergency care for deep or heavily bleeding wounds"],
    faqs: genericFaq("wound care"),
  },
  {
    slug: "animal-bite",
    title: "Animal-Bite Vaccination Enquiries",
    short: "Enquiries about post-exposure vaccination following an animal bite or scratch. Subject to clinic confirmation.",
    icon: "PawPrint",
    confirm: true,
    notice:
      "Possible rabies exposure requires prompt medical assessment. Wash the wound with soap and running water for 15 minutes and seek care immediately — do not wait for a routine appointment.",
    intro: "Animal bites and scratches need prompt assessment. Please call the clinic first to confirm availability.",
    reasons: ["Dog, cat or monkey bite or scratch", "Continuing a post-exposure schedule", "Pre-exposure enquiries"],
    discuss: ["Type of exposure", "Previous rabies vaccination", "Schedule of doses"],
    advice: ["Wash the wound thoroughly at once", "Do not apply irritants to the wound", "Seek care the same day"],
    faqs: genericFaq("animal-bite vaccination"),
  },
];

export const vaccineCatalogue = [
  { name: "Influenza (seasonal)", group: "Adult & child", confirmed: false },
  { name: "Hepatitis B", group: "Adult & child", confirmed: false },
  { name: "Tetanus / Td / Tdap", group: "Adult", confirmed: false },
  { name: "Pneumococcal", group: "Adult & child", confirmed: false },
  { name: "HPV", group: "Adolescent & adult", confirmed: false },
  { name: "Typhoid", group: "Adult & child", confirmed: false },
  { name: "Childhood schedule (IAP)", group: "Child", confirmed: false },
  { name: "Travel vaccines", group: "Adult", confirmed: false },
];

export const consultationTypes = [
  "General Physician",
  "Diabetes Consultation",
  "Vaccination Enquiry",
  "Preventive Healthcare",
  "Follow-up Consultation",
  "Other Enquiry",
];

export const faqs = [
  { q: "How do I book a consultation?", a: "Call +91 91378 95139 or send an appointment request from the Contact page. The clinic will contact you to confirm." },
  { q: "What are the clinic timings?", a: "Please call to confirm consultation timings, as listed timings may vary." },
  { q: "Where is the clinic located?", a: "Ground Floor, Shop No. 2, Singapuri Building, Jagannath Shankar Seth Road, opposite Wadia Fire Temple, Marine Lines East, Mumbai 400002." },
  { q: "Are all vaccines available at the clinic?", a: "Availability varies. Please enquire before your visit — vaccine recommendations depend on age, medical history, national guidelines and clinical assessment." },
  { q: "Can I get medical advice through this website?", a: "No. This website is for general information and appointment enquiries only. It does not provide diagnosis or treatment." },
  { q: "What should I do in an emergency?", a: "For medical emergencies, call 112 or go to the nearest hospital emergency department immediately." },
];
