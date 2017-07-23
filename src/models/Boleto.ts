import * as checkdigit from "checkdigit";

import { bankName } from "../constants/banks";
import { segmentName } from "../constants/segments";

interface Boleto {
    barCode: string;
    title?: string;
}

export enum BoletoType {
    Bank,
    Collection,
}

export function getBoletoType(boleto: Boleto): BoletoType {
    if (boleto.barCode.charAt(0) === "8") {
        return BoletoType.Collection;
    }

    return BoletoType.Bank;
}

export function getBoletoTypeableLine(boleto: Boleto): string {
    let seqs: string[];

    if (getBoletoType(boleto) === BoletoType.Collection) {
        seqs = getCollectionTypeableLineSeqs(boleto.barCode);
    } else {
        seqs = getBankTypeableLineSeq(boleto.barCode);
    }

    return seqs.reduce((typeableLine, seq) => typeableLine + seq);
}

export function getBoletoTypeableLineSeqs(boleto: Boleto): string[] {
    if (getBoletoType(boleto) === BoletoType.Collection) {
        return getCollectionTypeableLineSeqs(boleto.barCode);
    }

    return getBankTypeableLineSeq(boleto.barCode);
}

export function getFormattedTypeableLine(boleto: Boleto): string {
    if (getBoletoType(boleto) === BoletoType.Collection) {
        const seqs = getCollectionTypeableLineSeqs(boleto.barCode);

        return `${seqs[0]}-${seqs[1]} ${seqs[2]}-${seqs[3]} ${seqs[4]}-${seqs[5]} ${seqs[6]}-${seqs[7]}`;
    }

    const seqs = getBankTypeableLineSeq(boleto.barCode);

    return `${seqs[0]}.${seqs[1]} ${seqs[2]}.${seqs[3]} ${seqs[4]}.${seqs[5]} ${seqs[6]} ${seqs[7]}`;
}

export function getBank(boleto: Boleto): string {
    const code = boleto.barCode.substring(0, 3);

    return bankName(code);
}

export function getSegment(boleto: Boleto): string {
    const code = boleto.barCode.substring(1, 2);

    return segmentName(code);
}

function getCollectionTypeableLineSeqs(barCode: string): string[] {
    const firstSeq = barCode.substring(0, 11);
    const secondSeq = barCode.substring(11, 22);
    const thirdSeq = barCode.substring(22, 33);
    const fourthSeq = barCode.substring(33, 44);

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

function getBankTypeableLineSeq(barCode: string): string[] {
    let firstSeq = barCode.substring(0, 4) + barCode.substring(19, 20) + barCode.substring(20, 24);
    firstSeq += checkdigit.mod10.create(firstSeq);

    let secondSeq = barCode.substring(24, 29) + barCode.substring(29, 34);
    secondSeq += checkdigit.mod10.create(secondSeq);

    let thirdSeq = barCode.substring(34, 39) + barCode.substring(39, 44);
    thirdSeq += checkdigit.mod10.create(thirdSeq);

    const fourthSeq = barCode.substring(4, 5);

    const fifthSeq = barCode.substring(5, 19);

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
