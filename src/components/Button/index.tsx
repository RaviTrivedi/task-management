import { Button } from "@mui/material"

interface ButtonProps {
    text: string;
    variant: "text" | "contained" | "outlined";
    color?: "primary" | "inherit" | "secondary" | "success" | "error" | "info" | "warning";
    type: "button" | "submit" | "reset";
    onClick?: () => void;
}

const ButtonComponent = ({ variant, color, type, text, onClick }: ButtonProps) => {
    return (
        <Button
            variant={variant}
            color={color}
            type={type}
            onClick={onClick}
        >
            {text}
        </Button>
    )
}

export default ButtonComponent