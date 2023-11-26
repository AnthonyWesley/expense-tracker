import { ItemType } from "@/type/ItemType";

export class DateHelpers {
  getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}`;
  };

  filterListByMonth = (list: ItemType[], date: string): ItemType[] => {
    let newList: ItemType[] = [];
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

  formatDate = (date: Date): string => {
    let year = date?.getFullYear();
    let month = date?.getMonth() + 1;
    let day = date?.getDate();

    return `${this.addZeroToDate(day)}/${this.addZeroToDate(month)}/${year}`;
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
}
