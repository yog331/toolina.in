export const PAY_LEVELS = Array.from({ length: 24 }, (_, i) => `L-${i + 1}`);

export const GRADE_PAY_MAP: Record<string, number> = {
  'L-1': 1700, 'L-2': 1750, 'L-3': 1900, 'L-4': 2000, 'L-5': 2400,
  'L-6': 2400, 'L-7': 2400, 'L-8': 2800, 'L-9': 2800, 'L-10': 3600,
  'L-11': 4200, 'L-12': 4800, 'L-13': 5400, 'L-14': 5400, 'L-15': 6000,
  'L-16': 6600, 'L-17': 6800, 'L-18': 7200, 'L-19': 7600, 'L-20': 8200,
  'L-21': 8700, 'L-22': 8900, 'L-23': 9500, 'L-24': 10000
};

export const PAY_MATRIX: Record<string, number[]> = {
  'L-1': [17700, 18200, 18700, 19300, 19900, 20500, 21100, 21700, 22400, 23100, 23800, 24500, 25200, 26000, 26800, 27600, 28400, 29300, 30200, 31100, 32000, 33000, 34000, 35000, 36100, 37200, 38300, 39400, 40600, 41800, 43100, 44400, 45700, 47100, 48500, 50000, 51500, 53000, 54600, 56200],
  'L-2': [17900, 18400, 19000, 19600, 20200, 20800, 21400, 22000, 22700, 23400, 24100, 24800, 25500, 26300, 27100, 27900, 28700, 29600, 30500, 31400, 32300, 33300, 34300, 35300, 36400, 37500, 38600, 39800, 41000, 42200, 43500, 44800, 46100, 47500, 48900, 50400, 51900, 53500, 55100, 56800],
  'L-3': [18200, 18700, 19300, 19900, 20500, 21100, 21700, 22400, 23100, 23800, 24500, 25200, 26000, 26800, 27600, 28400, 29300, 30200, 31100, 32000, 33000, 34000, 35000, 36100, 37200, 38300, 39400, 40600, 41800, 43100, 44400, 45700, 47100, 48500, 50000, 51500, 53000, 54600, 56200, 57900],
  'L-4': [19200, 19800, 20400, 21000, 21600, 22200, 22900, 23600, 24300, 25000, 25800, 26600, 27400, 28200, 29000, 29900, 30800, 31700, 32700, 33700, 34700, 35700, 36800, 37900, 39000, 40200, 41400, 42600, 43900, 45200, 46600, 48000, 49400, 50900, 52400, 54000, 55600, 57300, 59000, 60800],
  'L-5': [20800, 21400, 22000, 22700, 23400, 24100, 24800, 25500, 26300, 27100, 27900, 28700, 29600, 30500, 31400, 32300, 33300, 34300, 35300, 36400, 37500, 38600, 39800, 41000, 42200, 43500, 44800, 46100, 47500, 48900, 50400, 51900, 53500, 55100, 56800, 58500, 60300, 62100, 64000, 65900],
  'L-6': [21500, 22100, 22800, 23500, 24200, 24900, 25600, 26400, 27200, 28000, 28800, 29700, 30600, 31500, 32400, 33400, 34400, 35400, 36500, 37600, 38700, 39900, 41100, 42300, 43600, 44900, 46200, 47600, 49000, 50500, 52000, 53600, 55200, 56900, 58600, 60400, 62200, 64100, 66000, 68000],
  'L-7': [22400, 23100, 23800, 24500, 25200, 26000, 26800, 27600, 28400, 29300, 30200, 31100, 32000, 33000, 34000, 35000, 36100, 37200, 38300, 39400, 40600, 41800, 43100, 44400, 45700, 47100, 48500, 50000, 51500, 53000, 54600, 56200, 57900, 59600, 61400, 63200, 65100, 67100, 69100, 71200],
  'L-8': [26300, 27100, 27900, 28700, 29600, 30500, 31400, 32300, 33300, 34300, 35300, 36400, 37500, 38600, 39800, 41000, 42200, 43500, 44800, 46100, 47500, 48900, 50400, 51900, 53500, 55100, 56800, 58500, 60300, 62100, 64000, 65900, 67900, 69900, 72000, 74200, 76400, 78700, 81100, 83500],
  'L-9': [28700, 29600, 30500, 31400, 32300, 33300, 34300, 35300, 36400, 37500, 38600, 39800, 41000, 42200, 43500, 44800, 46100, 47500, 48900, 50400, 51900, 53500, 55100, 56800, 58500, 60300, 62100, 64000, 65900, 67900, 69900, 72000, 74200, 76400, 78700, 81100, 83500, 86000, 88600, 91300],
  'L-10': [33800, 34800, 35800, 36900, 38000, 39100, 40300, 41500, 42700, 44000, 45300, 46700, 48100, 49500, 51000, 52500, 54100, 55700, 57400, 59100, 60900, 62700, 64600, 66500, 68500, 70600, 72700, 74900, 77100, 79400, 81800, 84300, 86800, 89400, 92100, 94900, 97700, 100600, 103600, 106700],
  'L-11': [37800, 38900, 40100, 41300, 42500, 43800, 45100, 46500, 47900, 49300, 50800, 52300, 53900, 55500, 57200, 58900, 60700, 62500, 64400, 66300, 68300, 70300, 72400, 74600, 76800, 79100, 81500, 83900, 86400, 89000, 91700, 94500, 97300, 100200, 103200, 106300, 109500, 112800, 116200, 119700],
  'L-12': [44300, 45600, 47000, 48400, 49900, 51400, 52900, 54500, 56100, 57800, 59500, 61300, 63100, 65000, 67000, 69000, 71100, 73200, 75400, 77700, 80000, 82400, 84900, 87400, 90000, 92700, 95500, 98400, 101400, 104400, 107500, 110700, 114000, 117400, 120900, 124500, 128200, 132000, 136000, 140100],
  'L-13': [53100, 54700, 56300, 58000, 59700, 61500, 63300, 65200, 67200, 69200, 71300, 73400, 75600, 77900, 80200, 82600, 85100, 87700, 90300, 93000, 95800, 98700, 101700, 104800, 107900, 111100, 114400, 117800, 121300, 124900, 128600, 132500, 136500, 140600, 144800, 149100, 153600, 158200, 162900, 167800],
  'L-14': [56100, 57800, 59500, 61300, 63100, 65000, 67000, 69000, 71100, 73200, 75400, 77700, 80000, 82400, 84900, 87400, 90000, 92700, 95500, 98400, 101400, 104400, 107500, 110700, 114000, 117400, 120900, 124500, 128200, 132000, 136000, 140100, 144300, 148600, 153100, 157700, 162400, 167300, 172300, 177500],
  'L-15': [60700, 62500, 64400, 66300, 68300, 70300, 72400, 74600, 76800, 79100, 81500, 83900, 86400, 89000, 91700, 94500, 97300, 100200, 103200, 106300, 109500, 112800, 116200, 119700, 123300, 127000, 130800, 134700, 138700, 142900, 147200, 151600, 156100, 160800, 165600, 170600, 175700, 181000, 186400, 192000],
  'L-16': [67300, 69300, 71400, 73500, 75700, 78000, 80300, 82700, 85200, 87800, 90400, 93100, 95900, 98800, 101800, 104900, 108000, 111200, 114500, 117900, 121400, 125000, 128800, 132700, 136700, 140800, 145000, 149400, 153900, 158500, 163300, 168200, 173200, 178400, 183800, 189300, 195000],
  'L-17': [71000, 73100, 75300, 77600, 79900, 82300, 84800, 87300, 89900, 92600, 95400, 98300, 101200, 104200, 107300, 110500, 113800, 117200, 120700, 124300, 128000, 131800, 135800, 139900, 144100, 148400, 152900, 157500, 162200, 167100, 172100, 177300, 182600, 188100, 193700, 199500],
  'L-18': [75300, 77600, 79900, 82300, 84800, 87300, 89900, 92600, 95400, 98300, 101200, 104200, 107300, 110500, 113800, 117200, 120700, 124300, 128000, 131800, 135800, 139900, 144100, 148400, 152900, 157500, 162200, 167100, 172100, 177300, 182600, 188100, 193700, 199500],
  'L-19': [79900, 82300, 84800, 87300, 89900, 92600, 95400, 98300, 101200, 104200, 107300, 110500, 113800, 117200, 120700, 124300, 128000, 131800, 135800, 139900, 144100, 148400, 152900, 157500, 162200, 167100, 172100, 177300, 182600, 188100, 193700, 199500],
  'L-20': [88900, 91600, 94300, 97100, 100000, 103000, 106100, 109300, 112600, 116000, 119500, 123100, 126800, 130600, 134500, 138500, 142700, 147000, 151400, 155900, 160600, 165400, 170400, 175500, 180800, 186200, 191800, 197600, 203500],
  'L-21': [123100, 126800, 130600, 134500, 138500, 142700, 147000, 151400, 155900, 160600, 165400, 170400, 175500, 180800, 186200, 191800, 197600, 203500],
  'L-22': [129700, 133600, 137600, 141700, 146000, 150400, 154900, 159500, 164300, 169200, 174300, 179500, 184900, 190400, 196100, 202000, 208100],
  'L-23': [145800, 150200, 154700, 159300, 164100, 169000, 174100, 179300, 184700, 190200, 195900, 201800, 207900, 214100],
  'L-24': [148800, 153300, 157900, 167500, 172500, 177700, 183000, 188500, 194200, 200000, 206000, 212200, 218600]
};

