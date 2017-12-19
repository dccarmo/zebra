import { addDays, isThisYear, isWithinRange } from 'date-fns';
import format from 'date-fns/format';
import enLocale from 'date-fns/locale/en';
import ptLocale from 'date-fns/locale/pt';
import { groupBy, map } from 'lodash';
import S from 'string';

import I18n from '../constants/i18n';
import { BoletoListSectionData } from '../screens/BoletoList/List';
import { ItemStateProps } from '../screens/BoletoList/List/Item';

type DateComparison = (l: Date, r: Date) => number;

export function mapNextDaysItemsToSection(
    items: ItemStateProps[],
    startDay: Date,
    days: number,
): BoletoListSectionData | null {
    const nearFutureItems: ItemStateProps[] = items.filter((item) => {
        if (item.dueDate) {
            return isWithinRange(
                item.dueDate,
                startDay,
                addDays(startDay, days),
            );
        } else {
            return false;
        }
    });

    if (nearFutureItems.length === 0) {
        return null;
    }

    return {
        data: nearFutureItems,
        title: I18n.t('boletoListUtils.nearFutureTitle'),
    };
}

export function filterItemsByNotNextDays(
    items: ItemStateProps[],
    startDay: Date,
    days: number,
): ItemStateProps[] {
    return items.filter((item) => {
        if (item.dueDate) {
            return !isWithinRange(
                item.dueDate,
                startDay,
                addDays(startDay, days),
            );
        } else {
            return true;
        }
    });
}

export function mapItemsToMonthlySections(
    items: ItemStateProps[],
): BoletoListSectionData[] {
    const monthlyItems = groupBy(
        items,
        (item) =>
            item.dueDate
                ? `${item.dueDate.getMonth() + item.dueDate.getFullYear()}`
                : '-1',
    );
    const monthlySections = map(monthlyItems, (monthItems) => {
        const dueDate = monthItems[0].dueDate;
        const preferredLanguage: string = I18n.locale;
        let locale: any = ptLocale;

        if (!preferredLanguage.includes('pt')) {
            locale = enLocale;
        }

        if (dueDate) {
            if (!isThisYear(dueDate)) {
                return {
                    data: monthItems,
                    title: S(
                        format(dueDate, 'MMMM YYYY', { locale }),
                    ).capitalize().s,
                };
            }

            return {
                data: monthItems,
                title: S(format(dueDate, 'MMMM', { locale })).capitalize().s,
            };
        }

        return {
            data: monthItems,
            title: I18n.t('boletoListUtils.unknownTitle'),
        };
    });

    return monthlySections;
}

export function sortItems(
    items: ItemStateProps[],
    compare: DateComparison,
): ItemStateProps[] {
    return items.sort((leftItem, rightItem) => {
        if (leftItem.dueDate && rightItem.dueDate) {
            return compare(leftItem.dueDate, rightItem.dueDate);
        }

        if (leftItem.dueDate) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function sortSections(
    sections: BoletoListSectionData[],
    compare: DateComparison,
): BoletoListSectionData[] {
    return sections.sort((leftSection, rightSection) => {
        const leftDueDate = leftSection.data[0].dueDate;
        const rightDueDate = rightSection.data[0].dueDate;

        if (leftDueDate && rightDueDate) {
            return compare(leftDueDate, rightDueDate);
        }

        if (leftDueDate) {
            return 1;
        } else {
            return -1;
        }
    });
}
