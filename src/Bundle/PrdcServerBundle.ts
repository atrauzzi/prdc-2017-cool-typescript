import { Bundle, App, ConsoleServiceProvider } from "protoculture";
import { PrdcServerServiceProvider } from "../App/Server/ServiceProvider";


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
bundle.run().catch(console.error);
