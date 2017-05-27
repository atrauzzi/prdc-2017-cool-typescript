import { Suite, App, WebServiceProvider, ReduxServiceProvider } from "protoculture";
import { PrdcWebAppServiceProvider } from "./PrdcWebAppServiceProvider";


export class PrdcWebAppSuite extends Suite {
    
    name: string = "bootcamp-2017-webapp";

    protected get serviceProviders() {
        
        return [
            WebServiceProvider,
            PrdcWebAppServiceProvider,
        ];
    }
}

const suite = new PrdcWebAppSuite();
suite.run();
