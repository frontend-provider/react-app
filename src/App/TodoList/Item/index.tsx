import React, { useState, createRef, useEffect } from 'react'
import { AppState, Todo, TodoListType } from '../../../index'
import { useAppState } from '@laststance/use-app-state'
import { Container } from './style'

interface Props {
  todo: Todo
}

interface State {
  onEdit: boolean
}

const Item: React.FC<Props> = ({ todo }) => {
  const [appState, setAppState] = useAppState<AppState>()
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

  const reverseAllIsCompleted = (id: Todo['id']): void => {
    setAppState({ todoList: appState.todoList.filter((t: Todo): boolean => t.id !== id) }) /* eslint-disable-line prettier/prettier */
  }

  const removeItem = (id: Todo['id']): void => {
    const removed: TodoListType = appState.todoList.filter(
      (t: Todo): boolean => t.id !== id
    )

    setAppState({ todoList: removed })
  }

  const handleTodoTextEdit = (e: React.ChangeEvent<HTMLInputElement>, onEdit: Todo['id']): void => { /* eslint-disable-line prettier/prettier */
    const edited = appState.todoList.map(
      (t: Todo): Todo => {
        if (t.id === onEdit) {
          return { ...t, bodyText: e.target.value }
        } else {
          return t
        }
      }
    )

    setAppState({ todoList: edited })
  }

  useEffect(() => {
    // For fucus input element when double clicks text label. fix this https://github.com/laststance/react-typescript-todo-example-2020/issues/50
    if (state.onEdit === true && editInput.current !== null)
      editInput.current.focus()
  }, [editInput, state.onEdit])

  return (
    <Container data-cy="todo-item">
      <li className={SwitchStyle(todo, state.onEdit)} data-testid="todo-item">
        <div className="view" data-testid="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => reverseAllIsCompleted(todo.id)}
            data-cy="todo-item-complete-check"
            data-testid="todo-item-complete-check"
          />
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
    </Container>
  )
}

export default Item
