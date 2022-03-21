export interface ObservatoryResponse {
    Observatory: any[];
}

export interface Observatory {
    Id:                 string;
    Name:               string;
    Resolution:         string;
    StartTime:          Date;
    EndTime:            any[];
    Geometry:           string;
    TrajectoryGeometry: string;
    ResourceId:         string;
    GroupId?:           string[] | string;
}