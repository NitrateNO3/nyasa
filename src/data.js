export const CONTACT = {
  phone: '+91 98444 35777',
  phoneHref: 'tel:+919844435777',
  website: 'www.nayasacoliving.com',
  directions: 'https://share.google/nEmMHZExLEWBm1aWD',
  mapEmbed:
    'https://www.google.com/maps?q=Nayasa+Premium+Co-Living,+ITPL+Main+Road,+Whitefield,+Bengaluru+560066&output=embed',
}

// Set this to a form endpoint (Formspree, a CRM webhook, etc.) to receive enquiries.
// Left empty, the form validates and then asks the visitor to call to confirm their visit.
export const ENQUIRY_ENDPOINT = ''

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Nayasa' },
  { to: '/rooms', label: 'Our Rooms' },
  { to: '/amenities', label: 'Amenities' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/location', label: 'Location' },
  { to: '/good-to-know', label: 'Good to Know' },
  { to: '/faq', label: 'FAQ' },
]

export const ROOM_TYPES = [
  {
    key: 'private',
    label: 'Private Rooms',
    title: 'Private Rooms',
    formValue: 'Private Room',
    from: '14,000',
    unit: 'per room',
    lead: 'Enjoy the comfort and privacy of a room of your own.',
    body: 'Our private accommodation options are ideal for individuals who prefer having their personal space while enjoying the convenience of a professionally managed property.',
    cta: 'Enquire About Private Rooms',
    images: [
      { src: 'private-room', alt: 'Private room at Nayasa with a single bed, bedside table and charcoal feature wall' },
      { src: 'private-room-desk', alt: 'Private room with a work desk, yellow chair and a large window' },
    ],
  },
  {
    key: 'sharing',
    label: 'Double Sharing',
    title: 'Double-Sharing Rooms',
    formValue: 'Double Sharing',
    from: '10,000',
    unit: 'per bed',
    lead: 'Enjoy a comfortable shared living arrangement with the convenience of essential facilities and property support.',
    body: 'An option for those who prefer shared accommodation at an accessible price.',
    cta: 'Enquire About Sharing Rooms',
    images: [
      { src: 'sharing-room', alt: 'Double-sharing room with two beds, wardrobe, desk and woven rug' },
      { src: 'sharing-room-twin', alt: 'Twin beds placed either side of a shared desk in a double-sharing room' },
    ],
  },
]

export const PRICING = [
  { series: '1, 2, 3', type: 'Double Sharing', price: '10,000', unit: 'bed' },
  { series: '4, 5', type: 'Private Room', price: '14,000', unit: 'room' },
  { series: '6', type: 'Private Room', price: '16,000', unit: 'room' },
  { series: '7', type: 'Double Sharing', price: '12,000', unit: 'bed' },
  { series: '8', type: 'Double Sharing', price: '13,000', unit: 'bed' },
  { series: '9', type: 'Private Room', price: '15,000', unit: 'room' },
  { series: '10', type: 'Private Room', price: '18,000', unit: 'room' },
  { series: '11', type: 'Private Room', price: '22,000', unit: 'room' },
]

export const AMENITIES = [
  { icon: 'wifi', title: 'High-Speed Wi-Fi', text: 'Stay connected for work, entertainment and everything in between.' },
  { icon: 'broom', title: 'Housekeeping Services', text: 'Enjoy the convenience of housekeeping support for a more comfortable living environment.' },
  { icon: 'shield', title: 'Safe & Secure Living', text: 'A living environment designed with resident safety and security in mind.' },
  { icon: 'clock', title: '24/7 Support', text: 'Access round-the-clock support for assistance when you need it.' },
  { icon: 'people', title: 'Community Living', text: 'Enjoy the opportunity to meet people and become part of a welcoming residential community.' },
]

