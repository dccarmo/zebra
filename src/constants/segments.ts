export function segmentName(code: string): string|null {
    const selectedSegment = segments.find((segment) => segment.code === code);

    if (selectedSegment) {
        return selectedSegment.name;
    }

    return null;
}

const segments = [
    {
        code: "1",
        name: "Prefeitura",
    },
    {
        code: "2",
        name: "Água",
    },
    {
        code: "3",
        name: "Energia Életrica/Gás",
    },
    {
        code: "4",
        name: "Telefone",
    },
    {
        code: "5",
        name: "Governo",
    },
    {
        code: "6",
        name: "Carnes",
    },
    {
        code: "7",
        name: "Multa",
    },
];
