import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { intlShape } from 'react-intl'
import { Button, Icon } from 'semantic-ui-react'

import { QuestionBlock } from '../questions'

const propTypes = {
  blocks: PropTypes.array, // TODO: extend
  handleLeftActionClick: PropTypes.func.isRequired,
  handleRightActionClick: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  runtime: PropTypes.string,
  sessionId: PropTypes.string.isRequired,
  startedAt: PropTypes.string,
}

const defaultProps = {
  blocks: [],
  runtime: '00:00:00',
  startedAt: '00:00:00',
}

const SessionTimeline = ({
  sessionId,
  blocks,
  intl,
  runtime,
  startedAt,
  handleLeftActionClick,
  handleRightActionClick,
}) => (
  <div className="sessionTimeline">
    <div className="topRow">
      <div className="startingTime">
        <Icon name="time" /> {startedAt}
      </div>
      <div className="runningTime">
        <Icon name="play circle" /> {runtime}
      </div>
      <div className="evaluationLink">
        <Icon name="external" />{' '}
        <Link prefetch href={`/sessions/evaluation/${sessionId}`}>
          <a target="_blank">Evaluation</a>
        </Link>
      </div>
    </div>
    <div className="blocks">
      {blocks.map(block => (
        <div className="block" key={block.id}>
          <QuestionBlock
            showSolutions
            questions={block.instances.map(instance => ({
              id: instance.id,
              title: instance.question.title,
              type: instance.question.type,
            }))}
            status={block.status}
            timeLimit={60}
          />
        </div>
      ))}
    </div>
    <div className="buttons">
      <Button
        color="red"
        content={intl.formatMessage({
          defaultMessage: 'Cancel',
          id: 'runningSession.button.cancel',
        })}
        icon="remove"
        labelPosition="left"
        size="large"
        onClick={handleLeftActionClick}
      />
      <Button
        primary
        content={intl.formatMessage({
          defaultMessage: 'Next',
          id: 'runningSession.button.next',
        })}
        icon="right arrow"
        labelPosition="right"
        size="large"
        onClick={handleRightActionClick}
      />
    </div>
    <style jsx>{`
      @import 'src/theme';

      .sessionTimeline {
        display: flex;
        flex-direction: column;
      }

      .topRow {
        flex: 1;

        display: flex;

        background: lightgrey;
        padding: 1rem;
      }

      .runningTime,
      .evaluationLink {
        margin-left: 2rem;
      }

      .blocks {
        flex: 1;

        display: flex;
        flex-direction: column;

        border: 1px solid grey;
        padding: 1rem;
      }

      .block:not(:first-child) {
        margin-top: 1rem;
      }

      .buttons {
        flex: 1;

        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;

        margin-top: 1rem;
      }

      .buttons > :global(button) {
        margin-right: 0;
      }

      @include desktop-tablet-only {
        .sessionTimeline {
          flex-flow: row wrap;
        }

        .topRow {
          flex: 0 0 100%;

          padding: 0.5rem;
        }

        .blocks {
          flex: 0 0 100%;

          flex-direction: row;

          padding: 0.5rem;
        }

        .block,
        .block:not(:first-child) {
          margin: 0.3rem;
        }
      }
    `}</style>
  </div>
)

SessionTimeline.propTypes = propTypes
SessionTimeline.defaultProps = defaultProps

export default SessionTimeline
