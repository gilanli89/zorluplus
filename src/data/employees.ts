import type { Branch } from "@/types/leave";

export interface Employee {
  id: number;
  fullName: string;
  title?: string;
  branch?: Branch;
  isAdmin: boolean;
  annualLeave: number;
}

export const admins: Employee[] = [
  { id: 903,  fullName: "Halil Kavaz",         isAdmin: true,  annualLeave: 14 },
  { id: 7934, fullName: "Deniz Bisikletçiler",  isAdmin: true,  annualLeave: 14 },
];

export const employees: Employee[] = [
  { id: 7929, fullName: "Çisem Özdoğan",        isAdmin: false, annualLeave: 14, title: "Store Manager", branch: "Lefkoşa" },
  { id: 7930, fullName: "Mustafa Özdoğan",      isAdmin: false, annualLeave: 14, title: "Sales Representative", branch: "Lefkoşa" },
  { id: 7931, fullName: "Dilfuza Jumakova",     isAdmin: false, annualLeave: 14, title: "Sales Representative", branch: "Lefkoşa" },
  { id: 7932, fullName: "Serkan Taras",         isAdmin: false, annualLeave: 14, title: "Store Manager", branch: "Mağusa" },
  { id: 7936, fullName: "Alaaeddin Erdemci",    isAdmin: false, annualLeave: 14, title: "White Goods Chef" },
  { id: 7937, fullName: "Ramazan Koshayev",     isAdmin: false, annualLeave: 14 },
  { id: 7938, fullName: "Suhrap Alimov",        isAdmin: false, annualLeave: 14 },
  { id: 7939, fullName: "Çakır Recepov",        isAdmin: false, annualLeave: 14, title: "TV Technician" },
  { id: 7940, fullName: "Bilal Muhammed",       isAdmin: false, annualLeave: 14, title: "TV Technician" },
  { id: 7941, fullName: "Abed Azbaki",          isAdmin: false, annualLeave: 14, title: "Air Conditioning Technician" },
  { id: 7942, fullName: "Umit Rozyev",          isAdmin: false, annualLeave: 14, title: "TV Technician" },
  { id: 9174, fullName: "Karetta",              isAdmin: false, annualLeave: 999 },
];

export const allUsers = [...admins, ...employees];
