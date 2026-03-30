/**
 * PDF Invoice Generator for Zorlu Digital Plaza
 * Uses jsPDF + jspdf-autotable to create downloadable invoice PDFs.
 */

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ── Types ────────────────────────────────────────────────────────────────────

export interface InvoiceItem {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceCustomer {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  customer: InvoiceCustomer;
  items: InvoiceItem[];
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  total: number;
  paymentMethod: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Formats a number as Turkish Lira (e.g. 1.500,00 TL).
 */
function formatTRY(value: number): string {
  const [integer, decimal] = value.toFixed(2).split(".");
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${formattedInteger},${decimal} TL`;
}

/**
 * Generates a unique invoice number in the format ZDPF-2026-XXXXXX.
 */
export function generateInvoiceNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `ZDPF-${year}-${random}`;
}

// ── PDF Generation ───────────────────────────────────────────────────────────

/**
 * Generates a PDF invoice and triggers a browser download.
 */
export function generateInvoice(data: InvoiceData): void {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // ── Company Header ─────────────────────────────────────────────────────
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("ZORLU DIGITAL PLAZA", pageWidth / 2, y, { align: "center" });
  y += 7;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Belediye Bulvari, Kent Plaza, A Blok No:1, Yenikent, Lefkosa, KKTC",
    pageWidth / 2,
    y,
    { align: "center" }
  );
  y += 5;
  doc.text("Tel: 0548 878 31 31", pageWidth / 2, y, { align: "center" });
  y += 8;

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(15, y, pageWidth - 15, y);
  y += 10;

  // ── Invoice Meta ───────────────────────────────────────────────────────
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("FATURA", 15, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Fatura No: ${data.invoiceNumber}`, pageWidth - 15, y, {
    align: "right",
  });
  y += 6;
  doc.text(`Tarih: ${data.date}`, pageWidth - 15, y, { align: "right" });
  y += 10;

  // ── Customer Info ──────────────────────────────────────────────────────
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Musteri Bilgileri", 15, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Ad Soyad: ${data.customer.name}`, 15, y);
  y += 5;
  doc.text(`Telefon: ${data.customer.phone}`, 15, y);
  y += 5;
  doc.text(`E-posta: ${data.customer.email}`, 15, y);
  y += 5;
  doc.text(`Adres: ${data.customer.address}`, 15, y);
  y += 10;

  // ── Items Table ────────────────────────────────────────────────────────
  const tableHeaders = [["Urun", "Adet", "Birim Fiyat", "Toplam"]];
  const tableRows = data.items.map((item) => [
    item.name,
    item.quantity.toString(),
    formatTRY(item.unitPrice),
    formatTRY(item.total),
  ]);

  autoTable(doc, {
    startY: y,
    head: tableHeaders,
    body: tableRows,
    margin: { left: 15, right: 15 },
    headStyles: {
      fillColor: [41, 41, 41],
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: "bold",
    },
    bodyStyles: {
      fontSize: 9,
    },
    columnStyles: {
      0: { cellWidth: "auto" },
      1: { cellWidth: 20, halign: "center" },
      2: { cellWidth: 35, halign: "right" },
      3: { cellWidth: 35, halign: "right" },
    },
    theme: "grid",
  });

  // Get the Y position after the table
  const finalY = (doc as jsPDF & { lastAutoTable: { finalY: number } })
    .lastAutoTable.finalY;
  y = finalY + 10;

  // ── Totals ─────────────────────────────────────────────────────────────
  const totalsX = pageWidth - 15;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Ara Toplam: ${formatTRY(data.subtotal)}`, totalsX, y, {
    align: "right",
  });
  y += 6;
  doc.text(
    `KDV (%${data.vatRate}): ${formatTRY(data.vatAmount)}`,
    totalsX,
    y,
    { align: "right" }
  );
  y += 6;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(`Genel Toplam: ${formatTRY(data.total)}`, totalsX, y, {
    align: "right",
  });
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Odeme Yontemi: ${data.paymentMethod}`, 15, y);
  y += 15;

  // ── Footer ─────────────────────────────────────────────────────────────
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(15, y, pageWidth - 15, y);
  y += 8;

  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "Bu belge elektronik olarak olusturulmustur. / Zorlu Digital Plaza",
    pageWidth / 2,
    y,
    { align: "center" }
  );

  // ── Download ───────────────────────────────────────────────────────────
  doc.save(`${data.invoiceNumber}.pdf`);
}
