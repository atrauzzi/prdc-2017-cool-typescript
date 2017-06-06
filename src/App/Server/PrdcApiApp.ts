import { App, Environment, Bundle, LogLevel } from "protoculture";
import { ServerEnvironment } from "./ServerEnvironment";
import * as Hapi from "hapi";
import * as Inert from "inert";
import { Drone, DroneModel } from "../../Domain/Drone";
import * as mongoose from "mongoose";


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

    // Obviously you'd never want to put all of this in a single function...
    public async run() {

        //
        // Data Access Configuration & Boot
        //

        // Mongoose is not batteries-included with promises
        (mongoose as any).Promise = Promise;
        // Convention in nodejs-land to create and hang onto a server reference
        this.mongoose = await mongoose.connect(this.environment.mongodb || "mongodb://localhost/prdc-2017");

        const savedDrones = await DroneModel
            .find()
            .exec();

        // The reduce function on array lets us key the results
        this.drones = savedDrones.reduce((dictionary, currentDrone) => {

            dictionary[currentDrone.id] = currentDrone;

            return dictionary;
        }, {});


        //
        // HTTP Framework Configuration & Boot
        //

        // hapi!
        const server = new Hapi.Server();
        // Inert is a static file server
        await server.register(Inert);

        // Like any server, hapi needs to be told what interface and port to bind to
        server.connection({
            port: this.environment.port || 2112,
            host: "0.0.0.0"
        });

        // hapi uses a rich object structure to delcare routes
        // The awesome part?  Declarations are available from DefinitelyTyped!
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
        // TS team still working out forward inference of type, it's a known issue!
        } as Hapi.RouteConfiguration);

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
        } as Hapi.RouteConfiguration);

        server.route({
            method: "GET",
            path: "/connected",
            handler: (request, reply) => this.connected(request, reply),
            config: {
                log: true,
            },
        } as Hapi.RouteConfiguration);

        // I bet you can guess what this does!
        server.start();
    }

    protected async addDrone(request: Hapi.Request, reply: Hapi.Base_Reply) {

        this.bundle.logger.log("Setting drone metadata", this, LogLevel.Info);

        const drone = new DroneModel(request.payload);

        if (drone) {

            this.bundle.logger.log(drone.toString(), this, LogLevel.Info);
            this.drones[drone.get("id")] = drone;

            await drone.save();
        }

        reply(null);
    }

    protected connected(request: Hapi.Request, reply: Hapi.Base_Reply) {

        this.bundle.logger.log("Checked by a client", this, LogLevel.Info);
        reply(this.drones);
    }
}
