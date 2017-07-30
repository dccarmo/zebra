import * as checkdigit from "checkdigit";

import { bankName } from "../constants/banks";
import { baseDay, baseMonth, baseYear } from "../constants/dates";
import { segmentName } from "../constants/segments";

interface Boleto {
    barcode: string;
    title: string|null;
    paid: boolean;
}

export enum BoletoType {
    Bank,
    Collection,
}

export function getType(boleto: Boleto): BoletoType {
    if (boleto.barcode.charAt(0) === "8") {
        return BoletoType.Collection;
    }

    return BoletoType.Bank;
}

export function getTypeableLine(boleto: Boleto): string {
    let seqs: string[];

    if (getType(boleto) === BoletoType.Collection) {
        seqs = getCollectionTypeableLineSeqs(boleto.barcode);
    } else {
        seqs = getBankTypeableLineSeq(boleto.barcode);
    }

    return seqs.reduce((typeableLine, seq) => typeableLine + seq);
}

export function getTypeableLineSeqs(boleto: Boleto): string[] {
    if (getType(boleto) === BoletoType.Collection) {
        return getCollectionTypeableLineSeqs(boleto.barcode);
    }

    return getBankTypeableLineSeq(boleto.barcode);
}

export function getFormattedTypeableLine(boleto: Boleto): string {
    if (getType(boleto) === BoletoType.Collection) {
        const seqs = getCollectionTypeableLineSeqs(boleto.barcode);

        return `${seqs[0]}-${seqs[1]} ${seqs[2]}-${seqs[3]} ${seqs[4]}-${seqs[5]} ${seqs[6]}-${seqs[7]}`;
    }

    const seqs = getBankTypeableLineSeq(boleto.barcode);

    return `${seqs[0]}.${seqs[1]} ${seqs[2]}.${seqs[3]} ${seqs[4]}.${seqs[5]} ${seqs[6]} ${seqs[7]}`;
}

export function getBank(boleto: Boleto): string|null {
    if (getType(boleto) === BoletoType.Collection) {
        return null;
    }

    const code = boleto.barcode.substring(0, 3);

    return bankName(code);
}

export function getSegment(boleto: Boleto): string|null {
    if (getType(boleto) === BoletoType.Bank) {
        return null;
    }

    const code = boleto.barcode.substring(1, 2);

    return segmentName(code);
}

export function getDueDate(boleto: Boleto): Date|null {
    if (getType(boleto) === BoletoType.Collection) {
        return null;
    }

    const dateDelta = Number(boleto.barcode.substring(5, 9));
    const date = new Date(baseYear, baseMonth, baseDay);

    date.setDate(date.getDate() + dateDelta);

    return date;
}

function getCollectionTypeableLineSeqs(barcode: string): string[] {
    const firstSeq = barcode.substring(0, 11);
    const secondSeq = barcode.substring(11, 22);
    const thirdSeq = barcode.substring(22, 33);
    const fourthSeq = barcode.substring(33, 44);

    return [firstSeq,
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
    let firstSeq = barcode.substring(0, 4) + barcode.substring(19, 20) + barcode.substring(20, 24);
    firstSeq += checkdigit.mod10.create(firstSeq);

    let secondSeq = barcode.substring(24, 29) + barcode.substring(29, 34);
    secondSeq += checkdigit.mod10.create(secondSeq);

    let thirdSeq = barcode.substring(34, 39) + barcode.substring(39, 44);
    thirdSeq += checkdigit.mod10.create(thirdSeq);

    const fourthSeq = barcode.substring(4, 5);

    const fifthSeq = barcode.substring(5, 19);

    const typeableLine = [firstSeq,
        secondSeq,
        thirdSeq,
        fourthSeq,
        fifthSeq].reduce((result, seq) => result + seq);

    return [typeableLine.substring(0, 5),
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
