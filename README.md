# react-ts-rxjs-clock

A simple React app, written in TypeScript, that displays the users date and time, with preference configurations to alter the display of 
the date and time on screen.

The app detects the users IP address, then will request the time for that IP address. This static information
is held within RxJS streams that are then rendered via React components.

The `userTime` stream takes the detected user time, and "ticks" using the client to show the time updating like a real
ticking clock.

## Intention for the repo

This is intended to be purely a demonstration of how I would tackle building a React + TypeScript + RxJS app with some 
tests.

This is not intended to be a fully fledged implementation, but just a small representation of how I might structure
a project, write code, and write tests to firm up known quality attributes.

## Demonstration

A live demonstration of this app can be found here: https://dualcyclone.github.io/react-ts-rxjs-clock/
