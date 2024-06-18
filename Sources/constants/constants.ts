//PARTIE CONSTANTE DE L'URL DE L'API
//adapter le port en fonction de celui proposé lors du lancement de l'api
// export const CURRENT_BASE_URL: string = "https://codefirst.iut.uca.fr/containers/DevGarden-devgardenapi/api";
export const CURRENT_BASE_URL: string = "https://localhost:7260/api";

//CONSTANTE POUR LE STUB
//true si l'on veut le Stub, false pour le Service lié à l'API
export const IS_STUB: boolean = false;

export const PLATFORMS = {
    GITHUB: "github",
    GITLAB: "gitlab",
    GITEA: "gitea",
}

export interface GitAuthProps {
    onLinkStatusChange: (isLinked: boolean) => void;
}