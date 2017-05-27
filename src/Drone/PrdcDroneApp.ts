import { App, Environment, Suite, LogLevel, requestJson, createRequest } from "protoculture";
import { DroneEnvironment } from "./DroneEnvironment";
import { Drone } from "../Drone";
import { ContentType, Method } from "protoculture/lib/CreateRequest";
import * as Chance from "chance";


export class PrdcDroneApp implements App {

    public readonly name: string = "update";

    public readonly working: boolean = true;

    public suite: Suite;

    protected info: Drone;

    public constructor(protected environment: Environment) {

    }

    public async run() {

        const info: any = await requestJson(`http://freegeoip.net/json`);

        this.info = {
            id: Chance().guid(),
            latitude: info.latitude,
            longitude: info.longitude,
        };

        this.suite.logger.log(JSON.stringify(this.info), this, LogLevel.Info);

        await this.updateMaster();
    }

    protected async updateMaster() {

        this.suite.logger.log("Updating master", this, LogLevel.Info);

        const masterHost = this.environment.MASTER_HOST || "http://localhost:2112";

        this.suite.logger.log(`Connecting to ${masterHost}`, this, LogLevel.Info);

        await createRequest(`${masterHost}/drone`, {
            contentType: ContentType.Json,
            data: this.info,
            method: Method.Post,
        });
    }
}
