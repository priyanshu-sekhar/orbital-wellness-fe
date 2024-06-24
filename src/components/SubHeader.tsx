interface SubHeaderProps {
    title: string;
}

const SubHeader = ({ title }: SubHeaderProps) => {
    return (
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    )
}

export default SubHeader;