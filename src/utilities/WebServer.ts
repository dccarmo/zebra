import StaticServer from 'react-native-static-server';

import { escapeRegExp } from 'lodash';
import webView from '../constants/webView';
import Boleto, {
    BoletoType,
    getBarcodeAmount,
    getBarcodeBank,
    getBarcodeDueDate,
    getBarcodeSegment,
    getBarcodeType,
    getFormattedTypeableLine,
} from '../models/Boleto';
import { formatAmount, formatDate } from './FormatUtils';

function replaceAll(str: string, find: string, replace: string): string {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

class WebServer extends StaticServer {
    serveBoleto(boleto: Boleto) {
        let hydratedWebView = webView;

        if (boleto.title) {
            hydratedWebView = replaceAll(
                hydratedWebView,
                '%@TITLE@%',
                boleto.title,
            );
        } else {
            hydratedWebView = replaceAll(
                hydratedWebView,
                '%@TITLE@%',
                'Sem Título',
            );
        }

        const segment = getBarcodeSegment(boleto.barcode);

        if (
            segment &&
            getBarcodeType(boleto.barcode) === BoletoType.Collection
        ) {
            hydratedWebView = replaceAll(
                hydratedWebView,
                '%@SEGMENT@%',
                segment,
            );
        } else {
            hydratedWebView = replaceAll(hydratedWebView, '%@SEGMENT@%', '-');
        }

        const bank = getBarcodeBank(boleto.barcode);

        if (bank && getBarcodeType(boleto.barcode) === BoletoType.Bank) {
            hydratedWebView = replaceAll(hydratedWebView, '%@BANK@%', bank);
        } else {
            hydratedWebView = replaceAll(hydratedWebView, '%@BANK@%', '-');
        }

        const dueDate = getBarcodeDueDate(boleto.barcode);

        if (dueDate && getBarcodeType(boleto.barcode) === BoletoType.Bank) {
            hydratedWebView = replaceAll(
                hydratedWebView,
                '%@DUE-DATE@%',
                formatDate(dueDate),
            );
        } else {
            hydratedWebView = replaceAll(hydratedWebView, '%@DUE-DATE@%', '-');
        }

        hydratedWebView = replaceAll(
            hydratedWebView,
            '%@AMOUNT@%',
            `${formatAmount(getBarcodeAmount(boleto.barcode))}`,
        );
        hydratedWebView = replaceAll(
            hydratedWebView,
            '%@FORMATTED-TYPEABLE-LINE@%',
            getFormattedTypeableLine(boleto.barcode),
        );
        hydratedWebView = replaceAll(
            hydratedWebView,
            '%@BAR-CODE@%',
            boleto.barcode,
        );

        super.setHtml(hydratedWebView);
    }

    start(): Promise<string> {
        return super.start({ port: 1337 });
    }
}

export const webServer = new WebServer();
