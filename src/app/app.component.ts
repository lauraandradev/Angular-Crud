import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, PanelModule],
  template: `
    <main class="main">
          <router-outlet></router-outlet>
    </main>
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
