import { Suite, App, ConsoleServiceProvider } from "protoculture";
import { PrdcServerServiceProvider } from "./PrdcServerServiceProvider";


export class PrdcServerSuite extends Suite {

    public name = "bootcamp-server";

    protected get serviceProviders() {

        return [
            ConsoleServiceProvider,
            PrdcServerServiceProvider,
        ];
    }
}

const suite = new PrdcServerSuite();
suite.run().catch((error) => console.error(error));