export const MESS_RATE_PRESETS = [
  { label: 'Nursing', rate: 1450 },
  { label: 'Police/Jail', rate: 2700 },
  { label: 'Standard', rate: 450 },
  { label: 'None', rate: 0 }
];

export const HARD_DUTY_PRESETS = [
  { label: 'Nursing/Medical', rate: 250 },
  { label: 'Police/SDRF', rate: 500 },
  { label: 'High Alert Duty', rate: 1000 },
  { label: 'None', rate: 0 }
];

export interface Post {
  title: string;
  level: string;
  gradePay: number;
  initialPay: number;
  messRate?: number;
  hardDutyRate?: number;
  ruralRate?: number;
}

export interface Department {
  name: string;
  posts: Post[];
}

export const DEPARTMENT_DATA: Department[] = [
  {
    name: "Education (General Branch)",
    posts: [
      { title: "Senior Computer Instructor", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Basic Computer Instructor", level: "L-8", gradePay: 2800, initialPay: 26300 },
      { title: "Craft Instructor Grade-I", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "Librarian (Sr. Sec School)", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "Physical Training Instructor", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "Tehsil Block Librarian", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Enforcement Assistant", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "Film Librarian", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "Librarian (State Inst. Sci.)", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Director of Education", level: "L-21", gradePay: 8700, initialPay: 123100 },
      { title: "Lecturer (Humanities/Sci)", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Principal (Sr. Sec)", level: "L-16", gradePay: 6600, initialPay: 67300 }
    ]
  },
  {
    name: "Rajasthan High Court Staff",
    posts: [
      { title: "Joint Deputy Registrar", level: "L-21", gradePay: 8700, initialPay: 123100 },
      { title: "Assistant Registrar", level: "L-16", gradePay: 6600, initialPay: 67300 },
      { title: "Private Secretary", level: "L-16", gradePay: 6600, initialPay: 67300 },
      { title: "Court Master", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Accountant", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "Junior Accountant", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Lower Division Clerk (LDC)", level: "L-5", gradePay: 2400, initialPay: 20800 },
      { title: "Data Entry Operator", level: "L-8", gradePay: 2800, initialPay: 26300 },
      { title: "Book Binder", level: "L-5", gradePay: 2400, initialPay: 20800 },
      { title: "Translator", level: "L-11", gradePay: 4200, initialPay: 37800 }
    ]
  },
  {
    name: "Medical & Health",
    posts: [
      { title: "Nursing Officer (Nurse Gr-II)", level: "L-11", gradePay: 4200, initialPay: 37800, messRate: 1450, hardDutyRate: 250 },
      { title: "Senior Nursing Officer (Gr-I)", level: "L-12", gradePay: 4800, initialPay: 44300, messRate: 1450, hardDutyRate: 250 },
      { title: "Medical Officer", level: "L-14", gradePay: 5400, initialPay: 56100, ruralRate: 1000 },
      { title: "Principal Medical Officer", level: "L-21", gradePay: 8700, initialPay: 123100 },
      { title: "Chief Medical & Health Officer", level: "L-19", gradePay: 7600, initialPay: 79900 },
      { title: "Pharmacist", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Radiographer", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Lab Technician", level: "L-8", gradePay: 2800, initialPay: 26300 },
      { title: "Senior Specialist", level: "L-19", gradePay: 7600, initialPay: 79900 }
    ]
  },
  {
    name: "Agriculture Department",
    posts: [
      { title: "Agriculture Supervisor", level: "L-5", gradePay: 2400, initialPay: 20800 },
      { title: "Asst. Agriculture Officer", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "Agriculture Officer", level: "L-14", gradePay: 5400, initialPay: 56100 },
      { title: "Agriculture Research Officer", level: "L-14", gradePay: 5400, initialPay: 56100 },
      { title: "Asst. Ag. Research Officer", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Additional Director", level: "L-21", gradePay: 8700, initialPay: 123100 }
    ]
  },
  {
    name: "Revenue Department",
    posts: [
      { title: "Patwari", level: "L-5", gradePay: 2400, initialPay: 20800 },
      { title: "Tehsil Revenue Accountant", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Naib Tehsildar", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "Tehsildar", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Sadar Kanoongo", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "Inspector Land Records", level: "L-10", gradePay: 3600, initialPay: 33800 }
    ]
  },
  {
    name: "Finance (Accounts Service)",
    posts: [
      { title: "Junior Accountant", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Asst. Accounts Officer Gr-II", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "Asst. Accounts Officer Gr-I", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Accounts Officer", level: "L-14", gradePay: 5400, initialPay: 56100 },
      { title: "Senior Accounts Officer", level: "L-16", gradePay: 6600, initialPay: 67300 },
      { title: "Chief Accounts Officer", level: "L-19", gradePay: 7600, initialPay: 79900 },
      { title: "Financial Advisor", level: "L-21", gradePay: 8700, initialPay: 123100 }
    ]
  },
  {
    name: "Mines & Geology",
    posts: [
      { title: "Mining Foreman", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "Mining Engineer", level: "L-16", gradePay: 6600, initialPay: 67300 },
      { title: "Asstt. Mining Engineer", level: "L-14", gradePay: 5400, initialPay: 56100 },
      { title: "Superintendent Geologist", level: "L-19", gradePay: 7600, initialPay: 79900 },
      { title: "Director (Mines)", level: "L-24", gradePay: 10000, initialPay: 148800 }
    ]
  },
  {
    name: "Jail Department",
    posts: [
      { title: "Warder / Armourer", level: "L-3", gradePay: 1900, initialPay: 18200, messRate: 2700 },
      { title: "Head Warder", level: "L-8", gradePay: 2400, initialPay: 20800, messRate: 2700 },
      { title: "Deputy Jailor", level: "L-9", gradePay: 2800, initialPay: 26300 },
      { title: "Jailor", level: "L-11", gradePay: 3600, initialPay: 33800 },
      { title: "Deputy Superintendent Jail", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Superintendent Jail Gr-I", level: "L-15", gradePay: 6000, initialPay: 60700 },
      { title: "IG Prisons", level: "L-19", gradePay: 7600, initialPay: 79900 }
    ]
  },
  {
    name: "Animal Husbandary",
    posts: [
      { title: "Livestock Assistant", level: "L-8", gradePay: 2800, initialPay: 26300 },
      { title: "Veterinary Assistant", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Veterinary Officer", level: "L-14", gradePay: 5400, initialPay: 56100 },
      { title: "Senior Veterinary Officer", level: "L-15", gradePay: 6000, initialPay: 60700 },
      { title: "Additional Director", level: "L-20", gradePay: 8200, initialPay: 88900 },
      { title: "Director (Animal Husbandary)", level: "L-21", gradePay: 8700, initialPay: 123100 }
    ]
  },
  {
    name: "Public Works (Building / PWD)",
    posts: [
      { title: "Junior Engineer (L-10)", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Assistant Engineer", level: "L-14", gradePay: 5400, initialPay: 56100 },
      { title: "Executive Engineer", level: "L-16", gradePay: 6600, initialPay: 67300 },
      { title: "Superintending Engineer", level: "L-19", gradePay: 7600, initialPay: 79900 },
      { title: "Additional Chief Engineer", level: "L-21", gradePay: 8700, initialPay: 123100 },
      { title: "Chief Engineer", level: "L-24", gradePay: 10000, initialPay: 148800 }
    ]
  },
  {
    name: "Ground Water Department",
    posts: [
      { title: "Junior Engineer (GW)", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Assistant Engineer (GW)", level: "L-14", gradePay: 5400, initialPay: 56100 },
      { title: "Executive Engineer (GW)", level: "L-16", gradePay: 6600, initialPay: 67300 },
      { title: "Director Survey", level: "L-19", gradePay: 7600, initialPay: 79900 },
      { title: "Chief Engineer (GW)", level: "L-24", gradePay: 10000, initialPay: 148800 }
    ]
  },
  {
    name: "Commercial Taxes",
    posts: [
      { title: "Tax Assistant", level: "L-8", gradePay: 2800, initialPay: 26300 },
      { title: "Junior Commercial Taxes Officer", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Assistant Commercial Taxes Officer", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Commercial Taxes Officer", level: "L-15", gradePay: 6000, initialPay: 60700 },
      { title: "Deputy Commissioner (CT)", level: "L-19", gradePay: 7600, initialPay: 79900 },
      { title: "Additional Commissioner (CT)", level: "L-21", gradePay: 8700, initialPay: 123100 }
    ]
  },
  {
    name: "Sanskrit Education",
    posts: [
      { title: "Teacher", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Sr. Teacher", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "P.T.I Grade-II", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "Lecturer (Sanskrit Edu)", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Deputy Director (Sanskrit)", level: "L-18", gradePay: 7200, initialPay: 75300 },
      { title: "Joint Director (Sanskrit)", level: "L-19", gradePay: 7600, initialPay: 79900 }
    ]
  },
  {
    name: "Excise Department",
    posts: [
      { title: "Sepoy", level: "L-3", gradePay: 1900, initialPay: 18200 },
      { title: "Inspector Grade-II", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Inspector Grade-I", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "Asst. Excise Officer", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "District Excise Officer", level: "L-15", gradePay: 6000, initialPay: 60700 },
      { title: "Additional Commissioner", level: "L-19", gradePay: 7600, initialPay: 79900 }
    ]
  },
  {
    name: "IT & Communication",
    posts: [
      { title: "Informatics Assistant", level: "L-8", gradePay: 2800, initialPay: 26300 },
      { title: "Assistant Programmer", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Programmer", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Analyst-Cum-Programmer (DD)", level: "L-16", gradePay: 6600, initialPay: 67300 },
      { title: "System Analyst (JD)", level: "L-18", gradePay: 7200, initialPay: 75300 },
      { title: "Technical Director", level: "L-21", gradePay: 8700, initialPay: 123100 }
    ]
  },
  {
    name: "Social Justice & Empowerment",
    posts: [
      { title: "Assistant Superintendent (Hostel)", level: "L-5", gradePay: 2400, initialPay: 20800 },
      { title: "Probation & Prison Welfare Officer", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "District Children Officer", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Assistant Director", level: "L-14", gradePay: 5400, initialPay: 56100 },
      { title: "Deputy Director", level: "L-15", gradePay: 6000, initialPay: 60700 },
      { title: "Additional Director", level: "L-19", gradePay: 7600, initialPay: 79900 }
    ]
  },
  {
    name: "Town Planning",
    posts: [
      { title: "Survey Assistant", level: "L-5", gradePay: 2400, initialPay: 20800 },
      { title: "Town Planning Assistant", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "Assistant Town Planner", level: "L-14", gradePay: 5400, initialPay: 56100 },
      { title: "Deputy Town Planner", level: "L-16", gradePay: 6600, initialPay: 67300 },
      { title: "Senior Town Planner", level: "L-19", gradePay: 7600, initialPay: 79900 },
      { title: "Chief Town Planner", level: "L-24", gradePay: 10000, initialPay: 148800 }
    ]
  },
  {
    name: "Co-Operative Department",
    posts: [
      { title: "Inspector Grade-II", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Inspector Grade-I", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "Assistant Registrar", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Deputy Registrar", level: "L-15", gradePay: 6000, initialPay: 60700 },
      { title: "Joint Registrar", level: "L-17", gradePay: 6800, initialPay: 71000 },
      { title: "Additional Registrar", level: "L-19", gradePay: 7600, initialPay: 79900 }
    ]
  },
  {
    name: "Forest Department",
    posts: [
      { title: "Forest Guard", level: "L-4", gradePay: 2000, initialPay: 19200 },
      { title: "Forester", level: "L-8", gradePay: 2800, initialPay: 26300 },
      { title: "Ranger Grade-II", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Ranger Grade-I", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "ACF", level: "L-14", gradePay: 5400, initialPay: 56100 },
      { title: "DCF", level: "L-16", gradePay: 6600, initialPay: 67300 }
    ]
  },
  {
    name: "Police Department",
    posts: [
      { title: "Constable", level: "L-5", gradePay: 2400, initialPay: 20800, messRate: 2700 },
      { title: "Head Constable", level: "L-8", gradePay: 2800, initialPay: 26300, messRate: 2700 },
      { title: "ASI", level: "L-10", gradePay: 3600, initialPay: 33800, messRate: 2700 },
      { title: "SI", level: "L-11", gradePay: 4200, initialPay: 37800, messRate: 2700 },
      { title: "Inspector", level: "L-12", gradePay: 4800, initialPay: 44300, messRate: 2700 },
      { title: "Dy. SP", level: "L-14", gradePay: 5400, initialPay: 56100 }
    ]
  },
  {
    name: "Transport Department",
    posts: [
      { title: "Motor Vehicle Sub Inspector", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Motor Vehicle Inspector", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "District Transport Officer", level: "L-14", gradePay: 5400, initialPay: 56100 },
      { title: "RTO", level: "L-16", gradePay: 6600, initialPay: 67300 }
    ]
  },
  {
    name: "Tourism Department",
    posts: [
      { title: "Tourist Officer", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Asst. Director (Tourism)", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Deputy Director (Tourism)", level: "L-15", gradePay: 6000, initialPay: 60700 },
      { title: "Director (Tourism)", level: "L-21", gradePay: 8700, initialPay: 123100 }
    ]
  },
  {
    name: "Statistics Department",
    posts: [
      { title: "Computor", level: "L-5", gradePay: 2400, initialPay: 20800 },
      { title: "Statistical Assistant", level: "L-8", gradePay: 2800, initialPay: 26300 },
      { title: "ASO", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "Statistical Officer", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Assistant Director (Stats)", level: "L-14", gradePay: 5400, initialPay: 56100 }
    ]
  },
  {
    name: "Local Self Government",
    posts: [
      { title: "Executive Officer Grade-IV", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Executive Officer Grade-III", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "Executive Officer Grade-II", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Commissioner", level: "L-14", gradePay: 5400, initialPay: 56100 }
    ]
  },
  {
    name: "Public Health Engineering (PHED)",
    posts: [
      { title: "Junior Engineer (PHED)", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Assistant Engineer (PHED)", level: "L-14", gradePay: 5400, initialPay: 56100 },
      { title: "Executive Engineer (PHED)", level: "L-16", gradePay: 6600, initialPay: 67300 },
      { title: "Superintending Engineer (PHED)", level: "L-19", gradePay: 7600, initialPay: 79900 }
    ]
  },
  {
    name: "Water Resources (Irrigation)",
    posts: [
      { title: "Junior Engineer (WR)", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Assistant Engineer (WR)", level: "L-14", gradePay: 5400, initialPay: 56100 },
      { title: "Executive Engineer (WR)", level: "L-16", gradePay: 6600, initialPay: 67300 },
      { title: "Superintending Engineer (WR)", level: "L-19", gradePay: 7600, initialPay: 79900 }
    ]
  },
  {
    name: "Panchayati Raj",
    posts: [
      { title: "Gram Vikas Adhikari (VDO)", level: "L-6", gradePay: 2400, initialPay: 21500 },
      { title: "Panchayat Extension Officer", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Block Development Officer (BDO)", level: "L-14", gradePay: 5400, initialPay: 56100 },
      { title: "CEO Zila Parishad", level: "L-16", gradePay: 6600, initialPay: 67300 }
    ]
  },
  {
    name: "Food & Civil Supplies",
    posts: [
      { title: "Enforcement Inspector", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Enforcement Officer", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "District Supply Officer", level: "L-14", gradePay: 5400, initialPay: 56100 }
    ]
  },
  {
    name: "Industries Department",
    posts: [
      { title: "Industries Extension Officer", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "District Industries Officer", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "General Manager (DIC)", level: "L-15", gradePay: 6000, initialPay: 60700 }
    ]
  },
  {
    name: "Labor Department",
    posts: [
      { title: "Labor Inspector", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Assistant Labor Commissioner", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Deputy Labor Commissioner", level: "L-15", gradePay: 6000, initialPay: 60700 }
    ]
  },
  {
    name: "Employment Department",
    posts: [
      { title: "Junior Employment Officer", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Employment Officer", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "Assistant Director (Employment)", level: "L-12", gradePay: 4800, initialPay: 44300 }
    ]
  },
  {
    name: "Skill & Entrepreneurship",
    posts: [
      { title: "Skill Development Officer", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "District Skill Coordinator", level: "L-11", gradePay: 4200, initialPay: 37800 }
    ]
  },
  {
    name: "Technical Education",
    posts: [
      { title: "Lecturer (Polytechnic)", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "HOD (Polytechnic)", level: "L-15", gradePay: 6000, initialPay: 60700 },
      { title: "Principal (Polytechnic)", level: "L-19", gradePay: 7600, initialPay: 79900 }
    ]
  },
  {
    name: "Higher Education",
    posts: [
      { title: "Assistant Professor", level: "L-10", gradePay: 6000, initialPay: 57700 },
      { title: "Associate Professor", level: "L-13", gradePay: 9000, initialPay: 131400 },
      { title: "Professor", level: "L-14", gradePay: 10000, initialPay: 144200 }
    ]
  },
  {
    name: "College Education",
    posts: [
      { title: "Principal (College)", level: "L-14", gradePay: 10000, initialPay: 144200 },
      { title: "Joint Director (College)", level: "L-15", gradePay: 10000, initialPay: 144200 }
    ]
  },
  {
    name: "Archives Department",
    posts: [
      { title: "Archivist", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Assistant Director (Archives)", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Director (Archives)", level: "L-19", gradePay: 7600, initialPay: 79900 }
    ]
  },
  {
    name: "Archaeology & Museums",
    posts: [
      { title: "Curator", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Superintendent (Archaeology)", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Director (Archaeology)", level: "L-19", gradePay: 7600, initialPay: 79900 }
    ]
  },
  {
    name: "Language & Library",
    posts: [
      { title: "Librarian Grade-III", level: "L-8", gradePay: 2800, initialPay: 26300 },
      { title: "Librarian Grade-II", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Librarian Grade-I", level: "L-11", gradePay: 4200, initialPay: 37800 }
    ]
  },
  {
    name: "Printing & Stationery",
    posts: [
      { title: "Assistant Superintendent (Printing)", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Superintendent (Printing)", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Director (Printing)", level: "L-19", gradePay: 7600, initialPay: 79900 }
    ]
  },
  {
    name: "Information & Public Relations",
    posts: [
      { title: "Assistant Public Relations Officer", level: "L-10", gradePay: 3600, initialPay: 33800 },
      { title: "Public Relations Officer", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Director (IPR)", level: "L-19", gradePay: 7600, initialPay: 79900 }
    ]
  },
  {
    name: "State Insurance & GPF",
    posts: [
      { title: "Assistant Director (SI&GPF)", level: "L-14", gradePay: 5400, initialPay: 56100 },
      { title: "Deputy Director (SI&GPF)", level: "L-15", gradePay: 6000, initialPay: 60700 },
      { title: "Director (SI&GPF)", level: "L-21", gradePay: 8700, initialPay: 123100 }
    ]
  },
  {
    name: "Pension Department",
    posts: [
      { title: "Assistant Director (Pension)", level: "L-14", gradePay: 5400, initialPay: 56100 },
      { title: "Director (Pension)", level: "L-21", gradePay: 8700, initialPay: 123100 }
    ]
  },
  {
    name: "Treasuries & Accounts",
    posts: [
      { title: "Treasury Officer", level: "L-14", gradePay: 5400, initialPay: 56100 },
      { title: "Director (T&A)", level: "L-21", gradePay: 8700, initialPay: 123100 }
    ]
  },
  {
    name: "Evaluation Department",
    posts: [
      { title: "Evaluation Officer", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Director (Evaluation)", level: "L-19", gradePay: 7600, initialPay: 79900 }
    ]
  },
  {
    name: "Economic & Statistics",
    posts: [
      { title: "Statistical Officer (E&S)", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Director (E&S)", level: "L-21", gradePay: 8700, initialPay: 123100 }
    ]
  },
  {
    name: "Women & Child Development",
    posts: [
      { title: "Supervisor (WCD)", level: "L-7", gradePay: 2400, initialPay: 22400 },
      { title: "CDPO", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "Assistant Director (WCD)", level: "L-14", gradePay: 5400, initialPay: 56100 }
    ]
  },
  {
    name: "Minority Affairs",
    posts: [
      { title: "Minority Welfare Officer", level: "L-11", gradePay: 4200, initialPay: 37800 },
      { title: "Director (Minority)", level: "L-19", gradePay: 7600, initialPay: 79900 }
    ]
  },
  {
    name: "Tribal Area Development",
    posts: [
      { title: "Project Officer (TAD)", level: "L-12", gradePay: 4800, initialPay: 44300 },
      { title: "Commissioner (TAD)", level: "L-21", gradePay: 8700, initialPay: 123100 }
    ]
  },
  {
    name: "Specially Abled Persons",
    posts: [
      { title: "Assistant Director (SAP)", level: "L-14", gradePay: 5400, initialPay: 56100 },
      { title: "Director (SAP)", level: "L-19", gradePay: 7600, initialPay: 79900 }
    ]
  },
  {
    name: "Child Rights",
    posts: [
      { title: "Assistant Director (Child Rights)", level: "L-14", gradePay: 5400, initialPay: 56100 },
      { title: "Director (Child Rights)", level: "L-19", gradePay: 7600, initialPay: 79900 }
    ]
  }
];

export const MAJOR_CITIES = [
  { name: 'Jaipur', category: 'Y' },
  { name: 'Jodhpur', category: 'Y' },
  { name: 'Bikaner', category: 'Y' },
  { name: 'Ajmer', category: 'Y' },
  { name: 'Kota', category: 'Y' },
  { name: 'Other Cities', category: 'Z' }
];

export const getHraRate = (category: 'Y' | 'Z', daRate: number): number => {
  if (category === 'Y') return daRate >= 50 ? 20 : 18;
  return daRate >= 50 ? 10 : 9;
};

export const getCCARate = (basicPay: number, cityName: string): number => {
  if (cityName === 'Jaipur') return basicPay <= 23100 ? 620 : 1000;
  const yCategoryCities = ['Bikaner', 'Jodhpur', 'Kota', 'Ajmer'];
  if (yCategoryCities.includes(cityName)) return basicPay <= 23100 ? 320 : 620;
  return 0;
};

export const NPA_PERCENT = 0.20; 
export const WASH_ALLOWANCE_FIXED = 180;

export const RGHS_SLABS = [
  { maxPay: 18000, rate: 265 },
  { maxPay: 33500, rate: 440 },
  { maxPay: 54000, rate: 658 },
  { maxPay: Infinity, rate: 875 }
];

export const SI_SLABS = [
  { minPay: 1, maxPay: 22000, rate: 800 },
  { minPay: 22001, maxPay: 28500, rate: 1200 },
  { minPay: 28501, maxPay: 46500, rate: 2200 },
  { minPay: 46501, maxPay: 72000, rate: 3000 },
  { minPay: 72001, maxPay: Infinity, rate: 5000 },
  { minPay: Infinity, maxPay: Infinity, rate: 7000 }
];

export const GPF_SLABS = [
  { maxPay: 23100, rate: 1450 },
  { maxPay: 28500, rate: 1625 },
  { maxPay: 38500, rate: 2100 },
  { maxPay: 51500, rate: 2850 },
  { maxPay: 62000, rate: 3575 },
  { maxPay: 72000, rate: 4200 },
  { maxPay: 80000, rate: 4800 },
  { maxPay: 116000, rate: 6150 },
  { maxPay: 167000, rate: 8900 },
  { maxPay: Infinity, rate: 10500 }
];
