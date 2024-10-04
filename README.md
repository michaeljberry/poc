# dotCMS

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

### Environment Variables

Make a copy of the example environment variable file and then add the appropriate values in the newly created .env file

```shell
cp .env.example .env
vi .env
```

### Install Dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Verifying the Project
When you ran `npm run dev` in the terminal, you should see output similar to this:
```
 VITE v5.4.8  ready in 417 ms

  ➜  Local:   http://localhost:5173/
```
In a browser, open the URL. It should open the home page of the project. You can navigate to the "Travel Blog" via the top menu. This page displays the published blog posts. When you click on the blog post, you are taken to the page specific to that post.