import { Accordion } from "flowbite-react";
import React from "react";

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-14 md:w-2/3 lg:w-1/2 mx-auto">
      <h1 className="text-3xl text-slate-700 uppercase mb-5 font-bold">
        Frequently Ask Question
      </h1>
      <Accordion alwaysOpen={true}>
        <Accordion.Panel>
          <Accordion.Title>
            {" "}
            What are the different ways to manage a state in a React
            application??
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-800 dark:text-gray-400">
              There are 4 ways to manage state in react application
            </p>
            <ol>
              <li>1. local State</li>
              <li>2. Global State</li>
              <li>3. Server State</li>
              <li>4. URL State</li>
            </ol>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            How does prototypical inheritance work??
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-800 dark:text-gray-400">
              When it comes to inheritance, JavaScript only has one construct:
              objects. Each object has a private property which holds a link to
              another object called its prototype. That prototype object has a
              prototype of its own, and so on until an object is reached with
              null as its prototype
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            What is a unit test? Why should we write unit tests?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-800 dark:text-gray-400">
              A unit test is a way of testing a unit - the smallest piece of
              code that can be logically isolated in a system. In most
              programming languages, that is a function, a subroutine, a method
              or property. The isolated part of the definition is important.
            </p>
            <p className="mb-2 text-gray-800 dark:text-gray-400">
              For Test-Driven Development (TDD), you write unit tests before
              writing any implementation. This makes your implementation details
              in your code shorter and easier to understand. In this instance,
              the best time to write unit tests is immediately. For others, most
              developers write unit tests after the code's been written.
            </p>
            <p className="mb-2 text-gray-800 dark:text-gray-400">
              Learn more about these technologies:
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>React vs. Angular vs. Vue?</Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-800 dark:text-gray-400">
              Speaking of architecture, Angular.js is a full-fledged MVC
              framework that provides you with all the possibilities for
              out-of-the-box programming:
              <ul>
                <li>Templates based on HTML;</li>
                <li>Dependency injection;</li>
                <li>Ajax requests;</li>
              </ul>
            </p>
            <p className="mb-2 text-gray-800 dark:text-gray-400">
              React.js, on the other hand, is a library that just offers the
              view, leaving the developer to decide how to construct the Model
              and Controller. The following features are provided:
            </p>
            <ul>
              <li>
                As an add-on to JavaScript, the JSX language, which is similar
                to XML, is used instead of templates
              </li>
              <li>No introduction of dependencies;</li>
              <li>Ajax requests;</li>
            </ul>
            <p>
              Vue.js is a library that allows you to create interactive web
              interfaces. Vue.js is primarily concerned with the ViewModel layer
              of the MVVM architecture. It uses two-way data bindings to attach
              the View and the Model. Directives and Filters abstract away the
              actual DOM operations and output formatting.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
};

export default Blog;
