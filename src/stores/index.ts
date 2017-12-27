import { NavigationState } from 'react-navigation';

import Boleto from '../models/Boleto';
import Reminder from '../models/Reminder';
import WebServerInfo from '../models/WebServerInfo';

export interface BoletoStore {
    allBarcodes: string[];
    byBarcode: { [_: string]: Boleto };
}

export interface ReminderStore {
    allIds: string[];
    byId: { [_: string]: Reminder };
}

export interface AppStore {
    boletos: BoletoStore;
    navigation: NavigationState;
    reminders: ReminderStore;
    webServerInfo: WebServerInfo;
}
