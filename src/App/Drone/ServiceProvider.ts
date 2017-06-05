import { ServiceProvider, symbols } from "protoculture";
import { PrdcDroneApp } from "./PrdcDroneApp";


export class PrdcDroneServiceProvider extends ServiceProvider {

    public async boot() {

        this.bindApp(PrdcDroneApp);
        this.bindConstructorParameter(symbols.Environment, PrdcDroneApp, 0);
    }
}