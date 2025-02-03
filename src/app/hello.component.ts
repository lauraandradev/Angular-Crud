import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: `
      <h1>Bem vindo, {{ helloName }}!</h1>
  `
})
export class HelloComponent {
  @Input() helloName = ''
}
