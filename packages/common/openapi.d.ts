import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        export interface Pet {
            id: string;
            type: "cat" | "dog";
            name?: string;
        }
    }
}
declare namespace Paths {
    namespace CreatePet {
        export type RequestBody = Components.Schemas.Pet;
        namespace Responses {
            export type $200 = Components.Schemas.Pet;
        }
    }
    namespace GetPetById {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Pet;
        }
    }
    namespace GetPets {
        namespace Responses {
            export type $200 = Components.Schemas.Pet[];
        }
    }
}

export interface OperationMethods {
  /**
   * getPets - Returns all pets from the system that the user has access to
   */
  'getPets'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPets.Responses.$200>
  /**
   * createPet - Creates a new pet in the store
   */
  'createPet'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreatePet.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreatePet.Responses.$200>
  /**
   * getPetById - Returns a pet based on its unique ID
   */
  'getPetById'(
    parameters?: Parameters<Paths.GetPetById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetPetById.Responses.$200>
}

export interface PathsDictionary {
  ['/api/pets']: {
    /**
     * createPet - Creates a new pet in the store
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreatePet.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreatePet.Responses.$200>
    /**
     * getPets - Returns all pets from the system that the user has access to
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPets.Responses.$200>
  }
  ['/api/pets/{id}']: {
    /**
     * getPetById - Returns a pet based on its unique ID
     */
    'get'(
      parameters?: Parameters<Paths.GetPetById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetPetById.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

