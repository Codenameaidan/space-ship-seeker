export class SpaceXLaunch{
    static_fire_date_utc?: Date;
    static_fire_date_unix?: number;
    tdb?: boolean;
    net?: boolean;
    window?: number;
    rocket?: string;
    success?: boolean;
    failures?: any[];
    details?: string;
    crew?: any[];
    ships?: any[];
    capsules?: string[];
    payloads?: string[];
    launchpad?: string;
    auto_update?: boolean;
    flight_number?: number;
    name?: string;
    date_utc?: Date;
    date_unix?: number;
    date_local?: Date;
    date_precision?: string;
    upcoming?: boolean;
    id?: string;
}