import { Bundle, App, ConsoleServiceProvider } from "protoculture";
import { PrdcDroneServiceProvider } from "./PrdcDroneServiceProvider";


export class PrdcDroneBundle extends Bundle {

    public name = "bootcamp-drone";

    protected get serviceProviders() {

        return [
            ConsoleServiceProvider,
            PrdcDroneServiceProvider,
        ];
    }
}

const bundle = new PrdcDroneBundle();
// tslint:disable-next-line:no-console
bundle.run().catch((error) => console.error(error));
