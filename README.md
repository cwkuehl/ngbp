# Ngbp

This project is dependent from project rabp which is the server part to hold the data.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.5.

(by statement: npx -p @angular/cli@latest ng new ngbp -s -t -S --standalone)
ng g c shared/components/buttons/login-button --flat --standalone --inline-template=true --inline-style=true --skip-tests=true
ng g c shared/components/navigation --flat --standalone --inline-template=true --inline-style=true --skip-tests=true
ng g c features/home/home --flat --standalone --inline-template=true --inline-style=true --skip-tests=true
ng g c features/diary/tb100 --flat --standalone --inline-template=true --inline-style=true --skip-tests=true
npm install -D ts-node dotenv
npm i axios
(npm i @angular/pwa@"^16.2.0")

## Environment preparation
Run `npm run env` generating environment.ts.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Edit the file .env and set the environment data with `node set-env.ts` before building.
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
