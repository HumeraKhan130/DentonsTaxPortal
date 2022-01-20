import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import * as strings from 'TriggerFlowWebPartStrings';
import TriggerFlow from './components/TriggerFlow';
import { ITriggerFlowProps } from './components/ITriggerFlowProps';




export default class TriggerFlowWebPart extends BaseClientSideWebPart<ITriggerFlowProps> {

    
  public render(): void {
    const element: React.ReactElement<ITriggerFlowProps> = React.createElement(
      TriggerFlow,
      {
        context:this.context,
        currentUser:this.context.pageContext.user.displayName,
        currentUserEmail:this.context.pageContext.user.email,
        ImageUrl:this.properties.ImageUrl,
        FlowUrl:this.properties.FlowUrl
      
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

    private textBoxValidationMethod(value:string): string{
      if(value.length < 5){ return "The label should be more than 5 characters";}
      else {return ""; }
      
    }

    protected get disableReactivePropertyChanges(): boolean {
      return true;
    }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          //header: {
           // description: strings.sendEmailButtonLabel
         // },
          groups: [
            {
              groupName: strings.PropertyPaneHeading,
             groupFields: [
               
                PropertyPaneTextField('ImageUrl', {
                  label: strings.PropertyPaneImageUrl,
                  multiline:false,
                  resizable:false,
                  value:"https://bdocollab.sharepoint.com/sites/SPFX_Test_humeraK/siteassets/sitepages/admin/notify.jpeg",
                  //onGetErrorMessage: this.textBoxValidationMethod,
                  //errorMessage: "This is error message",
                  //deferredValidationTime: 5000,
                  placeholder:strings.PropertyPaneImageUrlText

                }),
                PropertyPaneTextField('FlowUrl', {
                  label: strings.PropertyPaneFlowUrl,
                  multiline:false,
                  resizable:false,
                  value:"https://prod-30.canadacentral.logic.azure.com:443/workflows/279c2d97db5b487d85fdbcb28d548421/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=NvmI4zJHeJbc095IymjsoF8vmpIaHrMqqOQJI5PXOJU",
                  placeholder:strings.PropertyPaneFlowUrlText

                })
              ]
            }
          ]
        }
      ]
    };
  }
}
