import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { AutoFocusModule } from 'primeng/autofocus';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { Item } from '../../../models/Item';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'item-insert',
  imports: [FormsModule, 
            ButtonModule, 
            InputTextModule, 
            PanelModule, 
            AutoFocusModule,
            TableModule,
            DialogModule, 
            ToggleButtonModule],
  template: `
  <button pButton icon="pi pi-plus" label="Novo Pedido" (click)="displayDialog = true"></button>

  <p-dialog [(visible)]="displayDialog" header="Gerenciar Item">
      <div class="flex flex-col gap-2">
          <label>Nome:</label>
          <input pInputText [(ngModel)]="item.nome">
      </div>
      <div class="flex flex-col gap-2">
          <label>Preço:</label>
          <input pInputText type="text" [(ngModel)]="item.preco">
      </div>
      <div class="flex flex-col gap-2">
          <label>Quantidade</label>
          <input pInputText type="number" [(ngModel)]="item.quantidade">
      </div>
      <div class="flex flex-col gap-2">
          <label>Confirmação</label>
          <p-togglebutton 
            disabled="false" 
            size="small"
            onIcon="pi pi-check"
            offIcon="pi pi-times" 
            [(ngModel)]="item.ativo"
            onLabel="Sim" 
            offLabel="Não" 
            styleClass="w-full sm:w-40" 
            ariaLabel="Confirmação" 
          />
      </div>
      <div class="flex justify-end gap-2">
        <p-button label="Salvar" icon="pi pi-check" (click)="addItem()"></p-button>
      </div>
  </p-dialog>

  `
})
export class ItemInsertComponent {
  @Input() item: Item = { id: 0, nome: '', preco: 0, quantidade: 0, ativo: false };
  @Input() displayDialog: boolean = false;

  @Output() addOutEvent = new EventEmitter(true);

  addItem() {
    this.addOutEvent.emit();
    this.displayDialog = false;
  }
  
}
