# Stylable + Webpack 4 + wix-style-react issue

Steps to reproduce:
1) `git clone git@github.com:Faradey27/stylable-webpack4-wix-style-react-issue.git`
2) `cd stylable-webpack4-wix-style-react-issue`
3) `npm install`
4) `npm start`
5) open `http://localhost:8080/` in Chrome browser(70+)
6) open devtools console(Command+Option+J on Mac)
7) do page refresh(Command + Shift + R)
8) see such error http://prntscr.com/lqk2mm
9) Done, you reproduced the bug

### Notes about code

- we use webpack@4, @stylable/webpack-plugin, html-webpack-plugin and babel 6
- we use webpack optimization
```
splitChunks: {
    chunks: 'all',
    maxInitialRequests: 1,
}
```
We set maxInitialRequests to 1 to have just 1 sync load of js file(without vendors)
We also tried to play with other params, but issue was the same mostly.

### Details about reproduce

To reproduce the issue, you need to have 2 entry points, 1 entry point should just import component from wix-style-react, second entry point also need to import component from wix-style-react + it need to import another component from wix-style-react but in async way(with `import()` function).

The error will happend in the moment when async chunk with wix-style-react component was loaded.
Looks like it somehow override `webpack modules map`.

We tried different configs of webpack and different plugins, but it does not helped.

### Note about stylable

Currently error comming from 2 files
During require of `Focusable.st.css` and during require of `Label.st.css`. Interesting note, that
both of these files used several times, for example `Focusable.js` import `Focusable.st.css`
but also `buttons-next.st.css` do `st-extends` of `Focusable.st.css`. And if localy we will remove thus
`st-extends` of `Focusable.st.css` inside of  `wix-ui-core`, problem will dissapear.

So, the problem maybe related to how stylable implement `require` function for `st-extends` and how it integrate it inside webpack core.
