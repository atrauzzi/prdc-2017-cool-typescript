import { ServiceProvider, symbols } from "protoculture";
import { PrdcMapApp } from "./PrdcMapApp";
import { webAppSymbols } from "./index";


export class PrdcWebAppServiceProvider extends ServiceProvider {

    public async boot() {

        this.suite.container.rebind(symbols.Environment)
            .toConstantValue({});

        this.bindApp(PrdcMapApp);
        this.bindConstructorParameter(symbols.Environment, PrdcMapApp, 0);
    }
}
