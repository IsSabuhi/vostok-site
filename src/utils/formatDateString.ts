export function formatDateString(inputDate: string) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяцы начинаются с 0, поэтому добавляем 1
    const year = date.getFullYear();
  
    return `${day}.${month}.${year}`;
}