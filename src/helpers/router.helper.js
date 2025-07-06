import { Router } from "express";
import setupPolicies from "../middlewares/setupPolicies.js";
import setupResponses from "../middlewares/setupResponse.js";

class RouterHelper {
    constructor() {
        this.router = Router();
        this.use(setupResponses) // Falta esto
    };

    getRouter = () => this.router;

    //Funcion que aplica todfas las lógicas que se repiten pero para API:

    applyMiddlewares = (middlewares) => middlewares.map((mid) => async(req, res, next) => {
        try {
            await mid(req, res, next);
        } catch (error) {
            next(error);
        }
    });

    //Funcion para Renderizar:

    applyMiddlewaresRender = (middlewaresRender) => middlewaresRender.map(midRend => async(req, res, next) => {
        try {
            await midRend(req, res, next);
        } catch (error) {
            res.status(error.statusCode || 500).render("error", { error });
        }
    });

    /* Métodos CRUD */
    create = (path, policies, ...middlewares) => this.router.post(path, setupPolicies(policies), this.applyMiddlewares(middlewares));
    //Read:
    read = (path, policies, ...middlewares) => this.router.get(path, setupPolicies(policies), this.applyMiddlewares(middlewares)); 
    //Update:
    update = (path, policies, ...middlewares) => this.router.put(path, setupPolicies(policies), this.applyMiddlewares(middlewares));
    //Delete:
    destroy = (path, policies, ...middlewares) => this.router.delete(path, setupPolicies(policies), this.applyMiddlewares(middlewares));
    /* Fin de Métodos CRUD */
    //Use:
    use = (path, ...middlewares) => this.router.use(path, this.applyMiddlewares(middlewares));
    //Render:
    render = (path, policies, ...middlewaresRender) => this.router.get(path, setupPolicies(policies), this.applyMiddlewaresRender(middlewaresRender));

};

export default RouterHelper;