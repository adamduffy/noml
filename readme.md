NOML (no markup language)
===

Let's admit it, HTML and Javascript really suck for making applications.  They have separate purposes (UI and logic) with no real glue to bind them.  Enter jQuery, Backbone, Ember, Angular, React, the list goes on and on.  All of these improve the glue, but still rely on some complicated mapping model between the HTML and Javascript.

With NOML there is no HTML (or JSX, or Xml-ish-ness).  NOML renders javascript objects into html.  This technique allows for dynamic content to be rendered on the fly, modified, and bound with logic, without ever touching HTML.  The entire application is written in literal, readable, unconverted Javascript.  The glue is solved (chemistry pun intended).

## Simple examples

results when noml.render() is called on the object.

```javascript
ui.span('hello world!');
```
```html
<span>hello world!</span>
```

### child elements

```javascript
ui.div(
	ui.span('span 1'),
	ui.span('span 2')
)
```
```html
<div><span>span 1</span><span>span 2</span></div>
```

### properties

NOML Element classes have a ```prop``` method.

```javascript
ui.span('welcome to noml').prop({id: 'mySpanId'})
```
```html
<span id="mySpanId">welcome to noml</span>
```

### variables

since this is javascript to begin with, variables work naturally

```javascript
var data = {name: 'adam'};
ui.span('my name is ' + data.name)
```
```html
<span>my name is adam</span>
```

### class handling

```javascript
ui.span('a classy span').class('myClass')
```
```html
<span class='myClass'>a classy span</span>
```

the NOML Element class handles de-duping of class names.

```javscript
ui.span('a very classy span)
	.class('myClass1 myClass3')
	.class('myClass1 myClass2')
	.class('myClass3');
```
```html
<span class='myClass1 myClass2 myClass3'>a very classy span</span>
```

### events

NOML will wire to DOM events during render.  the Element class wraps a few common events
```javascript
ui.span('click here').onClick(() => alert('hi!'));
```
or you can use any other event name
```javascript
ui.span('mouse enter here').event({mouseenter: () => alert('mouse entered!')})
```

###components
Noml will render modular ui elements as components that allow for special interaction such as independent re-rendering and promise resolution.  to do this, expose a getBody() method.

TODO: make example

you can give the component your own id or noml will auto-assign one so it can reference it for re-rendering, etc.  

if your code maintains a reference to this object, the ui can be refreshed later by calling c.render() or c.syncProps().  this technique is best for low-level components where you want immediate response.  For most cases, just re-rendering the whole page is much easier to manage. (and should still be very snappy)

###Asynchronous component loading

to make loading, ready, and failure states, simply return a promise from getBody and expose a getLoadingBody() method.  noml will re-render the ui when the promise is resolved or fails.  

```javascript
...
	getBody() {
		return Promise.resolve({span: 'this is a resolved promise'});
	},
	getLoadingBody() {
		return {span: 'loading'};
	}
...
```
'loading' will render until the promise is resolved.
```html
<component id="_0"><span>this is a resolved promise</span></component>
```

###Reading input data

To keep the abstraction away from html, the best way to read user input is by mapping it back to your javascript data objects.  You can do this with the change or other similar element events.  Noml will wire up native dom element events if you begin a property with $. Another option is to give the element a unique id and find it later.  

TODO: make example

##Styles

Noml also uses javascript to define CSS.  The general format is as follows:
```javascript
{
	id: {
		class: {
			property: value,
			state: {
				property: value, ...
			}, ...
		}, ...
	}, ...
}
```

Noml uses c.id and c.getStyle() to maintain the composite css object. Class names can be prepended with $ in place of . when desired (other selectors work in place of class name).  Included examples show techniques to define and override default styles.
```javascript

	getDefaultStyle() {
    return {
      $clickable: {
        cursor: 'pointer',
        ':hover': {
					'text-decoration': 'underline'
        }
      }
    };
  }

```
```css
#page .clickable {
	cursor:pointer;
}
#page .clickable:hover {
	text-decoration:underline;
}
```

##Putting it all together

That is the extent of the Noml library itself.  This leaves a lot of room for project architecture around it.  Here is a basic example of how to begin:

start with a simple html file:
```html
<!DOCTYPE html>
<html>
<head>
	<script type="text/javascript" src="readme.js"></script>
	<title>Noml example</title>
</head>
	<body>
	</body>
</html>
```

and a simple js file:
```javascript
import * as noml from './Noml';
import {ui} from './Noml';

window.onload = bodyOnLoad();

function bodyOnLoad() {
	noml.renderPage(ui.span("my first Noml app"));
}
```

The included example shows a technique of structuring an application with ui, data, logic, and state all managed.
