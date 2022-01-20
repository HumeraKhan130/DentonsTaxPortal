import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITriggerFlowProps {
  context:WebPartContext;
  currentUser: string;
  currentUserEmail:string;
  ImageUrl:string;
  FlowUrl:string;
}
