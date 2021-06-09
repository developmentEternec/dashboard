export interface AuthResponse {
    ok: boolean;
    get_id?: string;
    get_RazonSocial?: string;
    get_RfcEmpresa?: string;
    get_tipoEmpresa?: string;
    get_direccion?:string
    get_correo?: string;
    get_password: string;
    token?: string;
    msg?: string;    
}
   
export interface Usuario {
    get_RazonSocial?: string;
    get_RfcEmpresa?: string;
    get_tipoEmpresa?: string;
    get_direccion?:string
    token?: string;
    msg?: string;    
}



