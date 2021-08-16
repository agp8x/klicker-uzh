import React from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'

interface Props {
  alreadyVoted?: boolean
  content: string
  onDelete?: any
  showDelete?: boolean
  showVotes?: boolean
  updateVotes?: any
  votes: number
  showPin?: boolean
  showInput?: boolean
}

const defaultProps = {
  onDelete: (f): any => f,
  showDelete: true,
  showVotes: true,
  showPin: true,
  showInput: true,
}

const Feedback = ({
  alreadyVoted,
  content,
  showDelete,
  showVotes,
  updateVotes,
  votes,
  onDelete,
  showPin,
  showInput,
}: Props): React.ReactElement => (
  <div className="container">
    <div className="feedback">
      <div className="content">{content}</div>

      {showPin && (
        <div className="pin">
          <Button basic fluid icon="pin"></Button>
        </div>
      )}

      {showDelete && (
        <div className="delete">
          <Button basic fluid icon="trash" onClick={onDelete} />
        </div>
      )}

      {showVotes && (
        <Button className="votes" disabled={alreadyVoted} onClick={updateVotes && updateVotes()}>
          <Icon name={alreadyVoted ? 'thumbs up' : 'thumbs up outline'} />
          {votes}
        </Button>
      )}
    </div>

    {showInput && (
      <Form className="newFeedback">
        <Form.Field>
          <label htmlFor="answerInput">
            <textarea className="answer" />
          </label>
        </Form.Field>

        <Button
          primary
          disabled={false}
          type="submit"
          content="Submit"
          onClick={() => alert('Answer submitted!')}
        ></Button>
      </Form>
    )}

    <style jsx>{`
      @import 'src/theme';

      .container {
        flex-direction: column;
      }

      .feedback {
        display: flex;

        background: $color-primary-10p;
        border: 1px solid $color-primary;

        .content,
        .delete {
          padding: 0.7rem;
        }

        .content {
          flex: 1;
        }

        .pin {
          flex: 0 0 1rem;
          align-self: center;
        }

        .delete {
          flex: 0 0 1rem;
          align-self: center;
        }

        .votes {
          flex: 0 0 5rem;

          display: flex;
          align-items: center;
          justify-content: center;

          border-left: 1px solid grey;
        }
      }

      .answer {
        display: flex;
        width: 100%;

        border: 1px solid $color-primary;
      }
    `}</style>
  </div>
)

Feedback.defaultProps = defaultProps

export default Feedback
