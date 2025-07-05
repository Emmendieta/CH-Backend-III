import { Router } from "express";
import setupPolicies from "../middlewares/setupPolicies.mid.js";
import setupResponses from "../middlewares/setupResponses.mid.js";

class RouterHelper {
    constructor() {
        this.router = Router();
        this.use(setupResponses); 
    };

    getRouter = () => this.router;

    //Funcion que aplica todas las logicas que se repiten pero para API:
    applyMiddlewares = (middlewares) => middlewares.map((mid) => async(req, res, next) => {
        try {
            await mid(req, res, next);
        } catch (error) {
            next(error);
        }
    });

    //Funcion para Renderizar:
    applyMiddlewaresRender = (middlewaresRender) => middlewaresRender.map(midRender => async(req, res, next) => {
        try {
            
        } catch (error) {
            res.status(error.statusCode || 500).render("error", { error });
        }
    });

    /*Metodos CRUD */
    //Create:
    create = (path, policies, ...middlewares) => this.router.post(path, setupPolicies(policies), this.applyMiddlewares(middlewares));
    //Read:
    read = (path, policies, ...middlewares) => this.router.get(path, setupPolicies(policies), this.applyMiddlewares(middlewares));
    //Update:
    update = (path, policies, ...middlewares) => this.router.get(path, setupPolicies(policies), this.applyMiddlewares(middlewares));
    //Delete:
    destroy = (path, policies, ...middlewares) => this.router.delete(path, setupPolicies(policies), this.applyMiddlewares(middlewares));
    /*Fin de metodos CRUD */
    //Use:
    use = (path, ...middlewares) => this.router.use(path, this.applyMiddlewares(middlewares));
    //Render:
    render = (path, policies, ...middlewaresRender) => this.router.get(path, setupPolicies(policies), this.applyMiddlewaresRender(middlewaresRender));
};

export default RouterHelper;
