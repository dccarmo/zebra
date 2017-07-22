import * as checkdigit from "checkdigit";

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
    if (getBoletoType(boleto) === BoletoType.Collection) {
        const seqs = getCollectionTypeableLineSeqs(boleto.barCode);

        return seqs[0]
        + seqs[1]
        + seqs[2]
        + seqs[3];
    }

    const seqs = getBankTypeableLineSeq(boleto.barCode);

    return seqs[0]
    + seqs[1]
    + seqs[2]
    + seqs[3]
    + seqs[4];
}

function getCollectionTypeableLineSeqs(barCode: string): [string] {
    let firstSeq = barCode.substring(0, 11);
    firstSeq += checkdigit.mod10.create(firstSeq);

    let secondSeq = barCode.substring(11, 22);
    secondSeq += checkdigit.mod10.create(secondSeq);

    let thirdSeq = barCode.substring(22, 33);
    thirdSeq += checkdigit.mod10.create(thirdSeq);

    let fourthSeq = barCode.substring(33, 44);
    fourthSeq += checkdigit.mod10.create(fourthSeq);

    return [firstSeq, secondSeq, thirdSeq, fourthSeq];
}

function getBankTypeableLineSeq(barCode: string): [string] {
    let firstSeq = barCode.substring(0, 4) + barCode.substring(19, 20) + barCode.substring(20, 24);
    firstSeq += checkdigit.mod10.create(firstSeq);

    let secondSeq = barCode.substring(24, 29) + barCode.substring(29, 34);
    secondSeq += checkdigit.mod10.create(secondSeq);

    let thirdSeq = barCode.substring(34, 39) + barCode.substring(39, 44);
    thirdSeq += checkdigit.mod10.create(thirdSeq);

    const fourthSeq = barCode.substring(4, 5);

    const fifthSeq = barCode.substring(5, 19);

    return [firstSeq, secondSeq, thirdSeq, fourthSeq, fifthSeq];
}

export default Boleto;
