import type { City } from "@/types/property";

// Spec §49 — initial popular cities; architecture supports unlimited cities via admin CMS later.
// imageUrl is only set for cities where a real, verified-accurate photo is available
// (Mumbai/Delhi/Chennai below) — see PopularCities.tsx, which falls back to the existing
// on-brand gradient tile for every city left at "" rather than guessing at unverified imagery.
export const popularCities: City[] = [
  { id: "bengaluru", name: "Bengaluru", state: "Karnataka", propertyCount: 4820, imageUrl: "" },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", propertyCount: 6210, imageUrl: "/images/cities/mumbai.jpg" },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu", propertyCount: 3140, imageUrl: "/images/cities/chennai.jpg" },
  { id: "hyderabad", name: "Hyderabad", state: "Telangana", propertyCount: 3980, imageUrl: "" },
  { id: "delhi-ncr", name: "Delhi NCR", state: "Delhi", propertyCount: 7350, imageUrl: "/images/cities/delhi-ncr.jpg" },
  { id: "pune", name: "Pune", state: "Maharashtra", propertyCount: 3410, imageUrl: "" },
  { id: "kolkata", name: "Kolkata", state: "West Bengal", propertyCount: 1980, imageUrl: "" },
  { id: "coimbatore", name: "Coimbatore", state: "Tamil Nadu", propertyCount: 940, imageUrl: "" },
  { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat", propertyCount: 1620, imageUrl: "" },
  { id: "kochi", name: "Kochi", state: "Kerala", propertyCount: 780, imageUrl: "" },
];

