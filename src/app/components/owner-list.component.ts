import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { AutoFocusModule } from 'primeng/autofocus';
import { Item } from '../../../models/Item';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'item-list',
  imports: [FormsModule, ButtonModule, TableModule, PanelModule, AutoFocusModule, ToggleButtonModule, ConfirmDialogModule],
  template: `
    <p-panel header="Lista de Pedidos">
      <p-table [value]="items">
        <ng-template pTemplate="header">
            <tr>
                <th>Nome</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Confirmado?</th>
                <th>Ações</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-item>
            <tr>
                <td>{{ item.nome }}</td>
                <td>{{ item.preco }}</td>
                <td>{{ item.quantidade }}</td>
                <td>
                  <p-togglebutton 
                    disabled="true"
                    size="small"
                    onIcon="pi pi-check" 
                    offIcon="pi pi-times" 
                    [(ngModel)]="item.ativo" 
                    onLabel="Sim" 
                    offLabel="Não" 
                    styleClass="w-full sm:w-40" 
                    ariaLabel="Confirmação" 
                  />
                </td>
                <td>
                    <button pButton icon="pi pi-pencil" (click)="editItem(item)"></button>
                    <button pButton icon="pi pi-trash" class="p-button-danger" (click)="deleteItem(item)"></button>
                </td>
            </tr>
        </ng-template>
      </p-table>
    </p-panel>
  `
})
export class ItemListComponent {
  item: Item = { id: 0, nome: '', preco: 0, quantidade: 0, ativo: false };
  isEdit: boolean = false;
  displayDialog: boolean = false;
  @Input() items: Array<Item> = []

  @Output() deleteOutEvent = new EventEmitter<Item>();
  @Output() editOutEvent = new EventEmitter<Item>();

  deleteItem(item: Item) {
    this.deleteOutEvent.emit(item);
  }

  editItem(item: Item) {
    this.editOutEvent.emit(item);
  }

}
