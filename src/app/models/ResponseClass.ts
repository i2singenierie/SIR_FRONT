export class ResponseClass {

    public constructor(
        private _ID?: number,
        private _PKD?: number,
        private _PKF?: number,
        private _ROUTE_NAME?: string,
        private _ROUTE_GEOMETRY?: string,
        private _GEOM1?: string,
        private _GEOM2?: string,
        private _STATUS?: number,
        private _COMMENTAIRE?: string,
        private _X1?: number,
        private _Y1?: number,
        private _X2?: number,
        private _Y2?: number,
        private _REF1?: number,
        private _AUTRES?: string
    ) { }

    public get ID() {
        return this._ID;
    }
    public set ID(ee) {
        this._ID = ee;
    }


    public get PKD() {
        return this._PKD;
    }

    public set PKD(ee) {
        this._PKD = ee;
    }


    public get PKF() {
        return this._PKF;
    }

    public set PKF(ee) {
        this._PKF = ee;
    }


    public get ROUTE_NAME() {
        return this._ROUTE_NAME;
    }

    public set ROUTE_NAME(ee) {
        this._ROUTE_NAME = ee;
    }
    public get ROUTE_GEOMETRY() {
        return this._ROUTE_GEOMETRY;
    }

    public set ROUTE_GEOMETRY(ee) {
        this._ROUTE_GEOMETRY = ee;
    }
    public get GEOM1() {
        return this._GEOM1;
    }

    public set GEOM1(ee) {
        this._GEOM1 = ee;
    }
    public get GEOM2() {
        return this._GEOM2;
    }

    public set GEOM2(ee) {
        this._GEOM2 = ee;
    }


    public get STATUS() {
        return this._STATUS;
    }

    public set STATUS(ee) {
        this._STATUS = ee;
    }


    public get COMMENTAIRE() {
        return this._COMMENTAIRE;
    }

    public set COMMENTAIRE(ee) {
        this._COMMENTAIRE = ee;
    }


    public get X1() {
        return this._X1;
    }

    public set X1(ee) {
        this._X1 = ee;
    }
    public get X2() {
        return this._X2;
    }

    public set X2(ee) {
        this._X2 = ee;
    }
    public get Y1() {
        return this._Y1;
    }

    public set Y1(ee) {
        this._Y1 = ee;
    }


    public get Y2() {
        return this._Y2;
    }

    public set Y2(ee) {
        this._Y2 = ee;
    }
    public get REF1() {
        return this._REF1;
    }

    public set REF1(ee) {
        this._REF1 = ee;
    }
    public get AUTRES() {
        return this._AUTRES;
    }

    public set AUTRES(ee) {
        this._AUTRES = ee;
    }


}


