import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Supervisor } from 'engine/types';

export function exportScheduleToPdf(
  supervisors: Supervisor[]
) {
  const doc = new jsPDF('landscape');

  doc.setFontSize(16);
  doc.text(
    'Cronograma de Supervisores',
    14,
    15
  );

  const days = supervisors[0].timeline.length;

  const head = [
    ['Supervisor', ...Array.from({ length: days }, (_, i) => `D${i}`)],
  ];

  const body = supervisors.map((s) => [
    s.id,
    ...s.timeline,
  ]);

  autoTable(doc, {
    head,
    body,
    startY: 25,
    styles: {
      fontSize: 8,
      halign: 'center',
    },
  });

  doc.save('cronograma.pdf');
}
