import { addDays, isThisYear, isWithinRange } from "date-fns";
import format from "date-fns/format";
import ptLocale from "date-fns/locale/pt";
import { groupBy, map } from "lodash";
import S from "string";

import { ItemStateProps } from "../screens/BoletoList/Item";
import { BoletoListSectionData } from "../screens/BoletoList/List";

type DateComparison = (l: Date, r: Date) => number;

export function mapNextDaysItemsToSection(
    items: ItemStateProps[],
    startDay: Date,
    days: number,
): BoletoListSectionData {
    const nearFutureItems: ItemStateProps[] = items
    .filter((item) => {
        if (item.dueDate) {
            return isWithinRange(item.dueDate, startDay, addDays(startDay, days));
        } else {
            return false;
        }
    });

    return {
        data: nearFutureItems,
        title: "Próximos 7 dias",
    };
}

export function filterItemsByNotNextDays(
    items: ItemStateProps[],
    startDay: Date,
    days: number,
): ItemStateProps[] {
    return items
    .filter((item) => {
        if (item.dueDate) {
            return !isWithinRange(item.dueDate, startDay, addDays(startDay, days));
        } else {
            return true;
        }
    });
}

export function mapItemsToMonthlySections(items: ItemStateProps[]): BoletoListSectionData[] {
    const monthlyItems = groupBy(items, (item) => (
        item.dueDate ? `${item.dueDate.getMonth() + item.dueDate.getFullYear()}` : "-1"
    ));
    const monthlySections = map(monthlyItems, (monthItems) => {
        const dueDate = monthItems[0].dueDate;

        if (dueDate) {
            if (!isThisYear(dueDate)) {
                return {
                    data: monthItems,
                    title: S(format(dueDate, "MMMM YYYY", { locale: ptLocale })).capitalize().s,
                };
            }

            return {
                data: monthItems,
                title: S(format(dueDate, "MMMM", { locale: ptLocale })).capitalize().s,
            };
        }

        return {
            data: monthItems,
            title: "Desconhecido",
        };
    });

    return monthlySections;
}

export function sortItems(items: ItemStateProps[], compare: DateComparison): ItemStateProps[] {
    return items
    .sort((leftItem, rightItem) => {
        if (leftItem.dueDate && rightItem.dueDate) {
            return (compare(leftItem.dueDate, rightItem.dueDate));
        }

        if (leftItem.dueDate) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function sortSections(sections: BoletoListSectionData[], compare: DateComparison): BoletoListSectionData[] {
    return sections
    .sort((leftSection, rightSection) => {
        const leftDueDate = leftSection.data[0].dueDate;
        const rightDueDate = rightSection.data[0].dueDate;

        if (leftDueDate && rightDueDate) {
            return (compare(leftDueDate, rightDueDate));
        }

        if (leftDueDate) {
            return 1;
        } else {
            return -1;
        }
    });
}
