import React, { useState, createRef, useEffect } from 'react'
import { Todo } from '../../../index'
import { Layout } from './style'

interface Props {
  todo: Todo
  handleCompleteCheckbox: (id: Todo['id']) => void
  removeItem: (id: Todo['id']) => void
  handleTodoTextEdit: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: Todo['id']
  ) => void
}

interface State {
  onEdit: boolean
}

const Item: React.FC<Props> = ({ todo, handleCompleteCheckbox, removeItem, handleTodoTextEdit }) => {  /* eslint-disable-line prettier/prettier */
  const editInput = createRef<HTMLInputElement>()
  const init: State = { onEdit: false }
  const [state, setState] = useState(init)

  const onDoubleClick = (): void => {
    setState({ onEdit: true })
  }

  const onBlurEdit = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (e.currentTarget.value.trim().length > 0) {
      setState({ onEdit: false })
    } else {
      removeItem(todo.id)
    }
  }

  const submitEditText = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      if (e.currentTarget.value.trim().length > 0) {
        setState({ onEdit: false })
      }
    }
  }

  // Control Todo's CSS based on complex user interaction
  const SwitchStyle = (t: Todo, onEdit: boolean): string => {
    switch (true) {
      case onEdit && t.completed:
        return 'completed editing'
      case onEdit && !t.completed:
        return 'editing'
      case !onEdit && t.completed:
        return 'completed'
      case !onEdit && !t.completed:
        return ''

      default:
        return ''
    }
  }

  useEffect(() => {
    // For fucus input element when double clicks text label. fix this https://github.com/laststance/react-typescript-todo-example-2020/issues/50
    if (state.onEdit === true && editInput.current !== null)
      editInput.current.focus()
  }, [editInput, state.onEdit])

  return (
    <Layout data-cy="todo-item">
      <li className={SwitchStyle(todo, state.onEdit)} data-testid="todo-item">
        <div className="view" data-testid="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleCompleteCheckbox(todo.id)}
            data-cy="todo-item-complete-checkbox"
            data-testid="todo-item-complete-checkbox"
          />
          {/* Actual user seeing the label text on screen */}
          <label
            onDoubleClick={onDoubleClick}
            data-cy="todo-body-text"
            data-testid="todo-body-text"
          >
            {todo.bodyText}
          </label>
          <button
            className="destroy"
            onClick={() => removeItem(todo.id)}
            data-cy="delete-todo-btn"
            data-testid="delete-todo-btn"
          />
        </div>
        <input
          ref={editInput}
          onBlur={e => onBlurEdit(e)}
          className="edit"
          value={todo.bodyText}
          onChange={e => handleTodoTextEdit(e, todo.id)}
          onKeyPress={e => submitEditText(e)}
          data-cy="todo-edit-input"
          data-testid="todo-edit-input"
        />
      </li>
    </Layout>
  )
}

export default Item
