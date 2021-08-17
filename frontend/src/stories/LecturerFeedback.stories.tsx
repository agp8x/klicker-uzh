import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import LecturerFeedback from '../components/feedbacks/LecturerFeedback'

export default {
  title: 'Example/LecturerFeedback',
  component: LecturerFeedback,
} as ComponentMeta<typeof LecturerFeedback>

const Template: ComponentStory<typeof LecturerFeedback> = (args) => <LecturerFeedback {...args} />

export const Primary = Template.bind({})

Primary.args = {
  content: 'LecturerFeedback',
}
