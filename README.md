# DomBINDy

Welcome to DOMBindy. A new web framework written in typescript.
Syntax is heavily inspired by AngularJS however this framework is designed to be as minimal as possible. Just one single JS file and you're ready to start using the templating tools right away.

This plugin is currently still in development and highly experimental. The project itself is intended for educational use only.
You're welcome to check it out, or add to it as you please, but you are probably better off using one of the big names (Angular, React, VueJS +) for your **production** environments!

## Available Directives
A list of directives and examples are provided below to get you started.

### String Bind
Simple string binding a variable to your HTML tag. Any changes made to the variable are mirrored on the DOM.

```html
<body bind-app="appData">
    <h1>
        Hello there,
        <span bind-str="name"></span>
    </h1>
</body>

<script src="dist/bundle.js"></script>
<script type="text/javascript">
    const appData = {
        name: 'Leila-codes'
    }
</script>
```

### For-loop Bind
Similar to the classic `ng-repeat` this one iterates over a bound array and repeats the targetted element for each array.

```html
<body bind-app="appData">
    <div class="card" bind-for="apps">
        <div class="card-header">
            <h6 bind-str="name"></h6>
        </div>
        <div class="card-body"></div>
        </div>
</body>

<script src="dist/bundle.js"></script>
<script type="text/javascript">
    const appData = {
        name: 'Leila-codes',
        apps: [
            {name: "Test App #1"},
            {name: "Test App #2"},
            {name: "Test App #3"}
        ]
    }
</script>
```

### Click-handling bind
Similar to `ng-click` adds an `onclick` handler that is triggered inside your application's controller/scope.

Note: Named variables within the scope are automatically bound to the function arguments.

```html
<body bind-app="appData">
    <div>
        <button bind-click="clicked(name)"></button>
    </div>
</body>

<script src="dist/bundle.js"></script>
<script type="text/javascript">
    const appData = {
        name: 'Leila-codes',
        clicked: (e, userName) => {
            alert(`Hello there ${userName}`)
        }
    }
</script>
```

### Input Modeling Bind
Similar to `ng-model` this one is a bi-directional binding for input elements. Any text inputted is automatically set back to the variable.

```html
<body bind-app="appData">
    <div>
        <input type="text" bind-model="username">
        <h6>
            Your username is: 
            <span bind-str="username"></span>
        </h6>
    </div>
</body>
<script src="dist/bundle.js"></script>
<script type="text/javascript">
    const appData = {
        username: ''
    }
</script>
```
