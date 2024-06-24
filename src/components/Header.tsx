interface HeaderProps {
    title: string;
}

const Header = ({ title }: HeaderProps) => {
    return (
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
    )
}

export default Header;