// Full India coverage for every city picker (post-property wizard, search filters, admin
// settings seed). Grouped by state/UT — capitals, every district headquarters, and the
// notable Tier-2 / Tier-3 towns of each state, so an owner in a small town can still list.
// The home page keeps showing `popularCities` only.
const CITY_DATA: [string, string[]][] = [
  ["Andhra Pradesh", ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Kakinada", "Tirupati", "Anantapur", "Kadapa", "Vizianagaram", "Eluru", "Ongole", "Nandyal", "Machilipatnam", "Adoni", "Tenali", "Proddatur", "Chittoor", "Hindupur", "Bhimavaram", "Madanapalle", "Guntakal", "Dharmavaram", "Gudivada", "Narasaraopet", "Tadepalligudem", "Srikakulam", "Chilakaluripet", "Amaravati", "Bapatla", "Markapur", "Palasa", "Rayachoti"]],
  ["Arunachal Pradesh", ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro", "Bomdila", "Tezu", "Aalo", "Roing", "Khonsa", "Namsai", "Seppa", "Changlang", "Daporijo", "Yingkiong"]],
  ["Assam", ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon", "Dhubri", "Diphu", "North Lakhimpur", "Karimganj", "Sivasagar", "Goalpara", "Barpeta", "Nalbari", "Hailakandi", "Golaghat", "Haflong", "Mangaldoi", "Kokrajhar", "Morigaon", "Hojai", "Lanka", "Rangia", "Sonari", "Dhekiajuli"]],
  ["Bihar", ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar", "Chhapra", "Munger", "Motihari", "Hajipur", "Sasaram", "Dehri", "Siwan", "Bettiah", "Saharsa", "Samastipur", "Nawada", "Jamalpur", "Buxar", "Kishanganj", "Sitamarhi", "Jehanabad", "Aurangabad", "Madhubani", "Bhabua", "Lakhisarai", "Jamui", "Araria", "Supaul", "Banka", "Sheohar", "Khagaria", "Gopalganj", "Madhepura", "Purba Champaran", "Barh", "Bagaha", "Forbesganj"]],
  ["Chhattisgarh", ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Jagdalpur", "Raigarh", "Ambikapur", "Dhamtari", "Mahasamund", "Kanker", "Kawardha", "Janjgir", "Champa", "Bemetara", "Baloda Bazar", "Balod", "Mungeli", "Kondagaon", "Sukma", "Dantewada", "Bijapur", "Narayanpur", "Gariaband", "Jashpur", "Surajpur", "Balrampur", "Baikunthpur", "Bhatapara", "Tilda Newra", "Chirmiri"]],
  ["Goa", ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Cuncolim", "Canacona", "Valpoi", "Pernem", "Quepem", "Sanguem", "Mormugao", "Sanquelim"]],
  ["Gujarat", ["Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Nadiad", "Morbi", "Mehsana", "Bharuch", "Vapi", "Navsari", "Veraval", "Porbandar", "Godhra", "Bhuj", "Palanpur", "Valsad", "Gondal", "Botad", "Amreli", "Deesa", "Jetpur", "Dahod", "Patan", "Surendranagar", "Ankleshwar", "Kalol", "Himatnagar", "Modasa", "Dwarka", "Rajpipla", "Chhota Udaipur", "Lunawada", "Khambhat", "Sidhpur", "Unjha", "Mandvi", "Wankaner", "Upleta", "Keshod", "Mahuva", "Jamkhambhalia", "Dholka", "Bardoli", "Vyara"]],
  ["Haryana", ["Faridabad", "Gurugram", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula", "Bhiwani", "Sirsa", "Bahadurgarh", "Jind", "Thanesar", "Kaithal", "Rewari", "Palwal", "Narnaul", "Fatehabad", "Gohana", "Tohana", "Hansi", "Kurukshetra", "Charkhi Dadri", "Nuh", "Jhajjar", "Mahendragarh", "Hodal", "Ratia", "Kalka", "Ellenabad"]],
  ["Himachal Pradesh", ["Shimla", "Mandi", "Solan", "Dharamshala", "Palampur", "Baddi", "Nahan", "Sundarnagar", "Kullu", "Hamirpur", "Una", "Bilaspur", "Chamba", "Kangra", "Manali", "Dalhousie", "Kasauli", "Keylong", "Reckong Peo", "Nurpur", "Paonta Sahib", "Jogindernagar", "Rampur", "Rohru", "Theog", "Nalagarh"]],
  ["Jharkhand", ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh", "Medininagar", "Phusro", "Chaibasa", "Dumka", "Gumla", "Sahibganj", "Chatra", "Koderma", "Lohardaga", "Pakur", "Godda", "Jamtara", "Simdega", "Khunti", "Latehar", "Garhwa", "Chakradharpur", "Jhumri Telaiya", "Madhupur", "Sahibganj", "Mihijam"]],
  ["Karnataka", ["Mysuru", "Hubballi", "Dharwad", "Mangaluru", "Belagavi", "Kalaburagi", "Davanagere", "Ballari", "Vijayapura", "Shivamogga", "Tumakuru", "Raichur", "Bidar", "Hospet", "Hassan", "Gadag", "Udupi", "Robertsonpet", "Bhadravati", "Chitradurga", "Kolar", "Mandya", "Chikkamagaluru", "Bagalkot", "Ranebennuru", "Karwar", "Sirsi", "Puttur", "Yadgir", "Koppal", "Chamarajanagar", "Haveri", "Chikkaballapur", "Ramanagara", "Madikeri", "Sagara", "Gokak", "Nipani", "Bailhongal", "Gangavati", "Sindhanur", "Tiptur", "Nanjangud", "Dandeli", "Harihar", "Bhalki", "Sedam"]],
  ["Kerala", ["Thiruvananthapuram", "Kozhikode", "Thrissur", "Kollam", "Kannur", "Alappuzha", "Palakkad", "Kottayam", "Malappuram", "Pathanamthitta", "Kalpetta", "Kasaragod", "Manjeri", "Thalassery", "Ponnani", "Vatakara", "Kanhangad", "Payyanur", "Koyilandy", "Neyyattinkara", "Nedumangad", "Changanassery", "Punalur", "Nilambur", "Cherthala", "Kayamkulam", "Tirur", "Perinthalmanna", "Chalakudy", "Guruvayur", "Ottappalam", "Muvattupuzha", "Thodupuzha", "Pala", "Kottarakkara", "Adoor", "Attingal", "Varkala", "Kodungallur", "Aluva", "Perumbavoor", "North Paravur"]],
  ["Madhya Pradesh", ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Katni", "Singrauli", "Burhanpur", "Khandwa", "Morena", "Bhind", "Chhindwara", "Guna", "Shivpuri", "Vidisha", "Chhatarpur", "Damoh", "Mandsaur", "Khargone", "Neemuch", "Pithampur", "Narmadapuram", "Itarsi", "Sehore", "Betul", "Seoni", "Datia", "Nagda", "Dhar", "Balaghat", "Ashoknagar", "Tikamgarh", "Sheopur", "Rajgarh", "Shajapur", "Harda", "Panna", "Umaria", "Dindori", "Anuppur", "Sidhi", "Shahdol", "Alirajpur", "Jhabua", "Mandla", "Narsinghpur", "Raisen", "Barwani", "Agar Malwa", "Sironj", "Sarni", "Mhow"]],
  ["Maharashtra", ["Nagpur", "Nashik", "Chhatrapati Sambhaji Nagar", "Solapur", "Amravati", "Kolhapur", "Nanded", "Sangli", "Jalgaon", "Akola", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Ichalkaranji", "Jalna", "Bhusawal", "Panvel", "Satara", "Beed", "Yavatmal", "Gondia", "Wardha", "Osmanabad", "Nandurbar", "Washim", "Hingoli", "Buldhana", "Ratnagiri", "Sindhudurg", "Alibag", "Bhandara", "Gadchiroli", "Palghar", "Thane", "Kalyan", "Vasai-Virar", "Navi Mumbai", "Pimpri-Chinchwad", "Malegaon", "Baramati", "Karad", "Miraj", "Ambejogai", "Udgir", "Chalisgaon", "Shirdi", "Lonavla", "Wai", "Pandharpur", "Shrirampur", "Achalpur", "Kamptee", "Deolali"]],
  ["Manipur", ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Kakching", "Ukhrul", "Senapati", "Tamenglong", "Jiribam", "Moreh", "Chandel", "Kangpokpi", "Tengnoupal", "Kamjong", "Noney", "Pherzawl", "Lilong", "Mayang Imphal"]],
  ["Meghalaya", ["Shillong", "Tura", "Jowai", "Nongstoin", "Williamnagar", "Baghmara", "Nongpoh", "Resubelpara", "Mairang", "Ampati", "Khliehriat", "Mawkyrwat", "Cherrapunji"]],
  ["Mizoram", ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Saiha", "Lawngtlai", "Mamit", "Khawzawl", "Hnahthial", "Saitual"]],
  ["Nagaland", ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Mon", "Phek", "Kiphire", "Longleng", "Peren", "Chumukedima"]],
  ["Odisha", ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda", "Jeypore", "Bargarh", "Rayagada", "Bhawanipatna", "Paradip", "Angul", "Dhenkanal", "Keonjhar", "Sundargarh", "Koraput", "Nabarangpur", "Malkangiri", "Nuapada", "Kalahandi", "Boudh", "Subarnapur", "Deogarh", "Jajpur", "Kendrapara", "Jagatsinghpur", "Nayagarh", "Khordha", "Chhatrapur", "Paralakhemundi", "Phulbani", "Talcher", "Brajarajnagar", "Rajgangpur", "Barbil", "Sunabeda"]],
  ["Punjab", ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Mohali", "Batala", "Pathankot", "Moga", "Abohar", "Malerkotla", "Khanna", "Phagwara", "Muktsar", "Barnala", "Firozpur", "Kapurthala", "Sangrur", "Fazilka", "Rajpura", "Gurdaspur", "Faridkot", "Nabha", "Sunam", "Mansa", "Nawanshahr", "Rupnagar", "Tarn Taran", "Zirakpur", "Kharar", "Jagraon", "Samana", "Gobindgarh", "Dasuya"]],
  ["Rajasthan", ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar", "Pali", "Sri Ganganagar", "Kishangarh", "Baran", "Dhaulpur", "Tonk", "Beawar", "Hanumangarh", "Sawai Madhopur", "Churu", "Jhunjhunu", "Nagaur", "Banswara", "Chittorgarh", "Bundi", "Barmer", "Jaisalmer", "Dungarpur", "Pratapgarh", "Rajsamand", "Sirohi", "Jhalawar", "Karauli", "Dausa", "Jalore", "Nathdwara", "Gangapur City", "Makrana", "Sujangarh", "Ladnun", "Nokha", "Phalodi", "Bhinmal", "Fatehpur", "Kuchaman City", "Neem Ka Thana"]],
  ["Sikkim", ["Gangtok", "Namchi", "Geyzing", "Mangan", "Rangpo", "Singtam", "Jorethang", "Ravangla", "Pakyong", "Soreng"]],
  ["Tamil Nadu", ["Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Thanjavur", "Dindigul", "Hosur", "Nagercoil", "Karur", "Kanchipuram", "Cuddalore", "Kumbakonam", "Rajapalayam", "Pudukkottai", "Sivakasi", "Namakkal", "Tiruvannamalai", "Pollachi", "Neyveli", "Karaikkudi", "Tiruppur", "Nagapattinam", "Viluppuram", "Krishnagiri", "Dharmapuri", "Ariyalur", "Perambalur", "Ramanathapuram", "Sivaganga", "Virudhunagar", "Theni", "Udhagamandalam", "Coonoor", "Ambur", "Vaniyambadi", "Arakkonam", "Gudiyatham", "Palani", "Udumalaipettai", "Mettupalayam", "Sankarankovil", "Tenkasi", "Kovilpatti", "Aruppukottai", "Paramakudi", "Tiruchengode", "Gobichettipalayam", "Bhavani", "Cumbum", "Bodinayakanur", "Mayiladuthurai", "Chidambaram", "Sirkazhi", "Thiruvarur", "Mannargudi", "Pattukkottai", "Tindivanam", "Chengalpattu", "Tambaram", "Avadi", "Ranipet", "Tirupathur"]],
  ["Telangana", ["Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet", "Miryalaguda", "Siddipet", "Jagtial", "Mancherial", "Kamareddy", "Kothagudem", "Bodhan", "Sangareddy", "Medak", "Vikarabad", "Nirmal", "Bhadrachalam", "Wanaparthy", "Gadwal", "Nagarkurnool", "Bhongir", "Zaheerabad", "Kodad", "Sircilla", "Peddapalli", "Jangaon", "Mahabubabad", "Mulugu", "Narayanpet", "Medchal", "Tandur", "Vemulawada", "Sadasivpet", "Palwancha"]],
  ["Tripura", ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Belonia", "Ambassa", "Khowai", "Sabroom", "Sonamura", "Amarpur", "Kamalpur", "Bishalgarh", "Teliamura", "Melaghar", "Ranir Bazar"]],
  ["Uttar Pradesh", ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Varanasi", "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Jhansi", "Muzaffarnagar", "Mathura", "Ayodhya", "Rampur", "Shahjahanpur", "Farrukhabad", "Hapur", "Etawah", "Mirzapur", "Bulandshahr", "Sambhal", "Amroha", "Hardoi", "Fatehpur", "Raebareli", "Orai", "Sitapur", "Bahraich", "Unnao", "Jaunpur", "Lakhimpur", "Hathras", "Banda", "Pilibhit", "Barabanki", "Khurja", "Gonda", "Mainpuri", "Lalitpur", "Etah", "Deoria", "Ghazipur", "Sultanpur", "Azamgarh", "Bijnor", "Basti", "Chandausi", "Akbarpur", "Ballia", "Kasganj", "Baghpat", "Mau", "Shamli", "Kushinagar", "Kannauj", "Auraiya", "Chitrakoot", "Hamirpur", "Mahoba", "Jalaun", "Amethi", "Shravasti", "Siddharthnagar", "Sonbhadra", "Bhadohi", "Kaushambi", "Pratapgarh", "Ambedkar Nagar", "Sant Kabir Nagar", "Modinagar", "Loni", "Greater Noida"]],
  ["Uttarakhand", ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Nainital", "Mussoorie", "Kotdwar", "Ramnagar", "Pithoragarh", "Almora", "Pauri", "Bageshwar", "Champawat", "New Tehri", "Uttarkashi", "Rudraprayag", "Gopeshwar", "Khatima", "Sitarganj", "Manglaur", "Vikasnagar", "Jaspur", "Bazpur"]],
  ["West Bengal", ["Howrah", "Durgapur", "Asansol", "Siliguri", "Barddhaman", "English Bazar", "Baharampur", "Habra", "Kharagpur", "Shantipur", "Dankuni", "Dhulian", "Ranaghat", "Haldia", "Raiganj", "Krishnanagar", "Nabadwip", "Medinipur", "Jalpaiguri", "Balurghat", "Basirhat", "Bankura", "Chakdaha", "Darjeeling", "Alipurduar", "Purulia", "Cooch Behar", "Bongaon", "Jangipur", "Bolpur", "Suri", "Tamluk", "Contai", "Islampur", "Kalimpong", "Arambagh", "Katwa", "Kalna", "Memari", "Gangarampur", "Jhargram", "Barrackpore", "Bidhannagar", "Kanchrapara", "Bardhaman"]],
  ["Delhi", ["New Delhi"]],
  ["Jammu and Kashmir", ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Sopore", "Kathua", "Udhampur", "Rajouri", "Poonch", "Kupwara", "Pulwama", "Budgam", "Bandipora", "Ganderbal", "Kulgam", "Shopian", "Kishtwar", "Doda", "Ramban", "Reasi", "Samba"]],
  ["Ladakh", ["Leh", "Kargil"]],
  ["Chandigarh", ["Chandigarh"]],
  ["Puducherry", ["Puducherry", "Karaikal", "Yanam", "Mahe"]],
  ["Andaman and Nicobar Islands", ["Port Blair"]],
  ["Dadra and Nagar Haveli and Daman and Diu", ["Silvassa", "Daman", "Diu"]],
  ["Lakshadweep", ["Kavaratti"]],
];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function hashOf(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

const generatedCities: City[] = CITY_DATA.flatMap(([state, names]) =>
  names.map((name) => ({
    id: `${slugify(name)}-${slugify(state).slice(0, 3)}`,
    name,
    state,
    propertyCount: 20 + (hashOf(name) % 480),
    imageUrl: "",
  }))
);

// De-duped by name (popular entries win), alphabetised. Pickers show `name` and filter by
// name + state.
const seen = new Set(popularCities.map((c) => c.name.toLowerCase()));
export const allCities: City[] = [
  ...popularCities,
  ...generatedCities.filter((c) => {
    const key = c.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }),
].sort((a, b) => a.name.localeCompare(b.name));

// Old / short / common alternate names → the canonical city in `allCities`. Lets a partial
// like "ban" or "de" surface "Bengaluru" / "Delhi NCR" without typing the full name.
export const CITY_ALIASES: Record<string, string> = {
  bangalore: "Bengaluru",
  bengaluru: "Bengaluru",
  bombay: "Mumbai",
  madras: "Chennai",
  calcutta: "Kolkata",
  poona: "Pune",
  gurgaon: "Gurugram",
  vizag: "Visakhapatnam",
  vishakhapatnam: "Visakhapatnam",
  cochin: "Kochi",
  trivandrum: "Thiruvananthapuram",
  mysore: "Mysuru",
  mangalore: "Mangaluru",
  calicut: "Kozhikode",
  pondicherry: "Puducherry",
  baroda: "Vadodara",
  benares: "Varanasi",
  banaras: "Varanasi",
  allahabad: "Prayagraj",
  gauhati: "Guwahati",
  nasik: "Nashik",
  cawnpore: "Kanpur",
  simla: "Shimla",
  belgaum: "Belagavi",
  hubli: "Hubballi",
  gulbarga: "Kalaburagi",
  bellary: "Ballari",
  tuticorin: "Thoothukudi",
  trichy: "Tiruchirappalli",
  ooty: "Udhagamandalam",
  delhi: "Delhi NCR",
  "new delhi": "Delhi NCR",
  ncr: "Delhi NCR",
};

/**
 * Type-ahead city search used by the pickers. Empty query → the whole list.
 * Matches on name, state, or an alias, and ranks name-prefix hits first so a short
 * "nage" / "de" surfaces the closest city without scrolling.
 */
export function searchCities(query: string): City[] {
  const q = query.trim().toLowerCase();
  if (!q) return allCities;
  const aliasHits = Object.entries(CITY_ALIASES)
    .filter(([alias]) => alias.includes(q) || q.includes(alias))
    .map(([, canonical]) => canonical.toLowerCase());
  return allCities
    .filter((c) => {
      const n = c.name.toLowerCase();
      return n.includes(q) || c.state.toLowerCase().includes(q) || aliasHits.includes(n);
    })
    .sort((a, b) => {
      const an = a.name.toLowerCase();
      const bn = b.name.toLowerCase();
      const rank = (n: string) => (n.startsWith(q) ? 0 : n.includes(q) ? 1 : 2);
      return rank(an) - rank(bn) || an.localeCompare(bn);
    });
}