// All photos come from the client's property folder on Google Drive (IMG_7725 to IMG_7833).
// Photos showing people are left out until their consent is confirmed.
// `portrait: true` marks upright photos so the gallery gives them a tall tile.
export const GALLERY = [
  { src: 'rooftop-evening', cat: 'Facilities', alt: 'Covered recreational space with hanging swing chairs and terracotta seating in the evening' },
  { src: 'private-room', cat: 'Rooms', alt: 'Private room with single bed and charcoal feature wall' },
  { src: 'lobby-lounge', cat: 'Common Areas', alt: 'Lounge with sofa, armchair and the Nayasa logo wall' },
  { src: 'sharing-room-wide', cat: 'Rooms', alt: 'Double-sharing room with two beds, a desk and a wooden wardrobe' },
  { src: 'kitchen-counter', cat: 'Common Areas', alt: 'Kitchen with an L-shaped counter, refrigerator and white wall cabinets' },
  { src: 'building-facade', cat: 'Building', portrait: true, alt: 'Nayasa building facade with glass balconies and the Nayasa sign' },
  { src: 'dining-tables', cat: 'Common Areas', alt: 'Dining tables and benches with small plant centrepieces' },
  { src: 'sharing-room', cat: 'Rooms', alt: 'Double-sharing room with two beds and a study desk' },
  { src: 'recreation-room', cat: 'Facilities', alt: 'Recreational space with a table-tennis table and foosball' },
  { src: 'private-room-study', cat: 'Rooms', alt: 'Private room with a desk, yellow chair and a large window' },
  { src: 'reception-seating', cat: 'Common Areas', alt: 'Seating corner with two chairs, plants and decorative wall art' },
  { src: 'courtyard-benches', cat: 'Building', alt: 'Courtyard with wooden benches beside palm trees' },
  { src: 'private-room-window', cat: 'Rooms', alt: 'Private room with a window, curtains and a yellow desk chair' },
  { src: 'shared-kitchen', cat: 'Common Areas', alt: 'Kitchen area with refrigerator, water dispenser and wooden cabinets' },
  { src: 'sharing-room-desk', cat: 'Rooms', alt: 'Twin beds on either side of a desk with a yellow chair' },
  { src: 'balcony-view', cat: 'Building', alt: 'Open balcony with glass railing overlooking Whitefield' },
  { src: 'private-room-bright', cat: 'Rooms', alt: 'Private room with a single bed, striped rug and a desk by the window' },
  { src: 'dining-hall', cat: 'Common Areas', alt: 'Dining area with wooden tables and benches' },
  { src: 'sharing-room-doorway', cat: 'Rooms', portrait: true, alt: 'Double-sharing room with two beds, seen from the doorway' },
  { src: 'rooftop-seating', cat: 'Facilities', alt: 'Terracotta lounge chairs around low tables on turf flooring' },
  { src: 'rooftop-lounge', cat: 'Facilities', alt: 'Covered recreational space at dusk with hanging swing chairs and warm pendant lights' },
  { src: 'private-room-door', cat: 'Rooms', alt: 'Private room with a single bed, wooden wardrobe and bedside table' },
  { src: 'building-exterior', cat: 'Building', alt: 'Nayasa building facade with glass balconies, seen from street level' },
  { src: 'reception-corner', cat: 'Common Areas', alt: 'Seating corner with pendant lamps, plants and chairs' },
  { src: 'sharing-room-twin', cat: 'Rooms', alt: 'Twin beds placed either side of a shared desk in a double-sharing room' },
  { src: 'kitchen-corner', cat: 'Common Areas', alt: 'Kitchen corner with refrigerator, water dispenser and wooden cabinets' },
  { src: 'private-room-wardrobe', cat: 'Rooms', alt: 'Private room with a single bed, mirror, shoe rack and bedside drawers' },
  { src: 'courtyard-palms', cat: 'Building', alt: 'Courtyard benches with palm trees and the neighbouring buildings behind' },
  { src: 'lobby-entrance', cat: 'Common Areas', alt: 'Common area with glass doors, sofa and armchair' },
  { src: 'sharing-room-rug', cat: 'Rooms', alt: 'Double-sharing room with two beds, a desk and a striped rug' },
  { src: 'dining-hall-long', cat: 'Common Areas', alt: 'Long dining hall with wooden tables and benches' },
  { src: 'private-room-desk', cat: 'Rooms', alt: 'Private room with work desk next to the bed' },
  { src: 'balcony-railing', cat: 'Building', alt: 'Balcony with a glass railing and a view over the neighbourhood' },
  { src: 'courtyard-parking', cat: 'Building', alt: 'Courtyard with benches beside the building' },
  { src: 'sharing-room-corner', cat: 'Rooms', alt: 'Sharing room with two beds and full-height curtains' },
]

export const RULES = [
  { title: 'Rent Payment', text: 'Rent is payable in advance according to the agreed rental terms.' },
  { title: 'Security Deposit', text: 'A security deposit is applicable as per company policy. The deposit amount will be communicated during the enquiry process.' },
  { title: 'Notice Period', text: 'A mandatory 30-day notice period applies.' },
  { title: 'Food', text: 'Food is not included in the accommodation pricing.' },
  { title: 'Property Damage', text: 'Charges may apply for damage to property, fixtures or furnishings.' },
  { title: 'Terms & Conditions', text: 'Management reserves the right to amend applicable terms and conditions.' },
]

export const FAQS = [
  { q: 'Where is Nayasa Premium Co-Living located?', a: 'Nayasa is located on ITPL Main Road, Whitefield, Bengaluru – 560066.' },
  { q: 'Does Nayasa offer private rooms?', a: 'Yes. Nayasa offers private accommodation options, with listed prices starting at ₹14,000 per room.' },
  { q: 'Is double-sharing accommodation available?', a: 'Yes. Double-sharing options are available, with listed prices starting at ₹10,000 per bed.' },
  { q: 'What amenities are available?', a: 'Nayasa lists high-speed Wi-Fi, housekeeping services, safety and security, 24/7 support and community living among its key features.' },
  { q: 'Is food included in the rent?', a: 'No. Food is not included in the listed accommodation pricing.' },
  { q: 'Is a security deposit required?', a: 'Yes. A security deposit is applicable according to company policy. Please contact the team for the exact amount.' },
  { q: 'What is the notice period?', a: 'Nayasa has a mandatory 30-day notice period.' },
  { q: 'How can I schedule a property visit?', a: 'You can contact the Nayasa team through the website enquiry form or call the contact number provided below.' },
]

export const img = (name, size) => `/images/${name}${size === 'sm' ? '-sm' : ''}.webp`
