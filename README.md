# React Timer Component

👋 Welcome to my React Timer Component project. This little timer is built as part of a frontend developer test assignment. Let me give you a quick tour!

## Live - [Live Now, Click here to Check out !](https://taufiktestdemo.newgoldenfabrication.com/)
## What's This All About?

This project features a customizable timer component built with React. It's not just your average timer - it comes with **a sleek design and some cool features like start, pause, and reset functionality, also with audio feedback functionality when the last 10 seconds remain**, and a Storybook for the component.

![Timer-Latest-UI](https://github.com/user-attachments/assets/ec66de3d-7454-4368-903a-ad1c08461550)

## 🎉 New Feature: Timer Customization

As promised, I'm excited to introduce a new level of flexibility to our timer component!

### ⏱️ Customizable Timers

Now you can personalize your timers with:

- **🏷️ Custom Titles**: Give your timers meaningful names
- **⏳ Flexible End Times**: Set the duration that suits your needs

#### How it works:

1. **Set Your Title**: Choose a name that reflects the purpose of your timer
2. **Define End Time**: Specify the duration in seconds

#### Example Usage:

```javascript
<Timer title="Coffee Break" endTime={300} />  
<Timer title="Quick Meditation" endTime={600} />  
```
## Key Features

- **Audio Feedback:** for last remaining 10 seconds
- **User-friendly Controls:** Easy to use start, pause, and reset buttons
- **Visual Feedback:** Watch the progress circle fill up as time passes
- **Eye-catching Animation:** When the timer ends, enjoy a funky green and red flashing animation!
- **Storybook:** Used for making the component usage isolated


## How to Use

Just import the Timer component and use it like this:

```javascript
import Timer from './Timer';

<Timer title="My Timer" endTime={60} elapsedTime={0} />
```

## Props

**title (required):** Give your timer a snazzy name
**endTime (required):** Set how long the timer should run (in seconds)
**elapsedTime (optional):** Start the timer part-way through if you want

## Tech Stack

**React**
**Vite (for super-fast builds)**
**CSS for styling**
**Storybook**


## Want to Run It Locally?

1. **Clone this repo**
   ```bash
   git clone https://github.com/taufikus/react-timer.git
1. **Run**
   ```bash
    npm install
1. **Fire it up with**
   ```bash
    npm run dev
1. **Open your browser and check it out!**


## What's Next?

**Customization:** Ability to set your own title and end time

I'm thinking about adding some extra features and maybe even publishing this as a npm package. Stay tuned!

Thanks for checking out my project. If you have any questions or just want to chat about React, feel free to reach out!

Happy coding! 🚀



