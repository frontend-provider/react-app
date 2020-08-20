import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Provider from '@laststance/use-app-state'
import TodoList from './index'
import { AppState } from '../../index'
import '@testing-library/jest-dom'

const initialAppState: AppState = {
  todoList: [
    {
      id: 'TsHx9eEN5Y4A',
      bodyText: 'monster',
      completed: false,
    },
    {
      id: 'ba91OwrK0Dt8',
      bodyText: 'boss black',
      completed: false,
    },
    {
      id: 'QwejYipEf5nk',
      bodyText: 'caffe latte',
      completed: false,
    },
  ],
}

test('should be render 3 todo items in initialAppState', () => {
  const screen = render(
    <Provider initialState={initialAppState}>
      <TodoList path="/" />
    </Provider>
  )

  expect(screen.getByTestId('todo-list')).toBeInTheDocument()
  expect(screen.getByTestId('todo-list').children.length).toBe(3)
  expect(Array.isArray(screen.getAllByTestId('todo-item'))).toBe(true)
  expect(screen.getAllByTestId('todo-item')[0]).toHaveTextContent('monster')
  expect(screen.getAllByTestId('todo-item')[1]).toHaveTextContent('boss black')
  expect(screen.getAllByTestId('todo-item')[2]).toHaveTextContent('caffe latte')
})

test('should be work delete todo button', () => {
  const screen = render(
    <Provider initialState={initialAppState}>
      <TodoList path="/" />
    </Provider>
  )

  // delete first item
  fireEvent.click(screen.getAllByTestId('delete-todo-btn')[0])
  // assertions
  expect(screen.getByTestId('todo-list').children.length).toBe(2)
  expect(Array.isArray(screen.getAllByTestId('todo-item'))).toBe(true)
  expect(screen.getAllByTestId('todo-item')[0]).toHaveTextContent('boss black')
  expect(screen.getAllByTestId('todo-item')[1]).toHaveTextContent('caffe latte')
})

test('should be work correctly all completed:true|false checkbox toggle button', () => {
  const screen = render(
    <Provider initialState={initialAppState}>
      <TodoList path="/" />
    </Provider>
  )

  // toggle on
  fireEvent.click(screen.getByTestId('toggle-all-btn'))
  // should be completed all todo items
  expect((screen.getAllByTestId('todo-item-complete-check')[0] as HTMLInputElement).checked).toBe(true) /* eslint-disable-line prettier/prettier */
  expect((screen.getAllByTestId('todo-item-complete-check')[1] as HTMLInputElement).checked).toBe(true) /* eslint-disable-line prettier/prettier */
  expect((screen.getAllByTestId('todo-item-complete-check')[2] as HTMLInputElement).checked).toBe(true) /* eslint-disable-line prettier/prettier */

  // toggle off
  fireEvent.click(screen.getByTestId('toggle-all-btn'))
  // should be not comleted all todo items
  expect((screen.getAllByTestId('todo-item-complete-check')[0] as HTMLInputElement).checked).toBe(false) /* eslint-disable-line prettier/prettier */
  expect((screen.getAllByTestId('todo-item-complete-check')[1] as HTMLInputElement).checked).toBe(false) /* eslint-disable-line prettier/prettier */
  expect((screen.getAllByTestId('todo-item-complete-check')[2] as HTMLInputElement).checked).toBe(false) /* eslint-disable-line prettier/prettier */
})
