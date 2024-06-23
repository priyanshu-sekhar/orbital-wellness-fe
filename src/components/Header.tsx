import {Box} from "@mui/system";

interface HeaderProps {
    title: string;
}

const Header = ({ title }: HeaderProps) => {
    return (
        <Box mb={2}>
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        </Box>
    )
}

export default Header;