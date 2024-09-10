// ButtonComponent.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonComponent from '../components/Button';

describe('ButtonComponent', () => {
    test('renders without crashing', () => {
        render(<ButtonComponent text="Click Me" variant="contained" type="button" />);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    test('renders with correct props', () => {
        const { rerender } = render(
            <ButtonComponent
                text="Submit"
                variant="outlined"
                color="secondary"
                type="submit"
            />
        );

        const button = screen.getByText('Submit');
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('type', 'submit');

        // Update props
        rerender(
            <ButtonComponent
                text="Reset"
                variant="text"
                color="error"
                type="reset"
            />
        );

        expect(screen.getByText('Reset')).toBeInTheDocument();
        expect(screen.getByText('Reset')).toHaveAttribute('type', 'reset');
    });

    test('call onClick when button is clicked', () => {
        const handleClick = jest.fn();
        render(<ButtonComponent text="Click Me" variant="contained" type="button" onClick={handleClick} />);

        fireEvent.click(screen.getByText('Click Me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
