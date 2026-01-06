import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Supervisor } from 'engine/types';

export function exportScheduleToExcel(
  supervisors: Supervisor[]
) {
  const days = supervisors[0].timeline.length;

  const data = supervisors.map((s) => {
    const row: Record<string, string> = {
      Supervisor: s.id,
    };

    s.timeline.forEach((state, index) => {
      row[`D${index}`] = state;
    });

    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    'Cronograma'
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  saveAs(
    new Blob([excelBuffer]),
    'cronograma.xlsx'
  );
}
