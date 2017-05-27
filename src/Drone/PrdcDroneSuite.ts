import { Suite, App, ConsoleServiceProvider } from "protoculture";
import { PrdcDroneServiceProvider } from "./PrdcDroneServiceProvider";


export class PrdcDroneSuite extends Suite {
    
    name: string = "bootcamp-drone";

    protected get serviceProviders() {
        
        return [
            ConsoleServiceProvider,
            PrdcDroneServiceProvider,
        ];
    }
}

const suite = new PrdcDroneSuite();
suite.run().catch((error) => console.error(error));
