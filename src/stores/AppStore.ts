import Boleto from "../models/Boleto";

interface Store {
    data: {
        boletos: [Boleto];
    };
}

export default Store;
