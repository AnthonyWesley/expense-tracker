import { RecordType } from "../type/RecordType";

class DateHelpers {
  getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}`;
  };

  filterListByMonth = (list: RecordType[], date: string): RecordType[] => {
    let newList: RecordType[] = [];
    let [year, month] = date.split("-");

    for (let i in list) {
      if (
        list[i]?.date.getFullYear() === parseInt(year) &&
        list[i]?.date.getMonth() + 1 === parseInt(month)
      ) {
        newList.push(list[i]);
      }
    }

    newList.sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });

    return newList;
  };

  addZeroToDate = (number: number): string =>
    number < 10 ? `0${number}` : `${number}`;

  formatCurrentMonth = (currentMonth: string): string => {
    let [year, month] = currentMonth.split("-");
    let months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return `${months[parseInt(month) - 1]} de ${year}`;
  };

  newDateAdjusted = (dateField: string) => {
    const [year, month, day] = dateField.split("-");
    const adjustedDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );

    return adjustedDate;
  };

  formatDate = (date: Date, yearFirst?: boolean): string => {
    let year = date?.getFullYear();
    let month = date?.getMonth();
    let day = date?.getDate();
    if (yearFirst) {
      return `${year}-${this.addZeroToDate(month + 1)}-${this.addZeroToDate(
        day
      )}`;
    } else {
      return `${this.addZeroToDate(day)}/${this.addZeroToDate(
        month + 1
      )}/${year}`;
    }
  };

  initialDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
}

export const dateHelpers = new DateHelpers();
