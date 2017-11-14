import StaticServer from "react-native-static-server";
import Boleto from "../models/Boleto";

class WebServer extends StaticServer {
    serveBoleto(boleto: Boleto) {
        super.setHtml(boleto.barcode);
    }

    start(): Promise<string> {
        return super.start({port: 1337});
    }
}

export const webServer = new WebServer();
