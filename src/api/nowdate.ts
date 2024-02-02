export function nowdate() {
    const today = new Date();
    const formattedYear = today.getFullYear().toString().slice(-2);
    const formattedMonth = (today.getMonth() + 1).toString().padStart(2, '0');
    const formattedDate = today.getDate().toString().padStart(2, '0');
    const formattedHour = today.getHours().toString().padStart(2, '0');
    const formattedMinute = today.getMinutes().toString().padStart(2, '0');
    const formattedSecond = today.getSeconds().toString().padStart(2, '0');
    const formattedFull = `${formattedYear}Y ${formattedMonth}M ${formattedDate}D ${formattedHour}H ${formattedMinute}M ${formattedSecond}S`;
  
    return formattedFull;
  }