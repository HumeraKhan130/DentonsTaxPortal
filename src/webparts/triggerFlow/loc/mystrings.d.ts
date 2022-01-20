declare interface ITriggerFlowWebPartStrings {
  sendEmailButtonLabel: string;
  confirmLabel:string;
  confirmMessage:string;
  confirmYesLabel:string;
  confirmCancelLabel:string;
  PropertyPaneHeading:string;
  PropertyPaneImageUrl:string;
  PropertyPaneImageUrlText:string;
  PropertyPaneFlowUrl:string;
  PropertyPaneFlowUrlText:string;

}

declare module 'TriggerFlowWebPartStrings' {
  const strings: ITriggerFlowWebPartStrings;
  export = strings;
}
