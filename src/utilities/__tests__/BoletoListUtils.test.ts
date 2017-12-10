import { addDays, compareDesc, startOfDay, subDays } from 'date-fns';

import { ItemStateProps } from '../../screens/BoletoList/Item';
import { BoletoListSectionData } from '../../screens/BoletoList/List';
import {
    filterItemsByNotNextDays,
    mapItemsToMonthlySections,
    mapNextDaysItemsToSection,
    sortItems,
    sortSections,
} from '../BoletoListUtils';

function createItem(dueDate: Date | null): ItemStateProps {
    return {
        amount: '',
        barcode: '',
        dueDate,
        paid: true,
        title: '',
    };
}

const startDay = startOfDay(new Date(2017, 10, 22));

const mockNextDaysItems: ItemStateProps[] = [
    createItem(addDays(startDay, 4)),
    createItem(addDays(startDay, 5)),
];

const mockNextDayItemsSession: BoletoListSectionData = {
    data: mockNextDaysItems,
    title: 'Próximos 7 dias',
};

const mockNotNextDaysItems: ItemStateProps[] = [
    createItem(subDays(startDay, 60)),
    createItem(subDays(startDay, 15)),
    createItem(null),
    createItem(subDays(startDay, 3)),
    createItem(subDays(startDay, 20)),
    createItem(addDays(startDay, 30)),
    createItem(null),
];

const mockSortedNotNextDaysItems: ItemStateProps[] = [
    createItem(null),
    createItem(null),
    createItem(addDays(startDay, 30)),
    createItem(subDays(startDay, 3)),
    createItem(subDays(startDay, 15)),
    createItem(subDays(startDay, 20)),
    createItem(subDays(startDay, 60)),
];

const mockItems: ItemStateProps[] = [
    ...mockNextDaysItems,
    ...mockNotNextDaysItems,
];

const mockMonthlySections: BoletoListSectionData[] = [
    {
        data: [createItem(subDays(startDay, 60))],
        title: 'Setembro',
    },
    {
        data: [
            ...mockNextDaysItems,
            createItem(subDays(startDay, 15)),
            createItem(subDays(startDay, 3)),
            createItem(subDays(startDay, 20)),
        ],
        title: 'Novembro',
    },
    {
        data: [createItem(addDays(startDay, 30))],
        title: 'Dezembro',
    },
    {
        data: [createItem(null), createItem(null)],
        title: 'Desconhecido',
    },
];

const mockSortedMonthlySections: BoletoListSectionData[] = [
    {
        data: [createItem(null), createItem(null)],
        title: 'Desconhecido',
    },
    {
        data: [createItem(addDays(startDay, 30))],
        title: 'Dezembro',
    },
    {
        data: [
            ...mockNextDaysItems,
            createItem(subDays(startDay, 15)),
            createItem(subDays(startDay, 3)),
            createItem(subDays(startDay, 20)),
        ],
        title: 'Novembro',
    },
    {
        data: [createItem(subDays(startDay, 60))],
        title: 'Setembro',
    },
];

describe('Boleto List Utilities', () => {
    it('should filter items by not being in the next 7 days', () => {
        expect(filterItemsByNotNextDays(mockItems, startDay, 7)).toEqual(
            mockNotNextDaysItems,
        );
    });

    it('should map items to monthly sections', () => {
        expect(mapItemsToMonthlySections(mockItems)).toEqual(
            mockMonthlySections,
        );
    });

    it('should return an empty map no items', () => {
        expect(mapItemsToMonthlySections([])).toEqual([]);
    });

    it('should map items in the next 7 days to a section', () => {
        expect(mapNextDaysItemsToSection(mockItems, startDay, 7)).toEqual(
            mockNextDayItemsSession,
        );
    });

    it('should return null no items', () => {
        expect(mapNextDaysItemsToSection([], startDay, 7)).toEqual(null);
    });

    it('should return null no near future items', () => {
        expect(
            mapNextDaysItemsToSection(mockNotNextDaysItems, startDay, 7),
        ).toEqual(null);
    });

    it('should sort items', () => {
        expect(sortItems(mockNotNextDaysItems, compareDesc)).toEqual(
            mockSortedNotNextDaysItems,
        );
    });

    it('should sort sections', () => {
        expect(sortSections(mockMonthlySections, compareDesc)).toEqual(
            mockSortedMonthlySections,
        );
    });
});
