import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HelloComponent } from './hello.component';
import { PanelModule } from 'primeng/panel';
import { ItemCrudComponent } from './components/item-crud.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, HelloComponent, ItemCrudComponent, PanelModule, ],
  template: `
    <main class="main">
      <div class="content">
        <div class="left-side">
          <app-hello helloName="usuário"></app-hello>

          <item-crud> </item-crud>
        </div>  
      </div>
    </main>

    <router-outlet />
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  names: Array<string> = []

  insert(name: string) {
    this.names.push(name)
  }

  remove(item: string) {
    this.names = this.names.filter(internalName => internalName !== item)
  }
}
