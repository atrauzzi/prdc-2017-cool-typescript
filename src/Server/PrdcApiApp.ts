import { App, Environment, Bundle, LogLevel } from "protoculture";
import { ServerEnvironment } from "./ServerEnvironment";
import * as Hapi from "hapi";
import * as Inert from "inert";
import { Drone, DroneModel } from "../Drone";
import * as mongoose from "mongoose";


// ToDo: Procotulture: Configurable project root path (http vs filesystem! relative?)
export class PrdcApiApp implements App {

    public readonly name: string = "api";

    public readonly working: boolean = true;

    public bundle: Bundle;

    protected mongoose: mongoose.Connection;

    protected drones: {[key: string]: mongoose.Document};

    public constructor(
        protected environment: Environment
    ) {

        this.drones = {};
    }

    public async run() {

        (mongoose as any).Promise = Promise;
        this.mongoose = await mongoose.connect("mongodb://localhost/prdc-2017");

        const server = new Hapi.Server();

        await server.register(Inert);
        server.connection({
            port: this.environment.port || 2112,
            host: "0.0.0.0"
        });

        server.route({
            method: "GET",
            path: "/{param*}",
            config: {
                log: true,
            },
            handler: {
                directory: {
                    path: `${__dirname}/public/`,
                    redirectToSlash: true,
                    index: "index.html"
                }
            }
        });

        server.route({
            method: "POST",
            path: "/drone",
            handler: (request, reply) => this.addDrone(request, reply),
            config: {
                payload: {
                    output: "data",
                    parse: true,
                },
            },
        });

        server.route({
            method: "GET",
            path: "/connected",
            handler: (request, reply) => this.connected(request, reply),
            config: {
                log: true,
            },
        });

        server.start();
    }

    protected addDrone(request: Hapi.Request, reply: Hapi.Base_Reply) {

        this.bundle.logger.log("Setting drone metadata", this, LogLevel.Info);

        const drone = new DroneModel(request.payload);

        if (drone) {

            this.bundle.logger.log(drone.toString(), this, LogLevel.Info);
            this.drones[drone.get("id")] = drone;

            drone.save();
        }

        reply(null);
    }

    protected connected(request: Hapi.Request, reply: Hapi.Base_Reply) {

        this.bundle.logger.log("Checked by a client", this, LogLevel.Info);
        reply(this.drones);
    }
}
