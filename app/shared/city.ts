import { LatLngLiteral } from '@agm/core'

export class City {
    id: number;
    name: string;
    stateId: number;

}

export class LatLngWrapp implements LatLngLiteral {
    public lat: number;
    public lng: number;
}

