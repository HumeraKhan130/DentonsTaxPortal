import * as React from 'react';
import styles from './TriggerFlow.module.scss';
import { ITriggerFlowProps } from './ITriggerFlowProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IHttpClientOptions, HttpClientResponse, HttpClient } from '@microsoft/sp-http';
import * as strings from 'TriggerFlowWebPartStrings'; 
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css



export default class TriggerFlow extends React.Component<ITriggerFlowProps, {}> {

  private _locale: string;

  constructor(props: ITriggerFlowProps, state: {}){
    super(props);
    this.state = ({
      showDialog: true,
     
    });

    this.triggerFlow = this.triggerFlow.bind(this);
  }


  public render(): React.ReactElement<ITriggerFlowProps> {
    
    return (
    <div className={ styles.triggerFlow }>
      <div className={ styles.container }>
        <div className={ styles.row }>
           
              <a  id="TriggerFlow" onClick={ ()=> this._emailButtonClicked() }> 
                <img className={styles.image}  src={this.props.ImageUrl == undefined ? this.props.context.pageContext.site.absoluteUrl+"/siteassets/notify.jpeg" : this.props.ImageUrl}></img>
                <span className= {styles.span}>{strings.sendEmailButtonLabel}</span>
              </a>
        </div>
        <div className={ styles.row }>
                <div id='statusDiv' className={styles.statusDiv} hidden >
                          <p id='inProcess' hidden >Sending </p>
                          <p id='completeProcess' hidden>Email has been sent to all partners.</p>
                </div>
        </div>

      </div>
     
         
  </div> 
      
    );
  }

 
  
  private _emailButtonClicked(): void { 

    confirmAlert({
      title: strings.confirmLabel,
      message: strings.confirmMessage,
      buttons: [
        {
          label: strings.confirmYesLabel,
          onClick: () => this.triggerFlow()
        },
        {
          label: strings.confirmCancelLabel,
          onClick: () => console.log('Click No')
        }
      ]
    
    } );

 
  
  }

  private triggerFlow(): Promise<HttpClientResponse> {
    
      document.getElementById('statusDiv').style.display = "block";
      document.getElementById('inProcess').style.display = "block";

      const postURL = this.props.FlowUrl;
      const body: string = JSON.stringify({
        'DisplayName': this.props.currentUser,
        'Email':this.props.currentUserEmail
      });
   
      const requestHeaders: Headers = new Headers();
      requestHeaders.append('Content-type', 'application/json');
   
      const httpClientOptions: IHttpClientOptions = {
        body: body,
        headers: requestHeaders
      };
   
      return this.props.context.httpClient.post(
        postURL,
        HttpClient.configurations.v1,
        httpClientOptions)
          .then((response: HttpClientResponse): Promise<HttpClientResponse> => {
              document.getElementById('completeProcess').style.display = "block";
              return response.json();
          });
          
        
      }
      

    
}
