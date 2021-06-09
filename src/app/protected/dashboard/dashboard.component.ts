import { Component } from '@angular/core';

import {
  AfterViewInit,
  ChangeDetectorRef,
   ComponentRef,
  Inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as wjcCore from '@grapecity/wijmo';
import { DynamicComponentService } from '../../services/dynamic-component.service';
import { palette } from '../../protected/app.palette';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit  {
  title = 'Dynamic Dashboard';

  icons = {
    principal: `
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-display" viewBox="0 0 16 16">
  <path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4c0 .667.083 1.167.25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75c.167-.333.25-.833.25-1.5H2s-2 0-2-2V4zm1.398-.855a.758.758 0 0 0-.254.302A1.46 1.46 0 0 0 1 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 0 0 .254-.302 1.464 1.464 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 0 0-.302-.254A1.46 1.46 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145z"/>
  </svg>
    `,
    reporteFacturas: `
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
    <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path fill-rule="evenodd" d="M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
  </svg>
    `,
    visualizarEstadisticas: `
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-file-bar-graph-fill" viewBox="0 0 16 16">
    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 11.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1z"/>
  </svg>
    `,
    cambiarContrasena: `
    <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" class="bi bi-key-fill" viewBox="0 0 16 16">
    <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
  </svg>
    `,
    misDatos: `
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-credit-card-2-front-fill" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
  </svg>,
    `,
   emitidas: `
   <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-cursor-fill" viewBox="0 0 16 16">
   <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
   </svg>     
    `,
   recibidas: `
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
    </svg>
    `,
    otrasConfig: `
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
    </svg>
    `,
  };

  isWideMenu = false;

  widgets = [
    { id: 'Grid', title: 'Principal', icon: this.icons.principal },
    { id: 'Emitidas', title: 'Cargar facturas emitidas', icon: this.icons.emitidas },
    { id: 'Recibidas', title: 'Cargar facturas recibidas', icon: this.icons.recibidas },
    { id: 'ReporteFacturas', title: 'Reporte de facturas', icon: this.icons.reporteFacturas },
    { id: 'VisualizarEstadisticas', title: 'Visualizar estadísticas', icon: this.icons.visualizarEstadisticas },
    { id: 'MisDatos', title: 'Mis datos', icon: this.icons.misDatos },
    { id: 'CambiarContraseña', title: 'Cambiar contraseña', icon: this.icons.cambiarContrasena },
    { id: 'OtrasConfig', title: 'Otras configuraciones', icon: this.icons.otrasConfig },
  ];

  @ViewChild('dynCompContainer', { read: ViewContainerRef }) compContainer: ViewContainerRef;

  private compService: DynamicComponentService;
  private cdr: ChangeDetectorRef;

  private dragSource = null;
  private dropTarget = null;

  constructor(
    @Inject(DynamicComponentService)
    compService: DynamicComponentService,
    cdr: ChangeDetectorRef,
    sanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService
  ) {
    this.compService = compService;
    this.cdr = cdr;
    this.widgets = this.widgets.map((widget) => ({
      ...widget,
      icon:  sanitizer.bypassSecurityTrustHtml(widget.icon)
    })) as any;
  }

  get usuario(){
     return this.authService.usuario;
  }

  logout(){
    this.router.navigateByUrl('/auth/login')
    this.authService.logout();
  }

  ngAfterViewInit() {
    let cmp: ComponentRef<any>;
    [1, 2, 5, 7, 0].forEach((element) => {
      cmp = this.compService.createDynaComp(this.compContainer, this.widgets[element].title);
    });
    this.cdr.detectChanges();
  }

  addTile(tileType: string) {
    this.compService.createDynaComp(this.compContainer, tileType);
  }

  toggleMenu() {
    this.isWideMenu = !this.isWideMenu;
  }

  handleTile(e: any) {
    const target = e.target;
    const button = wjcCore.closest(target, '.button');
    const tile = wjcCore.closest(target, '.tile');
    if (!tile || !button) return;
    const idx = this.getIndex(tile);
    this.compService.removeComp(this.compContainer, idx);
  }

  dragstart(e: any) {
    const target = wjcCore.closest(e.target, '.tile');
    if (target) {
      this.dragSource = target;
      wjcCore.addClass(this.dragSource, 'drag-source');
      const dt = e.dataTransfer;
      dt.effectAllowed = 'move';
      dt.setData('text', this.dragSource.innerHTML);
    }
  }

  dragover(e: any) {
    if (this.dragSource) {
      let tile = wjcCore.closest(e.target, '.tile');
      if (tile === this.dragSource) {
        tile = null;
      }
      if (this.dragSource && tile && tile !== this.dragSource) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      }
      if (this.dropTarget !== tile) {
        wjcCore.removeClass(this.dropTarget, 'drag-over');
        this.dropTarget = tile;
        wjcCore.addClass(this.dropTarget, 'drag-over');
      }
    }
  }

  drop(e: any) {
    if (this.dragSource && this.dropTarget) {
      e.stopPropagation();
      e.stopImmediatePropagation();
      e.preventDefault();
      const srcIndex = this.getIndex(this.dragSource);
      const dstIndex = this.getIndex(this.dropTarget);
      this.compService.moveComp(this.compContainer, srcIndex, dstIndex);
      // invalidate Wijmo controls after layout updates
      wjcCore.Control.invalidateAll();
    }
  }

  dragend(e: any) {
    wjcCore.removeClass(this.dragSource, 'drag-source');
    wjcCore.removeClass(this.dropTarget, 'drag-over');
    this.dragSource = this.dropTarget = null;
  }

  getIndex(e) {
    const p = e.parentElement;
    for (let i = 0; i < p.children.length; i++) {
      if (p.children[i] === e) return i;
    }
    return -1;
  }
  

}
