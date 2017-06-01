import { Bundle, App, ConsoleServiceProvider } from "protoculture";
import { PrdcServerServiceProvider } from "./PrdcServerServiceProvider";


export class PrdcServerBundle extends Bundle {

    public name = "bootcamp-server";

    protected get serviceProviders() {

        return [
            ConsoleServiceProvider,
            PrdcServerServiceProvider,
        ];
    }
}

const bundle = new PrdcServerBundle();
// tslint:disable-next-line:no-console
bundle.run().catch((error) => console.error(error));
