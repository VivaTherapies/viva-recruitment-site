export const PROFESSION_DATA = {
    "Massage Therapist": {
        name: "Massage Therapist",
        requirements: [
            "Level 3 Diploma in Sports/Remedial/Swedish Massage",
            "Minimum 2 years professional experience",
            "Insurance and DBS check",
            "Excellent English communication skills",
        ],
        specializations: [
            "Deep Tissue",
            "Swedish Massage",
            "Aromatherapy",
            "Pregnancy Massage",
            "Reflexology",
            "Shiatsu",
            "Sports Massage",
            "Thai Massage",
        ],
        equipment: [
            "Massage Table",
            "Massage Oils",
            "Towels and Linens",
            "Portable Massage Chair",
            "Hot Stones",
            "Essential Oils",
        ],
        commissionRates: [
            {
                service: "All Massage Types",
                rates: [
                    { timeSlot: "9AM-9:45PM", commission: "£50" },
                    { timeSlot: "10PM-11:45PM", commission: "£60" },
                    { timeSlot: "12AM-8:45AM", commission: "£70" },
                ],
            },
        ],
    },
    Facialist: {
        name: "Facialist",
        requirements: [
            "NVQ Level 2/3 in Beauty Therapy",
            "Minimum 2 years salon/spa experience",
            "Professional insurance",
            "Portfolio of previous work",
        ],
        specializations: [
            "Facial Treatments",
            "Microdermabrasion",
            "Chemical Peels",
            "Eyebrow & Lash Treatments",
            "Body Treatments",
        ],
        equipment: [
            "Professional Facial Kit",
            "Skincare Products (specify brands)",
            "Steamer",
            "Microdermabrasion Machine",
            "LED Light Therapy Device",
            "Towels and Linens",
        ],
        commissionRates: [
            {
                service: "Facial",
                rates: [
                    { timeSlot: "9AM-11:45PM", commission: "£60" },
                    { timeSlot: "12AM-8:45AM", commission: "£70" },
                ],
            },
        ],
    },
    "Makeup Artist": {
        name: "Makeup Artist",
        requirements: [
            "Professional Makeup Artistry qualification",
            "Minimum 2 years professional experience",
            "Portfolio of makeup work",
            "Knowledge of luxury brands and techniques",
        ],
        specializations: [
            "Bridal Makeup",
            "Event Makeup",
            "Photography Makeup",
            "Special Occasion Makeup",
            "Natural/Everyday Makeup",
        ],
        equipment: [
            "Professional Makeup Kit",
            "Luxury Makeup Brands (specify)",
            "Brushes and Tools",
            "Lighting Equipment",
            "Sanitization Supplies",
        ],
        commissionRates: [
            {
                service: "Makeup (60min)",
                rates: [
                    { timeSlot: "9AM-11:45PM", commission: "£70" },
                    { timeSlot: "12AM-8:45AM", commission: "£80" },
                ],
            },
        ],
    },
    "Nail Technician": {
        name: "Nail Technician",
        requirements: [
            "Certified Nail Technology qualification",
            "Minimum 1 year professional experience",
            "Knowledge of latest nail trends",
            "Hygiene and safety certification",
        ],
        specializations: [
            "Gel Polish Manicure",
            "Gel Polish Pedicure",
            "Gel Polish Mani and Pedi",
            "Classic Manicure",
            "Classic Pedicure",
            "Classic Mani and Pedi",
            "Luxury Mani and Pedi",
            "Acrylic Nails",
            "Gel Extensions",
            "French Manicure",
            "Nail Repair & Strengthening",
        ],
        equipment: [
            "Nail Kit",
            "UV/LED Lamp",
            "Gel Polish Collection",
            "Acrylic Supplies",
            "Nail Art Tools",
            "Sanitization Equipment",
        ],
        commissionRates: [
            {
                service: "Mani or Pedi (60min)",
                rates: [
                    { timeSlot: "9AM-11:45PM", commission: "£50" },
                    { timeSlot: "12AM-8:45AM", commission: "£60" },
                ],
            },
            {
                service: "Mani & Pedi (2hrs)",
                rates: [
                    { timeSlot: "9AM-11:45PM", commission: "£80" },
                    { timeSlot: "12AM-8:45AM", commission: "£100" },
                ],
            },
            {
                service: "Gent's M&P (90min)",
                rates: [
                    { timeSlot: "9AM-11:45PM", commission: "£70" },
                    { timeSlot: "12AM-8:45AM", commission: "£80" },
                ],
            },
        ],
    },
    "Hair Stylist": {
        name: "Hair Stylist",
        requirements: [
            "NVQ Level 2/3 in Hairdressing",
            "Minimum 3 years salon experience",
            "Portfolio of styling work",
            "Mobile hairdressing experience preferred",
        ],
        specializations: [
            "Bridal Hair Styling",
            "Event Hair & Makeup",
            "Blow Dry Services",
            "Hair Treatments",
            "Color Touch-ups",
            "Hair Extensions",
            "Hair Up & Styling",
            "Ladies Haircut & Blow Dry",
        ],
        equipment: [
            "Professional Hair Tools (dryer, straighteners, curlers)",
            "Styling Products",
            "Hair Extensions",
            "Color Supplies",
            "Brushes and Combs",
            "Cape and Towels",
        ],
        commissionRates: [
            {
                service: "Blow Dry (60min)",
                rates: [
                    { timeSlot: "9AM-11:45PM", commission: "£60" },
                    { timeSlot: "12AM-8:45AM", commission: "£70" },
                ],
            },
            {
                service: "Hair Up & Styling",
                rates: [
                    { timeSlot: "9AM-11:45PM", commission: "£70" },
                    { timeSlot: "12AM-8:45AM", commission: "£80" },
                ],
            },
            {
                service: "Ladies Cut & Blow Dry",
                rates: [
                    { timeSlot: "9AM-11:45PM", commission: "£75" },
                    { timeSlot: "12AM-8:45AM", commission: "£95" },
                ],
            },
        ],
    },
    "Personal Trainer": {
        name: "Personal Trainer",
        requirements: [
            "Level 3 Personal Training qualification",
            "Minimum 2 years training experience",
            "First Aid certification",
            "Public liability insurance",
        ],
        specializations: [
            "Weight Loss Training",
            "Strength Training",
            "HIIT Workouts",
            "Functional Training",
            "Rehabilitation Exercise",
            "Sports-Specific Training",
        ],
        equipment: [
            "Resistance Bands",
            "Weights and Dumbbells",
            "Yoga Mat",
            "Exercise Ball",
            "Jump Rope",
            "Portable Equipment",
        ],
        commissionRates: [
            {
                service: "Personal Training (60min)",
                rates: [
                    { timeSlot: "9AM-11:45PM", commission: "£60" },
                    { timeSlot: "12AM-8:45AM", commission: "£70" },
                ],
            },
        ],
    },
    "Yoga Instructor": {
        name: "Yoga Instructor",
        requirements: [
            "200-hour Yoga Teacher Training certification",
            "Minimum 1 year teaching experience",
            "Knowledge of different yoga styles",
            "Professional insurance",
        ],
        specializations: [
            "Hatha Yoga",
            "Vinyasa Flow",
            "Yin Yoga",
            "Restorative Yoga",
            "Prenatal Yoga",
            "Meditation Sessions",
        ],
        equipment: [
            "Yoga Mat",
            "Yoga Blocks",
            "Yoga Straps",
            "Bolsters",
            "Meditation Cushions",
            "Portable Speaker",
        ],
        commissionRates: [
            {
                service: "Yoga Session (60min)",
                rates: [
                    { timeSlot: "9AM-11:45PM", commission: "£55" },
                    { timeSlot: "12AM-8:45AM", commission: "£65" },
                ],
            },
        ],
    },
    Physiotherapy: {
        name: "Physiotherapy",
        requirements: [
            "Bachelor's degree in Physiotherapy",
            "HCPC registration",
            "Minimum 2 years clinical experience",
            "Professional insurance",
        ],
        specializations: [
            "Musculoskeletal Physiotherapy",
            "Sports Injury Rehabilitation",
            "Post-operative Rehabilitation",
            "Neurological Physiotherapy",
            "Pilates Instruction",
        ],
        equipment: [
            "Massage Table",
            "Exercise Equipment",
            "Resistance Bands",
            "Electrotherapy Device",
            "Assessment Tools",
            "Rehabilitation Equipment",
        ],
        commissionRates: [
            {
                service: "Physiotherapy (60min)",
                rates: [
                    { timeSlot: "9AM-9:45PM", commission: "£60" },
                    { timeSlot: "10PM-11:45PM", commission: "£70" },
                    { timeSlot: "12AM-8:45AM", commission: "£80" },
                ],
            },
        ],
    },
    Osteopathy: {
        name: "Osteopathy",
        requirements: [
            "Master's degree in Osteopathy",
            "GOsC registration",
            "Minimum 2 years clinical experience",
            "Professional insurance",
        ],
        specializations: [
            "Structural Osteopathy",
            "Cranial Osteopathy",
            "Visceral Osteopathy",
            "Pediatric Osteopathy",
            "Postural Correction",
        ],
        equipment: [
            "Treatment Table",
            "Diagnostic Tools",
            "Rehabilitation Equipment",
            "Postural Assessment Tools",
            "Educational Materials",
        ],
        commissionRates: [
            {
                service: "Osteopathy (60min)",
                rates: [
                    { timeSlot: "9AM-9:45PM", commission: "£60" },
                    { timeSlot: "10PM-11:45PM", commission: "£70" },
                    { timeSlot: "12AM-8:45AM", commission: "£80" },
                ],
            },
        ],
    },
};
export const PROFESSIONS = Object.keys(PROFESSION_DATA);
