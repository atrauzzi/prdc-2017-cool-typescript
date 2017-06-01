import { Bundle, App, WebServiceProvider, ReduxServiceProvider } from "protoculture";
import { PrdcWebAppServiceProvider } from "./PrdcWebAppServiceProvider";


export class PrdcWebAppBundle extends Bundle {

    public name = "bootcamp-2017-webapp";

    protected get serviceProviders() {

        return [
            WebServiceProvider,
            PrdcWebAppServiceProvider,
        ];
    }
}

const bundle = new PrdcWebAppBundle();
bundle.run().catch(console.error);
