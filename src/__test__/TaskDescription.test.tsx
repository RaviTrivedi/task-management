import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import { createMockStore } from './setupTests';
import TaskDescription from '../pages/TaskDescription';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import { RootState } from '../features/store';
import { render, screen } from '@testing-library/react';
    
// Mock the useParams hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

const mockUseParams = useParams as jest.Mock;

describe('TaskDescription', () => {
    test('render task details', () => {
        // Mocking the useParams hook to return the task id
        mockUseParams.mockReturnValue({ id: '1' });

        // Define the initial state with a sample task
        const initialState: RootState = {
            tasks: [
                { id: '1', title: 'Test Task', description: 'This is a test task', status: 'pending' },
            ],
        };

        // Create the mock store with the initial state
        const store = createMockStore(initialState);

        // Render the component with the Provider and Router
        render(
            <Provider store={store}>
                <Router>
                    <TaskDescription />
                </Router>
            </Provider>
        );

        // Assertions
        expect(screen.getByText('Test Task')).toBeInTheDocument();
        expect(screen.getByText('This is a test task')).toBeInTheDocument();
        expect(screen.getByText('status:pending')).toBeInTheDocument();
    });
});
