import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as wjcCore from '@grapecity/wijmo';
import { DynamicComponentService } from './services/dynamic-component.service';
import { palette } from '../app/protected/app.palette';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
 
  constructor(){

  }
}
