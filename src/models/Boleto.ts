import * as checkdigit from 'checkdigit';

import { baseDay, baseMonth, baseYear } from '../constants';
import { bankName } from '../constants/banks';
import { segmentName } from '../constants/segments';

interface Boleto {
    barcode: string;
    dateAdded: number;
    title: string | null;
    paid: boolean;
    reminderId: string | null;
}

export enum BoletoType {
    Bank,
    Collection,
}

export function getTitle(boleto: Boleto): string | null {
    if (boleto.title) {
        return boleto.title;
    }

    if (getBarcodeType(boleto.barcode) === BoletoType.Bank) {
        return getBarcodeBank(boleto.barcode);
    }

    return getBarcodeSegment(boleto.barcode);
}

export function getBarcodeType(barcode: string): BoletoType {
    if (barcode.charAt(0) === '8') {
        return BoletoType.Collection;
    }

    return BoletoType.Bank;
}

export function getTypeableLine(barcode: string): string {
    let seqs: string[];

    if (getBarcodeType(barcode) === BoletoType.Collection) {
        seqs = getCollectionTypeableLineSeqs(barcode);
    } else {
        seqs = getBankTypeableLineSeq(barcode);
    }

    return seqs.reduce((typeableLine, seq) => typeableLine + seq);
}

export function getTypeableLineSeqs(barcode: string): string[] {
    if (getBarcodeType(barcode) === BoletoType.Collection) {
        return getCollectionTypeableLineSeqs(barcode);
    }

    return getBankTypeableLineSeq(barcode);
}

export function getFormattedTypeableLine(barcode: string): string {
    let seqs = getCollectionTypeableLineSeqs(barcode);

    if (getBarcodeType(barcode) === BoletoType.Collection) {
        return `${seqs[0]}-${seqs[1]} ${seqs[2]}-${seqs[3]} ${seqs[4]}-${
            seqs[5]
        } ${seqs[6]}-${seqs[7]}`;
    }

    seqs = getBankTypeableLineSeq(barcode);

    return `${seqs[0]}.${seqs[1]} ${seqs[2]}.${seqs[3]} ${seqs[4]}.${seqs[5]} ${
        seqs[6]
    } ${seqs[7]}`;
}

export function getBarcodeBank(barcode: string): string | null {
    if (getBarcodeType(barcode) === BoletoType.Collection) {
        return null;
    }

    const code = barcode.substring(0, 3);

    return bankName(code);
}

export function getBarcodeSegment(barcode: string): string | null {
    if (getBarcodeType(barcode) === BoletoType.Bank) {
        return null;
    }

    const code = barcode.substring(1, 2);

    return segmentName(code);
}

export function getBarcodeDueDate(barcode: string): Date | null {
    if (getBarcodeType(barcode) === BoletoType.Collection) {
        return null;
    }

    const dateDelta = Number(barcode.substring(5, 9));
    const date = new Date(baseYear, baseMonth, baseDay);

    date.setDate(date.getDate() + dateDelta);

    return date;
}

export function getBarcodeAmount(barcode: string): number {
    let amount: string;

    if (getBarcodeType(barcode) === BoletoType.Collection) {
        amount = `${barcode.substring(4, 13)}.${barcode.substring(13, 15)}`;
    } else {
        amount = `${barcode.substring(9, 17)}.${barcode.substring(17, 19)}`;
    }

    return Number(amount);
}

function getCollectionTypeableLineSeqs(barcode: string): string[] {
    const firstSeq = barcode.substring(0, 11);
    const secondSeq = barcode.substring(11, 22);
    const thirdSeq = barcode.substring(22, 33);
    const fourthSeq = barcode.substring(33, 44);

    return [
        firstSeq,
        checkdigit.mod10.create(firstSeq),
        secondSeq,
        checkdigit.mod10.create(secondSeq),
        thirdSeq,
        checkdigit.mod10.create(thirdSeq),
        fourthSeq,
        checkdigit.mod10.create(fourthSeq),
    ];
}

function getBankTypeableLineSeq(barcode: string): string[] {
    let firstSeq =
        barcode.substring(0, 4) +
        barcode.substring(19, 20) +
        barcode.substring(20, 24);
    firstSeq += checkdigit.mod10.create(firstSeq);

    let secondSeq = barcode.substring(24, 29) + barcode.substring(29, 34);
    secondSeq += checkdigit.mod10.create(secondSeq);

    let thirdSeq = barcode.substring(34, 39) + barcode.substring(39, 44);
    thirdSeq += checkdigit.mod10.create(thirdSeq);

    const fourthSeq = barcode.substring(4, 5);

    const fifthSeq = barcode.substring(5, 19);

    const typeableLine = [
        firstSeq,
        secondSeq,
        thirdSeq,
        fourthSeq,
        fifthSeq,
    ].reduce((result, seq) => result + seq);

    return [
        typeableLine.substring(0, 5),
        typeableLine.substring(5, 10),
        typeableLine.substring(10, 15),
        typeableLine.substring(15, 21),
        typeableLine.substring(21, 26),
        typeableLine.substring(26, 32),
        typeableLine.substring(32, 33),
        typeableLine.substring(33, 47),
    ];
}

export default Boleto;
