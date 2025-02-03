import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemInsertComponent } from "./item-insert.component";
import { ItemListComponent } from './owner-list.component';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { Item } from '../../../models/Item';

@Component({
  selector: 'item-crud',
  imports: [FormsModule, 
            ItemInsertComponent, 
            ItemListComponent, 
            PanelModule, 
            DividerModule,],
  template: `
    <p-panel header="Gerenciador de Pedidos">
      <item-insert [item]="item" [displayDialog]="displayDialog" (addOutEvent)="addItem()"></item-insert>

      <p-divider />

      <item-list (deleteOutEvent)="remove($event)" (editOutEvent)="editItem($event)" [items]="items"></item-list>
    </p-panel>
  `,
  styleUrl: '../app.component.scss'
})
export class ItemCrudComponent {
  items: Array<Item> = [];
  item: Item = { id: 0, nome: '', preco: 0, quantidade: 0, ativo: false, };
  isEdit: boolean = false;
  displayDialog: boolean = false;

  addItem() {
    if (this.isEdit) {
      const index = this.items.findIndex(i => i.id === this.item.id);
      this.items[index] = { ...this.item };
    } else {
      this.item.id = this.items.length + 1;
      this.items.push({ ...this.item });
    }
    this.resetForm();
  }

  resetForm() {
    this.item = { id: 0, nome: '', preco: 0, quantidade: 0, ativo: false };
    this.isEdit = false;
    this.displayDialog = false;
  }

  remove(item: Item) {
    if (confirm("Deseja realmente excluir o pedido " + item.nome)){
      this.items = this.items.filter(item => item.id !== item.id);
    }
  }

  editItem(item: Item) {
    this.item = { ...item };
    this.isEdit = true;
    this.displayDialog = true;
  }

  deleteItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  }
}
