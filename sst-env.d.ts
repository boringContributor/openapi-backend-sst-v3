/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "PetsTable": {
      "name": string
      "type": "sst.aws.Dynamo"
    }
    "api": {
      "type": "sst.aws.ApiGatewayV2"
      "url": string
    }
  }
}
export {}
