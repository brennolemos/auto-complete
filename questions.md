1. What is the difference between Component and PureComponent? give an example where it might break my app.

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

3. Describe 3 ways to pass information from a component to its PARENT.

   - Passing a handler function as a prop to the child component, when calling the function we can pass a value to this function, then the Parent will have access to it;

   - We can use a context, so we can change the value in the Child and the Parent would have access to it;

4. Give 2 ways to prevent components from re-rendering.

   - wrapping the functions in useCallback();
   - wrapping the components in memo();

5. What is a fragment and why do we need it? Give an example where it might break my app.

   - A Fragment is a component exported from React that we can use to wrap adjascent components, since JSX doesn't accept adjascent components being returned. We could use divs for doing that, but this way we would have our DOM polluted with unnecessary divs.

6. Give 3 examples of the HOC pattern.

   - A DataTable component that needs to render a list from another component or any list that needs to be rendered in a specific way.
   - Provide a component with specific theme or styling.
   - Render components conditionally, we can create a HOC to protect a component and render it only if the user is logged in.

7. what's the difference in handling exceptions in promises, callbacks and async...await.

   - For promises, we receive two parameters, the resolve and reject methods. When we got an error, we just call the `reject()`.
   - For callbacks, we have the `.catch()` method when we got an exception
   - And for `async...await`, I usually use a `try...catch` statement, so I handle the exception in the `catch` block.

8. How many arguments does setState take and why is it async.

   - One argument. It's async beacue we may have multiple calls for one update, so it's for avoiding perfomance issues.

9. List the steps needed to migrate a Class to Function Component.

   - change the class component to a functional component

   - remove the constructor
   - remove the render() method, keep the return
   - add const before all methods
   - remove this.state throughout the component
   - remove all references to ‘this’ throughout the - component
   - replace initial state by useState()
   - replace compentDidMount and componentDidUpdate with useEffect

10. List a few ways styles can be used with components.

    - Inline styling, setting the style attribute.
    - CSS file, so we just import it in the component.
    - CSS Modules, we import the classes as an object..

11. How to render an HTML string coming from the server.
    - We can use the `dangerouslySetInnerHTML` attribute, but we need to make sure to sanitize the string before setting it.
