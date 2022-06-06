export interface ITipoUsuario {
	id: number;
	nombre: string;
}
export interface ITipoUsuarioPlist {
	id: number;
	nombre: string;
	usuarios: number;
}

export interface ITipoUsuarioPage {
	content: ITipoUsuarioPlist[];
	totalElements: number;
	totalPages: number;
}