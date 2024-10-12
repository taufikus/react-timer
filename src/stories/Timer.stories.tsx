import { StoryFn, Meta } from '@storybook/react';
import Timer from '../components/Timer'; 


export default {
  title: 'Components/Timer',
  component: Timer,
  argTypes: {
    title: { control: 'text' },
    endTime: { 
      control: { type: 'number', min: 1, max: 3599, step: 1 },
      description: 'Total duration of the timer in seconds (max 59:59)'
    },
    elapsedTime: { 
      control: { type: 'number', min: 0, step: 1 },
      description: 'Initial elapsed time in seconds'
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A customizable timer component with visual progress'
      },
    },
  },
} as Meta<typeof Timer>;

const Template: StoryFn<typeof Timer> = (args) => <Timer {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Running Timer',
  endTime: 1500, // 25 minutes
};

export const ShortBreak = Template.bind({});
ShortBreak.args = {
  title: 'Short Break',
  endTime: 300, // 5 minutes
};

export const LongBreak = Template.bind({});
LongBreak.args = {
  title: 'Long Break',
  endTime: 900, // 15 minutes
};

export const WithElapsedTime = Template.bind({});
WithElapsedTime.args = {
  title: 'Timer with Elapsed Time',
  endTime: 1800, // 30 minutes
  elapsedTime: 600, // 10 minutes elapsed
};