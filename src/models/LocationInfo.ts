export class Observatory_with_location{ //This part is the actual object we'll interact with
    id?:           string;
    longitude?: number[];
    latitude?: number[];
}


//All these interfaces are needed for parsing the weird JSON that the NASA API returns.
export interface RootObject {
    Result: Result;
}

export interface Result{
    StatusCode: string;
    StatusSubCode: string;
    Data: any[];
}

export interface LocationInfo {
    Id?:           string;
    Coordinates?:  Coordinate[];
    
    //Time?:         Date[];
    //RadialLength?: string[];
}

export interface Coordinate {
    //CoordinateSystem?: string;
    //X?:                string[];
    //Y?:                string[];
    //Z?:                string[];
    Latitude?:         any[];
    Longitude?:        any[];
    //LocalTime?:        string[];
}
