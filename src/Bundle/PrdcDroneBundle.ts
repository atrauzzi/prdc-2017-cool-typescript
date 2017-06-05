import { Bundle, App, ConsoleServiceProvider } from "protoculture";
import { PrdcDroneServiceProvider } from "../App/Drone/ServiceProvider";


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
bundle.run().catch(console.error);
