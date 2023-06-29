# Post Display

Post Display app built with [Angular](https://angular.io/) as frontend framework, [Angular Material](https://material.angular.io/) for design and styling and [NgRx](https://ngrx.io/) is used for state management.  
It uses [jsonplaceholder API](https://jsonplaceholder.typicode.com) to fetch 100 posts and render them all in a grid (10x10).  
Post titles are displayed by default in the squares. Users can then click on any post to replace the title with the userId in the post. Subsequents clicks will cycle over the properties and display them replacing the previous one.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
