import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from 'docx';
import { saveAs } from 'file-saver';
import { Supervisor } from 'engine/types';

export async function exportScheduleToWord(
  supervisors: Supervisor[]
) {
  const days = supervisors[0].timeline.length;

  const headerRow = new TableRow({
    children: [
      new TableCell({ children: [new Paragraph('Supervisor')] }),
      ...Array.from({ length: days }).map(
        (_, i) =>
          new TableCell({
            children: [new Paragraph(`D${i}`)],
          })
      ),
    ],
  });

  const rows = supervisors.map(
    (s) =>
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(s.id)],
          }),
          ...s.timeline.map(
            (state) =>
              new TableCell({
                children: [new Paragraph(state)],
              })
          ),
        ],
      })
  );

  const table = new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows: [headerRow, ...rows],
  });

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: 'Cronograma de Supervisores',
            heading: 'Heading1',
          }),
          table,
        ],
      },
    ],
  });

  const buffer = await Packer.toBlob(doc);
  saveAs(buffer, 'cronograma.docx');
}
