import * as accounting from 'accounting';
import { isToday, isTomorrow } from 'date-fns';
import format from 'date-fns/format';
import ptLocale from 'date-fns/locale/pt';

import I18n from '../constants/i18n';

export const currencySettings = {
    decimal: ',',
    symbol: 'R$',
    thousand: '.',
};

export function formatAmount(amount: number): string {
    return `${accounting.formatMoney(amount, currencySettings)}`;
}

export function formatDate(date: Date): string {
    if (isToday(date)) {
        return I18n.t('global.today');
    }

    if (isTomorrow(date)) {
        return I18n.t('global.tomorrow');
    }

    return format(date, 'D/MM/YYYY', { locale: ptLocale });
}
