import { MapContext } from "../types/MapContext";

class ContextManager {

    private static instance: ContextManager | undefined = undefined;
    private mapContext: MapContext;

    constructor() {
        this.mapContext = {GOOGLE_MAPS_API_KEY: "AIzaSyCH5HU39ZEV23tpeK-8UMQx02UyXFhMG8Y"};
    }

    public static getInstance(): ContextManager {
        // Check if an instance already exists.
        // If not, create one.
        if (ContextManager.instance === undefined) {
            ContextManager.instance = new ContextManager();
        }
        // Return the instance.
        return ContextManager.instance;
    }

    public getContext(): MapContext {
        return this.mapContext;
    }
}

export default ContextManager