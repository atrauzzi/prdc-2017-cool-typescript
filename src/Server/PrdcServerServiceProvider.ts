import { ServiceProvider, symbols } from "protoculture";
import { PrdcApiApp } from "./PrdcApiApp";
import {serverSymbols} from "./index";


export class PrdcServerServiceProvider extends ServiceProvider {

    public async boot() {

        this.bindApp(PrdcApiApp);
        this.bindConstructorParameter(symbols.Environment, PrdcApiApp, 0);
    }
}
