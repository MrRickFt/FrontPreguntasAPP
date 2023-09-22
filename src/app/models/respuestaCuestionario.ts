import { Injectable } from "@angular/core";
import { RespuestaCuestionarioDetalle } from "./respuestaCuestionarioDetalle";

@Injectable({
    providedIn: 'root'
})

export class RespuestaCuestionario {
    cuestionarioId?: number;
    nombreParticipante: any;
    listRtaCuestionarioDetalle?: RespuestaCuestionarioDetalle[];
    fecha?: any;
    id?:any;
}